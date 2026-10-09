"use client";

import { useState } from "react";
import { DoorOpen, Hammer, KeyRound, Landmark, Lock, X } from "lucide-react";
import { enterInterior } from "@/lib/interiorRuntime";
import { HOME_ACTIONS, PLOT_SIZE, TIERS, naira, plotById } from "@/lib/plots";
import { pendingRent, useGame } from "@/lib/store";
import { colorFor } from "@/lib/look";
import { me } from "@/lib/playerState";
import { walkTo } from "@/lib/movement";
import { nepaOut } from "@/lib/time";
import { useSecond } from "@/lib/hooks";
import { ActionRow, VoiceRoomCard } from "./parts";
import { net } from "@/lib/net";
import TravelOptions from "./Travel";
import { BUSINESSES, bizById } from "@/lib/business";
import { loanNow, repayLoan } from "@/lib/loans";
import { useSalesOn } from "@/lib/property";
import SellSheet from "./SellSheet";

export default function PlotPanelBody({ id }: { id: string }) {
  const plot = plotById(id)!;
  const state = useGame((s) => s.plots[id]);
  const myId = useGame((s) => s.profile?.id);
  const money = useGame((s) => s.money);
  const busy = useGame((s) => s.busy);
  const select = useGame((s) => s.select);
  const sec = useSecond();
  const mine = state?.ownerId === myId;
  const near = Math.hypot(me.x - plot.pos[0], me.z - (plot.pos[1] + PLOT_SIZE / 2 + 0.6)) < 3.6;
  const biz = bizById(state?.biz);
  // a business is not a house: no bungalow upgrades, no going inside
  const tier = biz ? 0 : (state?.tier ?? 0);
  const door = { x: plot.pos[0], z: plot.pos[1] + PLOT_SIZE / 2 + 0.6 };
  const next = biz ? undefined : TIERS[tier + 1];
  const rent = state && mine ? pendingRent(state, sec * 1000) : 0;
  const act = (fn: () => string | null) => {
    const err = fn();
    if (err) useGame.getState().toast(err, "bad");
  };
  const salesOn = useSalesOn();
  const loan = useGame((s) => s.loan);
  const skew = useGame((s) => s.clockSkew);
  const [selling, setSelling] = useState(false);
  // the bank has a lien on this property (the server sets it and lifts it): no visitors, no customers, no building
  const seized = !!state?.seized;
  const owed = loan ? loanNow(loan, sec * 1000 + skew).owed : 0;
  // the rent of a seized property goes straight to the loan
  const payFromRent = () => {
    const cur = useGame.getState().plots[id];
    if (!cur) return;
    const amount = pendingRent(cur, Date.now());
    if (amount <= 0) return useGame.getState().toast("No rent to collect yet.", "info");
    useGame.getState().collectRent(id);
    if (useGame.getState().loan) void repayLoan(amount).then((r) => useGame.getState().toast(r.message, r.ok ? "good" : "bad"));
  };

  const enterHome = () => {
    if (!near) return walkTo(plot.pos[0], plot.pos[1] + PLOT_SIZE / 2 + 0.6);
    // your own door opens; anyone else knocks and waits for the owner (or their door setting) to decide
    if (mine) enterInterior({ kind: "home", id });
    else net.knock(id);
  };
  // a business is open to everyone: walk up and step inside (unless the owner has closed for now)
  const shut = state?.visit === "closed";
  const enterBiz = () => {
    if (!near) return walkTo(plot.pos[0], plot.pos[1] + PLOT_SIZE / 2 + 0.6);
    if (shut && !mine) return useGame.getState().toast("Closed for now. Come back later.", "info");
    enterInterior({ kind: "home", id });
  };
  const bizButton = biz ? (
    <button
      onClick={enterBiz}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 active:scale-[0.98]"
    >
      <DoorOpen className="size-4" /> {near ? (mine ? "Go inside your business" : shut ? "Closed for now" : `Step inside ${biz.name}`) : "Walk to the door"}
    </button>
  ) : null;
  const enterButton =
    tier >= 1 ? (
      <button
        onClick={enterHome}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 active:scale-[0.98]"
      >
        <DoorOpen className="size-4" /> {near ? (mine ? "Go inside your home" : "Knock to be let in") : "Walk to the door"}
      </button>
    ) : null;

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: `${state ? colorFor(state.ownerId) : "#10b981"}22` }}>
            {biz ? biz.emoji : state ? "🏠" : "🌱"}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold leading-tight text-stone-900 sm:text-lg">{biz ? (mine ? `Your ${biz.name.toLowerCase()}` : `${state?.ownerName}'s ${biz.name.toLowerCase()}`) : state ? (mine ? "Your land" : `${state.ownerName}'s land`) : "Land for sale"}</h2>
            <p className="text-xs font-semibold text-emerald-700">
              {plot.district} · {biz ? "Business" : TIERS[tier].name}
            </p>
          </div>
        </div>
        <button onClick={() => select(null)} aria-label="Close" className="shrink-0 rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>

      {!state && (
        <>
          <p className="mt-3 text-sm text-stone-600">A clean plot in {plot.district}. Buy it, build on it, collect rent, and everyone in Ibadan will see your name on it.</p>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
            <span className="text-sm font-medium text-stone-500">Price</span>
            <span className="text-lg font-extrabold tabular-nums text-stone-900">{naira(plot.price)}</span>
          </div>
          <button
            onClick={() => act(() => useGame.getState().buyPlot(id))}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-50"
            disabled={money < plot.price}
          >
            <Landmark className="size-4" /> {money < plot.price ? `Need ${naira(plot.price - money)} more` : "Buy this land"}
          </button>
        </>
      )}

      {state && mine && selling && <SellSheet plotId={id} onClose={() => setSelling(false)} />}

      {state && mine && !selling && (
        <>
          {seized && (
            <div className="mt-4 rounded-2xl bg-rose-50 p-3 ring-1 ring-rose-200">
              <p className="flex items-center gap-2 text-sm font-bold text-rose-800">
                <Lock className="size-4 shrink-0" /> Seized by the bank until your loan is cleared
              </p>
              <p className="mt-1 text-xs leading-snug text-rose-700">
                {biz ? "Customers and staff are turned away." : "Visitors are turned away."} {owed > 0 ? `You owe ${naira(owed)}. ` : ""}You can still use this property, and you can sell it.
              </p>
              <button onClick={() => useGame.getState().setSheet("bank")} className="mt-2 w-full rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white transition active:scale-95">
                Repay the loan
              </button>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">{biz ? "Business income" : "Rent income"}</p>
              <p className="text-sm font-bold text-stone-900">{naira(biz?.perMin ?? TIERS[tier].rentPerMin)}/min</p>
            </div>
            <button
              onClick={() => (seized && loan ? payFromRent() : useGame.getState().collectRent(id))}
              disabled={rent <= 0}
              className="rounded-2xl bg-emerald-50 p-3 text-left ring-1 ring-emerald-100 transition hover:bg-emerald-100 active:scale-95 disabled:opacity-60"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">{seized && loan ? "Pay the loan from rent" : "Collect"}</p>
              <p className="text-sm font-bold text-emerald-900">{naira(rent)}</p>
            </button>
          </div>

          {next && !seized && (
            <button
              onClick={() => act(() => useGame.getState().upgradePlot(id))}
              className="mt-3 flex w-full items-center justify-between rounded-2xl bg-stone-900 px-4 py-3 text-left text-white transition hover:bg-stone-700 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Hammer className="size-4" /> Build a {next.name}
              </span>
              <span className="text-sm font-bold tabular-nums">{naira(next.cost)}</span>
            </button>
          )}

          {biz && (
            <div className="mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">Opening</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {([["ask", "Open for customers"], ["closed", "Closed"]] as const).map(([mode, label]) => (
                  <button key={mode} onClick={() => useGame.getState().setVisit(id, mode)} className={`rounded-xl py-2 text-xs font-bold transition active:scale-95 ${(shut ? "closed" : "ask") === mode ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {near && bizButton}

          {tier >= 1 && (
            <div className="mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">Who can visit</p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {([["ask", "Ask me"], ["friends", "Friends in"], ["closed", "Closed"]] as const).map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() => useGame.getState().setVisit(id, mode)}
                    className={`rounded-xl py-2 text-xs font-bold transition active:scale-95 ${(state?.visit ?? "ask") === mode ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-stone-500">{(state?.visit ?? "ask") === "ask" ? "You get a knock and choose each time." : state?.visit === "friends" ? "Your friends can walk straight in." : "Nobody can come in."}</p>
            </div>
          )}

          {tier === 0 && !biz && !seized && (
            <div className="mt-3 rounded-2xl bg-white ring-1 ring-black/5">
              <p className="px-3.5 pt-3 text-[11px] font-bold uppercase tracking-wide text-stone-400">Or build a business</p>
              <ul className="divide-y divide-stone-100">
                {BUSINESSES.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 px-3.5 py-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl text-lg" style={{ background: `${b.color}22` }}>
                      {b.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-stone-900">{b.name}</span>
                      <span className="block truncate text-[11px] text-stone-500">{naira(b.perMin)}/min · {b.blurb}</span>
                    </span>
                    <button disabled={money + rent < b.cost} onClick={() => act(() => useGame.getState().buildBusiness(id, b.id))} className="shrink-0 rounded-full bg-stone-900 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40">
                      {naira(b.cost)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {near && enterButton}
          {tier >= 1 && (
            <>
              {!near && <TravelOptions x={door.x} z={door.z} label="Choose how to get there" />}
              <ul className="mt-3 space-y-2">
                {HOME_ACTIONS.map((a) => (
                  <li key={a.id}>
                    <ActionRow
                      a={a}
                      enabled={near && !busy}
                      onRun={() => act(() => useGame.getState().runAction(a, { gainScale: a.id === "sleep" && nepaOut(Date.now()) ? 0.5 : 1 }))}
                    />
                  </li>
                ))}
              </ul>
              {near && (
                <div className="mt-3">
                  <VoiceRoomCard room={`home:${id}`} label="House party voice" />
                </div>
              )}
            </>
          )}
          {salesOn && (
            <button onClick={() => setSelling(true)} className="mt-4 w-full rounded-xl py-2 text-xs font-semibold text-stone-400 underline-offset-2 transition hover:text-stone-600 hover:underline active:scale-95">
              Sell this land
            </button>
          )}
        </>
      )}

      {state && !mine && (
        <div className="mt-4 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">
          <p className="flex items-center gap-2 font-semibold text-stone-800">
            <KeyRound className="size-4" /> Owned by {state.ownerName}
          </p>
          <p className="mt-1">{seized ? "Seized by the bank. Not open." : biz ? `${biz.emoji} ${biz.name}: open to customers. It charges ${naira(state?.price ?? biz.price)} for ${biz.item}. Step inside to look around and buy.` : "Knock to be let in. You can only visit while they are home, and you are shown out when they leave."}</p>
          {!seized && (tier >= 1 || biz) && !near && <TravelOptions x={door.x} z={door.z} label="Choose how to get there" />}
          {!seized && (tier >= 1 || biz) && near && (
            <>
              {bizButton}
              {enterButton}
            </>
          )}
          {!seized && tier >= 1 && near && (
            <div className="mt-3">
              <VoiceRoomCard room={`home:${id}`} label={`${state.ownerName}'s house voice`} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
