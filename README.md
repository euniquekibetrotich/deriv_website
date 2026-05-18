# Deriv Trading Affiliate Website

A minimal full-stack trading affiliate starter inspired by modern trading partner sites. It includes a React + Material UI frontend, an Express API, JWT authentication, Sequelize models, PostgreSQL persistence, referral tracking, commission records, and placeholders for future Deriv API integration.

## Tech Stack

- Frontend: React, Vite, Material UI, React Router
- Backend: Node.js, Express, Sequelize
- Database: PostgreSQL
- Auth: JWT with bcrypt password hashing

## Project Structure

```text
.
├── client/          # React + MUI app
├── server/          # Express API
├── README.md
└── .gitignore
```

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm

## Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE deriv_affiliate;
```

2. Configure the backend:

```bash
cd server
cp .env.example .env
npm install
```

Update `server/.env` with your PostgreSQL credentials and a strong `JWT_SECRET`.

3. Configure the frontend:

```bash
cd ../client
cp .env.example .env
npm install
```

4. Run the API:

```bash
cd ../server
npm run dev
```

The backend runs on `http://localhost:5000`.

5. Run the frontend:

```bash
cd ../client
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Summary

- `POST /api/auth/register` - Create an affiliate account
- `POST /api/auth/login` - Log in and receive a JWT
- `GET /api/dashboard` - Get authenticated affiliate stats
- `POST /api/referrals/track` - Track a visitor click with a referral code
- `POST /api/referrals/convert` - Protected placeholder conversion endpoint
- `GET /health` - API health check

## Deriv Integration Placeholder

Deriv API integration should live in `server/src/services/deriv.service.js`. The current implementation returns placeholder data so the application can run before real Deriv credentials and partner APIs are configured.

Suggested next steps:

- Add Deriv OAuth or API token handling.
- Sync referred trader signups from Deriv.
- Replace placeholder conversion logic with verified Deriv account events.
- Add commission payout status syncing.

## Security Notes

- Store secrets only in `.env`.
- Use HTTPS in production.
- Set `JWT_SECRET` to a long random value.
- Restrict CORS origins in production.
- Add rate limiting before public launch.
