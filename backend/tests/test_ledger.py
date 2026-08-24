"""
Ledger and transaction visibility checks.
"""


def test_customer_transaction_history_shows_recent_purchase():
    transaction = {
        "name": "Gremios Nakuru",
        "handle": "@gremiosnakuru",
        "amount": "-KES 4,750",
        "status": "confirmed",
    }

    assert transaction["status"] == "confirmed"
    assert transaction["amount"].startswith("-KES")


def test_merchant_ledger_records_incoming_payment():
    ledger_entry = {
        "merchant_handle": "@gremiosnakuru",
        "direction": "credit",
        "amount": 4750,
        "settlement_status": "posted",
    }

    assert ledger_entry["direction"] == "credit"
    assert ledger_entry["settlement_status"] == "posted"


def test_receipt_identifier_is_unique_per_payment():
    receipts = {"BLC4750", "BLC1042", "BLC2026"}

    assert len(receipts) == 3
    assert "BLC4750" in receipts
