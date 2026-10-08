import type { FurnKind } from "./furniture";
import type { FloorKind, Item, Layout, Wall } from "./interiors";

/* ------------------------------------------------------------------------------------------------
 * The small vocabulary every layout file is written in. x spans -w/2..w/2, z spans -d/2..d/2 (metres);
 * rot 0 faces +z (towards the front), PI faces the back wall, PI/2 faces +x, -PI/2 faces -x.
 * ---------------------------------------------------------------------------------------------- */

export const R = Math.PI;
export const H = Math.PI / 2;

export const I = (kind: FurnKind, x: number, z: number, rot = 0, o: Partial<Item> = {}): Item => ({ kind, x, z, rot, ...o });
export const W = (x1: number, z1: number, x2: number, z2: number, door?: number, doorW = 1.4): Wall => ({ x1, z1, x2, z2, door, doorW });
export const row = (kind: FurnKind, x0: number, z: number, n: number, dx: number, rot = 0, o: Partial<Item> = {}) =>
  Array.from({ length: n }, (_, i) => I(kind, x0 + i * dx, z, rot, o));
export const col = (kind: FurnKind, x: number, z0: number, n: number, dz: number, rot = 0, o: Partial<Item> = {}) =>
  Array.from({ length: n }, (_, i) => I(kind, x, z0 + i * dz, rot, o));
/** n items on a circle, all facing the centre */
export const around = (kind: FurnKind, cx: number, cz: number, r: number, n: number, start = 0, o: Partial<Item> = {}) =>
  Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    const x = cx + Math.sin(a) * r;
    const z = cz + Math.cos(a) * r;
    return I(kind, x, z, Math.atan2(cx - x, cz - z), o);
  });
export const grid = (kind: FurnKind, x0: number, z0: number, nx: number, nz: number, dx: number, dz: number, rot = 0, o: Partial<Item> = {}) =>
  Array.from({ length: nx * nz }, (_, k) => I(kind, x0 + (k % nx) * dx, z0 + Math.floor(k / nx) * dz, rot, o));

export const RUST = "#b5533c";
export const OCHRE = "#d89b3c";
export const COCOA = "#6b4a2f";
export const INDIGO = "#2f3b82";
export const TEAL = "#2f8f83";
export const SAND = "#ead7b7";
export const CREAM = "#f1e4c8";

export type Palette = { wall: string; trim: string; accent: string; floor: FloorKind };

export const PALETTES: Palette[] = [
  { wall: SAND, trim: "#7a4a2c", accent: RUST, floor: "redoxide" },
  { wall: CREAM, trim: COCOA, accent: INDIGO, floor: "tile" },
  { wall: "#d9b08c", trim: "#5a3a24", accent: OCHRE, floor: "wood" },
  { wall: "#cfe0d0", trim: COCOA, accent: TEAL, floor: "tile" },
  { wall: "#efe6d8", trim: "#3b2a1d", accent: "#8a2f3c", floor: "marble" },
];

export const lay = (l: Omit<Layout, "light"> & { light?: Layout["light"] }): Layout => ({ light: "warm", ...l });
