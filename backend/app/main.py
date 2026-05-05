import logging
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models import Note as NoteModel
from app.crud import get_notes
from app.routers import notes

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting application...")
    logger.info(f"Database URL: {settings.DATABASE_URL}")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(NoteModel).count() == 0:
        seed_notes = [
            NoteModel(title="Welcome Note", content="Welcome to the Notes app!"),
            NoteModel(title="Getting Started", content="Create your first note using the form above."),
            NoteModel(title="Tips", content="You can delete notes by clicking the delete button."),
        ]
        db.add_all(seed_notes)
        db.commit()
        logger.info("Seeded initial notes")
    db.close()
    yield
    logger.info("Shutting down application...")


app = FastAPI(title="Notes API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS or ["http://localhost:23002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(
        f"method={request.method} path={request.url.path} "
        f"status_code={response.status_code} duration={duration:.3f}s"
    )
    return response


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(notes.router)