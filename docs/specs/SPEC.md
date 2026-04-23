# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Python 3.11
  - FastAPI 0.110.0
  - SQLAlchemy 2.0.29
  - Alembic 1.13.1
  - psycopg2-binary 2.9.9
  - Uvicorn 0.29.0
- **Database**
  - PostgreSQL 15
- **Frontend**
  - React 18.2.0
  - Vite 4.4.9
  - JavaScript (ES2022)
  - Axios 1.6.7
  - date-fns 3.6.0
- **Infrastructure**
  - Docker 26.1.3
  - docker-compose 2.24.6

---

## 2. DATA CONTRACTS

### Python (Pydantic Models)

```python
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class NoteBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
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
    "title": "string (required, 1-255 chars)",
    "content": "string (optional)"
  }
  ```
- **Response:** `Note`
  ```json
  {
    "id": 1,
    "title": "string",
    "content": "string or null",
    "created_at": "2024-06-01T12:34:56.789Z"
  }
  ```
- **Status Codes:** 201 (Created), 422 (Validation Error)

---

### GET /notes

- **Description:** List all notes, ordered by `created_at` descending.
- **Request Body:** None
- **Response:** Array of `Note`
  ```json
  [
    {
      "id": 1,
      "title": "string",
      "content": "string or null",
      "created_at": "2024-06-01T12:34:56.789Z"
    }
  ]
  ```
- **Status Codes:** 200 (OK)

---

### GET /notes/{id}

- **Description:** Get a single note by ID.
- **Path Parameter:** `id` (integer, required)
- **Request Body:** None
- **Response:** `Note`
  ```json
  {
    "id": 1,
    "title": "string",
    "content": "string or null",
    "created_at": "2024-06-01T12:34:56.789Z"
  }
  ```
- **Status Codes:** 200 (OK), 404 (Not Found)

---

### DELETE /notes/{id}

- **Description:** Delete a note by ID.
- **Path Parameter:** `id` (integer, required)
- **Request Body:** None
- **Response:** `{ "detail": "Note deleted" }`
- **Status Codes:** 200 (OK), 404 (Not Found)

---

## 4. FILE STRUCTURE

```
.
├── backend/                        # Backend source code root
│   ├── app/                        # FastAPI application package
│   │   ├── __init__.py             # App package init
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── models.py               # SQLAlchemy ORM models
│   │   ├── schemas.py              # Pydantic models
│   │   ├── crud.py                 # CRUD operations
│   │   ├── database.py             # DB session and engine
│   │   ├── deps.py                 # Dependency overrides
│   │   └── api/                    # API routers
│   │       ├── __init__.py
│   │       └── notes.py            # /notes endpoints router
│   ├── alembic/                    # Alembic migrations
│   │   ├── env.py
│   │   ├── README
│   │   ├── script.py.mako
│   │   └── versions/               # Migration scripts
│   ├── alembic.ini                 # Alembic config
│   ├── Dockerfile                  # Backend Dockerfile
│   └── start.sh                    # Backend startup script
├── frontend/                       # Frontend source code root
│   ├── public/
│   │   └── index.html              # HTML entry point
│   ├── src/
│   │   ├── main.jsx                # React app entry point
│   │   ├── App.jsx                 # Root component
│   │   ├── api.js                  # Axios API client
│   │   ├── hooks/
│   │   │   └── useNotes.js         # Notes state hook
│   │   ├── components/
│   │   │   ├── NoteList.jsx        # List of notes
│   │   │   ├── NoteForm.jsx        # Note creation form
│   │   │   └── NoteItem.jsx        # Single note display
│   │   └── types.js                # Note type definitions
│   ├── Dockerfile                  # Frontend Dockerfile
│   └── start.sh                    # Frontend startup script
├── docker-compose.yml              # Multi-service orchestration
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

### PORT TABLE

| Service   | Listening Port | Path              |
|-----------|---------------|-------------------|
| backend   | 8001          | backend/          |

### SHARED MODULES

| Shared path | Imported by services |
|-------------|---------------------|
| N/A         | N/A                 |

---

## 5. ENVIRONMENT VARIABLES

| Name                | Type   | Description                                         | Example Value                |
|---------------------|--------|-----------------------------------------------------|------------------------------|
| POSTGRES_USER       | str    | PostgreSQL username                                 | notes_user                   |
| POSTGRES_PASSWORD   | str    | PostgreSQL password                                 | supersecret                  |
| POSTGRES_DB         | str    | PostgreSQL database name                            | notes_db                     |
| POSTGRES_HOST       | str    | PostgreSQL host (used by backend)                   | db                           |
| POSTGRES_PORT       | int    | PostgreSQL port                                     | 5432                         |
| BACKEND_PORT        | int    | FastAPI backend listening port                      | 8001                         |
| FRONTEND_PORT       | int    | Frontend dev server port                            | 5173                         |
| ALLOWED_ORIGINS     | str    | CORS allowed origins (comma-separated)              | http://localhost:5173        |
| DATABASE_URL        | str    | SQLAlchemy DB URL (overrides POSTGRES_* if present) | postgresql://...             |

---

## 6. IMPORT CONTRACTS

### Backend

- `from app.main import app`
- `from app.models import Note as NoteModel`
- `from app.schemas import Note, NoteCreate, NoteBase`
- `from app.crud import get_note, get_notes, create_note, delete_note`
- `from app.database import SessionLocal, engine, Base`
- `from app.api.notes import router as notes_router`

### Frontend

- `import { Note, NoteCreate } from './types'`
- `import { useNotes } from './hooks/useNotes'`
- `import { getNotes, createNote, deleteNote, getNote } from './api'`
- `import NoteList from './components/NoteList'`
- `import NoteForm from './components/NoteForm'`
- `import NoteItem from './components/NoteItem'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

#### React Hook

```js
useNotes() → {
  notes,           // Note[]: list of notes
  loading,         // boolean: loading state for fetches
  error,           // string | null: error message
  createNote,      // (data: NoteCreate) => Promise<void>
  deleteNote,      // (id: number) => Promise<void>
  deletingId,      // number | null: id of note being deleted
  getNote,         // (id: number) => Promise<Note | null>
}
```

### Reusable Components

#### NoteList

```js
NoteList props: {
  notes: Note[],
  onDelete: (id: number) => void,
  deletingId: number | null
}
```

#### NoteForm

```js
NoteForm props: {
  onSubmit: (data: NoteCreate) => void,
  loading: boolean
}
```

#### NoteItem

```js
NoteItem props: {
  note: Note,
  onDelete: (id: number) => void,
  deleting: boolean
}
```

---

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.jsx` (React JavaScript — no TypeScript, no `.tsx`)
- **Project language:** JavaScript (ES2022) for frontend, Python 3.11 for backend
- **Entry point:** `/src/main.jsx` (as referenced in `public/index.html`)

---

**All field names, types, and exported property names in this spec are canonical and must be used verbatim in all generated code and documentation.**