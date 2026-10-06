import type { IncomingMessage, ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { config } from "../config";
import { findByEmail, getState, putState, signUp, touchPlayer } from "../db/repo";
import { issueToken, verifyToken } from "./auth";
import { handleTracks } from "./tracks";
import { handleIntro } from "./intro";

type Handler = (ctx: { req: IncomingMessage; body: unknown; pid: string | null; url: URL }) => { status?: number; json: unknown } | Promise<{ status?: number; json: unknown }>;

const fails = new Map<string, { n: number; until: number }>();
const hits = new Map<string, { n: number; reset: number }>();
const limited = (ip: string) => {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { n: 1, reset: now + 60_000 });
    return false;
  }
  return ++h.n > 120;
};

const clamp = (n: unknown, lo: number, hi: number, d = lo) => (typeof n === "number" && Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : d);
const strs = (a: unknown, max: number) => (Array.isArray(a) ? a.filter((x): x is string => typeof x === "string" && /^[\w-]{1,24}$/.test(x)).slice(0, max) : []);

/** Only known fields, within sane bounds: the save is cloud storage, not a trusted economy (yet). */
export function sanitizeState(s: unknown) {
  const o = (s && typeof s === "object" ? s : {}) as Record<string, unknown>;
  const needs = (o.needs ?? {}) as Record<string, unknown>;
  const romance: Record<string, unknown> = {};
  for (const [k, v] of Object.entries((o.romance ?? {}) as Record<string, Record<string, unknown>>).slice(0, 20)) {
    if (!/^[\w-]{1,24}$/.test(k) || !v) continue;
    romance[k] = { affection: clamp(v.affection, 0, 100), status: ["stranger", "friend", "dating", "girlfriend"].includes(String(v.status)) ? v.status : "stranger", dates: clamp(v.dates, 0, 999), lastTalk: 0, coolUntil: 0 };
  }
  return {
    money: clamp(o.money, 0, 1e9),
    rep: clamp(o.rep, 0, 1e6),
    needs: { hunger: clamp(needs.hunger, 0, 100), energy: clamp(needs.energy, 0, 100), fun: clamp(needs.fun, 0, 100), social: clamp(needs.social, 0, 100) },
    questsDone: strs(o.questsDone, 64),
    cars: strs(o.cars, 8),
    activeCar: typeof o.activeCar === "string" && /^[\w-]{1,24}$/.test(o.activeCar) ? o.activeCar : null,
    romance,
    stats: o.stats && typeof o.stats === "object" ? o.stats : {},
  };
}

const routes: Record<string, Handler> = {
  "GET /health": () => ({ json: { ok: true, uptime: Math.round(process.uptime()) } }),

  /** Guests get an id + token. Send the old id to keep an identity that already exists. */
  "POST /api/auth/guest": ({ body }) => {
    const b = (body ?? {}) as { pid?: unknown; name?: unknown };
    const pid = typeof b.pid === "string" && /^[a-zA-Z0-9]{8,40}$/.test(b.pid) ? b.pid : randomUUID().replace(/-/g, "").slice(0, 20);
    const name = String(b.name ?? "Guest").replace(/[\u0000-\u001f<>]/g, "").slice(0, 16) || "Guest";
    touchPlayer(pid, name);
    return { json: { pid, token: issueToken(pid) } };
  },

  /** Name + email sign-up. An email can only ever belong to one player. */
  "POST /api/auth/signup": ({ body }) => {
    const b = (body ?? {}) as { pid?: unknown; name?: unknown; email?: unknown };
    const pid = typeof b.pid === "string" && /^[a-zA-Z0-9]{8,40}$/.test(b.pid) ? b.pid : null;
    const email = String(b.email ?? "").trim().toLowerCase();
    const name = String(b.name ?? "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 16);
    if (!pid || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 80) return { status: 400, json: { error: "invalid details" } };
    const look = b && typeof (b as { look?: unknown }).look === "object" ? (b as { look: unknown }).look : null;
    if (!signUp(pid, name, email, look)) return { status: 409, json: { error: "email already registered" } };
    return { json: { pid, token: issueToken(pid) } };
  },

  /**
   * Log back in with the email and the name you signed up with.
   * NOTE: no password and no email verification yet, so anyone who knows both can log in as you.
   * Add a one-time email code before a public launch.
   */
  "POST /api/auth/login": ({ body, req }) => {
    const b = (body ?? {}) as { email?: unknown; name?: unknown };
    const email = String(b.email ?? "").trim().toLowerCase();
    const name = String(b.name ?? "").trim().toLowerCase();
    const key = `${req.socket.remoteAddress}|${email}`;
    const now = Date.now();
    const f = fails.get(key);
    if (f && f.n >= 6 && now < f.until) return { status: 429, json: { error: "Too many tries. Wait a few minutes." } };
    const row = email ? findByEmail(email) : undefined;
    if (!row || row.name.toLowerCase() !== name) {
      fails.set(key, { n: (f && now < f.until ? f.n : 0) + 1, until: now + 10 * 60_000 });
      return { status: 401, json: { error: "We could not find that email and name together." } };
    }
    fails.delete(key);
    return { json: { pid: row.pid, name: row.name, look: row.profile_json ? JSON.parse(row.profile_json) : null, token: issueToken(row.pid) } };
  },

  "GET /api/state": ({ pid }) => {
    if (!pid) return { status: 401, json: { error: "unauthorised" } };
    return { json: getState(pid) ?? { state: null, updatedAt: 0 } };
  },

  "PUT /api/state": ({ pid, body }) => {
    if (!pid) return { status: 401, json: { error: "unauthorised" } };
    const b = (body ?? {}) as { name?: unknown; state?: unknown; look?: unknown };
    putState(pid, String(b.name ?? "Guest").slice(0, 16), sanitizeState(b.state), b.look && typeof b.look === "object" ? b.look : undefined);
    return { json: { ok: true } };
  },
};

function cors(req: IncomingMessage, res: ServerResponse) {
  const origin = req.headers.origin;
  if (origin && (config.origins.includes("*") || config.origins.includes(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "authorization, content-type, x-admin-token, range");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  }
}

export async function handleHttp(req: IncomingMessage, res: ServerResponse) {
  cors(req, res);
  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }
  const url = new URL(req.url ?? "/", "http://localhost");
  if (limited(req.socket.remoteAddress ?? "?")) return void res.writeHead(429, { "content-type": "application/json" }).end(JSON.stringify({ error: "slow down" }));
  if (handleIntro(req, res, url)) return;
  try {
    if (await handleTracks(req, res, url)) return;
  } catch (e) {
    console.error("[tracks]", e);
    if (!res.headersSent) res.writeHead(500, { "content-type": "application/json" }).end(JSON.stringify({ error: "server error" }));
    return;
  }
  const handler = routes[`${req.method} ${url.pathname}`];
  const send = (status: number, json: unknown) => res.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(json));
  if (!handler) return send(404, { error: "not found" });
  let body: unknown = undefined;
  if (req.method === "POST" || req.method === "PUT") {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const c of req) {
      size += (c as Buffer).length;
      if (size > 64 * 1024) return send(413, { error: "too large" });
      chunks.push(c as Buffer);
    }
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    } catch {
      return send(400, { error: "bad json" });
    }
  }
  const auth = req.headers.authorization?.replace(/^Bearer /i, "");
  try {
    const out = await handler({ req, body, pid: verifyToken(auth), url });
    send(out.status ?? 200, out.json);
  } catch (e) {
    console.error("[http]", e);
    send(500, { error: "server error" });
  }
}
