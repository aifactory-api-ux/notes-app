from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
import os


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://notesuser:supersecret@db:5432/notesdb"
    SECRET_KEY: str = "supersecret"
    CORS_ORIGINS: list = []
    BACKEND_PORT: int = 23001
    FRONTEND_PORT: int = 23002

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        return v if isinstance(v, list) else []


def get_settings() -> Settings:
    return Settings()


settings = Settings()