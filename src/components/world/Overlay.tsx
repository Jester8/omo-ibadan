"use client";

import { useState, type ReactNode } from "react";
import { bizById } from "@/lib/business";
import { Mic } from "lucide-react";
import type { Vector3 } from "three";
import { anchors } from "@/lib/overlay";
import { DISTRICTS, PLACES } from "@/lib/places";
import { PLOTS, naira } from "@/lib/plots";
import { me, remoteMotion } from "@/lib/playerState";
import { useGame } from "@/lib/store";
import { colorFor } from "@/lib/look";
import { NPCS, sameSpace } from "./People";
import { S } from "@/lib/furniture";
import { interiorKey } from "@/lib/interiors";
import { rt, walkToExit } from "@/lib/interiorRuntime";
import { TAG_Y } from "./Player";
import { useHour } from "@/lib/hooks";
import { isOpen } from "@/lib/events";
import { CAMPUS_PLACES } from "@/lib/world";

function Anchored({
  id,
  get,
  maxDist,
  maxCam,
  minCam,
  children,
}: {
  id: string;
  get: (out: Vector3) => void;
  maxDist?: number;
  maxCam?: number;
  minCam?: number;
  children: ReactNode;
}) {
  return (
    <div
      ref={(el) => {
        if (el) anchors.set(id, { el, get, maxDist, maxCam, minCam });
        else anchors.delete(id);
      }}
      className="absolute left-0 top-0 will-change-transform"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      {children}
    </div>
  );
}

