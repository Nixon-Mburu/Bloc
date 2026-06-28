from datetime import datetime, timezone

from app.db import db


class Payment(db.Model):
    __tablename__ = "payments"

    payment_id = db.Column(db.Integer, primary_key=True)
    payer_customer_id = db.Column(db.Integer, db.ForeignKey("customer_table.customer_id"))
    merchant_handle = db.Column(db.String(60))
    customer_handle = db.Column(db.String(60))
    merchant_profile = db.Column(db.JSON)
    customer_profile = db.Column(db.JSON)
    amount_to_pay = db.Column(db.Numeric(12, 2), nullable=False)
    encrypted_text_message = db.Column(db.Text)
    status = db.Column(db.String(30), default="pending_external_payment", nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    payer = db.relationship("Customer", backref="payments_started")
