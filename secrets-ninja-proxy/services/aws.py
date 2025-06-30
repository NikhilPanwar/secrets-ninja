from fastapi import APIRouter, Request, HTTPException
import boto3
from botocore.exceptions import ClientError
from datetime import datetime

router = APIRouter()

@router.post("/list_buckets")
async def list_buckets(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = data.get("region", "us-east-1")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = s3_client.list_buckets()
        buckets = [bucket["Name"] for bucket in response.get("Buckets", [])]
        return {"buckets": buckets}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_ec2_instances")
async def list_ec2_instances(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = data.get("region", "us-east-1")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        ec2_client = boto3.client(
            "ec2",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = ec2_client.describe_instances()
        instance_ids = []
        for reservation in response.get("Reservations", []):
            for instance in reservation.get("Instances", []):
                instance_ids.append(instance.get("InstanceId"))
        return {"instances": instance_ids}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get_cost_and_usage")
async def get_cost_and_usage(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = "us-east-1"  # Cost Explorer only works in us-east-1
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        start = datetime.today().replace(day=1).strftime("%Y-%m-%d")
        end = datetime.today().strftime("%Y-%m-%d")
        ce_client = boto3.client(
            "ce",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = ce_client.get_cost_and_usage(
            TimePeriod={
                "Start": start,
                "End": end
            },
            Granularity="MONTHLY",
            Metrics=["UnblendedCost"]
        )
        return {"cost_and_usage": response}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get_service_cost_and_usage")
async def get_service_cost_and_usage(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = "us-east-1"  # Cost Explorer works only in us-east-1
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        start = datetime.today().replace(day=1).strftime("%Y-%m-%d")
        end = datetime.today().strftime("%Y-%m-%d")
        ce_client = boto3.client(
            "ce",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = ce_client.get_cost_and_usage(
            TimePeriod={
                "Start": start,
                "End": end
            },
            Granularity="MONTHLY",
            Metrics=["UnblendedCost"],
            GroupBy=[
                {
                    'Type': 'DIMENSION',
                    'Key': 'SERVICE'
                }
            ]
        )
        return {"cost_and_usage": response.get('ResultsByTime', [])}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_account_aliases")
async def list_account_aliases(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        iam_client = boto3.client(
            "iam",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )
        response = iam_client.list_account_aliases()
        return {"account_aliases": response.get("AccountAliases", [])}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_hosted_zones")
async def list_hosted_zones(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        route53_client = boto3.client(
            "route53",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )
        response = route53_client.list_hosted_zones()
        zones = [zone["Name"] for zone in response.get("HostedZones", [])]
        return {"hosted_zones": zones}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/list_roles")
async def list_roles(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        iam_client = boto3.client(
            "iam",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )
        response = iam_client.list_roles()
        roles = [role["RoleName"] for role in response.get("Roles", [])]
        return {"roles": roles}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get_caller_identity")
async def get_caller_identity(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = data.get("region", "us-east-1")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        sts_client = boto3.client(
            "sts",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = sts_client.get_caller_identity()
        return {"caller_identity": response}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/describe_organization")
async def describe_organization(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = data.get("region", "us-east-1")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        org_client = boto3.client(
            "organizations",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = org_client.describe_organization()
        return {"organization": response}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get_contact_information")
async def get_contact_information(request: Request):
    data = await request.json()
    aws_access_key = data.get("aws_access_key")
    aws_secret_key = data.get("aws_secret_key")
    region = data.get("region", "us-east-1")
    if not aws_access_key or not aws_secret_key:
        raise HTTPException(status_code=400, detail="Missing AWS credentials")
    try:
        account_client = boto3.client(
            "account",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region
        )
        response = account_client.get_contact_information()
        return {"contact_information": response}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))
