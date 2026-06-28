from flask import Blueprint

from app.services.get_customer_home import get_customer_home
from app.utils.json_response import json_response

customer_bp = Blueprint("customers", __name__, url_prefix="/api/customers")


@customer_bp.get("/<int:customer_id>/home")
def customer_home(customer_id):
    return json_response(get_customer_home(customer_id))
