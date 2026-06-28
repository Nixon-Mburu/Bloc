from werkzeug.security import generate_password_hash

from app.db import db
from app.models.customer import Customer
from app.models.customer_money import CustomerMoney
from app.utils.normalize_handle import normalize_handle


def register_customer(payload):
    password = payload.get("password", "")
    confirm_password = payload.get("confirm_password", "")

    if password != confirm_password:
        raise ValueError("Password and confirm password must match.")

    customer = Customer(
        first_name=payload["first_name"].strip(),
        last_name=payload["last_name"].strip(),
        handle=normalize_handle(payload["handle"]),
        email=payload["email"].strip().lower(),
        phone_number=payload["phone_number"].strip(),
        password_hash=generate_password_hash(password),
        profile_picture_url=payload.get("profile_picture_url"),
        profile_bio=payload.get("profile_bio", ""),
    )
    db.session.add(customer)
    db.session.flush()

    db.session.add(
        CustomerMoney(
            customer_id=customer.customer_id,
            first_name=customer.first_name,
            last_name=customer.last_name,
            balance=payload.get("opening_balance", 0),
        )
    )
    db.session.commit()
    return customer
