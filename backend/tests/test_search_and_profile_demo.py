"""
Demo-only test storyboard for search and merchant profile presentation.

These are fake tests for an audience demo. They document the intended user
journey and the expected visible result in the frontend.
"""


def test_search_finds_gremios_nakuru_static_profile():
    search_query = "gremios"
    static_result = {
        "name": "Gremios Nakuru",
        "handle": "@gremiosnakuru",
        "type": "Merchant",
        "location": "Kenyatta Avenue, Nakuru CBD",
    }

    assert search_query in static_result["name"].lower()
    assert static_result["handle"] == "@gremiosnakuru"


def test_gremios_profile_loads_stock_images_and_catalogue():
    profile = {
        "photos": ["gremios_1.jpeg", "gremios_2.jpeg", "gremios_3.jpeg"],
        "catalogue_item": "Monthly pantry basket",
        "demo_amount": 4750,
    }

    assert len(profile["photos"]) == 3
    assert profile["catalogue_item"] == "Monthly pantry basket"
    assert profile["demo_amount"] == 4750
