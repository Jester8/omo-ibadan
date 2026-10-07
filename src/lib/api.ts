import { useGame } from "./store";
import type { Look } from "./look";

/** HTTP API lives beside the websocket on the same port unless NEXT_PUBLIC_API_URL says otherwise. */
export const apiBase = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NEXT_PUBLIC_WS_URL ? process.env.NEXT_PUBLIC_WS_URL.replace(/^ws/, "http") : `${location.protocol}//${location.hostname}:8787`);

const KEY = "omo-ibadan-token";
let cached: string | null = null;

/**
 * Demo mode (the default): sign up and log in work entirely in this browser. No backend call, no email code.
 * Set NEXT_PUBLIC_REQUIRE_BACKEND=1 to use the real server accounts instead.
 */
export const DEMO_AUTH = process.env.NEXT_PUBLIC_REQUIRE_BACKEND !== "1";

const DEMO_KEY = "omo-ibadan-demo-accounts";
const STORE_KEY = "omo-ibadan-v1";
type DemoAccount = { id: string; name: string; username?: string; email: string; look: Look; saved?: string };

const demoAccounts = (): Record<string, DemoAccount> => {
  try {
    return JSON.parse(localStorage.getItem(DEMO_KEY) ?? "{}") as Record<string, DemoAccount>;
  } catch {
    return {};
  }
};
const putDemo = (a: DemoAccount) => {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify({ ...demoAccounts(), [a.email]: a }));
  } catch {
    /* private mode: the account just lasts this session */
  }
};

/** Create a demo account on this device. Returns an error message if the email is already used here. */
export function demoSignUp(name: string, email: string, look: Look, username = ""): { ok: true; profile: Verified } | { ok: false; error: string } {
  const key = email.trim().toLowerCase();
  if (username && Object.values(demoAccounts()).some((a) => a.username?.toLowerCase() === username.toLowerCase())) return { ok: false, error: "That username is taken. Try another." };
  if (demoAccounts()[key]) return { ok: false, error: "That email already has a demo account on this device. Log in instead." };
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  putDemo({ id, name, username: username || undefined, email: key, look });
  return { ok: true, profile: { id, name, username: username || undefined, look, email: key, isNew: true } };
}

/** Log in to a demo account made on this device. Brings back its saved progress. */
export function demoLogIn(email: string): { ok: true; profile: Verified } | { ok: false; error: string } {
  const ident = email.trim().toLowerCase();
  const a = demoAccounts()[ident] ?? Object.values(demoAccounts()).find((x) => x.username?.toLowerCase() === ident);
  if (!a) return { ok: false, error: "No demo account with that email or username on this device. Sign up to make one." };
  try {
    if (a.saved) localStorage.setItem(STORE_KEY, a.saved);
  } catch {
    /* ignore */
  }
  return { ok: true, profile: { id: a.id, name: a.name, username: a.username, look: a.look, email: a.email, isNew: false } };
}

/** Guest token for the current player, fetched once and kept in localStorage. */
export async function ensureToken(): Promise<string | null> {
  const profile = useGame.getState().profile;
  if (!profile || DEMO_AUTH) return null;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { pid: string; token: string } | null;
    if (saved?.pid === profile.id) return (cached = saved.token);
  } catch {
    /* fall through and ask the server */
  }
  try {
    const res = await fetch(`${apiBase()}/api/auth/guest`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pid: profile.id, name: profile.name }), signal: AbortSignal.timeout(2500) });
    if (!res.ok) return null;
    const { pid, token } = (await res.json()) as { pid: string; token: string };
    if (pid !== profile.id) return null;
    localStorage.setItem(KEY, JSON.stringify({ pid, token }));
    return (cached = token);
  } catch {
    return null;
  }
}

export const currentToken = () => cached;

