from flask import Blueprint, current_app

from app.utils.json_response import json_response

health_bp = Blueprint("health", __name__, url_prefix="/api")


@health_bp.get("/health")
def health_check():
    return json_response({"status": "ok", "api_base_url": current_app.config["API_BASE_URL"]})
