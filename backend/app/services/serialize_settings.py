def serialize_settings(settings):
    return {
        "account_type": settings.account_type,
        "account_id": settings.account_id,
        "notifications_enabled": settings.notifications_enabled,
        "privacy_level": settings.privacy_level,
        "preferred_theme": settings.preferred_theme,
        "updated_at": settings.updated_at.isoformat(),
    }
