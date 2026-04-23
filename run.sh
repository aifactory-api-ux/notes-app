#!/bin/bash
set -e

echo "=== Notes App Setup ==="

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose is not installed"
    exit 1
fi

echo "Building and starting services..."
docker-compose build
docker-compose up -d

echo "Waiting for services to be healthy..."
sleep 10

echo ""
echo "=== Services Status ==="
docker-compose ps

echo ""
echo "=== Access URLs ==="
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:8001"
echo "Health Check: http://localhost:8001/health"
echo ""
echo "Press Ctrl+C to stop services"
