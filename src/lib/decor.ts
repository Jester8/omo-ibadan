import { FURN, type FurnKind } from "./furniture";
import { footprint, spawnOf, type Item, type Layout } from "./interiors";

export type DecorDef = { id: string; kind: FurnKind; name: string; blurb: string; price: number; wall?: boolean; minTier?: number };

export const MAX_PER_KIND = 3;

export const DECOR: DecorDef[] = [
  { id: "plant", kind: "plant", name: "Potted plant", blurb: "A bit of green for the corner.", price: 6000 },
  { id: "wallart", kind: "wallart", name: "Adire wall hanging", blurb: "Indigo-dyed cloth, hung with pride.", price: 8000, wall: true },
  { id: "calabash", kind: "calabash", name: "Calabash", blurb: "Carved gourd for the shelf-less corner.", price: 7000 },
  { id: "lamp", kind: "lamp", name: "Standing lamp", blurb: "Lights the room when NEPA does.", price: 9000 },
  { id: "carvedstool", kind: "carvedstool", name: "Carved Yoruba stool", blurb: "Hand-carved, and sturdy enough to sit on.", price: 12000 },
  { id: "rug", kind: "rug", name: "Woven rug", blurb: "Ties the parlour together.", price: 15000 },
  { id: "ibeji", kind: "ibeji", name: "Ìbejì twin figures", blurb: "Honouring twins, a Yoruba tradition.", price: 25000, minTier: 1 },
];

export const decorById = (id: string) => DECOR.find((d) => d.id === id);

/** Decor is stored per home: the key is the plot id, or "flat" for the starter room. */
export const decorKey = (homeId: string) => homeId;

const dist = (px: number, pz: number, a: Item) => {
  const f = footprint(a);
  const dx = Math.max(Math.abs(px - a.x) - f.w / 2, 0);
  const dz = Math.max(Math.abs(pz - a.z) - f.d / 2, 0);
  return Math.hypot(dx, dz);
};

function segDist(px: number, pz: number, x1: number, z1: number, x2: number, z2: number) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const l2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (pz - z1) * dz) / l2));
  return Math.hypot(px - (x1 + t * dx), pz - (z1 + t * dz));
}

function floorSpots(l: Layout, kind: FurnKind): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [];
  const m = Math.max(FURN[kind].w, FURN[kind].d) / 2 + 0.2;
  const rug = kind === "rug";
  if (rug) {
    for (let z = -l.d / 2 + 1.4; z <= l.d / 2 - 1.8; z += 0.7) for (let x = -l.w / 2 + 1.6; x <= l.w / 2 - 1.6; x += 0.7) out.push({ x, z });
    return out;
  }
  for (let x = -l.w / 2 + m; x <= l.w / 2 - m; x += 0.5) out.push({ x, z: -l.d / 2 + m });
  for (let z = -l.d / 2 + m; z <= l.d / 2 - m; z += 0.5) out.push({ x: -l.w / 2 + m, z }, { x: l.w / 2 - m, z });
  for (let x = -l.w / 2 + m; x <= l.w / 2 - m; x += 0.5) out.push({ x, z: l.d / 2 - m });
  return out;
}

/** Add the player's decor to a layout. Items that find no clear spot are skipped. */
export function withDecor(layout: Layout, ids: string[]): Layout {
  if (!ids.length) return layout;
  const items = [...layout.items];
  const [sx, sz] = spawnOf(layout);
  for (const id of ids) {
    const def = decorById(id);
    if (!def) continue;
    const next = tryPlace(layout, items, def, sx, sz);
    if (next) items.push(next);
  }
  return { ...layout, items };
}

export function tryPlace(layout: Layout, items: Item[], def: DecorDef, sx: number, sz: number): Item | null {
  if (def.wall) {
    const spots: Item[] = [];
    for (let x = -layout.w / 2 + 1.2; x <= layout.w / 2 - 1.2; x += 0.6) spots.push({ kind: def.kind, x, z: -layout.d / 2 + 0.07, rot: 0, y: 1.5, c: layout.accent });
    for (let z = -layout.d / 2 + 1.2; z <= layout.d / 2 - 1.8; z += 0.6) spots.push({ kind: def.kind, x: -layout.w / 2 + 0.07, z, rot: Math.PI / 2, y: 1.5, c: layout.accent });
    return (
      spots.find((s) =>
        items.every((o) => {
          if (FURN[o.kind].solid === false && (o.y ?? 0) < 1 && o.kind !== "calendar") return true; // floor-level things don't matter
          const fa = footprint(o);
          const fs = footprint(s);
          const hang = (o.y ?? 0) >= 1;
          if (!hang && FURN[o.kind].h < 1.6) return true;
          return !(Math.abs(o.x - s.x) < (fa.w + fs.w) / 2 + 0.15 && Math.abs(o.z - s.z) < (fa.d + fs.d) / 2 + 0.15);
        }),
      ) ?? null
    );
  }
  const rug = def.kind === "rug";
  const spot = floorSpots(layout, def.kind).find((p) => {
    const cand: Item = { kind: def.kind, x: p.x, z: p.z };
    const fc = footprint(cand);
    if (Math.hypot(p.x - sx, p.z - sz) < 1.2) return false;
    if (Math.abs(p.x - layout.exitX) < 1.3 && p.z > layout.d / 2 - 1.6) return false;
    for (const w of layout.walls) if (segDist(p.x, p.z, w.x1, w.z1, w.x2, w.z2) < Math.max(fc.w, fc.d) / 2 + 0.7) return false;
    for (const o of items) {
      const od = FURN[o.kind];
      if (rug) {
        if (o.kind === "rug") {
          const fo = footprint(o);
          if (Math.abs(o.x - p.x) < (fo.w + fc.w) / 2 && Math.abs(o.z - p.z) < (fo.d + fc.d) / 2) return false;
        } else if (od.solid && dist(p.x, p.z, o) < Math.max(fc.w, fc.d) / 2 - 0.3) return false;
      } else if (o.kind !== "rug" && (o.y ?? 0) < 1 && dist(p.x, p.z, o) < Math.max(fc.w, fc.d) / 2 + (od.solid ? 0.45 : 0.1)) return false;
    }
    return true;
  });
  if (!spot) return null;
  return { kind: def.kind, x: spot.x, z: spot.z, rot: 0, ...(rug ? { w: 2.2, d: 1.5, c: layout.accent } : {}) };
}
