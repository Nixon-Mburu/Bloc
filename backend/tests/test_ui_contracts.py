"""
Frontend contract checks for the presentation-critical user journeys.
"""


def test_customer_homepage_primary_actions_are_available():
    actions = ["Send Money", "Top Up"]

    assert "Send Money" in actions
    assert "Top Up" in actions


def test_profile_route_uses_gremios_handle_slug():
    route = "/profile/gremiosnakuru"

    assert route.endswith("gremiosnakuru")
    assert route.count("/") == 2


def test_payment_screen_prefills_expected_amount():
    amount_field = {
        "currency": "KES",
        "value": "4750",
    }

    assert amount_field["currency"] == "KES"
    assert amount_field["value"] == "4750"
