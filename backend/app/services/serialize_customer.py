def serialize_customer(customer):
    return {
        "id": customer.customer_id,
        "type": "customer",
        "first_name": customer.first_name,
        "last_name": customer.last_name,
        "name": f"{customer.first_name} {customer.last_name}",
        "handle": customer.handle,
        "email": customer.email,
        "phone_number": customer.phone_number,
        "profile_picture_url": customer.profile_picture_url,
        "profile_bio": customer.profile_bio,
    }
