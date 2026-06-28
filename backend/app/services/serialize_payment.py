def serialize_payment(payment):
    return {
        "payment_id": payment.payment_id,
        "payer_customer_id": payment.payer_customer_id,
        "merchant_handle": payment.merchant_handle,
        "customer_handle": payment.customer_handle,
        "merchant_profile": payment.merchant_profile,
        "customer_profile": payment.customer_profile,
        "amount_to_pay": str(payment.amount_to_pay),
        "encrypted_text_message": payment.encrypted_text_message,
        "status": payment.status,
        "created_at": payment.created_at.isoformat(),
    }
