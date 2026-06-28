from datetime import datetime, timezone

from app.db import db


class CustomerFeed(db.Model):
    __tablename__ = "customer_feed"

    feed_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer_table.customer_id"), nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    recent_customer_searched = db.Column(db.String(60))
    recent_merchant_searched = db.Column(db.String(60))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    customer = db.relationship("Customer", backref="feed_items")
