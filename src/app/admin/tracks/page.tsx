"use client";

import { useState } from "react";
import { apiBase } from "@/lib/api";

type Row = { id: string; title: string; artist: string; rightsHolder: string; ownerPid: string; statement: string; status: string; hasAudio: boolean };

/** Owner-only: review tracks that artists have uploaded before they play for everyone. */
export default function AdminTracks() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState<{ id: string; url: string } | null>(null);
  const headers = { "x-admin-token": token };

  const load = async (s = status) => {
    setMsg("");
    const r = await fetch(`${apiBase()}/api/admin/tracks?status=${s}`, { headers });
    if (!r.ok) return setMsg(r.status === 401 ? "Wrong admin token." : "Could not load.");
    setRows(((await r.json()) as { tracks: Row[] }).tracks);
  };
  const review = async (id: string, st: "approved" | "rejected") => {
    const note = st === "rejected" ? prompt("Reason (shown to the artist)?") ?? "" : "";
    const r = await fetch(`${apiBase()}/api/admin/tracks/${id}/review`, { method: "POST", headers: { ...headers, "content-type": "application/json" }, body: JSON.stringify({ status: st, note }) });
    if (!r.ok) setMsg(((await r.json().catch(() => ({}))) as { error?: string }).error ?? "Failed");
    await load();
  };
  const listen = async (id: string) => {
    const r = await fetch(`${apiBase()}/api/tracks/${id}/audio`, { headers });
    if (!r.ok) return setMsg("No audio to play.");
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview({ id, url: URL.createObjectURL(await r.blob()) });
  };

  return (
    <main className="mx-auto max-w-2xl p-6 text-stone-900">
      <h1 className="text-2xl font-bold">Track review</h1>
      <p className="mt-1 text-sm text-stone-500">Approve a track only if the uploader&apos;s rights declaration looks right. Approved tracks play in the city, credited to the rights holder.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Admin token" className="min-w-0 flex-1 rounded-xl border border-stone-300 px-3 py-2 text-sm" />
        <button onClick={() => void load()} className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
          Load
        </button>
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatus(s);
              void load(s);
            }}
            className={`rounded-xl px-3 py-2 text-sm font-semibold ${status === s ? "bg-emerald-600 text-white" : "bg-stone-100"}`}
          >
            {s}
          </button>
        ))}
      </div>
      {msg && <p className="mt-3 text-sm font-semibold text-rose-600">{msg}</p>}
      <ul className="mt-5 space-y-3">
        {rows.map((t) => (
          <li key={t.id} className="rounded-2xl border border-stone-200 p-4">
            <p className="font-semibold">
              {t.title} <span className="font-normal text-stone-500">· {t.artist}</span>
            </p>
            <p className="text-xs text-stone-500">Rights holder: {t.rightsHolder} · uploader {t.ownerPid}</p>
            <p className="mt-2 text-xs text-stone-600">{t.statement}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button disabled={!t.hasAudio} onClick={() => void listen(t.id)} className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-semibold disabled:opacity-40">
                Listen
              </button>
              <button disabled={!t.hasAudio} onClick={() => void review(t.id, "approved")} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40">
                Approve
              </button>
              <button onClick={() => void review(t.id, "rejected")} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
                Reject
              </button>
              {preview?.id === t.id && <audio controls autoPlay src={preview.url} className="h-8" />}
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="text-sm text-stone-500">Nothing here.</li>}
      </ul>
    </main>
  );
}
