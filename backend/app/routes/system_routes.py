from flask import Blueprint, current_app

from app.utils.json_response import json_response

system_bp = Blueprint("system", __name__)


@system_bp.get("/")
def api_index():
    return json_response(
        {
            "name": "Bloc Backend API",
            "status": "running",
            "frontend_url": current_app.config["FRONTEND_URL"],
            "api_base_url": current_app.config["API_BASE_URL"],
            "routes": [
                "GET /api/health",
                "POST /api/auth/customers/signup",
                "POST /api/auth/customers/login",
                "POST /api/auth/merchants/signup",
                "POST /api/auth/merchants/login",
                "GET /api/search?q=<query>&customer_id=<id>",
                "GET /api/customers/<customer_id>/home",
                "GET /api/merchants",
                "GET /api/merchants/<handle>",
                "POST /api/payments",
                "GET /api/settings/<account_type>/<account_id>",
                "POST /api/settings/<account_type>/<account_id>",
            ],
        }
    )


@system_bp.get("/favicon.ico")
def favicon():
    return "", 204
