import { apiBase, ensureToken } from "./api";
import type { Look } from "./look";
import { useGame } from "./store";
import type { Family, FamilyRole } from "./family";

export type Person = { pid: string; name: string; username?: string | null; look: Look | null; online?: boolean; level?: string };
export type Thread = Person & { unread: number; last: { text: string; at: number; mine: boolean } };
export type DmMsg = { id: number; from: string; to: string; text: string; at: number };

const call = async <T,>(method: string, path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: T | null }> => {
  const token = await ensureToken();
  if (!token) return { ok: false, status: 401, data: null };
  try {
    const r = await fetch(`${apiBase()}${path}`, { method, headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(6000) });
    return { ok: r.ok, status: r.status, data: (await r.json().catch(() => null)) as T | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
};

/** Reload friends, requests, blocks and conversations from the server. */
export async function loadSocial() {
  const [f, t] = await Promise.all([
    call<{ friends: Person[]; incoming: Person[]; outgoing: Person[]; blocked: string[] }>("GET", "/api/friends"),
    call<{ threads: Thread[] }>("GET", "/api/dm/threads"),
  ]);
  if (f.data) useGame.setState({ friends: f.data.friends, requestsIn: f.data.incoming, requestsOut: f.data.outgoing, blocked: f.data.blocked });
  if (t.data) useGame.setState({ threads: t.data.threads });
}

export async function openThread(pid: string) {
  useGame.setState({ openChat: pid });
  const r = await call<{ messages: DmMsg[] }>("GET", `/api/dm/${pid}`);
  if (r.data) {
    // keep anything still on its way to the server, so a refresh never makes a sent message vanish
    useGame.setState((s) => ({
      dms: { ...s.dms, [pid]: [...r.data!.messages, ...(s.dms[pid] ?? []).filter((m) => m.id < 0 && !r.data!.messages.some((x) => x.from === m.from && x.text === m.text))] },
      threads: s.threads.map((t) => (t.pid === pid ? { ...t, unread: 0 } : t)),
    }));
  } else {
    useGame.setState((s) => (s.dms[pid] ? s : { dms: { ...s.dms, [pid]: [] } }));
  }
}

export const closeThread = () => useGame.setState({ openChat: null });

export async function friendRequest(pid: string): Promise<string> {
  const r = await call<{ status?: string; error?: string }>("POST", "/api/friends/request", { to: pid });
  if (!r.ok) return r.data?.error ?? "Could not send the request.";
  await loadSocial();
  return r.data?.status === "friends" ? "You are now friends." : "Friend request sent.";
}

/** Change how close you are to a friend. Up asks them first; down happens at once. Returns a message for the player. */
export async function setBond(pid: string, level: string): Promise<{ ok: boolean; message: string }> {
  const r = await call<{ status?: string; error?: string }>("POST", "/api/friends/level", { pid, level });
  if (!r.ok) return { ok: false, message: r.data?.error ?? "Could not change that." };
  await loadSocial();
  return { ok: true, message: r.data?.status === "asked" ? "Asked. Waiting for them to answer." : "Done." };
}

export async function answerBond(pid: string, accept: boolean) {
  await call("POST", "/api/friends/level/respond", { pid, accept });
  useGame.setState((s) => ({ relAsks: s.relAsks.filter((a) => a.from !== pid) }));
  await loadSocial();
}

export async function friendRespond(pid: string, accept: boolean) {
  await call("POST", "/api/friends/respond", { pid, accept });
  await loadSocial();
}

export async function removeFriend(pid: string) {
  await call("DELETE", `/api/friends/${pid}`);
  await loadSocial();
}

export async function blockPlayer(pid: string) {
  await call("POST", "/api/blocks", { pid });
  await loadSocial();
}

export async function unblockPlayer(pid: string) {
  await call("DELETE", `/api/blocks/${pid}`);
  await loadSocial();
}

/** Find players by username (starts with) or name (contains). */
export async function searchPeople(q: string): Promise<(Person & { username: string | null })[]> {
  const r = await call<{ players: (Person & { username: string | null })[] }>("GET", `/api/players/search?q=${encodeURIComponent(q)}`);
  return r.data?.players ?? [];
}

export type Profile = Person & { friendship: "none" | "friends" | "sent" | "received"; blocked: boolean };
export async function playerProfile(pid: string): Promise<Profile | null> {
  const r = await call<Profile>("GET", `/api/players/${pid}`);
  return r.data;
}

/** Reload your family: the people who said yes, and requests waiting either way. */
export async function loadFamily() {
  const r = await call<Family>("GET", "/api/family");
  if (r.data) useGame.setState({ family: r.data });
}

/** Ask a friend to be your dad, mum or sibling. They have to accept. */
export async function askFamily(pid: string, role: FamilyRole): Promise<{ ok: boolean; message: string }> {
  const r = await call<{ status?: string; error?: string }>("POST", "/api/family/request", { pid, role });
  if (!r.ok) return { ok: false, message: r.data?.error ?? "Could not send the request." };
  await loadFamily();
  return { ok: true, message: "Request sent. Waiting for them to answer." };
}

export async function answerFamily(pid: string, accept: boolean) {
  await call("POST", "/api/family/respond", { pid, accept });
  await loadFamily();
}

/** Leave a family link, or take back a request you sent. */
export async function leaveFamily(pid: string) {
  await call("DELETE", `/api/family/${pid}`);
  await loadFamily();
}
