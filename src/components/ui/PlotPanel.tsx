"use client";

import { DoorOpen, Footprints, Hammer, KeyRound, Landmark, X } from "lucide-react";
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
import { BUSINESSES, bizById } from "@/lib/business";

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
  const next = biz ? undefined : TIERS[tier + 1];
  const rent = state && mine ? pendingRent(state, sec * 1000) : 0;
  const act = (fn: () => string | null) => {
    const err = fn();
    if (err) useGame.getState().toast(err, "bad");
  };

  const enterHome = () => {
    if (!near) return walkTo(plot.pos[0], plot.pos[1] + PLOT_SIZE / 2 + 0.6);
    // your own door opens; anyone else knocks and waits for the owner (or their door setting) to decide
    if (mine) enterInterior({ kind: "home", id });
    else net.knock(id);
  };
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl text-2xl" style={{ background: `${state ? colorFor(state.ownerId) : "#10b981"}22` }}>
            {biz ? biz.emoji : state ? "🏠" : "🌱"}
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{biz ? (mine ? `Your ${biz.name.toLowerCase()}` : `${state?.ownerName}'s ${biz.name.toLowerCase()}`) : state ? (mine ? "Your land" : `${state.ownerName}'s land`) : "Land for sale"}</h2>
            <p className="text-xs font-semibold text-emerald-700">
              {plot.district} · {biz ? "Business" : TIERS[tier].name}
            </p>
          </div>
        </div>
        <button onClick={() => select(null)} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
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

      {state && mine && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">{biz ? "Business income" : "Rent income"}</p>
              <p className="text-sm font-bold text-stone-900">{naira(biz?.perMin ?? TIERS[tier].rentPerMin)}/min</p>
            </div>
            <button
              onClick={() => useGame.getState().collectRent(id)}
              disabled={rent <= 0}
              className="rounded-2xl bg-emerald-50 p-3 text-left ring-1 ring-emerald-100 transition hover:bg-emerald-100 active:scale-95 disabled:opacity-60"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Collect</p>
              <p className="text-sm font-bold text-emerald-900">{naira(rent)}</p>
            </button>
          </div>

          {next && (
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

          {tier === 0 && !biz && (
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

          {enterButton}
          {tier >= 1 && (
            <>
              {!near && (
                <button
                  onClick={() => walkTo(plot.pos[0], plot.pos[1] + PLOT_SIZE / 2 + 0.6)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-stone-700 ring-1 ring-black/10 transition hover:bg-stone-50 active:scale-[0.98]"
                >
                  <Footprints className="size-4" /> Walk home to use it
                </button>
              )}
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
        </>
      )}

      {state && !mine && (
        <div className="mt-4 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">
          <p className="flex items-center gap-2 font-semibold text-stone-800">
            <KeyRound className="size-4" /> Owned by {state.ownerName}
          </p>
          <p className="mt-1">Ask them to host a house party, or just knock and go in.</p>
          {enterButton}
          {tier >= 1 && (
            <button
              onClick={() => walkTo(plot.pos[0], plot.pos[1] + PLOT_SIZE / 2 + 0.6)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.98]"
            >
              <Footprints className="size-4" /> Visit
            </button>
          )}
          {tier >= 1 && near && (
            <div className="mt-3">
              <VoiceRoomCard room={`home:${id}`} label={`${state.ownerName}'s house voice`} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
