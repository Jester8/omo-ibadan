# Omo Ibadan backend

One Node process serves **HTTP (REST)** and **WebSocket (realtime)** on the same port (default `8787`).

```
server/
  index.ts            entry: boots HTTP + WebSocket, presence, chat, voice signalling, calls, election
  config.ts           environment config (see ../.env.example)
  db/index.ts         SQLite connection (node:sqlite, no native deps) + migration runner
  db/migrations/      numbered .sql files, applied once each at start-up
  db/repo.ts          all SQL lives here: players, plots, reports, elections, cloud saves
  http/router.ts      REST routes, CORS, body limits, rate limit, state sanitising
  http/auth.ts        signed guest tokens (pid.signature)
```

Requires **Node 22.13+** (built-in `node:sqlite`). Run: `npm run server`, or `npm run dev:all` with the web app.

## REST API

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | no | liveness |
| POST | `/api/auth/guest` | no | `{pid?, name?}` → `{pid, token}` |
| GET | `/api/state` | Bearer token | the player's cloud save |
| PUT | `/api/state` | Bearer token | `{name, state}` store progress (validated and clamped) |

The browser gets its guest token automatically, autosaves every 30 s while online, and pulls a newer cloud
save when you open the game on another device.

## Data

SQLite tables: `players` (identity + JSON save), `plots` (land, tier, decor), `reports`, `elections`.
Add a migration by creating `db/migrations/002_whatever.sql`; never edit one that has shipped.
The first start imports an old `server/plots.json` if it exists.

## Security status (read before a public launch)

* Tokens are **guest** tokens: they prove "same browser as before", not a person. Add real accounts
  (email/Google) behind `issueToken`.
* Set `AUTH_SECRET` (the server refuses to start in production without it) and `REQUIRE_AUTH=1`.
* **Money and needs are still computed in the browser.** `PUT /api/state` clamps values but cannot stop a
  determined cheater. The next step is server-authoritative actions (`runAction`, rent, purchases) so the
  client only sends intents.
* Voice is peer-to-peer WebRTC with public STUN; add a TURN server for restrictive networks.

## Deploy

`docker build -f Dockerfile.server -t omo-ibadan-server .` then run with a volume on `/data`
and `AUTH_SECRET`, `ALLOWED_ORIGINS`, `REQUIRE_AUTH=1`. Put it behind TLS (wss/https).
