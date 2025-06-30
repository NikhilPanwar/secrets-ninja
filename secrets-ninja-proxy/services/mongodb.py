from fastapi import APIRouter, Request, HTTPException
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

router = APIRouter()
    
@router.post("/list_databases")
async def list_databases(request: Request):
    data = await request.json()
    mongodb_uri = data.get("mongodb_uri")
    if not mongodb_uri:
        raise HTTPException(status_code=400, detail="Missing MongoDB URI")
    try:
        client = MongoClient(mongodb_uri)
        db_list = client.list_database_names()
        dbs_info = []
        for db_name in db_list:
            db = client[db_name]
            stats = db.command("dbstats")
            collections = db.list_collection_names()
            num_collections = len(collections)
            total_indexes = 0
            for coll in collections:
                indexes = db[coll].index_information()
                total_indexes += len(indexes)
            dbs_info.append({
                "dbname": db_name,
                "dbsize": stats.get("dataSize", 0),
                "number_of_collections": num_collections,
                "number_of_indexes": total_indexes
            })
        return {"databases": dbs_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_db_collections")
async def list_db_collections(request: Request):
    data = await request.json()
    mongodb_uri = data.get("mongodb_uri")
    database_name = data.get("database")
    if not mongodb_uri or not database_name:
        raise HTTPException(status_code=400, detail="Missing MongoDB URI or database name")
    try:
        client = MongoClient(mongodb_uri)
        db = client[database_name]
        collections = db.list_collection_names()
        collections_info = []
        for coll in collections:
            stats = db.command("collstats", coll)
            collections_info.append({
                "collection_name": coll,
                "size": stats.get("size", 0),
                "doc_count": stats.get("count", 0),
                "avg_doc_size": stats.get("avgObjSize", 0),
                "index_count": stats.get("nindexes", 0)
            })
        return {"collections": collections_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_records")
async def list_records(request: Request):
    data = await request.json()
    mongodb_uri = data.get("mongodb_uri")
    database_name = data.get("database")
    collection_name = data.get("collection")
    if not mongodb_uri or not database_name or not collection_name:
        raise HTTPException(status_code=400, detail="Missing MongoDB URI, database, or collection name")
    try:
        client = MongoClient(mongodb_uri)
        db = client[database_name]
        collection = db[collection_name]
        records = list(collection.find().limit(5))
        # Convert ObjectId to string for JSON serialization if needed
        for record in records:
            if "_id" in record:
                record["_id"] = str(record["_id"])
        return {"records": records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
