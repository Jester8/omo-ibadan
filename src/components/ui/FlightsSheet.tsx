"use client";

import { Plane, Ticket } from "lucide-react";
import { DESTINATIONS, destById } from "@/lib/flights";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";

/** Ibadan Airport: book a ticket, then board at the gate. */
export default function FlightsSheet() {
  const ticket = useGame((s) => s.ticket);
  const money = useGame((s) => s.money);
  const busy = useGame((s) => !!s.busy);
  const atAirport = useGame((s) => s.atPlace === "airport" || (s.interior?.kind === "place" && s.interior.id === "airport"));
  const held = destById(ticket ?? "");

  return (
    <>
      {held ? (
        <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
          <p className="flex items-center gap-2 text-sm font-bold text-sky-950">
            <Ticket className="size-4" /> Boarding pass: Ibadan → {held.city}
          </p>
          <p className="mt-1 text-xs text-sky-900/80">
            {held.country} · {held.mins >= 120 ? `${Math.round(held.mins / 60)} h` : `${held.mins} min`} flight
          </p>
          <button
            disabled={busy}
            onClick={() => {
              const err = useGame.getState().boardFlight();
              if (err) useGame.getState().toast(err, "bad");
              else useGame.getState().setSheet(null);
            }}
            className="mt-3 w-full rounded-xl bg-sky-600 py-2.5 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-40"
          >
            {atAirport ? "Board the plane" : "Go to Ibadan Airport to board"}
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">Pick a destination and pay for your ticket. You board at Ibadan Airport, and your return flight home is free.</div>
      )}

      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Destinations</p>
      <ul className="space-y-2">
        {DESTINATIONS.map((d) => (
          <li key={d.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-stone-900">
                {d.emoji} {d.city}, {d.country}
              </p>
              <p className="text-xs text-stone-500">{d.blurb}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-stone-400">{d.mins >= 120 ? `${Math.round(d.mins / 60)} h` : `${d.mins} min`}</p>
            </div>
            <button
              disabled={!!ticket || money < d.price}
              onClick={() => {
                const err = useGame.getState().bookTicket(d.id);
                if (err) useGame.getState().toast(err, "bad");
                else useGame.getState().toast(`Ticket booked to ${d.city}!`, "good");
              }}
              className="flex shrink-0 items-center gap-1 rounded-full bg-sky-600 px-3.5 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
            >
              <Plane className="size-3" /> {naira(d.price)}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
