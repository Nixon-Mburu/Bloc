from flask import Blueprint

from app.models.merchant import Merchant
from app.services.serialize_merchant import serialize_merchant
from app.utils.json_response import json_response

merchant_bp = Blueprint("merchants", __name__, url_prefix="/api/merchants")


@merchant_bp.get("")
def list_merchants():
    merchants = Merchant.query.order_by(Merchant.business_name.asc()).all()
    return json_response({"merchants": [serialize_merchant(merchant) for merchant in merchants]})


@merchant_bp.get("/<handle>")
def get_merchant(handle):
    merchant = Merchant.query.filter_by(handle=handle if handle.startswith("@") else f"@{handle}").first_or_404()
    return json_response({"merchant": serialize_merchant(merchant)})
