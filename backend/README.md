# Bloc Backend

Flask API for Bloc. Local development uses SQLite by default, and PostgreSQL
can be enabled with `DATABASE_URL`.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

The local backend URL is `http://localhost:3000/`.
Local secrets live in `backend/.env`; use `backend/.env.example` as the template.
Leave `DATABASE_URL` blank for the local SQLite database at
`backend/instance/bloc_dev.sqlite`, or set it to a Postgres URL when Postgres is
running.

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
