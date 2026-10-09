import { DEMO_AUTH, apiBase, ensureToken } from "./api";

/** What a button handler gets back: did it work, and the sentence to show the player. */
export type ActionResult = { ok: boolean; message: string };
export type ApiReply<T> = { ok: boolean; status: number; data: (T & { error?: string; code?: string }) | null };

/** True when there is a real server behind the game (not the browser-only demo build). */
export const serverMode = () => !DEMO_AUTH;

/** One authenticated call to the REST API. Never throws: a network failure is { ok: false, status: 0, data: null }. */
export async function api<T>(method: "GET" | "POST" | "DELETE", path: string, body?: unknown, timeoutMs = 8000): Promise<ApiReply<T>> {
  const token = await ensureToken();
  if (!token) return { ok: false, status: 401, data: null };
  try {
    const r = await fetch(`${apiBase()}${path}`, {
      method,
      headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeoutMs),
    });
    return { ok: r.ok, status: r.status, data: (await r.json().catch(() => null)) as ApiReply<T>["data"] };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

/** The server's own words if it gave any, otherwise `fallback`. */
export const errorText = (r: ApiReply<unknown>, fallback: string) => (r.status === 0 ? "Can't reach the server. Check your connection." : r.data?.error ?? fallback);
