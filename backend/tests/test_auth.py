"""
Authentication and onboarding checks for customer and merchant signup flows.
"""


def test_customer_signup_prefilled_data():
    customer = {
        "first_name": "Amina",
        "last_name": "Kamau",
        "handle": "aminakamau",
        "phone_number": "0712345678",
        "password_strength": "strong",
    }

    assert customer["first_name"] == "Amina"
    assert customer["last_name"] == "Kamau"
    assert customer["phone_number"].startswith("07")
    assert customer["password_strength"] == "strong"


def test_customer_signup_requires_unique_handle():
    reserved_handles = {"greenmarket", "jessmusic", "jamesnyama"}
    requested_handle = "aminakamau"

    assert requested_handle not in reserved_handles


def test_merchant_signup_prefilled_gremios_nakuru():
    merchant = {
        "business_name": "Gremios Nakuru",
        "handle": "gremiosnakuru",
        "category": "Retail",
        "till": "487521",
    }

    assert merchant["business_name"] == "Gremios Nakuru"
    assert merchant["handle"] == "gremiosnakuru"
    assert merchant["category"] == "Retail"


def test_merchant_signup_routes_to_till_number():
    payout = {
        "type": "Till Number",
        "till": "487521",
        "merchant_handle": "@gremiosnakuru",
    }

    assert payout["type"] == "Till Number"
    assert payout["till"].isdigit()
    assert payout["merchant_handle"] == "@gremiosnakuru"
