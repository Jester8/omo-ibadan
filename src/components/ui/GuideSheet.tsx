"use client";

import { SHORTCUTS, TOPICS } from "@/lib/guide";

/** The full how-to-play reference. */
export default function GuideSheet() {
  return (
    <>
      <p className="mb-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-100">New to Omo Ibadan? Start with Moving around and The bottom bar. Come back here any time you are lost.</p>
      <ul className="space-y-3">
        {TOPICS.map((t) => (
          <li key={t.id} className="rounded-2xl bg-stone-50 p-4 ring-1 ring-black/5">
            <p className="text-sm font-bold text-stone-900">
              <span className="mr-1.5">{t.emoji}</span>
              {t.title}
            </p>
            <ul className="mt-2 space-y-1.5">
              {t.lines.map((l) => (
                <li key={l} className="flex gap-2 text-[13px] leading-relaxed text-stone-600">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-500" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Keyboard shortcuts</p>
      <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
        {SHORTCUTS.map(([k, d], i) => (
          <div key={k} className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${i % 2 ? "bg-stone-50" : "bg-white"}`}>
            <kbd className="rounded-md bg-stone-900 px-2 py-0.5 font-mono text-xs text-white">{k}</kbd>
            <span className="text-stone-600">{d}</span>
          </div>
        ))}
      </div>
    </>
  );
}
