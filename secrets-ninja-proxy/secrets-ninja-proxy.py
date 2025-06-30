from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from urllib.parse import unquote
import json

from services import aws, mongodb, rabbitmq, postgres, gcp

app = FastAPI()

app.include_router(aws.router, prefix="/aws", tags=["aws"])
app.include_router(mongodb.router, prefix="/mongodb", tags=["mongodb"])
app.include_router(rabbitmq.router, prefix="/rabbitmq", tags=["rabbitmq"])
app.include_router(postgres.router, prefix="/postgres", tags=["postgres"])
app.include_router(gcp.router, prefix="/gcp", tags=["gcp"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_headers(browser_headers):
    values_to_delete = [
        "host", "Host", "content-length", "Content-Length", "connection",
        "Connection", "accept-encoding", "Accept-Encoding", "accept",
        "Accept", "origin", "Origin", "referer", "Referer", "user-agent", "User-Agent",
        "sec-ch-ua-platform", "sec-ch-ua-mobile", "sec-fetch-dest", "sec-fetch-mode",
        "accept-language", "sec-fetch-site", "sec-fetch-user", "sec-ch-ua", "sec-ch-ua-arch",
    ]
    for value in values_to_delete:
        browser_headers.pop(value, None)
    return browser_headers

def make_request(url, headers, method, json_body=None):
    url = unquote(url)
    if method == "GET":
        print("Making GET request to", url)
        response = requests.get(url, headers=headers)
        try:
            return json.loads(response.text), response.status_code
        except:
            return {"response": response.text}, response.status_code
    elif method == "POST":
        print("Making POST request to", url)
        response = requests.post(url, headers=headers, json=json_body)
        return response.json(), response.status_code

@app.options("/{full_path:path}")
async def handle_options(full_path: str):
    return JSONResponse(status_code=200, content={"message": "OK"})

@app.api_route("/fetch/{rest_of_path:path}", methods=["POST", "GET"])
async def fetch_handler(request: Request, rest_of_path: str):
    try:
        json_body = await request.json()
    except:
        json_body = {}
    method = json_body.get("proxied_data", {}).get("method", "GET")
    headers = json_body.get("proxied_data", {}).get("headers", {})
    real_headers = dict(request.headers)
    headers = clean_headers(real_headers)
    response, status_code = make_request(rest_of_path, headers, method, json_body)
    return JSONResponse(status_code=status_code, content=response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
