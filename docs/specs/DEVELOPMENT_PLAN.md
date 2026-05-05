# MASTER DEVELOPMENT PLAN

> Fuente de verdad única. Los nombres de clases, fields, rutas y variables
> definidos en §1 son los ÚNICOS válidos — el coder no puede inventar nombres.
> En §2 cada wave muestra 🔴 TEST primero y 🟢 PROD después: escríbelos en ese orden.

---

# §1 Contratos Globales

## §1.1 Especificación Técnica — Stack, Modelos, Estructura, Env Vars

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

## §1.2 Contrato API (OpenAPI 3.1)
> Ref obligatoria para tests de endpoints: usa los paths, schemas y status codes exactos de aquí.

```yaml
# API_CONTRACT.md

## Endpoints

---

### POST /notes

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | POST                |
| Path             | /notes              |
| Auth Required    | No                  |
| Request Body     | `NoteCreate`        |
| Response Body    | `Note`              |
| Status Codes     | 200                 |

#### Request Body (`NoteCreate`)
| Field   | Type   | Required | Notes         |
|---------|--------|----------|--------------|
| title   | string | Yes      |              |
| content | string | No       | Optional     |

#### Response Body (`Note`)
| Field      | Type    | Notes                |
|------------|---------|----------------------|
| id         | int     |                      |
| title      | string  |                      |
| content    | string  | Optional             |
| created_at | string  | ISO 8601 timestamp   |

---

### GET /notes

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | GET                 |
| Path             | /notes              |
| Auth Required    | No                  |
| Request Body     | None                |
| Response Body    | Array of `Note`     |
| Status Codes     | 200                 |

#### Response Body (Array of `Note`)
| Field      | Type    | Notes                |
|------------|---------|----------------------|
| id         | int     |                      |
| title      | string  |                      |
| content    | string  | Optional             |
| created_at | string  | ISO 8601 timestamp   |

---

### GET /notes/{id}

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | GET                 |
| Path             | /notes/{id}         |
| Auth Required    | No                  |
| Request Body     | None                |
| Response Body    | `Note`              |
| Status Codes     | 200                 |

#### Response Body (`Note`)
| Field      | Type    | Notes                |
|------------|---------|----------------------|
| id         | int     |                      |
| title      | string  |                      |
| content    | string  | Optional             |
| created_at | string  | ISO 8601 timestamp   |

---

### DELETE /notes/{id}

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | DELETE              |
| Path             | /notes/{id}         |
| Auth Required    | No                  |
| Request Body     | None                |
| Response Body    | None                |
| Status Codes     | 204                 |

---
```

## §1.3 Archivos de Test y Scripts a Crear (TDD — complemento de la estructura §1.1)
> La FILE STRUCTURE de §1.1 fue generada antes de los specs TDD — no incluye `tests/` ni `run_tests.sh`.
> Los siguientes archivos son OBLIGATORIOS. Créalos en los paths exactos indicados.
> ⚠️  NUNCA usar archivos `.spec.*` co-ubicados con el source.

**Scripts de ejecución (crear y hacer chmod +x):**
- `backend/run_tests.sh`
- `frontend/run_tests.sh`

**Archivos de test (crear en los paths exactos):**
- `backend/tests/test_config.py`
- `backend/tests/test_crud.py`
- `backend/tests/test_database.py`
- `backend/tests/test_deps.py`
- `backend/tests/test_main.py`
- `backend/tests/test_models.py`
- `backend/tests/test_schemas.py`
- `frontend/tests/App.test.jsx`
- `frontend/tests/api/notes.test.jsx`
- `frontend/tests/components/NoteForm.test.jsx`
- `frontend/tests/components/NoteItem.test.jsx`
- `frontend/tests/components/NoteList.test.jsx`
- `frontend/tests/hooks/useNotes.test.jsx`
- `frontend/tests/main.test.jsx`

---

# §2 Plan de Implementación

