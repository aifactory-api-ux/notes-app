# Notes App

A full-stack notes application with FastAPI backend and React frontend.

## Tech Stack

- **Backend**: Python 3.11, FastAPI 0.110.0, SQLAlchemy 2.0.29, Alembic 1.13.1
- **Database**: PostgreSQL 15
- **Frontend**: React 18.2.0, Vite 5.2.0, JavaScript ES2022, Axios 1.6.7
- **Containerization**: Docker 26.0.0, docker-compose 2.27.0

## Architecture

```
├── backend/           # FastAPI backend service
│   ├── app/           # Application code
│   │   ├── main.py   # FastAPI entry point
│   │   ├── models.py # SQLAlchemy models
│   │   ├── schemas.py # Pydantic schemas
│   │   ├── crud.py   # CRUD operations
│   │   ├── database.py # Database session
│   │   ├── deps.py   # Dependencies
│   │   └── config.py # Configuration
│   ├── alembic/       # Database migrations
│   ├── tests/         # Backend tests
│   ├── Dockerfile
│   └── start.sh
├── frontend/          # React frontend
│   ├── src/
│   │   ├── api/      # API client
│   │   ├── components/ # React components
│   │   └── hooks/    # Custom hooks
│   ├── tests/        # Frontend tests
│   ├── Dockerfile
│   └── start.sh
├── docker-compose.yml
└── .env.example
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| POST | /notes | Create a note |
| GET | /notes | List all notes |
| GET | /notes/{id} | Get a note by ID |
| DELETE | /notes/{id} | Delete a note |

## Setup & Usage

### Using Docker (Recommended)

```bash
cp .env.example .env
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:23002
- Backend API: http://localhost:23001

### Manual Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
python -m uvicorn app.main:app --port 23001
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Ports

| Service | Port |
|---------|------|
| Backend | 23001 |
| Frontend | 23002 |
| PostgreSQL | 5432 |

## Running Tests

**Backend:**
```bash
cd backend
./run_tests.sh
```

**Frontend:**
```bash
cd frontend
./run_tests.sh
```