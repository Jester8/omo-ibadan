"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { REASONS } from "@/lib/custodyRules";
import { useSecond } from "@/lib/hooks";
import { dismissPokeAlert, nearEnough, reportPoke, sendPoke, setPokeMode } from "@/lib/pokes";
import type { PokeMode } from "@/lib/protocol";
import { naira } from "@/lib/plots";
import { blockPlayer, loadSocial } from "@/lib/social";
import { POKE } from "@/lib/socialRules";
import { useFlag, useSocial } from "@/lib/socialState";
import { useGame } from "@/lib/store";

const chip = "rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95 disabled:opacity-40";

/** Poke and Hit buttons for the player card (renders nothing unless pokes are on and the player is in the same room). */
export function PokeButtons({ peerId }: { peerId: string }) {
  const on = useFlag("pokes");
  const online = useGame((s) => s.net === "online");
  const held = useGame((s) => !!s.custody);
  const sameRoom = useGame((s) => {
    const peer = s.remotes[peerId];
    return !!peer && (s.interior ? peer.room === `in:${s.interior.kind}:${s.interior.id}` : !peer.room.startsWith("in:"));
  });
  const cooldown = useSocial((s) => s.pokeCooldown);
  const now = useSecond() * 1000;
  if (!on || !online || held || !sameRoom) return null;
  // the second counter above only ticks once a second: that is how often "near" is looked at, which is plenty
  const near = nearEnough(peerId);
  const left = (kind: "poke" | "hit") => Math.max(0, Math.ceil((cooldown[kind] - now) / 1000));
  const go = (kind: "poke" | "hit") => {
    const r = sendPoke(peerId, kind);
    if (!r.ok && r.message) useGame.getState().toast(r.message, "bad");
  };
  if (!near) return <p className="mt-2 text-xs text-stone-500">Walk up to them to poke or hit.</p>;
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      <button onClick={() => go("poke")} disabled={left("poke") > 0} className={`${chip} bg-stone-100 text-stone-800`}>
        {left("poke") > 0 ? `Poke ${left("poke")}s` : "Poke"}
      </button>
      <button onClick={() => go("hit")} disabled={left("hit") > 0} className={`${chip} bg-rose-100 text-rose-700`}>
        {left("hit") > 0 ? `Hit ${left("hit")}s` : "Hit"}
      </button>
    </div>
  );
}

/** The alert for a poke or hit that landed on me, with a one-tap Report. */
export function PokeAlerts() {
  const alert = useSocial((s) => s.pokeAlerts[0]);
  const policeOpen = useGame((s) => s.policeOpen);
  const [stop, setStop] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!alert) return null;
  const reason = alert.kind === "hit" ? "assault" : "harassment";
  const fee = REASONS[reason].fee;
  const title = alert.kind === "hit" ? `${alert.name} hit you` : alert.recent >= POKE.harassCount ? `${alert.name} has poked you ${alert.recent} times in ${Math.round(POKE.evidenceMs / 60_000)} minutes` : `${alert.name} poked you`;
  return (
    <div className="pointer-events-auto rounded-3xl bg-white p-3 text-black shadow-2xl ring-1 ring-black/10">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold">{title}</p>
        <button onClick={() => dismissPokeAlert(alert.id)} aria-label="Close" className="rounded-full px-2 text-lg leading-none text-stone-400">
          ×
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {alert.canReport && policeOpen && (
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              const r = await reportPoke(alert);
              setBusy(false);
              useGame.getState().toast(r.message, r.ok ? "good" : "bad");
            }}
            className={`${chip} bg-blue-700 text-white`}
          >
            Report {naira(fee)}
          </button>
        )}
        <button
          onClick={async () => {
            if (!alert.fromPid) return;
            useGame.getState().mute(alert.fromPid);
            await blockPlayer(alert.fromPid);
            await loadSocial();
            dismissPokeAlert(alert.id);
          }}
          className={`${chip} bg-stone-100 text-stone-700`}
        >
          Block
        </button>
        <button onClick={() => setStop((v) => !v)} className={`${chip} bg-stone-100 text-stone-700`}>
          Stop pokes
        </button>
      </div>
      {stop && (
        <div className="mt-2 flex gap-1.5">
          <button onClick={() => { setPokeMode("friends"); dismissPokeAlert(alert.id); }} className={`${chip} bg-amber-100 text-amber-800`}>
            Friends only
          </button>
          <button onClick={() => { setPokeMode("off"); dismissPokeAlert(alert.id); }} className={`${chip} bg-amber-100 text-amber-800`}>
            Nobody
          </button>
        </div>
      )}
    </div>
  );
}

/** The brief red edge flash after a hit. */
export function PokeFlash() {
  const flash = useSocial((s) => s.flash);
  return (
    <AnimatePresence>
      {flash && (
        <motion.div key={flash.at} initial={{ opacity: 0.85 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="pointer-events-none absolute inset-0 z-[60] shadow-[inset_0_0_80px_20px_rgba(220,38,38,0.65)]" />
      )}
    </AnimatePresence>
  );
}

/** The "who may poke me" switch. */
export function PokeSwitch() {
  const mode = useSocial((s) => s.pokeMode);
  const options: { id: PokeMode; label: string }[] = [
    { id: "all", label: "Everyone" },
    { id: "friends", label: "Friends only" },
    { id: "off", label: "Nobody" },
  ];
  return (
    <div>
      <p className="text-xs font-semibold text-stone-700">Who can poke or hit me</p>
      <div className="mt-1.5 flex gap-1.5">
        {options.map((o) => (
          <button key={o.id} onClick={() => setPokeMode(o.id)} className={`${chip} ${mode === o.id ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
