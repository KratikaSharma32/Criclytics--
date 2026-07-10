# CricLive — Real-Time Cricket Intelligence Platform

Complete full-stack SaaS cricket analytics app: React/Vite/Tailwind frontend +
Express/MongoDB/Socket.io backend, matching the login/register/dashboard
reference designs (dark navy, cyan glassmorphism).

```
CricLive/
├── client/   React + Vite + Tailwind v4 frontend
└── server/   Express + MongoDB + JWT + Socket.io backend
```

## Quick start

**1. Backend**
```bash
cd server
cp .env.example .env    # works as-is with zero keys — see table below
npm install
npm run dev              # http://localhost:5000
```

**2. Frontend** (new terminal)
```bash
cd client
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

Open http://localhost:5173 — register, land on the dashboard, click through
everything below.

## Pages / features included

- **Landing** — hero, live match preview, pricing
- **Register / Login / Forgot password / Reset password** — full JWT flow, real emails via nodemailer (logs the link to the console if SMTP isn't configured)
- **Dashboard** — live / upcoming / recent matches, pulled from the backend
- **No Live Matches** — countdown, trending news, AI cricket fact (never shows an empty state)
- **Match Details** — scorecard, bowling figures, partnerships, and a working **AI Match Analyst** chat box
- **Team Details / Player Details** — stats, squad, favorite-heart button wired to the backend
- **Analytics** — run-rate chart, win probability, top players, and a working **AI Match Predictor**
- **Fantasy Assistant** — full squad view + working **AI captain/vice-captain/safe/risky picks**
- **Favorites** — saved matches/teams/players, backed by the real `/api/favorites` endpoints
- **Subscription** — Free/Pro/Premium, real Razorpay checkout + signature verification
- **News** — GNews-backed, falls back to bundled headlines with no key

## What runs with zero API keys vs. with keys

| Feature | Zero keys | With keys |
|---|---|---|
| Auth | In-memory user store | Set `MONGO_URI` → persists to MongoDB Atlas |
| Matches / Teams / Players | Bundled fallback data | Set `SPORTMONKS_API_TOKEN` (+ `CRICAPI_KEY` backup) → real fixtures |
| News | Bundled fallback articles | Set `GNEWS_API_KEY` → real headlines |
| AI (analyst, fantasy, predictor, commentary) | Rule-based analysis from real match numbers | Set `OPENAI_API_KEY` or `GEMINI_API_KEY` → LLM-generated |
| Caching | In-memory | Set `REDIS_URL` → real Redis, spec TTLs |
| Payments | Clear "not configured" message | Set `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` → real checkout |
| Password reset email | Logged to server console | Set `SMTP_HOST/USER/PASS` → real email via nodemailer |
| Push notifications | Logged to server console, saved to DB if connected | Set Firebase creds → real FCM push |
| Live score push | Simulated 15s tick over Socket.io | Swap the `setInterval` in `server/websocket/socket.js` for a real poll/webhook |

Every feature is fully implemented end to end — nothing is a dead button.
The fallbacks exist so the whole app is clickable today; add real provider
keys whenever you have them, one at a time, with no code changes needed
anywhere else.

## Architecture notes

- **Auth**: JWT access (15 min) + refresh (30 day), httpOnly cookies, bcrypt,
  express-validator, rate-limited auth routes.
- **Plans**: Free / Pro (₹299) / Premium (₹799) enforced server-side via
  `requirePlan(["Pro","Premium"])` on the AI routes.
- **Cricket data**: SportMonks primary → CricAPI backup → bundled dataset,
  so live/upcoming/completed/team/player endpoints are never empty.
- **AI**: OpenAI → Gemini → rule-based analyzer built from real match
  numbers (run rate, required rate, partnerships) — always returns a real
  answer, never a placeholder.
- **Real-time**: Socket.io (`live:matches`, `score:update`, `join:match`)
  simulating live ticks now; event names are stable for a real feed later.
- **Payments**: Razorpay order + signature verification wired end to end.
- **Email**: nodemailer for password reset, graceful console-log fallback.
- **Notifications**: Firebase Admin SDK wrapper with the 7 trigger types
  from the spec (match start, 50, 100, hat-trick chance, wicket, result,
  favorite team update), persisted to Mongo when connected.
