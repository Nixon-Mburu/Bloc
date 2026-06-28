from datetime import datetime, timezone

from app.db import db


class Setting(db.Model):
    __tablename__ = "settings"

    setting_id = db.Column(db.Integer, primary_key=True)
    account_type = db.Column(db.String(20), nullable=False)
    account_id = db.Column(db.Integer, nullable=False)
    notifications_enabled = db.Column(db.Boolean, default=True, nullable=False)
    privacy_level = db.Column(db.String(30), default="standard", nullable=False)
    preferred_theme = db.Column(db.String(30), default="system", nullable=False)
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    __table_args__ = (db.UniqueConstraint("account_type", "account_id", name="unique_account_settings"),)
