def import_models():
    from app.models.customer import Customer  # noqa: F401
    from app.models.customer_feed import CustomerFeed  # noqa: F401
    from app.models.customer_money import CustomerMoney  # noqa: F401
    from app.models.merchant import Merchant  # noqa: F401
    from app.models.payment import Payment  # noqa: F401
    from app.models.recent_transaction import RecentTransaction  # noqa: F401
    from app.models.setting import Setting  # noqa: F401
