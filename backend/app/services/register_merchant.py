from werkzeug.security import generate_password_hash

from app.db import db
from app.models.merchant import Merchant
from app.utils.normalize_handle import normalize_handle


def register_merchant(payload):
    password = payload.get("password", "")
    confirm_password = payload.get("confirm_password", "")

    if password != confirm_password:
        raise ValueError("Password and confirm password must match.")

    merchant = Merchant(
        business_name=payload["business_name"].strip(),
        owner_first_name=payload["owner_first_name"].strip(),
        owner_last_name=payload["owner_last_name"].strip(),
        handle=normalize_handle(payload["handle"]),
        email=payload["email"].strip().lower(),
        phone_number=payload["phone_number"].strip(),
        password_hash=generate_password_hash(password),
        profile_picture_url=payload.get("profile_picture_url"),
        profile_bio=payload.get("profile_bio", ""),
        location=payload.get("location", ""),
    )
    db.session.add(merchant)
    db.session.commit()
    return merchant
