import { apiBase, ensureToken } from "./api";

export type Track = { id: string; title: string; artist: string; rightsHolder: string; createdAt: number };
export type MyTrack = Track & { status: "pending" | "approved" | "rejected"; hasAudio: boolean; note: string | null };

export const trackUrl = (id: string) => `${apiBase()}/api/tracks/${id}/audio`;

const auth = async () => {
  const t = await ensureToken();
  return t ? { authorization: `Bearer ${t}` } : null;
};

export async function listApproved(): Promise<Track[]> {
  try {
    const r = await fetch(`${apiBase()}/api/tracks`, { signal: AbortSignal.timeout(4000) });
    return r.ok ? ((await r.json()) as { tracks: Track[] }).tracks : [];
  } catch {
    return [];
  }
}

export async function listMine(): Promise<MyTrack[]> {
  const h = await auth();
  if (!h) return [];
  try {
    const r = await fetch(`${apiBase()}/api/tracks/mine`, { headers: h, signal: AbortSignal.timeout(4000) });
    return r.ok ? ((await r.json()) as { tracks: MyTrack[] }).tracks : [];
  } catch {
    return [];
  }
}

/** Create the record with the rights declaration, then send the audio. Throws a readable message on failure. */
export async function submitTrack(meta: { title: string; artist: string; rightsHolder: string }, file: File) {
  const h = await auth();
  if (!h) throw new Error("Sign up first, and make sure the server is running.");
  const created = await fetch(`${apiBase()}/api/tracks`, { method: "POST", headers: { ...h, "content-type": "application/json" }, body: JSON.stringify({ ...meta, declare: true }) });
  const j = (await created.json().catch(() => ({}))) as { id?: string; error?: string };
  if (!created.ok || !j.id) throw new Error(j.error ?? "Could not create the track");
  const up = await fetch(`${apiBase()}/api/tracks/${j.id}/audio`, { method: "PUT", headers: { ...h, "content-type": file.type || "application/octet-stream" }, body: file });
  if (!up.ok) {
    await fetch(`${apiBase()}/api/tracks/${j.id}`, { method: "DELETE", headers: h }).catch(() => undefined);
    const e = (await up.json().catch(() => ({}))) as { error?: string };
    throw new Error(e.error ?? "Upload failed");
  }
}

export async function removeTrack(id: string) {
  const h = await auth();
  if (!h) return;
  await fetch(`${apiBase()}/api/tracks/${id}`, { method: "DELETE", headers: h }).catch(() => undefined);
}
