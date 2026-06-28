# Bloc Backend

Flask API for Bloc, backed by PostgreSQL.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask --app app.py init-db
python3 app.py
```

The local base URL is `http://localhost:5173/`.
Local secrets live in `backend/.env`; use `backend/.env.example` as the template.

## Main Routes

- `GET /`
- `GET /api/health`
- `POST /api/auth/customers/signup`
- `POST /api/auth/customers/login`
- `POST /api/auth/merchants/signup`
- `POST /api/auth/merchants/login`
- `GET /api/search?q=<query>&customer_id=<id>`
- `GET /api/customers/<customer_id>/home`
- `GET /api/merchants`
- `GET /api/merchants/<handle>`
- `POST /api/payments`
- `GET /api/settings/<account_type>/<account_id>`
- `POST /api/settings/<account_type>/<account_id>`
