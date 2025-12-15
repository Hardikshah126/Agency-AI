# app/core/config.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "agency-ai-backend"
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/agencyai"
    REDIS_URL: str = "redis://redis:6379/0"
    SECRET_KEY: str = "change-this-secret"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    GEMINI_API_KEY: Optional[str] = None
    GENAI_MODEL: Optional[str] = "gemini-2.5-flash"

    # Vertex/Google settings
    GOOGLE_GENAI_USE_VERTEXAI: bool = False
    GOOGLE_APPLICATION_CREDENTIALS: Optional[str] = None
    GOOGLE_CLOUD_PROJECT: Optional[str] = None
    GOOGLE_CLOUD_LOCATION: Optional[str] = "us-central1"
    dev_mode: bool = False  

    FRONTEND_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
