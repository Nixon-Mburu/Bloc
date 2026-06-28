from sqlalchemy import or_

from app.models.customer import Customer
from app.models.customer_feed import CustomerFeed
from app.models.merchant import Merchant
from app.services.serialize_customer import serialize_customer
from app.services.serialize_merchant import serialize_merchant
from app.db import db


def search_people(query, customer_id=None, limit=8):
    search = f"%{query.strip().lower()}%"

    customers = (
        Customer.query.filter(
            or_(
                Customer.first_name.ilike(search),
                Customer.last_name.ilike(search),
                Customer.handle.ilike(search),
                Customer.email.ilike(search),
            )
        )
        .limit(limit)
        .all()
    )
    merchants = (
        Merchant.query.filter(
            or_(
                Merchant.business_name.ilike(search),
                Merchant.owner_first_name.ilike(search),
                Merchant.owner_last_name.ilike(search),
                Merchant.handle.ilike(search),
                Merchant.email.ilike(search),
            )
        )
        .limit(limit)
        .all()
    )

    if customer_id and query.strip():
        _record_search(customer_id, customers, merchants)

    return {
        "customers": [serialize_customer(customer) for customer in customers],
        "merchants": [serialize_merchant(merchant) for merchant in merchants],
        "suggestions": [*[
            serialize_customer(customer) for customer in customers
        ], *[
            serialize_merchant(merchant) for merchant in merchants
        ]][:limit],
    }


def _record_search(customer_id, customers, merchants):
    customer = Customer.query.get(customer_id)
    if not customer:
        return

    feed_item = CustomerFeed(
        customer_id=customer.customer_id,
        first_name=customer.first_name,
        last_name=customer.last_name,
        recent_customer_searched=customers[0].handle if customers else None,
        recent_merchant_searched=merchants[0].handle if merchants else None,
    )
    db.session.add(feed_item)
    db.session.commit()
