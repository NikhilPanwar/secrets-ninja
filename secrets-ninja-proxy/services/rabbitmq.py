from fastapi import APIRouter, Request, HTTPException
import pika
import requests
from requests.auth import HTTPBasicAuth

router = APIRouter()

def parse_connection_string(connection_string):
    if not connection_string.startswith(("amqp://", "amqps://")):
        raise ValueError("Invalid AMQP/AMQPS connection string")
    scheme_removed = connection_string.split("://", 1)[1]
    creds, host_port = scheme_removed.split("@")
    username, password = creds.split(":")
    if ":" in host_port:
        host, port = host_port.split(":")
    else:
        host = host_port
        port = "5671" if connection_string.startswith("amqps://") else "5672"
    return username, password, host, port

@router.post("/get_queues")
async def get_queues(request: Request):
    data = await request.json()
    connection_string = data.get("connection_string")
    if not connection_string:
        raise HTTPException(status_code=400, detail="Missing connection string")
    try:
        username, password, host, port = parse_connection_string(connection_string)
        protocol = "https" if connection_string.startswith("amqps://") else "http"
        url = f"{protocol}://{host}:15672/api/queues"
        response = requests.get(url, auth=HTTPBasicAuth(username, password), timeout=15, verify=False if protocol=="https" else True)
        if response.status_code == 200:
            queues = response.json()
            result = []
            for q in queues:
                result.append({
                    "name": q["name"],
                    "messages": q["messages"],
                    "consumers": q["consumers"]
                })
            return {"queues": result}
        else:
            raise HTTPException(status_code=500, detail=f"Failed to get queues, HTTP {response.status_code}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get_queue_data")
async def get_queue_data(request: Request):
    data = await request.json()
    connection_string = data.get("connection_string")
    queue_name = data.get("queue_name")
    if not connection_string or not queue_name:
        raise HTTPException(status_code=400, detail="Missing connection string or queue name")
    try:
        params = pika.URLParameters(connection_string)
        connection = pika.BlockingConnection(params)
        channel = connection.channel()

        messages = []
        for _ in range(5):
            method_frame, header_frame, body = channel.basic_get(queue=queue_name, auto_ack=True)
            if method_frame:
                messages.append(body.decode())
            else:
                break

        connection.close()
        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
