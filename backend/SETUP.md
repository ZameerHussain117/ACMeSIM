# Backend Setup Guide

## Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance — either:
  - **Local**: install MongoDB Community Server and run it on the default port (27017), or
  - **Free cloud option**: create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), then copy its connection string.

## 1. Install dependencies
```bash
cd backend
npm install
```

## 2. Configure environment variables
```bash
cp .env.example .env
```
Then edit `.env`:
- `MONGO_URI` — your local or Atlas connection string
- `JWT_SECRET` — any long random string (e.g. generate one with `openssl rand -hex 32`)
- `STRIPE_SECRET_KEY` — a Stripe **test mode** secret key (starts with `sk_test_`) from your Stripe dashboard
- `ESIMGO_API_KEY` — leave as-is (`not-yet-available-using-mock-data`) until real access is granted; the app will automatically use the mock dataset in `/mocks` instead

## 3. Run the server
```bash
npm run dev
```
This starts the server with `nodemon` (auto-restarts on file changes) at:
```
http://localhost:5000
```

## 4. Verify it's working
- Health check: open `http://localhost:5000/health` — should return `{ "status": "ok" }`
- Mock eSIM packages: open `http://localhost:5000/api/packages` — should return a list of sample eSIM packages

## 5. Linting
```bash
npm run lint        # check for issues
npm run lint:fix     # auto-fix what it can
```

## Notes
- Full login/signup logic is implemented in Sprint 3 — right now, `authMiddleware.js`
  only contains the *verification* side (checking a token is valid), not the routes
  that issue tokens.
- The `/api/packages` route currently returns mock data shaped like a real eSIMgo
  response. Once real eSIMgo API access is available, only `services/esimgoService.js`
  needs to change — nothing else in the app should need to.
