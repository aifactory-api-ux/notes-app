#!/bin/bash
set -e

echo "Building and starting services..."
docker-compose up --build -d

echo "Waiting for backend to be healthy..."
until curl -sf http://localhost:23001/health > /dev/null 2>&1; do
    echo "Backend not ready yet - sleeping"
    sleep 2
done

echo ""
echo "=========================================="
echo "Services are up and running!"
echo "Frontend: http://localhost:23002"
echo "Backend API: http://localhost:23001"
echo "Health Check: http://localhost:23001/health"
echo "=========================================="