function PlaceLabels() {
  const selected = useGame((s) => s.selected);
  const atPlace = useGame((s) => s.atPlace);
  const hour = useHour();
  const campus = useGame((s) => s.campus);
  // on a phone, place names are smaller and only the ones near you show, so the screen stays readable
  const [phone] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  return (
    <>
      {PLACES.filter((p) => campus || !CAMPUS_PLACES.includes(p.id)).map((p) => {
        const open = isOpen(p.id, hour);
        const sel = selected?.type === "place" && selected.id === p.id;
        const here = atPlace === p.id;
        return (
          <Anchored key={p.id} id={`place:${p.id}`} get={(o) => o.set(p.pos[0], p.size[1] + 0.9, p.pos[1])} maxCam={phone ? 38 : 46} maxDist={phone ? 26 : undefined}>
            <button
              onClick={() => useGame.getState().select({ type: "place", id: p.id })}
              className={`pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold max-sm:gap-1 max-sm:px-2 max-sm:py-1 max-sm:text-[10.5px] shadow-lg ring-1 backdrop-blur transition-all duration-300 hover:scale-105 ${
                sel
                  ? "scale-110 bg-amber-500 text-white ring-amber-600"
                  : here
                    ? "scale-105 bg-emerald-600 text-white ring-emerald-700"
                    : "bg-white/90 text-stone-800 ring-black/5"
              }`}
            >
              <span>{p.emoji}</span>
              {p.name}
              {!open && <span className="rounded-full bg-stone-800/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Closed</span>}
            </button>
          </Anchored>
        );
      })}
    </>
  );
}

function PlotLabels() {
  const plots = useGame((s) => s.plots);
  const myId = useGame((s) => s.profile?.id);
  const selected = useGame((s) => s.selected);
  return (
    <>
      {PLOTS.map((p) => {
        const state = plots[p.id];
        const mine = state?.ownerId === myId;
        const sel = selected?.type === "plot" && selected.id === p.id;
        return (
          <Anchored key={p.id} id={`plot:${p.id}`} get={(o) => o.set(p.pos[0], state && state.tier > 0 ? 2.1 : 1.15, p.pos[1])} maxCam={28}>
            <button
              onClick={() => useGame.getState().select({ type: "plot", id: p.id })}
              className={`${sel ? "" : "max-sm:hidden"} pointer-events-auto whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md ring-1 transition hover:scale-105 ${
                sel ? "bg-amber-500 text-white ring-amber-600" : state ? "text-white ring-black/10" : "bg-emerald-50 text-emerald-800 ring-emerald-200"
              }`}
              style={state && !sel ? { background: colorFor(state.ownerId) } : undefined}
            >
              {state ? (state.biz ? `${bizById(state.biz)?.emoji ?? "🏪"} ${mine ? "Yours" : (bizById(state.biz)?.name ?? "Business")}` : `${mine ? "🏠 Yours" : `🏠 ${state.ownerName}`}`) : `For sale · ${naira(p.price).replace(/,000$/, "k")}`}
            </button>
          </Anchored>
        );
      })}
    </>
  );
}

function DistrictLabels() {
  return (
    <>
      {DISTRICTS.map((d) => (
        <Anchored key={d.name} id={`district:${d.name}`} get={(o) => o.set(d.pos[0], 0.1, d.pos[1])} minCam={15}>
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900/35 max-sm:hidden">{d.name}</span>
        </Anchored>
      ))}
    </>
  );
}

function Bubble({ id }: { id: string }) {
  const b = useGame((s) => s.bubbles[id]);
  if (!b) return null;
  return (
    <div className="absolute bottom-full left-1/2 mb-1 w-max max-w-[11rem] -translate-x-1/2 rounded-2xl rounded-bl-md bg-white px-3 py-1.5 text-xs font-medium text-stone-800 shadow-lg ring-1 ring-black/5 animate-[pop_0.25s_ease-out]">
      {b.text}
    </div>
  );
}

function NameTag({ name, bubbleId, speaking, tone = "me", dim = false }: { name: string; bubbleId: string; speaking?: boolean; tone?: "me" | "other"; dim?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <Bubble id={bubbleId} />
      <span
        className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold shadow ring-1 ${
          tone === "me" ? "bg-emerald-700 text-white ring-emerald-800" : dim ? "bg-white/70 text-stone-600 ring-black/5" : "bg-white text-stone-800 ring-black/5"
        } ${speaking ? "outline outline-2 outline-offset-2 outline-emerald-400" : ""}`}
      >
        {speaking && <Mic className="size-3 text-emerald-400" />}
        {name}
      </span>
    </div>
  );
}

function PeopleTags() {
  const profile = useGame((s) => s.profile);
  const remotes = useGame((s) => s.remotes);
  const speaking = useGame((s) => s.voice.speaking);
  const inside = useGame((s) => !!s.interior);
  const mine = useGame((s) => (s.interior ? interiorKey(s.interior) : null));
  return (
    <>
      {profile && (
        <Anchored id="me" get={(o) => o.set(me.x, TAG_Y, me.z)}>
          <NameTag name={profile.name} bubbleId="me" speaking={speaking.me} />
        </Anchored>
      )}
      {Object.values(remotes)
        .filter((r) => sameSpace(r.room, mine))
        .map((r) => (
        <Anchored
          key={r.id}
          id={`peer:${r.id}`}
          get={(o) => {
            const m = remoteMotion.get(r.id);
            o.set(m?.x ?? r.x, TAG_Y, m?.z ?? r.z);
          }}
        >
          <NameTag name={r.name} bubbleId={r.id} speaking={speaking[r.id]} tone="other" />
        </Anchored>
      ))}
      {!inside &&
        NPCS.map((n) => (
          <Anchored key={n.id} id={n.id} get={(o) => o.set(n.st.x, TAG_Y, n.st.z)} maxDist={11}>
            <NameTag name={n.name} bubbleId={n.id} tone="other" dim />
          </Anchored>
        ))}
    </>
  );
}

/** Exit sign, "what can I do here" prompts on usable furniture, and resident name tags. */
function InteriorLabels() {
  const interior = useGame((s) => s.interior);
  const layout = interior ? rt.layout : null;
  if (!layout) return null;
  return (
    <>
      <Anchored id="exit" get={(o) => o.set(layout.exitX * S, 1.3, (layout.d / 2 - 0.45) * S)}>
        <button
          onClick={walkToExit}
          className="pointer-events-auto whitespace-nowrap rounded-full bg-stone-900/90 px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg ring-1 ring-black/10 transition hover:scale-105"
        >
          ↩ Exit
        </button>
      </Anchored>
      {(layout.residents ?? []).map((r) => (
        <Anchored key={`r${r.name}`} id={`res:${r.name}`} get={(o) => o.set(r.x * S, TAG_Y, r.z * S)} maxDist={9}>
          <NameTag name={r.name} bubbleId={`res:${r.name}`} tone="other" dim />
        </Anchored>
      ))}
    </>
  );
}

export default function Overlay() {
  const inside = useGame((s) => !!s.interior);
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {inside ? (
        <InteriorLabels />
      ) : (
        <>
          <DistrictLabels />
          <PlotLabels />
          <PlaceLabels />
        </>
      )}
      <PeopleTags />
    </div>
  );
}
