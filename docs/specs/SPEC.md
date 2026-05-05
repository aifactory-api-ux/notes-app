# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Python 3.11
  - FastAPI 0.110.0
  - SQLAlchemy 2.0.29
  - Alembic 1.13.1
  - psycopg2-binary 2.9.9
  - uvicorn 0.29.0

- **Database**
  - PostgreSQL 15

- **Frontend**
  - React 18.2.0
  - Vite 5.2.0
  - JavaScript (ES2022)
  - Axios 1.6.7

- **Containerization & Orchestration**
  - Docker 26.0.0
  - docker-compose 2.27.0

- **Other**
  - dotenv 1.0.1 (for environment variable loading in backend)
  - CORS middleware (fastapi.middleware.cors)

---

## 2. DATA CONTRACTS

### Python (Pydantic Models)

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: Optional[str] = None

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
```

### TypeScript (Frontend Interface Definitions)

```typescript
export interface NoteBase {
  title: string;
  content?: string | null;
}

export interface NoteCreate extends NoteBase {}

export interface Note extends NoteBase {
  id: number;
  created_at: string; // ISO 8601 timestamp
}
```

---

## 3. API ENDPOINTS

### POST /notes

- **Description:** Create a new note.
- **Request Body:** `NoteCreate`
  ```json
  {
    "title": "string",
    "content": "string (optional)"
  }
  ```
- **Response:** `Note`
  ```json
  {
    "id": 1,
    "title": "string",
    "content": "string (optional)",
    "created_at": "2024-06-01T12:00:00Z"
  }
  ```

### GET /notes

- **Description:** List all notes (ordered by created_at descending).
- **Request Body:** None
- **Response:** Array of `Note`
  ```json
  [
    {
      "id": 1,
      "title": "string",
      "content": "string (optional)",
      "created_at": "2024-06-01T12:00:00Z"
    }
  ]
  ```

### GET /notes/{id}

- **Description:** Get a single note by ID.
- **Request Body:** None
- **Response:** `Note`
  ```json
  {
    "id": 1,
    "title": "string",
    "content": "string (optional)",
    "created_at": "2024-06-01T12:00:00Z"
  }
  ```

### DELETE /notes/{id}

- **Description:** Delete a note by ID.
- **Request Body:** None
- **Response:** 204 No Content

---

## 4. FILE STRUCTURE

```
.
├── backend/
│   ├── app/
│   │   ├── __init__.py                # App package marker
│   │   ├── main.py                    # FastAPI app entry point
│   │   ├── models.py                  # SQLAlchemy ORM models
│   │   ├── schemas.py                 # Pydantic models for API
│   │   ├── crud.py                    # CRUD operations for notes
│   │   ├── database.py                # Database session and engine setup
│   │   ├── deps.py                    # Dependency overrides (DB session)
│   │   └── config.py                  # Settings and env var loading
│   ├── alembic/
│   │   ├── env.py                     # Alembic environment setup
│   │   ├── script.py.mako             # Alembic migration template
│   │   └── versions/                  # Alembic migration scripts
│   ├── Dockerfile                     # Backend service Dockerfile
│   └── start.sh                       # Backend startup script
├── frontend/
│   ├── public/
│   │   └── index.html                 # HTML entry point
│   ├── src/
│   │   ├── api/
│   │   │   └── notes.js               # API client for notes endpoints
│   │   ├── components/
│   │   │   ├── NoteList.jsx           # List of notes component
│   │   │   ├── NoteForm.jsx           # Note creation form component
│   │   │   └── NoteItem.jsx           # Single note display component
│   │   ├── hooks/
│   │   │   └── useNotes.js            # React hook for notes state
│   │   ├── App.jsx                    # Main app component
│   │   └── main.jsx                   # React entry point
│   ├── Dockerfile                     # Frontend service Dockerfile
│   └── start.sh                       # Frontend startup script
├── docker-compose.yml                 # Multi-service orchestration
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore rules
├── README.md                          # Project documentation
```

### PORT TABLE

| Service   | Listening Port | Path             |
|-----------|---------------|------------------|
| backend   | 23001         | backend/         |
| frontend  | 23002         | frontend/        |
| db        | 5432          | (PostgreSQL)     |

---

## 5. ENVIRONMENT VARIABLES

| Name                 | Type   | Description                                      | Example Value                |
|----------------------|--------|--------------------------------------------------|------------------------------|
| POSTGRES_HOST        | string | PostgreSQL host                                  | db                           |
| POSTGRES_PORT        | int    | PostgreSQL port                                  | 5432                         |
| POSTGRES_DB          | string | PostgreSQL database name                         | notesdb                      |
| POSTGRES_USER        | string | PostgreSQL username                              | notesuser                    |
| POSTGRES_PASSWORD    | string | PostgreSQL password                              | supersecret                  |
| BACKEND_PORT         | int    | Port for FastAPI backend to listen on             | 23001                        |
| FRONTEND_PORT        | int    | Port for frontend dev server to listen on         | 23002                        |
| CORS_ORIGINS         | string | Comma-separated list of allowed CORS origins      | http://localhost:23002       |

---

## 6. IMPORT CONTRACTS

### Backend (Python)

- `from app.models import Note as NoteModel`
- `from app.schemas import Note, NoteCreate, NoteBase`
- `from app.crud import get_note, get_notes, create_note, delete_note`
- `from app.database import SessionLocal, engine, Base`
- `from app.deps import get_db`
- `from app.config import settings`

### Frontend (JavaScript)

- `import { getNotes, getNote, createNote, deleteNote } from '../api/notes'`
- `import useNotes from '../hooks/useNotes'`
- `import NoteList from '../components/NoteList'`
- `import NoteForm from '../components/NoteForm'`
- `import NoteItem from '../components/NoteItem'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### React Hook

`useNotes() → { notes, loading, error, createNote, deleteNote, deletingId }`

- **notes:** `Note[]` — Array of all notes
- **loading:** `boolean` — True while fetching or mutating
- **error:** `string | null` — Error message if any
- **createNote:** `(data: NoteCreate) => Promise<void>` — Create a new note
- **deleteNote:** `(id: number) => Promise<void>` — Delete a note by ID
- **deletingId:** `number | null` — ID of note currently being deleted

### Components

#### NoteList

`props: { notes: Note[], onDelete: (id: number) => void, deletingId: number | null }`

#### NoteForm

`props: { onSubmit: (data: NoteCreate) => void, loading: boolean }`

#### NoteItem

`props: { note: Note, onDelete: (id: number) => void, deleting: boolean }`

---

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.jsx` (React JavaScript — no TypeScript)
- **Project language:** JavaScript (ES2022)
- **Entry point:** `/src/main.jsx` (as referenced in `public/index.html`)

---