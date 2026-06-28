from flask import Blueprint, request

from app.services.create_payment import create_payment
from app.services.serialize_payment import serialize_payment
from app.utils.json_response import json_response

payment_bp = Blueprint("payments", __name__, url_prefix="/api/payments")


@payment_bp.post("")
def start_payment():
    try:
        payment = create_payment(request.get_json() or {})
        return json_response(
            {
                "payment": serialize_payment(payment),
                "message": "Payment recorded. Mpesa Daraja trigger will be wired later.",
            },
            201,
        )
    except ValueError as error:
        return json_response({"error": str(error)}, 400)