> **REGLA TDD OBLIGATORIA**
> 1. Escribe el ítem 🔴 TEST completo antes de tocar el ítem 🟢 PROD.
> 2. Corre los tests: deben fallar (RED). Si pasan sin código de producción, el test está mal.
> 3. Escribe el código de producción mínimo para que pasen (GREEN).
> 4. Si los tests fallan después del paso 3, corrige SOLO producción — nunca los tests.

## Wave 1

### 🟢 PROD — run_tests.sh — backend
> Crea el script ejecutable `backend/run_tests.sh` que instala dependencias de test y corre todos los tests de `backend/tests/`. El script debe hacer `chmod +x` sobre sí mismo al final. Contenido exacto: ver §1.3 del plan.
**Archivos:**
  - `backend/run_tests.sh`


### 🟢 PROD — run_tests.sh — frontend
> Crea el script ejecutable `frontend/run_tests.sh` que instala dependencias de test y corre todos los tests de `frontend/tests/`. El script debe hacer `chmod +x` sobre sí mismo al final. Contenido exacto: ver §1.3 del plan.
**Archivos:**
  - `frontend/run_tests.sh`


### 🔴 TEST — Tests: backend/app/models.py
> Ref: §1.1 (modelos de `backend/app/models.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_models.py`

**Casos de prueba (implementar todos):**
- `test_note_model_creates_valid_instance`: Creating a Note SQLAlchemy model instance with valid title and optional content should succeed and set all fields correctly.
  - Input: `{'title': 'Test Note', 'content': 'This is a test note.'}`
  - Expected: `{'fields': {'title': 'Test Note', 'content': 'This is a test note.', 'id': 'auto-generated', 'created_at': 'auto-generated'}}`
- `test_note_model_requires_title_field`: Creating a Note SQLAlchemy model instance without a title should raise an error due to NOT NULL constraint.
  - Input: `{'content': 'Missing title'}`
  - Expected: `{'exception': 'IntegrityError'}`
- `test_note_model_content_nullable`: Creating a Note SQLAlchemy model instance with content set to None should succeed and store null in the database.
  - Input: `{'title': 'No Content Note', 'content': None}`
  - Expected: `{'fields': {'title': 'No Content Note', 'content': None}}`
- `test_note_model_created_at_auto_now`: The created_at field should be automatically set to the current timestamp when a Note is created.
  - Input: `{'title': 'Timestamp Test'}`
  - Expected: `{'fields': {'created_at': 'auto-generated'}}`

### 🔴 TEST — Tests: backend/app/schemas.py
> Ref: §1.1 (modelos de `backend/app/schemas.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_schemas.py`

**Casos de prueba (implementar todos):**
- `test_note_base_schema_valid`: NoteBase Pydantic schema should validate with required title and optional content.
  - Input: `{'title': 'Schema Test', 'content': 'Some content'}`
  - Expected: `{'fields': {'title': 'Schema Test', 'content': 'Some content'}}`
- `test_note_base_schema_missing_title`: NoteBase Pydantic schema should raise a validation error if title is missing.
  - Input: `{'content': 'No title'}`
  - Expected: `{'exception': 'ValidationError', 'error_fields': ['title']}`
- `test_note_create_schema_inherits_note_base`: NoteCreate schema should accept all fields from NoteBase and validate them.
  - Input: `{'title': 'Create Schema', 'content': 'Create content'}`
  - Expected: `{'fields': {'title': 'Create Schema', 'content': 'Create content'}}`
- `test_note_schema_serializes_model_instance`: Note Pydantic schema should serialize a SQLAlchemy Note model instance, including id and created_at fields.
  - Input: `{'model_instance': {'id': 1, 'title': 'Serialized Note', 'content': 'Serialized content', 'created_at': '2024-06-01T12:00:00Z'}}`
  - Expected: `{'fields': {'id': 1, 'title': 'Serialized Note', 'content': 'Serialized content', 'created_at': '2024-06-01T12:00:00Z'}}`
- `test_note_schema_content_optional`: Note schema should allow content to be omitted or set to None.
  - Input: `{'id': 2, 'title': 'No Content', 'created_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'fields': {'id': 2, 'title': 'No Content', 'content': None, 'created_at': '2024-06-01T12:00:00Z'}}`

### 🔴 TEST — Tests: frontend/src/api/notes.js
> Ref: §1.1 (modelos de `frontend/src/api/notes.js`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/api/notes.test.jsx`

**Casos de prueba (implementar todos):**
- `test_note_interface_accepts_valid_fields`: Note interface should accept all required fields: id, title, created_at, and optional content.
  - Input: `{'id': 1, 'title': 'Frontend Note', 'content': 'Frontend content', 'created_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'fields': {'id': 1, 'title': 'Frontend Note', 'content': 'Frontend content', 'created_at': '2024-06-01T12:00:00Z'}}`
- `test_note_interface_content_optional`: Note interface should allow content to be omitted or set to null.
  - Input: `{'id': 2, 'title': 'No Content Note', 'created_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'fields': {'id': 2, 'title': 'No Content Note', 'content': None, 'created_at': '2024-06-01T12:00:00Z'}}`
- `test_note_base_interface_requires_title`: NoteBase interface should require the title field and throw a type error if missing.
  - Input: `{'content': 'Missing title'}`
  - Expected: `{'exception': 'TypeError', 'error_fields': ['title']}`
- `test_note_create_interface_extends_note_base`: NoteCreate interface should accept all fields from NoteBase and allow optional content.
  - Input: `{'title': 'Create Note', 'content': 'Create content'}`
  - Expected: `{'fields': {'title': 'Create Note', 'content': 'Create content'}}`
- `test_note_interface_created_at_format`: Note interface created_at field should be a string in ISO 8601 format.
  - Input: `{'id': 3, 'title': 'Date Format Note', 'created_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'fields': {'created_at': '2024-06-01T12:00:00Z'}}`

### 🔴 TEST — Tests: backend/app/config.py
> Ref: §1.1 (modelos de `backend/app/config.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_config.py`

**Casos de prueba (implementar todos):**
- `test_config_loads_required_env_vars`: Config should load all required environment variables and raise an error if any are missing.
  - Input: `{'env': {'DATABASE_URL': 'postgresql://user:pass@localhost:5432/db', 'SECRET_KEY': 'supersecret'}}`
  - Expected: `{'fields': {'DATABASE_URL': 'postgresql://user:pass@localhost:5432/db', 'SECRET_KEY': 'supersecret'}}`
- `test_config_missing_required_env_var_raises_error`: Config should raise a ValidationError if a required environment variable is missing.
  - Input: `{'env': {'SECRET_KEY': 'supersecret'}}`
  - Expected: `{'exception': 'ValidationError', 'error_fields': ['DATABASE_URL']}`
- `test_config_default_values_applied`: Config should apply default values for optional settings if not provided in environment.
  - Input: `{'env': {'DATABASE_URL': 'postgresql://user:pass@localhost:5432/db', 'SECRET_KEY': 'supersecret'}}`
  - Expected: `{'fields': {'CORS_ORIGINS': []}}`
- `test_config_invalid_env_var_type_raises_error`: Config should raise a ValidationError if an environment variable has an invalid type (e.g., non-string for DATABASE_URL).
  - Input: `{'env': {'DATABASE_URL': 12345, 'SECRET_KEY': 'supersecret'}}`
  - Expected: `{'exception': 'ValidationError', 'error_fields': ['DATABASE_URL']}`

### 🟢 PROD — Foundation — shared types, interfaces, DB schemas, config
> Create all foundational code and contracts for backend and frontend: SQLAlchemy models, Pydantic schemas, frontend JS interfaces, and backend config. All other items import from these files.
**Archivos:**
  - `backend/app/models.py`  
  - `backend/app/schemas.py`  
  - `frontend/src/api/notes.js`  
  - `backend/app/config.py`


## Wave 2

### 🔴 TEST — Tests: backend/app/main.py
> Ref: §1.1 (modelos de `backend/app/main.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_main.py`

**Casos de prueba (implementar todos):**
- `test_healthcheck_returns_200_and_status_ok`: GET /health must return 200 and a JSON body indicating service health (e.g., {'status': 'ok'})
  - Expected: `{'status_code': 200, 'body_contains': {'status': 'ok'}}`
- `test_cors_headers_present_on_all_endpoints`: All endpoints must include CORS headers (Access-Control-Allow-Origin) in responses
  - Input: `{'method': 'GET', 'path': '/notes'}`
  - Expected: `{'headers_contain': ['access-control-allow-origin']}`
- `test_startup_runs_alembic_migrations_and_seeding`: On startup, Alembic migrations and DB seeding must be executed (can be verified by checking seeded data exists after startup)
  - Expected: `{'seeded_data_exists': True}`
- `test_missing_required_env_var_causes_startup_failure`: If a required environment variable (e.g., DATABASE_URL) is missing, app startup must fail with a clear error
  - Input: `{'unset_env': ['DATABASE_URL']}`
  - Expected: `{'startup_fails': True, 'error_message_contains': 'DATABASE_URL'}`
- `test_structured_logging_on_request`: Each API request must produce a structured log entry containing method, path, status_code, and timestamp
  - Input: `{'method': 'GET', 'path': '/notes'}`
  - Expected: `{'log_entry_contains': ['method', 'path', 'status_code', 'timestamp']}`

### 🔴 TEST — Tests: backend/app/crud.py
> Ref: §1.1 (modelos de `backend/app/crud.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_crud.py`

**Casos de prueba (implementar todos):**
- `test_create_note_with_title_and_content_returns_note`: create_note with valid title and content must return a Note object with id, title, content, and created_at
  - Input: `{'title': 'Test Note', 'content': 'Test Content'}`
  - Expected: `{'fields': ['id', 'title', 'content', 'created_at'], 'title': 'Test Note', 'content': 'Test Content'}`
- `test_create_note_with_missing_title_raises_validation_error`: create_note with missing title must raise a validation error
  - Input: `{'content': 'No title'}`
  - Expected: `{'raises': 'ValidationError'}`
- `test_get_note_by_id_returns_correct_note`: get_note with existing id must return the correct Note object
  - Input: `{'id': 1}`
  - Expected: `{'id': 1, 'fields': ['id', 'title', 'content', 'created_at']}`
- `test_get_note_by_nonexistent_id_returns_none`: get_note with non-existent id must return None
  - Input: `{'id': 9999}`
  - Expected: `{'result': None}`
- `test_delete_note_removes_note_from_db`: delete_note with existing id must remove the note from the database
  - Input: `{'id': 1}`
  - Expected: `{'note_deleted': True}`
- `test_delete_note_with_nonexistent_id_does_nothing`: delete_note with non-existent id must not raise an error and must not delete anything
  - Input: `{'id': 9999}`
  - Expected: `{'note_deleted': False}`
- `test_get_notes_returns_notes_ordered_by_created_at_desc`: get_notes must return all notes ordered by created_at descending
  - Expected: `{'order_by': 'created_at_desc'}`

### 🔴 TEST — Tests: backend/app/database.py
> Ref: §1.1 (modelos de `backend/app/database.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_database.py`

**Casos de prueba (implementar todos):**
- `test_database_session_can_commit_and_query`: A database session can commit a new Note and query it back successfully
  - Input: `{'note': {'title': 'DB Test', 'content': 'DB Content'}}`
  - Expected: `{'note_found': True, 'title': 'DB Test'}`
- `test_database_session_rollback_on_exception`: A database session must rollback changes if an exception occurs during commit
  - Input: `{'raise_exception_on_commit': True}`
  - Expected: `{'session_rolled_back': True}`
- `test_connection_pooling_allows_multiple_sessions`: Database engine must allow multiple concurrent sessions (connection pooling works)
  - Input: `{'concurrent_sessions': 5}`
  - Expected: `{'all_sessions_successful': True}`

### 🔴 TEST — Tests: backend/app/deps.py
> Ref: §1.1 (modelos de `backend/app/deps.py`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/tests/test_deps.py`

**Casos de prueba (implementar todos):**
- `test_get_db_yields_session_and_closes_after_use`: get_db dependency must yield a session and close it after use
  - Expected: `{'session_yielded': True, 'session_closed_after': True}`
- `test_get_db_raises_on_db_connection_error`: get_db must raise an exception if the database connection fails
  - Input: `{'simulate_db_failure': True}`
  - Expected: `{'raises': 'Exception'}`
- `test_get_db_multiple_calls_provide_new_sessions`: Multiple calls to get_db must provide new, independent session objects
  - Input: `{'calls': 2}`
  - Expected: `{'sessions_are_distinct': True}`

### 🔴 TEST — Tests: frontend/src/main.jsx
> Ref: §1.1 (modelos de `frontend/src/main.jsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/main.test.jsx`

**Casos de prueba (implementar todos):**
- `renders App component at root`: main.jsx should render the App component into the root element of the DOM
  - Expected: `{'appRendered': True}`
- `renders without crashing when root element exists`: main.jsx should not throw errors when the root element is present in index.html
  - Expected: `{'errorThrown': False}`
- `throws error if root element is missing`: main.jsx should throw or log an error if the root element is not present in the DOM
  - Input: `{'rootElementExists': False}`
  - Expected: `{'errorThrown': True}`

### 🔴 TEST — Tests: frontend/src/App.jsx
> Ref: §1.1 (modelos de `frontend/src/App.jsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/App.test.jsx`

**Casos de prueba (implementar todos):**
- `renders NoteList and NoteForm components`: App.jsx should render both NoteList and NoteForm components in the layout
  - Expected: `{'componentsRendered': ['NoteList', 'NoteForm']}`
- `displays loading indicator when notes are loading`: App.jsx should display a loading UI when useNotes hook reports loading=true
  - Input: `{'useNotes.loading': True}`
  - Expected: `{'loadingIndicatorVisible': True}`
- `displays error message when notes loading fails`: App.jsx should display an error UI when useNotes hook reports an error
  - Input: `{'useNotes.error': 'Network error'}`
  - Expected: `{'errorMessageVisible': True, 'errorMessageText': 'Network error'}`
- `passes notes, loading, error, and handlers to NoteList and NoteForm`: App.jsx should pass notes, loading, error, createNote, deleteNote, and deletingId props to NoteList and NoteForm as per hook signature
  - Input: `{'useNotes': {'notes': [{'id': 1, 'title': 'Test', 'content': 'abc', 'created_at': '2024-06-01T12:00:00Z'}], 'loading': False, 'error': None, 'createNote': 'fn', 'deleteNote': 'fn', 'deletingId': None}}`
  - Expected: `{'NoteListProps': ['notes', 'deleteNote', 'deletingId'], 'NoteFormProps': ['onSubmit', 'loading']}`

### 🔴 TEST — Tests: frontend/src/hooks/useNotes.js
> Ref: §1.1 (modelos de `frontend/src/hooks/useNotes.js`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useNotes.test.jsx`

**Casos de prueba (implementar todos):**
- `fetches notes on mount and sets notes state`: useNotes should fetch notes from GET /notes on mount and set notes state with the response array
  - Input: `{'apiResponse': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}]}`
  - Expected: `{'notes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}], 'loading': False, 'error': None}`
- `sets loading true while fetching notes`: useNotes should set loading=true while fetching notes and loading=false after fetch completes
  - Expected: `{'loadingDuringFetch': True, 'loadingAfterFetch': False}`
- `sets error state if GET /notes fails`: useNotes should set error state if GET /notes returns a network or server error
  - Input: `{'apiError': 'Network Error'}`
  - Expected: `{'error': 'Network Error', 'loading': False}`
- `createNote adds new note to notes state on success`: useNotes.createNote should POST to /notes and add the returned note to notes state on 200 response
  - Input: `{'noteCreate': {'title': 'New', 'content': 'Body'}, 'apiResponse': {'id': 2, 'title': 'New', 'content': 'Body', 'created_at': '2024-06-01T13:00:00Z'}}`
  - Expected: `{'notesIncludes': {'id': 2, 'title': 'New', 'content': 'Body', 'created_at': '2024-06-01T13:00:00Z'}}`
- `createNote sets error if POST /notes fails`: useNotes.createNote should set error state if POST /notes fails (e.g. validation error or network error)
  - Input: `{'noteCreate': {'title': '', 'content': 'Body'}, 'apiError': 'Validation Error'}`
  - Expected: `{'error': 'Validation Error'}`
- `deleteNote removes note from notes state on success`: useNotes.deleteNote should DELETE /notes/{id} and remove the note from notes state on 204 response
  - Input: `{'initialNotes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}], 'deleteId': 1, 'apiStatus': 204}`
  - Expected: `{'notes': []}`
- `deleteNote sets error if DELETE /notes/{id} fails`: useNotes.deleteNote should set error state if DELETE /notes/{id} returns error (e.g. 404 or network error)
  - Input: `{'initialNotes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}], 'deleteId': 1, 'apiError': 'Not Found'}`
  - Expected: `{'error': 'Not Found', 'notes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}]}`
- `deletingId is set during deleteNote and cleared after`: useNotes should set deletingId to the note id being deleted during deleteNote and clear it after completion
  - Input: `{'deleteId': 1}`
  - Expected: `{'deletingIdDuring': 1, 'deletingIdAfter': None}`

### 🔴 TEST — Tests: frontend/src/components/NoteList.jsx
> Ref: §1.1 (modelos de `frontend/src/components/NoteList.jsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/NoteList.test.jsx`

**Casos de prueba (implementar todos):**
- `renders list of notes in descending created_at order`: NoteList should render all notes passed via props, ordered by created_at descending
  - Input: `{'notes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}, {'id': 2, 'title': 'C', 'content': 'D', 'created_at': '2024-06-02T12:00:00Z'}]}`
  - Expected: `{'renderOrder': [2, 1]}`
- `renders empty state when notes array is empty`: NoteList should display an empty state UI when notes prop is an empty array
  - Input: `{'notes': []}`
  - Expected: `{'emptyStateVisible': True}`
- `calls deleteNote handler with correct id when delete button clicked`: NoteList should call deleteNote prop with the note id when a note's delete button is clicked
  - Input: `{'notes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}]}`
  - Expected: `{'deleteNoteCalledWith': 1}`
- `passes deleting prop to NoteItem if deletingId matches note id`: NoteList should pass deleting=true to NoteItem if deletingId matches the note's id
  - Input: `{'notes': [{'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}], 'deletingId': 1}`
  - Expected: `{'NoteItemProps': {'deleting': True}}`

### 🔴 TEST — Tests: frontend/src/components/NoteForm.jsx
> Ref: §1.1 (modelos de `frontend/src/components/NoteForm.jsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/NoteForm.test.jsx`

**Casos de prueba (implementar todos):**
- `renders form with title and content fields`: NoteForm should render input fields for title (required) and content (optional)
  - Expected: `{'fieldsRendered': ['title', 'content']}`
- `calls onSubmit with title and content on valid submit`: NoteForm should call onSubmit prop with {title, content} when form is submitted with valid data
  - Input: `{'title': 'Test Note', 'content': 'Body'}`
  - Expected: `{'onSubmitCalledWith': {'title': 'Test Note', 'content': 'Body'}}`
- `shows validation error if title is empty`: NoteForm should display a validation error if the title field is empty on submit
  - Input: `{'title': '', 'content': 'Body'}`
  - Expected: `{'validationErrorVisible': True, 'validationErrorField': 'title'}`
- `disables submit button and shows loading indicator when loading prop is true`: NoteForm should disable the submit button and show a loading indicator when loading prop is true
  - Input: `{'loading': True}`
  - Expected: `{'submitDisabled': True, 'loadingIndicatorVisible': True}`
- `clears fields after successful submit`: NoteForm should clear the title and content fields after a successful submit
  - Input: `{'title': 'Test Note', 'content': 'Body', 'submitSuccess': True}`
  - Expected: `{'fieldsCleared': True}`

### 🔴 TEST — Tests: frontend/src/components/NoteItem.jsx
> Ref: §1.1 (modelos de `frontend/src/components/NoteItem.jsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/NoteItem.test.jsx`

**Casos de prueba (implementar todos):**
- `renders note title and content`: NoteItem should render the note's title and content fields
  - Input: `{'note': {'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}}`
  - Expected: `{'titleVisible': True, 'contentVisible': True}`
- `calls onDelete with note id when delete button clicked`: NoteItem should call onDelete prop with the note's id when the delete button is clicked
  - Input: `{'note': {'id': 1, 'title': 'A', 'content': 'B', 'created_at': '2024-06-01T12:00:00Z'}}`
  - Expected: `{'onDeleteCalledWith': 1}`
- `shows deleting indicator and disables delete button when deleting prop is true`: NoteItem should show a deleting indicator and disable the delete button when deleting prop is true
  - Input: `{'deleting': True}`
  - Expected: `{'deletingIndicatorVisible': True, 'deleteButtonDisabled': True}`
- `renders without content if content is null or undefined`: NoteItem should render without content field if note.content is null or undefined
  - Input: `{'note': {'id': 2, 'title': 'No Content', 'content': None, 'created_at': '2024-06-01T12:00:00Z'}}`
  - Expected: `{'contentVisible': False}`

### 🟢 PROD — Backend Service — FastAPI app, CRUD endpoints, DB, Alembic, healthcheck, logging, seeding
> Implement the FastAPI backend service with all endpoints (`POST /notes`, `GET /notes`, `GET /notes/{id}`, `DELETE /notes/{id}`, `GET /health`), database session management, CRUD logic, Alembic migrations, auto-seeding, structured logging, error handling, and CORS. Ensure robust input validation and environment variable enforcement.
**Archivos:**
  - `backend/app/main.py`  
  - `backend/app/crud.py`  
  - `backend/app/database.py`  
  - `backend/app/deps.py`  
  - `backend/app/__init__.py`  
  - `backend/alembic/env.py`  
  - `backend/alembic/script.py.mako`  
  - `backend/start.sh`


### 🟢 PROD — Frontend Service — React SPA, notes list, create, delete, API integration, state management
> Implement the React frontend SPA: display list of notes, create note form, delete button per note, state management via useNotes hook, API integration with backend, error/loading UI, and healthcheck. All UI and API code must match the data contracts and component/hook signatures.
**Archivos:**
  - `frontend/public/index.html`  
  - `frontend/src/main.jsx`  
  - `frontend/src/App.jsx`  
  - `frontend/src/hooks/useNotes.js`  
  - `frontend/src/components/NoteList.jsx`  
  - `frontend/src/components/NoteForm.jsx`  
  - `frontend/src/components/NoteItem.jsx`  
  - `frontend/start.sh`

**Detalle:**
[DEPENDENCY NOTE: The following files are created by item 1. Import/use them — do NOT recreate: frontend/src/api/notes.js]

## Wave 3

### 🟢 PROD — Infrastructure & Deployment
> Provide complete orchestration and documentation for local development: docker-compose.yml (all services, healthchecks, depends_on), .env.example (all variables), .gitignore, .dockerignore, run.sh (builds, waits for healthy, prints URLs), README.md (setup, usage, endpoints), and docs/architecture.md (system diagram, component descriptions).
**Archivos:**
  - `docker-compose.yml`  
  - `README.md`


---

# §3 Reglas de Infraestructura (obligatorias)

## §3.1 Dockerfiles
- `WORKDIR /app` en todos los Dockerfiles — paths portables, nunca UUIDs ni `/workspace/...`
- El `docker build` debe funcionar en cualquier máquina sin modificaciones

## §3.2 Base de Datos — Auto-Init Obligatorio
Si el proyecto usa base de datos relacional (PostgreSQL, MySQL, SQLite, MariaDB, etc.),
el backend DEBE ejecutar esta secuencia automáticamente al arrancar el contenedor:

1. **Esperar a que la DB esté lista** — retry loop o wait-for-it, nunca asumir que está disponible
2. **Correr migraciones** — `alembic upgrade head` / `prisma migrate deploy` / `knex migrate:latest` / etc.
3. **Seed de datos de ejemplo** — solo si la tabla principal está vacía (idempotente, nunca duplica al reiniciar)
   - Insertar **3–5 registros realistas** por entidad principal
   - El seed usa los mismos modelos/schemas del proyecto — nunca SQL crudo hardcodeado
   - Patrón Python: `if db.query(Model).count() == 0: db.add_all([...]); db.commit()`
   - Patrón Node: `const count = await prisma.model.count(); if (count === 0) { await prisma.model.createMany({...}) }`

Resultado: después de `./run.sh` la app tiene datos de ejemplo listos, sin pasos manuales.

## §3.3 Puertos de Servicio
- Rango obligatorio: **21000–65000**. NUNCA usar puertos < 21000.
- Puertos prohibidos: 3000, 5000, 8000, 8080, 8443 y cualquier otro puerto de sistema.
- El puerto de cada servicio está definido en el PORT TABLE de §1.1 — úsalo verbatim en Dockerfile EXPOSE y CMD.
- El Tech Lead remapeará automáticamente cualquier puerto fuera del rango 21000–65000.

## §3.4 Frontend con Vite / React / Vue
- `index.html` en la RAÍZ del proyecto (mismo nivel que `package.json` y `vite.config.js`)
- NUNCA solo en `public/` — Vite requiere el entry point en la raíz
- Entry point: `<script type='module' src='/src/main.jsx'></script>`

## §3.5 Variables de Entorno
- Vite: `import.meta.env.VITE_NOMBRE` con fallback → `|| 'http://localhost:PUERTO'` (PUERTO del PORT TABLE §1.1)
- Nunca hardcodear URLs, tokens ni secrets en código fuente

## §3.6 Criterios de Finalización
- Todos los archivos listados en §2 deben existir en disco
- Código completo y funcional — sin TODOs ni stubs
- Tests corriendo y pasando antes del commit final
- `git add -A && git commit -m 'feat: implement project'`

## §3.7 Configuración de Test Tooling (requerida por ítems 🔴 TEST del §2)

### jest
- Test files → `{project_root}/tests/*.test.{js,jsx,ts,tsx}` (never `.spec.*` co-located with source)
- `package.json` MUST include in `devDependencies`: `jest`, `@types/jest`
- `package.json` MUST include script: `"test": "jest --coverage"`
- Run: `npx jest --coverage`

### pytest
- Test files → `{service_root}/tests/test_*.py` (never co-located with source)
- `requirements.txt` MUST include: `pytest`, `pytest-cov`, `pytest-asyncio`, `httpx`
- Run: `python -m pytest tests/ --tb=short -q --cov=. --cov-report=term-missing`