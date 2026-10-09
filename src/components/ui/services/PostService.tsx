"use client";

import { useMemo, useState } from "react";
import { LETTER_MAX, POSTAGE, letterText, postLetter } from "@/lib/post";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";
import type { ServiceBodyProps } from "./types";

/** The post counter: write a letter to a friend. It arrives in their chat with an envelope, for a small postage. */
export default function PostService({ ctx }: ServiceBodyProps) {
  void ctx;
  const friends = useGame((s) => s.friends);
  const online = useGame((s) => s.net === "online");
  const money = useGame((s) => s.money);
  const toast = useGame((s) => s.toast);
  const [to, setTo] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return friends.filter((f) => !needle || f.name.toLowerCase().includes(needle) || (f.username ?? "").toLowerCase().includes(needle));
  }, [friends, q]);
  const who = friends.find((f) => f.pid === to);

  if (!online) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">Posting needs the online game. Connect, and come back to write to a friend.</p>;
  if (!friends.length) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">Add friends first. Letters go to your friends&apos; chats.</p>;

  const send = async () => {
    if (!to || sending) return;
    setSending(true);
    const r = await postLetter(to, text);
    setSending(false);
    toast(r.message, r.ok ? "good" : "bad");
    if (r.ok) setText("");
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-stone-400">To</p>
        {friends.length > 5 && <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search friends" className="mb-2 w-full rounded-xl bg-stone-100 px-3 py-2 text-sm outline-none" />}
        <div className="flex max-h-36 flex-wrap gap-1.5 overflow-y-auto">
          {shown.map((f) => (
            <button
              key={f.pid}
              type="button"
              onClick={() => setTo(f.pid)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${to === f.pid ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-700"}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${f.online ? "bg-emerald-400" : "bg-stone-300"}`} />
              {f.name}
            </button>
          ))}
          {!shown.length && <p className="text-xs text-stone-400">Nobody matches.</p>}
        </div>
      </div>
      <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, LETTER_MAX))}
          rows={4}
          placeholder="Dear friend…"
          className="w-full resize-none rounded-xl bg-stone-100 px-3 py-2 text-sm outline-none"
        />
        <p className="mt-1 text-right text-[11px] text-stone-400">
          {text.length} / {LETTER_MAX}
        </p>
      </div>
      {text.trim() && (
        <div className="rounded-2xl bg-amber-50 px-3 py-2 text-sm text-stone-800 ring-1 ring-amber-200">
          <p className="text-[11px] font-bold uppercase tracking-wide text-amber-700">{who ? `${who.name} will read` : "Preview"}</p>
          <p className="mt-0.5 whitespace-pre-wrap break-words">{letterText(text)}</p>
        </div>
      )}
      <button
        type="button"
        disabled={!to || !text.trim() || sending || money < POSTAGE}
        onClick={send}
        className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition enabled:active:scale-[0.98] disabled:opacity-45"
      >
        {sending ? "Posting…" : `Post the letter · ${naira(POSTAGE)}`}
      </button>
      {money < POSTAGE && <p className="text-center text-xs text-stone-500">Postage is {naira(POSTAGE)}.</p>}
    </div>
  );
}
