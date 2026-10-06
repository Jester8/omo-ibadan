"use client";

import { Lock, ShieldCheck, X } from "lucide-react";
import { useSecond } from "@/lib/hooks";
import { hasAccess, ownsIn, passLeft } from "@/lib/estates";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";
import { ESTATE_BY_ID } from "@/lib/world";

/** The guard at an estate's boom gate. */
export default function GatePanel({ id }: { id: string }) {
  const sec = useSecond();
  const e = ESTATE_BY_ID[id];
  const plots = useGame((s) => s.plots);
  const passes = useGame((s) => s.passes);
  const pid = useGame((s) => s.profile?.id);
  const money = useGame((s) => s.money);
  if (!e) return null;
  const now = sec * 1000;
  const access = { plots, profileId: pid, passes };
  const resident = ownsIn(e, access);
  const left = Math.round(passLeft(e, passes, now) / 1000);
  const open = hasAccess(e, access, now);

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`grid size-12 place-items-center rounded-2xl ${open ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{open ? <ShieldCheck className="size-6" /> : <Lock className="size-6" />}</div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{e.name}</h2>
            <p className="text-xs font-semibold text-stone-500">Gated estate · security post</p>
          </div>
        </div>
        <button onClick={() => useGame.getState().select(null)} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>

      <p className="mt-3 rounded-2xl rounded-tl-sm bg-stone-100 px-3.5 py-2.5 text-sm text-stone-700">
        {resident ? "“Good day, sir. Residents go straight in.”" : open ? "“Your pass is valid. Go in, and enjoy the estate.”" : "“Madam/Sir, this is a private estate. Residents and pass holders only.”"}
      </p>

      {resident ? (
        <p className="mt-3 rounded-2xl bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100">🏠 You own a house here. The gate is always open for you.</p>
      ) : (
        <>
          {left > 0 && (
            <p className="mt-3 rounded-2xl bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100">
              Pass valid for {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")} more.
            </p>
          )}
          <button
            disabled={money < e.price}
            onClick={() => {
              const err = useGame.getState().buyPass(e.id);
              if (err) useGame.getState().toast(err, "bad");
              else useGame.getState().toast(`Visitor pass for ${e.name}: the guard raises the boom.`, "good");
            }}
            className="mt-3 w-full rounded-2xl bg-stone-900 py-3 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
          >
            {left > 0 ? "Extend your pass" : "Buy a visitor pass"} · {naira(e.price)} · 30 min
          </button>
          <p className="mt-2 text-xs text-stone-500">Buy a house in {e.name} to become a resident and walk in whenever you like.</p>
        </>
      )}
    </>
  );
}
