#!/bin/bash
set -e

echo "Waiting for database..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
  echo "Database unavailable - sleeping"
  sleep 1
done

echo "Database is up - running migrations"
alembic upgrade head

echo "Starting FastAPI..."
uvicorn app.main:app --host 0.0.0.0 --port 23001