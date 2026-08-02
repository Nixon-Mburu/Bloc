import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
DEFAULT_SQLITE_DATABASE = BASE_DIR / "instance" / "bloc_dev.sqlite"


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or f"sqlite:///{DEFAULT_SQLITE_DATABASE}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AUTO_CREATE_DB = os.getenv("AUTO_CREATE_DB", "true").lower() == "true"
    API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3000/")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
