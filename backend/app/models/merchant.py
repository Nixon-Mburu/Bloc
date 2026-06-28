from datetime import datetime, timezone

from app.db import db


class Merchant(db.Model):
    __tablename__ = "merchant_table"

    merchant_id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String(140), nullable=False)
    owner_first_name = db.Column(db.String(80), nullable=False)
    owner_last_name = db.Column(db.String(80), nullable=False)
    handle = db.Column(db.String(60), unique=True, nullable=False, index=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    phone_number = db.Column(db.String(30), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    profile_picture_url = db.Column(db.String(500))
    profile_bio = db.Column(db.String(280), default="")
    location = db.Column(db.String(255), default="")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
