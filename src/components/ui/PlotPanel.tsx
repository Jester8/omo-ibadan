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
  const tier = state?.tier ?? 0;
  const next = TIERS[tier + 1];
  const rent = state && mine ? pendingRent(state, sec * 1000) : 0;
  const act = (fn: () => string | null) => {
    const err = fn();
    if (err) useGame.getState().toast(err, "bad");
  };

  const enterHome = () => {
    if (!near) return walkTo(plot.pos[0], plot.pos[1] + PLOT_SIZE / 2 + 0.6);
    enterInterior({ kind: "home", id });
  };
  const enterButton =
    tier >= 1 ? (
      <button
        onClick={enterHome}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 active:scale-[0.98]"
      >
        <DoorOpen className="size-4" /> {near ? (mine ? "Go inside your home" : `Knock and go in`) : "Walk to the door"}
      </button>
    ) : null;

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl text-2xl" style={{ background: `${state ? colorFor(state.ownerId) : "#10b981"}22` }}>
            {state ? "🏠" : "🌱"}
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{state ? (mine ? "Your land" : `${state.ownerName}'s land`) : "Land for sale"}</h2>
            <p className="text-xs font-semibold text-emerald-700">
              {plot.district} · {TIERS[tier].name}
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
              <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Rent income</p>
              <p className="text-sm font-bold text-stone-900">{naira(TIERS[tier].rentPerMin)}/min</p>
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
