from fastapi import APIRouter, Request, HTTPException
from google.oauth2 import service_account
from googleapiclient.discovery import build
from google.cloud import storage
from google.cloud import iam
import json

router = APIRouter()

@router.post("/list_projects")
async def list_projects(request: Request):
    data = await request.json()
    gcp_creds = data.get("gcp_creds")
    gcp_creds = json.loads(gcp_creds)
    if not gcp_creds:
        raise HTTPException(status_code=400, detail="Missing GCP credentials")
    try:
        credentials = service_account.Credentials.from_service_account_info(gcp_creds)
        service = build('cloudresourcemanager', 'v1', credentials=credentials)
        request = service.projects().list()
        response = request.execute()
        projects = response.get('projects', [])
        return {"projects": projects}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_compute_instances")
async def list_compute_instances(request: Request):
    data = await request.json()
    gcp_creds = data.get("gcp_creds")
    gcp_creds = json.loads(gcp_creds)
    project_id = data.get("project_id")
    zone = data.get("zone")
    if not gcp_creds or not project_id or not zone:
        raise HTTPException(status_code=400, detail="Missing GCP credentials, project ID, or zone")
    try:
        credentials = service_account.Credentials.from_service_account_info(gcp_creds)
        service = build('compute', 'v1', credentials=credentials)
        request = service.instances().list(project=project_id, zone=zone)
        response = request.execute()
        instances = response.get('items', [])
        return {"instances": instances}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_buckets")
async def list_buckets(request: Request):
    data = await request.json()
    gcp_creds = data.get("gcp_creds")
    gcp_creds = json.loads(gcp_creds)
    if not gcp_creds:
        raise HTTPException(status_code=400, detail="Missing GCP credentials")
    try:
        credentials = service_account.Credentials.from_service_account_info(gcp_creds)
        client = storage.Client(credentials=credentials)
        buckets = list(client.list_buckets())
        bucket_names = [bucket.name for bucket in buckets]
        return {"buckets": bucket_names}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_iam_users")
async def list_iam_users(request: Request):
    data = await request.json()
    gcp_creds = data.get("gcp_creds")
    gcp_creds = json.loads(gcp_creds)
    if not gcp_creds:
        raise HTTPException(status_code=400, detail="Missing GCP credentials")
    try:
        credentials = service_account.Credentials.from_service_account_info(gcp_creds)
        client = iam.IAMClient(credentials=credentials)
        users = list(client.list_service_accounts())
        user_emails = [user.email for user in users]
        return {"iam_users": user_emails}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
