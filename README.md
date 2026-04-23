# Notes App

A full-stack notes application with FastAPI backend and React frontend.

## Features

- Create, view, and delete notes
- RESTful API backend with FastAPI
- PostgreSQL database with Alembic migrations
- React SPA with custom hooks for state management

## Quick Start

```bash
./run.sh
```

This will build and start all services. Access the app at http://localhost:5173

## Services

| Service   | Port  | URL                        |
|-----------|-------|----------------------------|
| Frontend  | 5173  | http://localhost:5173      |
| Backend   | 8001  | http://localhost:8001       |
| PostgreSQL| 5432  | localhost:5432              |

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | /notes           | Create a new note        |
| GET    | /notes           | List all notes           |
| GET    | /notes/{id}      | Get a note by ID         |
| DELETE | /notes/{id}      | Delete a note by ID      |
| GET    | /health          | Health check             |

## Environment Variables

See `.env.example` for configuration options.

## Development

### Backend
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

If services fail to start, check that ports 5173, 8001, and 5432 are available.
