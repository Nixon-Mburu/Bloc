import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://bloc_user:bloc_password@localhost:5432/bloc_db",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5173/")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