/** Step 1: email a six-digit code. In local development with no mail server, the server also returns the code (devCode). */
export async function requestCode(email: string, purpose: "login" | "signup", username?: string): Promise<{ ok: true; devCode?: string; cooldown: number; skip?: boolean } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${apiBase()}/api/auth/request-code`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, purpose, username }), signal: AbortSignal.timeout(8000) });
    const j = (await res.json().catch(() => ({}))) as { devCode?: string; cooldown?: number; skip?: boolean; error?: string };
    if (!res.ok) return { ok: false, error: j.error ?? "Could not send the code." };
    return { ok: true, devCode: j.devCode, cooldown: j.cooldown ?? 30, skip: j.skip };
  } catch {
    return { ok: false, error: "Can't reach the server. Check your connection and try again." };
  }
}

export type Verified = { id: string; name: string; username?: string; look: Look | null; email: string; isNew: boolean };

/** Step 2: check the code. An existing email logs in; a new one creates the account from the name and avatar. */
export async function verifyCode(email: string, code: string, extra?: { name: string; look: Look; username?: string }): Promise<{ ok: true; profile: Verified } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${apiBase()}/api/auth/verify`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, code, ...extra }), signal: AbortSignal.timeout(8000) });
    const j = (await res.json().catch(() => ({}))) as { pid?: string; name?: string; username?: string; email?: string; look?: Look | null; token?: string; isNew?: boolean; error?: string };
    if (!res.ok || !j.pid || !j.token) return { ok: false, error: j.error ?? "Could not verify the code." };
    localStorage.setItem(KEY, JSON.stringify({ pid: j.pid, token: j.token }));
    cached = j.token;
    return { ok: true, profile: { id: j.pid, name: j.name ?? extra?.name ?? "", username: j.username ?? extra?.username, look: j.look ?? extra?.look ?? null, email: j.email ?? email, isNew: !!j.isNew } };
  } catch {
    return { ok: false, error: "Can't reach the server. Check your connection and try again." };
  }
}

let ice: { at: number; cfg: RTCConfiguration } | null = null;

/** STUN, plus a TURN relay with short-lived credentials when the server has one. Cached for an hour. */
export async function getIce(): Promise<RTCConfiguration> {
  if (DEMO_AUTH) return { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }] };
  if (ice && Date.now() - ice.at < 3600_000) return ice.cfg;
  const fallback: RTCConfiguration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }] };
  try {
    const token = cached ?? (await ensureToken());
    if (!token) return fallback;
    const r = await fetch(`${apiBase()}/api/rtc`, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(3000) });
    if (!r.ok) return fallback;
    const cfg = (await r.json()) as RTCConfiguration;
    ice = { at: Date.now(), cfg };
    return cfg;
  } catch {
    return fallback;
  }
}

/** A LiveKit ticket for a voice room, or null when the server has no LiveKit (voice then goes peer-to-peer). */
export async function getVoiceTicket(room: string, id: string): Promise<{ url: string; token: string } | null> {
  if (DEMO_AUTH) return null;
  try {
    const token = cached ?? (await ensureToken());
    if (!token) return null;
    const r = await fetch(`${apiBase()}/api/voice/token`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ room, id }),
      signal: AbortSignal.timeout(4000),
    });
    return r.ok ? ((await r.json()) as { url: string; token: string }) : null;
  } catch {
    return null;
  }
}

/** Save progress, forget this device, and return to the sign-in screen. */
export async function signOut() {
  await pushState();
  try {
    // a demo account keeps its progress on this device, ready for the next log in
    const email = useGame.getState().profile?.email;
    if (DEMO_AUTH && email) {
      const acc = demoAccounts()[email];
      if (acc) putDemo({ ...acc, saved: localStorage.getItem(STORE_KEY) ?? undefined });
    }
    localStorage.removeItem(KEY);
    useGame.persist.clearStorage();
  } catch {
    /* ignore */
  }
  cached = null;
  location.reload();
}

const snapshot = () => {
  const s = useGame.getState();
  return { money: s.money, rep: s.rep, needs: s.needs, questsDone: s.questsDone, cars: s.cars, activeCar: s.activeCar, romance: s.romance, stats: s.stats };
};

/** Upload the player's progress. Quietly does nothing when the server is unreachable. */
export async function pushState() {
  if (DEMO_AUTH) return;
  const token = cached ?? (await ensureToken());
  const profile = useGame.getState().profile;
  if (!token || !profile) return;
  try {
    await fetch(`${apiBase()}/api/state`, { method: "PUT", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ name: profile.name, look: profile.look, state: snapshot() }), signal: AbortSignal.timeout(4000) });
  } catch {
    /* offline: the next autosave will try again */
  }
}

/** On a new device (or after clearing data) bring the cloud save down. */
export async function pullState() {
  if (DEMO_AUTH) return;
  const token = cached ?? (await ensureToken());
  if (!token) return;
  try {
    const res = await fetch(`${apiBase()}/api/state`, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return;
    const { state, updatedAt } = (await res.json()) as { state: ReturnType<typeof snapshot> | null; updatedAt: number };
    const s = useGame.getState();
    // only when the cloud copy is clearly newer than what this device last saved
    if (!state || updatedAt <= s.savedAt + 60_000) return;
    useGame.setState({ money: state.money, rep: state.rep, needs: state.needs, questsDone: state.questsDone, cars: state.cars, activeCar: state.activeCar, romance: { ...s.romance, ...state.romance }, stats: { ...s.stats, ...state.stats } });
    s.toast("Progress restored from the cloud.", "info");
  } catch {
    /* ignore */
  }
}
