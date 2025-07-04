FROM node:20-bullseye

# Install Python and build deps
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv gcc libpq-dev git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy project files into the image
COPY . .

# Install frontend deps
RUN npm install

# Install backend deps
WORKDIR /app/secrets-ninja-proxy
RUN pip3 install --no-cache-dir -r requirements.txt

# Final config
WORKDIR /app
EXPOSE 5173 8001

CMD bash -c "npm run dev -- --host 0.0.0.0 & \
    cd /app/secrets-ninja-proxy && \
    python3 -m uvicorn secrets-ninja-proxy:app --host 0.0.0.0 --port 8001 & \
    wait -n"
