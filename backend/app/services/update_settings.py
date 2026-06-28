from app.db import db
from app.models.setting import Setting


def update_settings(account_type, account_id, payload):
    settings = Setting.query.filter_by(account_type=account_type, account_id=account_id).first()
    if not settings:
        settings = Setting(account_type=account_type, account_id=account_id)
        db.session.add(settings)

    for key in ("notifications_enabled", "privacy_level", "preferred_theme"):
        if key in payload:
            setattr(settings, key, payload[key])

    db.session.commit()
    return settings
