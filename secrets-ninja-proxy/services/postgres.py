from fastapi import APIRouter, Request, HTTPException
import psycopg2
import psycopg2.extras
from urllib.parse import urlparse, parse_qs

router = APIRouter()

def connect_to_postgres(postgres_uri):
    def try_connect(uri):
        try:
            return psycopg2.connect(uri)
        except psycopg2.OperationalError:
            return None

    conn = try_connect(postgres_uri)
    if conn:
        return conn

    try:
        parsed_uri = urlparse(postgres_uri)
        query_params = parse_qs(parsed_uri.query)

        current_sslmode = query_params.get('sslmode', ['require'])[0]

        # Flip sslmode
        new_sslmode = 'disable' if current_sslmode == 'require' else 'require'

        new_params = {k: v[0] for k, v in query_params.items() if k != 'sslmode'}
        new_params['sslmode'] = new_sslmode
        query_string = '&'.join([f"{k}={v}" for k, v in new_params.items()])

        new_uri = f"{parsed_uri.scheme}://{parsed_uri.netloc}{parsed_uri.path}?{query_string}"

        conn = try_connect(new_uri)
        if conn:
            return conn

        raise HTTPException(status_code=500, detail="Failed to connect to PostgreSQL with both sslmode options")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to connect to PostgreSQL: {str(e)}")
            
@router.post("/list_databases")
async def list_databases(request: Request):
    data = await request.json()
    postgres_uri = data.get("postgres_uri")
    
    if not postgres_uri:
        raise HTTPException(status_code=400, detail="Missing PostgreSQL URI")
    
    try:
        conn = connect_to_postgres(postgres_uri)
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        query = """
        SELECT 
            d.datname as database_name,
            pg_database_size(d.datname) as database_size,
            pg_size_pretty(pg_database_size(d.datname)) as pretty_size
        FROM 
            pg_database d
        WHERE 
            d.datistemplate = false
        ORDER BY 
            pg_database_size(d.datname) DESC;
        """
        
        cursor.execute(query)
        databases = []
        
        for row in cursor.fetchall():
            databases.append({
                "dbname": row["database_name"],
                "dbsize": row["database_size"],
                "pretty_size": row["pretty_size"]
            })
        
        cursor.close()
        conn.close()
        
        return {"databases": databases}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def modify_uri_database(postgres_uri, database_name):
    parsed_uri = urlparse(postgres_uri)
    
    if parsed_uri.path and parsed_uri.path != "/":
        path_parts = parsed_uri.path.split('/')
        path_parts[-1] = database_name
        new_path = '/'.join(path_parts)
    else:
        new_path = f"/{database_name}"
    
    netloc = parsed_uri.netloc
    scheme = parsed_uri.scheme
    query = parsed_uri.query
    
    new_uri = f"{scheme}://{netloc}{new_path}"
    if query:
        new_uri += f"?{query}"
    
    return new_uri

@router.post("/list_db_tables")
async def list_db_tables(request: Request):
    data = await request.json()
    postgres_uri = data.get("postgres_uri")
    database_name = data.get("database")
    
    if not postgres_uri or not database_name:
        raise HTTPException(status_code=400, detail="Missing PostgreSQL URI or database name")
    
    try:
        new_uri = modify_uri_database(postgres_uri, database_name)
        conn = connect_to_postgres(new_uri)
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        query = """
        SELECT 
            t.table_schema,
            t.table_name,
            pg_relation_size(quote_ident(t.table_schema) || '.' || quote_ident(t.table_name)) as table_size,
            pg_size_pretty(pg_relation_size(quote_ident(t.table_schema) || '.' || quote_ident(t.table_name))) as pretty_size,
            (SELECT count(*) FROM information_schema.columns WHERE table_schema = t.table_schema AND table_name = t.table_name) as column_count,
            (SELECT count(*) FROM pg_indexes WHERE schemaname = t.table_schema AND tablename = t.table_name) as index_count,
            coalesce(s.n_live_tup, 0) as estimated_row_count
        FROM 
            information_schema.tables t
        LEFT JOIN 
            pg_stat_user_tables s ON s.schemaname = t.table_schema AND s.relname = t.table_name
        WHERE 
            t.table_schema NOT IN ('pg_catalog', 'information_schema')
            AND t.table_type = 'BASE TABLE'
        ORDER BY 
            t.table_schema, t.table_name;
        """
        
        cursor.execute(query)
        tables = []
        
        for row in cursor.fetchall():
            tables.append({
                "schema": row["table_schema"],
                "table_name": row["table_name"],
                "size": row["table_size"],
                "pretty_size": row["pretty_size"],
                "column_count": row["column_count"],
                "index_count": row["index_count"],
                "estimated_row_count": row["estimated_row_count"]
            })
        
        cursor.close()
        conn.close()
        
        return {"tables": tables}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_records")
async def list_records(request: Request):
    data = await request.json()
    postgres_uri = data.get("postgres_uri")
    database_name = data.get("database")
    table_name = data.get("table")
    schema_name = data.get("schema", "public")
    
    if not postgres_uri or not database_name or not table_name:
        raise HTTPException(status_code=400, detail="Missing PostgreSQL URI, database, or table name")
    
    try:
        new_uri = modify_uri_database(postgres_uri, database_name)
        conn = connect_to_postgres(new_uri)
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        full_table_name = f'"{schema_name}"."{table_name}"'
        
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = %s AND table_name = %s
            )
        """, (schema_name, table_name))
        
        if not cursor.fetchone()[0]:
            raise HTTPException(status_code=404, detail=f"Table {schema_name}.{table_name} not found")
        
        query = f"SELECT * FROM {full_table_name} LIMIT 5"
        cursor.execute(query)
        
        columns = [desc[0] for desc in cursor.description]
        records = []
        
        for row in cursor.fetchall():
            record = {}
            for i, col in enumerate(columns):
                if isinstance(row[i], (bytes, memoryview)):
                    record[col] = "binary data"
                else:
                    record[col] = row[i]
            records.append(record)
        
        cursor.close()
        conn.close()
        
        return {"records": records}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
