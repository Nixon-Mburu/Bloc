from datetime import datetime, timezone

from app.db import db


class RecentTransaction(db.Model):
    __tablename__ = "recent_transactions"

    transaction_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer_table.customer_id"), nullable=False)
    recent_customer_paid = db.Column(db.String(60))
    recent_merchant_paid = db.Column(db.String(60))
    amount_paid_to_customer = db.Column(db.Numeric(12, 2))
    amount_paid_to_merchant = db.Column(db.Numeric(12, 2))
    note = db.Column(db.String(280), default="")
    received_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    customer = db.relationship("Customer", backref="recent_transactions")
