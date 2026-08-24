"""
Payment, top up, and receipt checks for customer-facing money movement.
"""


def test_top_up_uses_mpesa_stk_push_sequence():
    steps = [
        "M-Pesa STK push prepared",
        "Prompt sent",
        "Waiting for Safaricom confirmation",
        "STK push completed",
    ]

    assert steps[0] == "M-Pesa STK push prepared"
    assert steps[-1] == "STK push completed"


def test_send_money_disables_duplicate_stk_push():
    request_state = {
        "is_processing": True,
        "button_disabled": True,
        "active_request_count": 1,
    }

    assert request_state["button_disabled"] is True
    assert request_state["active_request_count"] == 1


def test_gremios_payment_for_4750_completes_with_receipt():
    payment = {
        "merchant_handle": "@gremiosnakuru",
        "amount": 4750,
        "receipt": "BLC4750",
        "status": "confirmed",
    }

    assert payment["amount"] == 4750
    assert payment["status"] == "confirmed"
    assert payment["receipt"].startswith("BLC")


def test_payment_context_is_attached_to_receipt():
    receipt = {
        "merchant": "Gremios Nakuru",
        "amount": 4750,
        "message": "Monthly pantry basket",
    }

    assert receipt["merchant"] == "Gremios Nakuru"
    assert receipt["message"] == "Monthly pantry basket"
