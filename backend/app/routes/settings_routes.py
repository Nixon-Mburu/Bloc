from flask import Blueprint, request

from app.models.setting import Setting
from app.services.serialize_settings import serialize_settings
from app.services.update_settings import update_settings
from app.utils.json_response import json_response

settings_bp = Blueprint("settings", __name__, url_prefix="/api/settings")


@settings_bp.get("/<account_type>/<int:account_id>")
def get_settings(account_type, account_id):
    settings = Setting.query.filter_by(account_type=account_type, account_id=account_id).first()
    if not settings:
        settings = update_settings(account_type, account_id, {})

    return json_response({"settings": serialize_settings(settings)})


@settings_bp.post("/<account_type>/<int:account_id>")
def save_settings(account_type, account_id):
    settings = update_settings(account_type, account_id, request.get_json() or {})
    return json_response({"settings": serialize_settings(settings)})
