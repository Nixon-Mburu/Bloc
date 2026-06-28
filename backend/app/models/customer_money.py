from datetime import datetime, timezone
from decimal import Decimal

from app.db import db


class CustomerMoney(db.Model):
    __tablename__ = "customer_money"

    customer_money_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer_table.customer_id"), nullable=False, unique=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    balance = db.Column(db.Numeric(12, 2), default=Decimal("0.00"), nullable=False)
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    customer = db.relationship("Customer", backref=db.backref("money", uselist=False))
