import { useGame } from "./store";
import type { Look } from "./look";

/** HTTP API lives beside the websocket on the same port unless NEXT_PUBLIC_API_URL says otherwise. */
export const apiBase = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NEXT_PUBLIC_WS_URL ? process.env.NEXT_PUBLIC_WS_URL.replace(/^ws/, "http") : `${location.protocol}//${location.hostname}:8787`);

const KEY = "omo-ibadan-token";
let cached: string | null = null;

/** Guest token for the current player, fetched once and kept in localStorage. */
export async function ensureToken(): Promise<string | null> {
  const profile = useGame.getState().profile;
  if (!profile) return null;
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

/** Create the account. "taken" means that email already belongs to someone; "offline" lets play continue locally. */
export async function signUp(pid: string, name: string, email: string, look?: unknown): Promise<"ok" | "taken" | "offline"> {
  try {
    const res = await fetch(`${apiBase()}/api/auth/signup`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pid, name, email, look }), signal: AbortSignal.timeout(3500) });
    if (res.status === 409) return "taken";
    if (!res.ok) return "offline";
    const out = (await res.json()) as { pid: string; token: string };
    localStorage.setItem(KEY, JSON.stringify({ pid: out.pid, token: out.token }));
    cached = out.token;
    return "ok";
  } catch {
    return "offline";
  }
}

/** Log back in with email + name. Returns the stored profile, or an error message to show. */
export async function logIn(email: string, name: string): Promise<{ ok: true; profile: { id: string; name: string; look: Look | null; email: string } } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${apiBase()}/api/auth/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, name }), signal: AbortSignal.timeout(5000) });
    const j = (await res.json().catch(() => ({}))) as { pid?: string; name?: string; look?: Look | null; token?: string; error?: string };
    if (!res.ok || !j.pid || !j.token) return { ok: false, error: j.error ?? "Could not log in." };
    localStorage.setItem(KEY, JSON.stringify({ pid: j.pid, token: j.token }));
    cached = j.token;
    return { ok: true, profile: { id: j.pid, name: j.name ?? name, look: j.look ?? null, email } };
  } catch {
    return { ok: false, error: "Can't reach the server. Check your connection and try again." };
  }
}

/** Save progress, forget this device, and return to the sign-in screen. */
export async function signOut() {
  await pushState();
  try {
    localStorage.removeItem(KEY);
    useGame.persist.clearStorage();
  } catch {
    /* ignore */
  }
  cached = null;
  location.reload();
}

export type IntroInfo = { available: boolean; title?: string; artist?: string; rightsHolder?: string; url?: string };

const STATIC_INTRO = { title: "Ibadan", artist: "Qdot ft. Olamide", rightsHolder: "Qdot, Olamide and their label/publisher", url: "/audio/intro.mp3" };
export async function introInfo(): Promise<IntroInfo> {
  // the song ships with the web app itself (public/audio), so it also works on static hosting such as Vercel
  try {
    const s = await fetch(STATIC_INTRO.url, { method: "HEAD", signal: AbortSignal.timeout(2500) });
    if (s.ok && (s.headers.get("content-type") ?? "").startsWith("audio")) return { available: true, ...STATIC_INTRO };
  } catch {
    /* fall back to the server copy */
  }
  try {
    const r = await fetch(`${apiBase()}/api/intro`, { signal: AbortSignal.timeout(2500) });
    return r.ok ? { ...((await r.json()) as IntroInfo), url: introUrl() } : { available: false };
  } catch {
    return { available: false };
  }
}
export const introUrl = () => `${apiBase()}/api/intro/audio`;

const snapshot = () => {
  const s = useGame.getState();
  return { money: s.money, rep: s.rep, needs: s.needs, questsDone: s.questsDone, cars: s.cars, activeCar: s.activeCar, romance: s.romance, stats: s.stats };
};

/** Upload the player's progress. Quietly does nothing when the server is unreachable. */
export async function pushState() {
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
