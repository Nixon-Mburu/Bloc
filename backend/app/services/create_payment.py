from base64 import urlsafe_b64encode

from app.db import db
from app.models.customer import Customer
from app.models.merchant import Merchant
from app.models.payment import Payment
from app.models.recent_transaction import RecentTransaction
from app.services.serialize_customer import serialize_customer
from app.services.serialize_merchant import serialize_merchant
from app.utils.normalize_handle import normalize_handle


def create_payment(payload):
    amount = payload.get("amount_to_pay")
    if amount is None or float(amount) <= 0:
        raise ValueError("amount_to_pay must be greater than 0.")

    merchant = None
    customer = None

    if payload.get("merchant_handle"):
        merchant = Merchant.query.filter_by(handle=normalize_handle(payload["merchant_handle"])).first()
    if payload.get("customer_handle"):
        customer = Customer.query.filter_by(handle=normalize_handle(payload["customer_handle"])).first()

    if not merchant and not customer:
        raise ValueError("Provide a valid merchant_handle or customer_handle.")

    encrypted_message = _placeholder_encrypt(payload.get("text_message", ""))
    payment = Payment(
        payer_customer_id=payload.get("payer_customer_id"),
        merchant_handle=merchant.handle if merchant else None,
        customer_handle=customer.handle if customer else None,
        merchant_profile=serialize_merchant(merchant) if merchant else None,
        customer_profile=serialize_customer(customer) if customer else None,
        amount_to_pay=amount,
        encrypted_text_message=encrypted_message,
    )
    db.session.add(payment)
    db.session.flush()

    if payload.get("payer_customer_id"):
        db.session.add(
            RecentTransaction(
                customer_id=payload["payer_customer_id"],
                recent_customer_paid=customer.handle if customer else None,
                recent_merchant_paid=merchant.handle if merchant else None,
                amount_paid_to_customer=amount if customer else None,
                amount_paid_to_merchant=amount if merchant else None,
                note=payload.get("text_message", ""),
            )
        )

    db.session.commit()
    return payment


def _placeholder_encrypt(message):
    if not message:
        return ""

    return urlsafe_b64encode(message.encode("utf-8")).decode("utf-8")
