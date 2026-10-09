"use client";

import { useState } from "react";
import { DONATION_TIERS, REP_CAP_PER_HOUR, capStatus, donate, freeMeal, mealWhy } from "@/lib/donate";
import { useSecond } from "@/lib/hooks";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";
import type { ServiceBodyProps } from "./types";

const card = "rounded-2xl bg-white p-4 ring-1 ring-black/5";

/** The food bank's donations desk: give money for standing, or ask for a meal when you cannot afford one. */
export default function DonateService({ ctx }: ServiceBodyProps) {
  void ctx;
  const money = useGame((s) => s.money);
  const given = useGame((s) => s.stats.donated ?? 0);
  const busy = useGame((s) => !!s.busy);
  const toast = useGame((s) => s.toast);
  const now = useSecond() * 1000;
  const [note, setNote] = useState<string | null>(null);
  const cap = capStatus(now);
  const meal = mealWhy(now);

  return (
    <div className="space-y-3">
      <div className={card}>
        <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">You have given</p>
        <p className="text-2xl font-extrabold text-stone-900">{naira(given)}</p>
        <p className="mt-1 text-xs text-stone-500">
          {cap.left > 0 ? `${cap.left} of ${REP_CAP_PER_HOUR} reputation can still be earned this hour.` : `No more reputation counts this hour (opens again in ${cap.resetMin} min). Gifts are still welcome.`}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {DONATION_TIERS.map((t) => (
          <button
            key={t.amount}
            type="button"
            disabled={money < t.amount}
            onClick={() => {
              const r = donate(t.amount);
              setNote(r.message);
              toast(r.message, r.ok ? "good" : "bad");
            }}
            className="rounded-2xl bg-white px-3 py-3 text-left ring-1 ring-black/5 transition enabled:active:scale-[0.98] disabled:opacity-45"
          >
            <span className="block text-base font-extrabold text-stone-900">{naira(t.amount)}</span>
            <span className="text-xs font-semibold text-emerald-700">+{t.rep} reputation</span>
          </button>
        ))}
      </div>
      {note && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">{note}</p>}
      <div className={card}>
        <p className="text-sm font-bold text-stone-900">Need a meal?</p>
        <p className="mt-0.5 text-xs text-stone-500">For people who cannot afford one: under {naira(3000)} in hand and hungry. One meal every 15 minutes.</p>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            const err = freeMeal();
            if (err) toast(err, "bad");
          }}
          className="mt-3 w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white transition enabled:active:scale-[0.98] disabled:opacity-45"
        >
          Ask for a meal
        </button>
        {meal && <p className="mt-2 text-xs text-stone-500">{meal}</p>}
      </div>
    </div>
  );
}
