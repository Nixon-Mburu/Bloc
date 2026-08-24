# Bloc Test Results Summary

## Executive Summary

- Suite: `backend/tests/`
- Total tests: 18
- Passed: 18
- Failed: 0
- Skipped: 0
- Duration: 7.42s
- Environment: local presentation build
- Coverage areas: authentication, merchant onboarding, search, profiles, payments, ledger, receipts, and UI contracts

## Status Legend

- 🟢 ✅ PASSED: Check completed successfully
- 🔴 ❌ FAILED: Check requires attention

## Results

| # | Test file | Test case | Result |
| ---: | --- | --- | --- |
| 1 | `test_auth.py` | `test_customer_signup_prefilled_data` | 🟢 ✅ PASSED |
| 2 | `test_auth.py` | `test_customer_signup_requires_unique_handle` | 🟢 ✅ PASSED |
| 3 | `test_auth.py` | `test_merchant_signup_prefilled_gremios_nakuru` | 🟢 ✅ PASSED |
| 4 | `test_auth.py` | `test_merchant_signup_routes_to_till_number` | 🟢 ✅ PASSED |
| 5 | `test_search_and_profile.py` | `test_search_finds_gremios_nakuru_static_profile` | 🟢 ✅ PASSED |
| 6 | `test_search_and_profile.py` | `test_search_supports_location_query_for_nakuru` | 🟢 ✅ PASSED |
| 7 | `test_search_and_profile.py` | `test_gremios_profile_loads_stock_images_and_catalogue` | 🟢 ✅ PASSED |
| 8 | `test_search_and_profile.py` | `test_gremios_profile_displays_verified_badge` | 🟢 ✅ PASSED |
| 9 | `test_payments.py` | `test_top_up_uses_mpesa_stk_push_sequence` | 🟢 ✅ PASSED |
| 10 | `test_payments.py` | `test_send_money_disables_duplicate_stk_push` | 🟢 ✅ PASSED |
| 11 | `test_payments.py` | `test_gremios_payment_for_4750_completes_with_receipt` | 🟢 ✅ PASSED |
| 12 | `test_payments.py` | `test_payment_context_is_attached_to_receipt` | 🟢 ✅ PASSED |
| 13 | `test_ledger.py` | `test_customer_transaction_history_shows_recent_purchase` | 🟢 ✅ PASSED |
| 14 | `test_ledger.py` | `test_merchant_ledger_records_incoming_payment` | 🟢 ✅ PASSED |
| 15 | `test_ledger.py` | `test_receipt_identifier_is_unique_per_payment` | 🟢 ✅ PASSED |
| 16 | `test_ui_contracts.py` | `test_customer_homepage_primary_actions_are_available` | 🟢 ✅ PASSED |
| 17 | `test_ui_contracts.py` | `test_profile_route_uses_gremios_handle_slug` | 🟢 ✅ PASSED |
| 18 | `test_ui_contracts.py` | `test_payment_screen_prefills_expected_amount` | 🟢 ✅ PASSED |

## Quality Gates

| Gate | Result | Notes |
| --- | --- | --- |
| Authentication payload shape | 🟢 ✅ PASSED | Customer and merchant signup payloads include required fields |
| Merchant discoverability | 🟢 ✅ PASSED | `Gremios Nakuru` appears through name and location matching |
| Payment flow continuity | 🟢 ✅ PASSED | STK push sequence reaches confirmed receipt state |
| Transaction visibility | 🟢 ✅ PASSED | Customer debit and merchant credit records are represented |
| Critical route availability | 🟢 ✅ PASSED | `/profile/gremiosnakuru` is covered |

## Failure Register

| Marker | Count | Details |
| --- | ---: | --- |
| 🔴 ❌ FAILED | 0 | No failing checks in this run |
