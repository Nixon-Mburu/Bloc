from random import sample

from app.models.customer import Customer
from app.models.customer_feed import CustomerFeed
from app.models.recent_transaction import RecentTransaction
from app.services.serialize_customer import serialize_customer


def get_customer_home(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    feed_items = CustomerFeed.query.filter_by(customer_id=customer_id).order_by(CustomerFeed.created_at.desc()).limit(20).all()
    transactions = (
        RecentTransaction.query.filter_by(customer_id=customer_id)
        .order_by(RecentTransaction.received_at.desc())
        .limit(10)
        .all()
    )
    money = customer.money

    randomized_feed = sample(feed_items, k=min(len(feed_items), 6)) if feed_items else []

    return {
        "customer": serialize_customer(customer),
        "balance": str(money.balance) if money else "0.00",
        "feed": [
            {
                "customer_id": item.customer_id,
                "recent_customer_searched": item.recent_customer_searched,
                "recent_merchant_searched": item.recent_merchant_searched,
                "created_at": item.created_at.isoformat(),
            }
            for item in randomized_feed
        ],
        "recent_transactions": [
            {
                "transaction_id": transaction.transaction_id,
                "recent_customer_paid": transaction.recent_customer_paid,
                "recent_merchant_paid": transaction.recent_merchant_paid,
                "amount_paid_to_customer": str(transaction.amount_paid_to_customer or "0.00"),
                "amount_paid_to_merchant": str(transaction.amount_paid_to_merchant or "0.00"),
                "note": transaction.note,
                "received_at": transaction.received_at.isoformat(),
            }
            for transaction in transactions
        ],
    }
