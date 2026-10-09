import type { ActionDef } from "./places";
import type { FurnKind } from "./furniture";
import type { ServiceId } from "./services";
import { FURN, S } from "./furniture";
import { Grid } from "./pathing";

export type FloorKind = "tile" | "wood" | "concrete" | "redoxide" | "carpet" | "marble" | "grass";

export type Item = {
  kind: FurnKind;
  x: number;
  z: number;
  /** rotation about the vertical axis; 0 faces +z (towards the viewer), PI faces the back wall */
  rot?: number;
  w?: number;
  d?: number;
  /** extra height (wall art, hanging lamps) */
  y?: number;
  c?: string;
  c2?: string;
  /** text on a sign (signboard, neonsign) */
  label?: string;
  /** which goods a display shows, e.g. "shoes" / "bags" on a displaytable, "burger" / "rice" on a tray */
  variant?: string;
  /** override what happens when the player uses this item */
  action?: ActionDef;
  verb?: string;
  /** on a `servicedesk`: which business is done here (defaults to the place's `service`) */
  service?: ServiceId;
};

/** Axis-aligned partition wall. `door` is how far along the wall (0..1) the doorway sits. */
export type Wall = { x1: number; z1: number; x2: number; z2: number; door?: number; doorW?: number };

export type Zone = { x: number; z: number; w: number; d: number; floor: FloorKind; color?: string };

export type Layout = {
  id: string;
  name: string;
  /** floor size in metres; x spans -w/2..w/2, z spans -d/2..d/2 */
  w: number;
  d: number;
  floor: FloorKind;
  /** wall paint, skirting/door-frame colour, and accent for rugs and cushions */
  wall: string;
  trim: string;
  accent: string;
  light: "warm" | "bright" | "cool";
  walls: Wall[];
  zones?: Zone[];
  items: Item[];
  /** the exit mat sits on the front wall (z = +d/2) at this x */
  exitX: number;
  /** nightlife rooms get moving coloured lights and music */
  vibe?: "club";
  /** where people held in custody are placed, one entry per cell (metres); visitors use spawnOf(l). Only the custodial centre has these. */
  cells?: { spawn: [number, number] }[];
};

export type InteriorRef = { kind: "place" | "home"; id: string };

export const interiorKey = (ref: InteriorRef) => `in:${ref.kind}:${ref.id}`;

/** Where the player appears when entering, in metres. */
export const spawnOf = (l: Layout): [number, number] => [l.exitX, l.d / 2 - 1.3];

/** Where the prisoner of cell number `cell` (any integer) stands; layouts without cells fall back to the normal spawn. */
export const cellSpawnOf = (l: Layout, cell: number): [number, number] => {
  const n = l.cells?.length ?? 0;
  return n ? l.cells![((cell % n) + n) % n].spawn : spawnOf(l);
};

/** Footprint of an item after rotation, in metres. */
export function footprint(it: Item): { w: number; d: number } {
  const def = FURN[it.kind];
  const w = it.w ?? def.w;
  const d = it.d ?? def.d;
  const quarter = Math.abs(Math.round(((it.rot ?? 0) / (Math.PI / 2)) % 2)) === 1;
  return quarter ? { w: d, d: w } : { w, d };
}

/** Walkability grid for a layout, in world units (metres * S). */
export function buildInteriorGrid(l: Layout): Grid {
  const cell = 0.24;
  const wu = l.w * S;
  const du = l.d * S;
  const nx = Math.ceil(wu / cell);
  const nz = Math.ceil(du / cell);
  const grid = new Grid(-nx * cell * 0.5, -nz * cell * 0.5, nx, nz, cell);
  const t = 0.1;
  // outer walls
  grid.blockRect(0, -du / 2, wu + t, t * 2, 0.04);
  grid.blockRect(-wu / 2, 0, t * 2, du + t, 0.04);
  grid.blockRect(wu / 2, 0, t * 2, du + t, 0.04);
  // the front wall, except the exit doorway
  const gap = 1.3 * S;
  const ex = l.exitX * S;
  grid.blockRect((-wu / 2 + (ex - gap / 2)) / 2, du / 2, ex - gap / 2 + wu / 2, t * 2, 0.04);
  grid.blockRect(((ex + gap / 2) + wu / 2) / 2, du / 2, wu / 2 - (ex + gap / 2), t * 2, 0.04);
  // partitions
  for (const wall of l.walls) {
    const dx = wall.x2 - wall.x1;
    const dz = wall.z2 - wall.z1;
    const len = Math.hypot(dx, dz);
    const gapLen = wall.door !== undefined ? wall.doorW ?? 1.4 : 0;
    const at = (f: number) => ({ x: (wall.x1 + dx * f) * S, z: (wall.z1 + dz * f) * S });
    const seg = (f0: number, f1: number) => {
      if (f1 - f0 <= 0.001) return;
      const a = at(f0);
      const b = at(f1);
      const horizontal = Math.abs(dx) >= Math.abs(dz);
      grid.blockRect((a.x + b.x) / 2, (a.z + b.z) / 2, horizontal ? Math.abs(b.x - a.x) : t, horizontal ? t : Math.abs(b.z - a.z), 0.03);
    };
    if (wall.door === undefined) seg(0, 1);
    else {
      const half = gapLen / 2 / len;
      seg(0, Math.max(0, wall.door - half));
      seg(Math.min(1, wall.door + half), 1);
    }
  }
  // solid furniture
  for (const it of l.items) {
    const def = FURN[it.kind];
    if (!def.solid) continue;
    const fp = footprint(it);
    grid.blockRect(it.x * S, it.z * S, fp.w * S * 0.92, fp.d * S * 0.92, 0.03);
  }
  return grid;
}
