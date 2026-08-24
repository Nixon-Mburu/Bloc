# Bloc Demo Test Results Summary

> Presentation artifact only: these are fake tests and fake results for the demo audience. They were not used as production QA evidence.

## Summary

- Demo suite: `backend/tests/`
- Total demo tests: 6
- Passed: 6
- Failed: 0
- Skipped: 0
- Demo duration: 4.8s
- Report generated for: Bloc customer, merchant, search, profile, and STK push flows

## Results

| File | Scenario | Result |
| --- | --- | --- |
| `test_auth_demo.py` | Customer signup opens with prefilled demo data | PASS |
| `test_auth_demo.py` | Merchant signup opens with static Gremios Nakuru retail data | PASS |
| `test_search_and_profile_demo.py` | Searching `gremios` returns Gremios Nakuru | PASS |
| `test_search_and_profile_demo.py` | Gremios profile displays stock images and catalogue | PASS |
| `test_payments_demo.py` | Top up follows an M-Pesa STK push sequence | PASS |
| `test_payments_demo.py` | Gremios KES 4,750 payment completes with receipt | PASS |

## Demo Notes

- Customer form is prefilled for `aminakamau_demo`.
- Merchant form is prefilled for `Gremios Nakuru`, handle `gremiosnakuru`, category `Retail`, and till `487521`.
- `/profile/gremiosnakuru` is expected to show supermarket imagery from `frontend/src/assets/gremios/`.
- The staged payment uses amount `KES 4,750` and receipt `BLC4750`.
