import pytest
from pydantic_settings import BaseSettings, SettingsConfigDict


class TestSettings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:pass@localhost:5432/db"
    SECRET_KEY: str = "secret"
    CORS_ORIGINS: list = []
    BACKEND_PORT: int = 23001
    FRONTEND_PORT: int = 23002

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)


def test_config_loads_required_env_vars(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/db")
    monkeypatch.setenv("SECRET_KEY", "supersecret")
    settings = TestSettings()
    assert settings.DATABASE_URL == "postgresql://user:pass@localhost:5432/db"
    assert settings.SECRET_KEY == "supersecret"


def test_config_missing_required_env_var_raises_error(monkeypatch):
    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.setenv("SECRET_KEY", "supersecret")
    try:
        TestSettings()
        assert False, "Should have raised ValidationError"
    except Exception:
        pass


def test_config_default_values_applied(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/db")
    monkeypatch.setenv("SECRET_KEY", "supersecret")
    settings = TestSettings()
    assert settings.CORS_ORIGINS == []


def test_config_invalid_env_var_type_raises_error(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", 12345)
    monkeypatch.setenv("SECRET_KEY", "supersecret")
    try:
        TestSettings()
        assert False, "Should have raised ValidationError"
    except Exception:
        pass