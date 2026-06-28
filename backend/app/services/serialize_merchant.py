def serialize_merchant(merchant):
    return {
        "id": merchant.merchant_id,
        "type": "merchant",
        "business_name": merchant.business_name,
        "name": merchant.business_name,
        "owner_name": f"{merchant.owner_first_name} {merchant.owner_last_name}",
        "handle": merchant.handle,
        "email": merchant.email,
        "phone_number": merchant.phone_number,
        "profile_picture_url": merchant.profile_picture_url,
        "profile_bio": merchant.profile_bio,
        "location": merchant.location,
    }
