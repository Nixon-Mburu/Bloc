from datetime import datetime, timezone
from decimal import Decimal

from app.db import db
from payment import Payment
from recent_transaction import RecentTransaction


class LedgerEntry(db.Model):
    """
    A single ledger line. Every payment produces two entries (a debit
    on the payer side, a credit on the payee side) so the ledger always
    nets to zero for a fully-settled payment — standard double-entry
    bookkeeping, kept intentionally simple for demo purposes.
    """
    __tablename__ = "bloc_ledger_entries"

    entry_id = db.Column(db.Integer, primary_key=True)
    payment_id = db.Column(db.Integer, db.ForeignKey("payments.payment_id"), nullable=True)
    account_handle = db.Column(db.String(60), nullable=False)  # merchant_handle or customer_handle
    direction = db.Column(db.String(6), nullable=False)  # "debit" or "credit"
    amount = db.Column(db.Numeric(12, 2), nullable=False)
    memo = db.Column(db.String(280), default="")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    payment = db.relationship("Payment", backref="ledger_entries")


class Ledger:
    """
    Thin service layer over LedgerEntry. Not a Model itself — just the
    set of operations you'd call from payment/transaction handlers.
    """

    @staticmethod
    def record_payment(payment: Payment, memo: str = "") -> list[LedgerEntry]:
        """
        Create the debit/credit pair for a Payment. Call this when a
        payment moves from pending to settled.
        """
        debit = LedgerEntry(
            payment_id=payment.payment_id,
            account_handle=payment.customer_handle,
            direction="debit",
            amount=payment.amount_to_pay,
            memo=memo or f"Payment to {payment.merchant_handle}",
        )
        credit = LedgerEntry(
            payment_id=payment.payment_id,
            account_handle=payment.merchant_handle,
            direction="credit",
            amount=payment.amount_to_pay,
            memo=memo or f"Payment from {payment.customer_handle}",
        )
        db.session.add_all([debit, credit])
        db.session.commit()
        return [debit, credit]

    @staticmethod
    def record_from_recent_transaction(txn: RecentTransaction) -> list[LedgerEntry]:
        """
        Backfill ledger entries from a RecentTransaction row, useful
        for reconciling historical data that predates the ledger.
        """
        entries = []
        if txn.amount_paid_to_customer:
            entries.append(LedgerEntry(
                account_handle=txn.recent_customer_paid,
                direction="credit",
                amount=txn.amount_paid_to_customer,
                memo=txn.note or "Backfilled customer credit",
            ))
        if txn.amount_paid_to_merchant:
            entries.append(LedgerEntry(
                account_handle=txn.recent_merchant_paid,
                direction="credit",
                amount=txn.amount_paid_to_merchant,
                memo=txn.note or "Backfilled merchant credit",
            ))
        if entries:
            db.session.add_all(entries)
            db.session.commit()
        return entries

    @staticmethod
    def balance_for(account_handle: str) -> Decimal:
        """
        Net balance for a handle: credits minus debits. Positive means
        the account has received more than it has paid out.
        """
        entries = LedgerEntry.query.filter_by(account_handle=account_handle).all()
        total = Decimal("0.00")
        for e in entries:
            total += e.amount if e.direction == "credit" else -e.amount
        return total