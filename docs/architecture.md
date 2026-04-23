# Architecture

## Overview

The Notes App is a full-stack application consisting of:

- **Backend**: FastAPI (Python 3.11) with SQLAlchemy 2.0 and Alembic migrations
- **Frontend**: React 18 with Vite bundler
- **Database**: PostgreSQL 15

## Component Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend  │────▶│   Backend   │────▶│ PostgreSQL  │
│   (React)   │◀────│  (FastAPI)  │◀────│   (DB)      │
└─────────────┘     └─────────────┘     └─────────────┘
     Port 5173          Port 8001          Port 5432
```

## Backend Structure

```
backend/
├── app/
│   ├── __init__.py      # Package init
│   ├── main.py          # FastAPI entry point
│   ├── models.py        # SQLAlchemy ORM models
│   ├── schemas.py       # Pydantic models
│   ├── crud.py          # CRUD operations
│   ├── database.py      # DB session and engine
│   ├── deps.py          # Dependencies
│   └── api/
│       ├── __init__.py
│       └── notes.py     # Notes endpoints router
├── alembic/             # Database migrations
├── Dockerfile
└── start.sh
```

## Frontend Structure

```
frontend/
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # Root component
│   ├── api.js           # Axios API client
│   ├── types.js         # TypeScript interfaces
│   ├── hooks/
│   │   └── useNotes.js  # Notes state hook
│   └── components/
│       ├── NoteList.jsx # List component
│       ├── NoteForm.jsx # Form component
│       └── NoteItem.jsx # Item component
├── public/
│   └── index.html
├── Dockerfile
└── start.sh
```

## API Design

### Database Schema

**notes table**
| Column     | Type         | Constraints            |
|------------|--------------|------------------------|
| id         | INTEGER      | PRIMARY KEY, AUTOINCREMENT |
| title      | VARCHAR(255) | NOT NULL               |
| content    | TEXT         | NULLABLE               |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT NOW()|

### REST Endpoints

| Method | Path       | Request Body    | Response          | Status Codes |
|--------|------------|-----------------|-------------------|--------------|
| POST   | /notes     | NoteCreate      | Note              | 201, 422     |
| GET    | /notes     | -               | Note[]            | 200          |
| GET    | /notes/{id}| -               | Note              | 200, 404     |
| DELETE | /notes/{id}| -               | {detail: string}  | 200, 404     |

## Data Flow

1. User interacts with React UI
2. React components call custom hooks (useNotes)
3. Hooks make Axios API calls to FastAPI backend
4. Backend routes call CRUD operations
5. CRUD operations interact with PostgreSQL via SQLAlchemy
6. Response flows back through the stack to update UI
