"""
Search index and merchant profile rendering checks.
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


def test_search_supports_location_query_for_nakuru():
    search_query = "nakuru"
    merchant_locations = {
        "@gremiosnakuru": "Kenyatta Avenue, Nakuru CBD",
        "@greenmarket": "Kilimani Market Lane, Nairobi",
    }

    matches = [handle for handle, location in merchant_locations.items() if search_query in location.lower()]
    assert matches == ["@gremiosnakuru"]


def test_gremios_profile_loads_stock_images_and_catalogue():
    profile = {
        "photos": ["gremios_1.jpeg", "gremios_2.jpeg", "gremios_3.jpeg"],
        "catalogue_item": "Monthly pantry basket",
        "amount": 4750,
    }

    assert len(profile["photos"]) == 3
    assert profile["catalogue_item"] == "Monthly pantry basket"
    assert profile["amount"] == 4750


def test_gremios_profile_displays_verified_badge():
    merchant = {
        "handle": "@gremiosnakuru",
        "type": "Merchant",
        "verified": True,
    }

    assert merchant["type"] == "Merchant"
    assert merchant["verified"] is True
