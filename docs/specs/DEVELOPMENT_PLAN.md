# DEVELOPMENT PLAN: notes-app

## 1. ARCHITECTURE OVERVIEW

**Components:**
- **Backend:** FastAPI (Python 3.11), SQLAlchemy 2.0, Alembic, PostgreSQL 15. REST API with endpoints: POST /notes, GET /notes, GET /notes/{id}, DELETE /notes/{id}. Health check at /health. Structured logging, env validation, error handling.
- **Frontend:** React 18 (JavaScript, Vite), Axios, date-fns. Single page app: list notes, create note (form), delete note (button). Uses custom hook for state. Calls backend at http://localhost:8000.
- **Database:** PostgreSQL 15, managed via Alembic migrations.
- **Infrastructure:** Docker Compose for orchestration, healthchecks, .env.example, run.sh for zero-manual setup.

**Models:**
- **Note:** id (int, auto-increment), title (string, required), content (optional string), created_at (timestamp).
- **Pydantic/TS interfaces:** As per SPEC.md §2.

**APIs:**
- POST /notes (create note)
- GET /notes (list all notes)
- GET /notes/{id} (get one note)
- DELETE /notes/{id} (delete note)
- GET /health (service health)

**Folder Structure:**
```
project-root/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── deps.py
│   │   └── api/
│   │       ├── __init__.py
│   │       └── notes.py
│   ├── alembic/
│   │   ├── env.py
│   │   ├── README
│   │   ├── script.py.mako
│   │   └── versions/
│   ├── alembic.ini
│   ├── Dockerfile
│   └── start.sh
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── hooks/
│   │   │   └── useNotes.js
│   │   ├── components/
│   │   │   ├── NoteList.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   └── NoteItem.jsx
│   │   └── types.js
│   ├── Dockerfile
│   └── start.sh
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .dockerignore
├── run.sh
└── README.md
```

## 2. ACCEPTANCE CRITERIA

1. **End-to-end note management:** User can create, view, and delete notes via the frontend, with all changes reflected in the backend and persisted in PostgreSQL.
2. **API contract compliance:** All backend endpoints (POST/GET/DELETE /notes, GET /notes/{id}) accept and return data matching the SPEC.md data contracts, with correct status codes and error handling.
3. **Zero-manual deployment:** After cloning and running `./run.sh`, all services start, healthchecks pass, and the app is accessible at http://localhost:3000 (frontend) and http://localhost:8000 (backend API), with no manual setup required.

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
Every executable item MUST include exactly one line at the end of the item block (after Validation):
**Role:** <role_id> (<category>)

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared types, interfaces, DB schemas, config
**Goal:** Create all shared code and contracts for backend and frontend. This includes:
- All Pydantic models and SQLAlchemy ORM models for Note (backend/app/models.py, backend/app/schemas.py)
- TypeScript interfaces for Note (frontend/src/types.js)
- Environment variable validation and shared config (backend/app/database.py, backend/app/deps.py)
- Alembic migration setup (backend/alembic/env.py, backend/alembic/versions/...)
- Backend/app/__init__.py and backend/app/api/__init__.py for package structure

**Files to create:**
- backend/app/models.py
- backend/app/schemas.py
- backend/app/database.py
- backend/app/deps.py
- backend/app/__init__.py
- backend/app/api/__init__.py
- backend/alembic/env.py
- backend/alembic/README
- backend/alembic/script.py.mako
- backend/alembic/versions/<hash>_initial.py
- backend/app/crud.py
- frontend/src/types.js

**Dependencies:** None

**Validation:** 
- Run `alembic upgrade head` in backend to ensure DB schema is created.
- Import Note, NoteCreate, NoteBase from backend/app/schemas.py and frontend/src/types.js in other modules without error.

**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend — FastAPI app, REST endpoints, healthcheck, logging, error handling
**Goal:** Implement the FastAPI application with all required endpoints and features:
- REST endpoints: POST /notes, GET /notes, GET /notes/{id}, DELETE /notes/{id} (using backend/app/api/notes.py)
- Health check endpoint: GET /health (in backend/app/main.py)
- Structured logging (JSON), error handling, CORS, env validation
- Automatic Alembic migration on startup (backend/start.sh)
- FastAPI app entry point (backend/app/main.py)
- Dockerfile for backend (backend/Dockerfile)

**Files to create:**
- backend/app/main.py
- backend/app/api/notes.py
- backend/Dockerfile
- backend/start.sh

**Dependencies:** Item 1

**Validation:** 
- Run `docker build . -f backend/Dockerfile` and `docker run` to start backend.
- All endpoints respond as per SPEC.md, healthcheck returns status.
- Logs are structured (JSON).
- Alembic migration runs automatically on container startup.

**Role:** role-be (backend_developer)

---

### ITEM 3: Frontend — React SPA, notes list, create form, delete, API integration
**Goal:** Implement the React frontend SPA:
- List all notes (frontend/src/components/NoteList.jsx)
- Create note form (frontend/src/components/NoteForm.jsx)
- Delete note button (frontend/src/components/NoteItem.jsx)
- State management hook (frontend/src/hooks/useNotes.js)
- API client (frontend/src/api.js)
- App entry point (frontend/src/main.jsx, frontend/src/App.jsx)
- HTML entry (frontend/public/index.html)
- Dockerfile for frontend (frontend/Dockerfile)
- Frontend start script (frontend/start.sh)

**Files to create:**
- frontend/public/index.html
- frontend/src/main.jsx
- frontend/src/App.jsx
- frontend/src/api.js
- frontend/src/hooks/useNotes.js
- frontend/src/components/NoteList.jsx
- frontend/src/components/NoteForm.jsx
- frontend/src/components/NoteItem.jsx
- frontend/Dockerfile
- frontend/start.sh

**Dependencies:** Item 1

**Validation:** 
- Run `docker build . -f frontend/Dockerfile` and `docker run` to start frontend.
- App loads at http://localhost:3000, displays notes, allows creation and deletion.
- All API calls succeed and UI updates accordingly.

**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment (REQUIRED — PROJECT MUST RUN)
**Goal:** Complete Docker orchestration and documentation for zero-manual setup:
- docker-compose.yml: orchestrates backend, frontend, and PostgreSQL with healthchecks and correct port mappings
- .env.example: documents all required environment variables with descriptions and example values
- .gitignore: excludes node_modules, dist, .env, __pycache__, *.pyc, etc.
- .dockerignore: excludes node_modules, .git, *.log, dist
- run.sh: validates Docker, builds images, starts all services, waits for health, prints access URLs
- README.md: setup, run, endpoints, troubleshooting
- docs/architecture.md: system diagram and component descriptions

**Files to create:**
- docker-compose.yml
- .env.example
- .gitignore
- .dockerignore
- run.sh
- README.md
- docs/architecture.md

**Dependencies:** Items 1, 2, 3

**Validation:** 
- After `./run.sh`, all services are healthy, app is accessible at http://localhost:3000, backend at http://localhost:8000, and all endpoints work as specified.

**Role:** role-devops (devops_support)

---