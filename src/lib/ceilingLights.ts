import type { FurnKind } from "./furniture";
import { FURN } from "./furniture";
import type { Item, Layout } from "./interiors";
import { footprint } from "./interiors";

/* ------------------------------------------------------------------------------------------------
 * Every room gets visible lights above it. addCeilingLights() is pure: it returns a new layout with
 * extra non-solid fixtures wherever the room has none, and never touches walls or solid items.
 * The kind follows the room: tubelights in bright shops, offices and wards, pendants in warm homes
 * and eateries (tubes over a kitchen), fairy-light swags outdoors, coloured spots in dark rooms and
 * a sparse ring of coloured spots over a club's dance floor (clubs also carry their own lighting).
 * ---------------------------------------------------------------------------------------------- */

/** Anything that already lights a room from above; a new fixture keeps KEEP_OFF away from it. */
const OVERHEAD: ReadonlySet<FurnKind> = new Set(["chandelier", "ceilingfan", "pendant", "tubelight", "discoball", "lightstring", "spotlight"]);
const KEEP_OFF = 1.4;
/** the most fixtures one room gets, however big (the 30 x 22 markets) */
const MAX_ADDED = 40;
/** a room with one of these in it is a kitchen at heart: it gets tubes, not pendants */
const KITCHEN: ReadonlySet<FurnKind> = new Set(["stove", "gascooker", "sink", "prepcounter", "grillstand", "bukapots", "hotcase"]);
const SPOT_COLORS = ["#22d3ee", "#facc15", "#f43f5e", "#a3e635", "#8b5cf6"];

type Mode = "club" | "moody" | "outdoor" | "tube" | "warm";

/** 0 (black) to 1 (white) brightness of a #rrggbb colour; anything unparseable counts as light */
function luma(hex: string): number {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 1;
  const n = parseInt(m[1], 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

function modeOf(l: Layout): Mode {
  if (l.vibe === "club") return "club";
  const grass = l.floor === "grass" ? l.w * l.d : (l.zones ?? []).reduce((a, z) => a + (z.floor === "grass" ? z.w * z.d : 0), 0);
  if (grass > l.w * l.d * 0.5) return "outdoor";
  if (luma(l.wall) < 0.28) return "moody";
  return l.light === "warm" ? "warm" : "tube";
}

/** Is a solid item at least `top` metres tall standing within `margin` of (x, z)? Then a fixture hanging there would poke into it. */
function blockedBy(items: readonly Item[], x: number, z: number, top: number, margin: number): boolean {
  return items.some((it) => {
    if (!FURN[it.kind].solid || FURN[it.kind].h < top) return false;
    const fp = footprint(it);
    return Math.abs(x - it.x) < fp.w / 2 + margin && Math.abs(z - it.z) < fp.d / 2 + margin;
  });
}

/** Evenly spaced cell centres across the room. */
function gridPoints(w: number, d: number, sx: number, sz: number): [number, number][] {
  const nx = Math.max(1, Math.round(w / sx));
  const nz = Math.max(1, Math.round(d / sz));
  const out: [number, number][] = [];
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) out.push([((i + 0.5) / nx - 0.5) * w, ((j + 0.5) / nz - 0.5) * d]);
  return out;
}

/** Adds visible ceiling lights to a room wherever it has none, so every interior is lit from above. Applied to every layout. */
export function addCeilingLights(layout: Layout): Layout {
  const mode = modeOf(layout);
  const existing = layout.items.filter((it) => OVERHEAD.has(it.kind));
  const umbrellas = layout.items.filter((it) => it.kind === "umbrella");
  const kitchens = layout.items.filter((it) => KITCHEN.has(it.kind));
  const { w, d } = layout;

  let spots: [number, number][];
  if (mode === "club") {
    // a ring over the dance floor (the first zone, else the middle of the room)
    const z = layout.zones?.[0];
    const cx = z?.x ?? 0;
    const cz = z?.z ?? 0;
    const rx = (z?.w ?? w * 0.5) * 0.42;
    const rz = (z?.d ?? d * 0.5) * 0.42;
    spots = Array.from({ length: 6 }, (_, k) => {
      const a = 0.3 + (k / 6) * Math.PI * 2;
      return [cx + Math.sin(a) * rx, cz + Math.cos(a) * rz];
    });
  } else if (mode === "outdoor") {
    spots = gridPoints(w, d, 4.4, 4.4);
  } else if (mode === "moody") {
    // dark rooms want pools of colour with shadow between
    const s = Math.max(4.4, Math.sqrt((w * d) / 24));
    spots = gridPoints(w, d, s, s);
  } else {
    // about 3.4 m apart, wider in the big halls so they stay under MAX_ADDED
    spots = gridPoints(w, d, Math.max(3.4, Math.sqrt((w * d) / 34)), Math.max(3.4, Math.sqrt((w * d) / 34)));
  }

  const added: Item[] = [];
  spots.forEach(([px, pz], n) => {
    // keep inside the room, and a clear 1.4 m from any light it already has
    const x = Math.max(-w / 2 + 1, Math.min(w / 2 - 1, px));
    const z = Math.max(-d / 2 + 1, Math.min(d / 2 - 1, pz));
    if (existing.some((it) => Math.hypot(it.x - x, it.z - z) < KEEP_OFF)) return;
    if (mode === "club" || mode === "moody") {
      if (blockedBy(layout.items, x, z, 2.2, 0.1)) return;
      added.push({ kind: "spotlight", x, z, rot: 0, c: n % 2 === 0 ? layout.accent : SPOT_COLORS[(n >> 1) % SPOT_COLORS.length] });
    } else if (mode === "outdoor") {
      if (blockedBy(layout.items, x, z, 2.25, 0.1)) return;
      // a swag never wider than the room around it
      added.push({ kind: "lightstring", x, z, rot: 0, w: Math.min(4, 2 * (w / 2 - Math.abs(x)) - 0.3) });
    } else {
      const kitchen = kitchens.some((it) => Math.hypot(it.x - x, it.z - z) < 2.2);
      if (mode === "warm" && !kitchen) {
        if (blockedBy(layout.items, x, z, 1.75, 0.25)) return;
        if (umbrellas.some((it) => Math.hypot(it.x - x, it.z - z) < (it.w ?? FURN.umbrella.w) / 2 + 0.2)) return;
        added.push({ kind: "pendant", x, z, rot: 0 });
      } else {
        if (blockedBy(layout.items, x, z, 2.35, 0.3)) return;
        // lie along the room's long side
        added.push({ kind: "tubelight", x, z, rot: w >= d ? 0 : Math.PI / 2 });
      }
    }
  });

  if (!added.length) return layout;
  // thin evenly rather than cut one end off
  const keep = added.length > MAX_ADDED ? added.filter((_, i) => Math.floor((i * MAX_ADDED) / added.length) !== Math.floor(((i - 1) * MAX_ADDED) / added.length)) : added;
  return { ...layout, items: [...layout.items, ...keep] };
}
