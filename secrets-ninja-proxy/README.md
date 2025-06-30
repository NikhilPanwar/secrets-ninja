# secrets-ninja-proxy
Proxy Server for secrets ninja, use it for bypassing CORS, verifying complex keys like AWS, DB creds

# Install Dependencies
```
python3 -m pip install -r requirements.txt
```

# Run
```
python3 -m uvicorn secrets-ninja-proxy:app --reload --host 0.0.0.0 --port 8001 --reload
```