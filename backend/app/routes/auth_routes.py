from flask import Blueprint, request
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash

from app.db import db
from app.models.customer import Customer
from app.models.merchant import Merchant
from app.services.register_customer import register_customer
from app.services.register_merchant import register_merchant
from app.services.serialize_customer import serialize_customer
from app.services.serialize_merchant import serialize_merchant
from app.utils.json_response import json_response

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.post("/customers/signup")
def customer_signup():
    try:
        customer = register_customer(request.get_json() or {})
        return json_response({"customer": serialize_customer(customer)}, 201)
    except KeyError as error:
        return json_response({"error": f"Missing required field: {error.args[0]}"}, 400)
    except ValueError as error:
        return json_response({"error": str(error)}, 400)
    except IntegrityError:
        db.session.rollback()
        return json_response({"error": "Customer email, handle, or phone already exists."}, 409)


@auth_bp.post("/merchants/signup")
def merchant_signup():
    try:
        merchant = register_merchant(request.get_json() or {})
        return json_response({"merchant": serialize_merchant(merchant)}, 201)
    except KeyError as error:
        return json_response({"error": f"Missing required field: {error.args[0]}"}, 400)
    except ValueError as error:
        return json_response({"error": str(error)}, 400)
    except IntegrityError:
        db.session.rollback()
        return json_response({"error": "Merchant email, handle, or phone already exists."}, 409)


@auth_bp.post("/customers/login")
def customer_login():
    payload = request.get_json() or {}
    customer = Customer.query.filter_by(email=payload.get("email", "").strip().lower()).first()
    if not customer or not check_password_hash(customer.password_hash, payload.get("password", "")):
        return json_response({"error": "Invalid customer credentials."}, 401)

    return json_response({"customer": serialize_customer(customer)})


@auth_bp.post("/merchants/login")
def merchant_login():
    payload = request.get_json() or {}
    merchant = Merchant.query.filter_by(email=payload.get("email", "").strip().lower()).first()
    if not merchant or not check_password_hash(merchant.password_hash, payload.get("password", "")):
        return json_response({"error": "Invalid merchant credentials."}, 401)

    return json_response({"merchant": serialize_merchant(merchant)})
