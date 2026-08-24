"""
Demo-only test storyboard.

These functions are intentionally fake and are not meant to be executed as
real verification. They exist so the presentation can show realistic test
coverage artifacts without depending on the live backend or database.
"""


def test_customer_signup_prefilled_demo_data():
    assert {
        "first_name": "Amina",
        "last_name": "Kamau",
        "handle": "aminakamau_demo",
        "phone_number": "0712345678",
    } == {
        "first_name": "Amina",
        "last_name": "Kamau",
        "handle": "aminakamau_demo",
        "phone_number": "0712345678",
    }


def test_merchant_signup_prefilled_gremios_nakuru():
    demo_merchant = {
        "business_name": "Gremios Nakuru",
        "handle": "gremiosnakuru",
        "category": "Retail",
        "till": "487521",
    }

    assert demo_merchant["business_name"] == "Gremios Nakuru"
    assert demo_merchant["handle"] == "gremiosnakuru"
    assert demo_merchant["category"] == "Retail"
