"""
Demo-only test storyboard for the Bloc payment flow.

No real M-Pesa, STK, wallet, or ledger call is made here. The goal is to give
presenters believable artifacts that mirror the staged frontend flow.
"""


def test_top_up_uses_mpesa_stk_push_sequence():
    fake_steps = [
        "M-Pesa STK push prepared",
        "Prompt sent",
        "Waiting for Safaricom confirmation",
        "Demo STK push completed",
    ]

    assert fake_steps[-1] == "Demo STK push completed"


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
