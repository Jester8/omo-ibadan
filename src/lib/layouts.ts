import type { FurnKind } from "./furniture";
import type { FloorKind, InteriorRef, Item, Layout, Wall } from "./interiors";
import { bizById } from "./business";

/* ------------------------------------------------------------------------------------------------
 * Interior layouts, authored in metres. x spans -w/2..w/2 (left..right), z spans -d/2..d/2
 * (back wall..front wall). The exit mat is on the front wall. rot 0 faces +z (towards the front),
 * PI faces the back wall, PI/2 faces +x, -PI/2 faces -x.
 * Ibadan look: rust and terracotta walls, red-oxide cement floors, adire-indigo rugs, ceiling fans.
 * ---------------------------------------------------------------------------------------------- */

const R = Math.PI;
const H = Math.PI / 2;

const I = (kind: FurnKind, x: number, z: number, rot = 0, o: Partial<Item> = {}): Item => ({ kind, x, z, rot, ...o });
const W = (x1: number, z1: number, x2: number, z2: number, door?: number, doorW = 1.4): Wall => ({ x1, z1, x2, z2, door, doorW });
const row = (kind: FurnKind, x0: number, z: number, n: number, dx: number, rot = 0, o: Partial<Item> = {}) =>
  Array.from({ length: n }, (_, i) => I(kind, x0 + i * dx, z, rot, o));
const col = (kind: FurnKind, x: number, z0: number, n: number, dz: number, rot = 0, o: Partial<Item> = {}) =>
  Array.from({ length: n }, (_, i) => I(kind, x, z0 + i * dz, rot, o));
/** n items on a circle, all facing the centre */
const around = (kind: FurnKind, cx: number, cz: number, r: number, n: number, start = 0, o: Partial<Item> = {}) =>
  Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    const x = cx + Math.sin(a) * r;
    const z = cz + Math.cos(a) * r;
    return I(kind, x, z, Math.atan2(cx - x, cz - z), o);
  });
const grid = (kind: FurnKind, x0: number, z0: number, nx: number, nz: number, dx: number, dz: number, rot = 0, o: Partial<Item> = {}) =>
  Array.from({ length: nx * nz }, (_, k) => I(kind, x0 + (k % nx) * dx, z0 + Math.floor(k / nx) * dz, rot, o));

const RUST = "#b5533c";
const OCHRE = "#d89b3c";
const COCOA = "#6b4a2f";
const INDIGO = "#2f3b82";
const TEAL = "#2f8f83";
const SAND = "#ead7b7";
const CREAM = "#f1e4c8";

export type Palette = { wall: string; trim: string; accent: string; floor: FloorKind };

export const PALETTES: Palette[] = [
  { wall: SAND, trim: "#7a4a2c", accent: RUST, floor: "redoxide" },
  { wall: CREAM, trim: COCOA, accent: INDIGO, floor: "tile" },
  { wall: "#d9b08c", trim: "#5a3a24", accent: OCHRE, floor: "wood" },
  { wall: "#cfe0d0", trim: COCOA, accent: TEAL, floor: "tile" },
  { wall: "#efe6d8", trim: "#3b2a1d", accent: "#8a2f3c", floor: "marble" },
];

const lay = (l: Omit<Layout, "light"> & { light?: Layout["light"] }): Layout => ({ light: "warm", ...l });

/* ----------------------------------------------------------------------------------------------
 * Homes
 * -------------------------------------------------------------------------------------------- */

/** "Room and parlour": the rented starter flat every player has. */
function flat(p: Palette): Layout {
  return lay({
    id: "flat",
    name: "Your flat",
    w: 10,
    d: 8,
    floor: p.floor,
    wall: p.wall,
    trim: p.trim,
    accent: p.accent,
    exitX: -0.4,
    walls: [W(1.5, -4, 1.5, 4, 0.72, 1.4), W(1.5, 0.2, 5, 0.2, 0.5, 1.4)],
    zones: [{ x: 3.25, z: 2.1, w: 3.5, d: 3.8, floor: "tile", color: "#e6e2d6" }],
    items: [
      I("sofa", -4.45, -1.0, H),
      I("rug", -2.5, -0.9, 0, { w: 2.8, d: 2.2, c: p.accent }),
      I("coffeetable", -2.7, -0.9),
      I("tv", 1.15, -0.9, -H),
      I("armchair", -2.6, -3.1, 0),
      I("plant", -4.5, -3.3),
      I("wallart", -2.0, -3.93, 0, { y: 1.5, c: p.accent }),
      I("clock", -0.6, -3.93, 0, { y: 1.9 }),
      I("ceilingfan", -2.5, -0.9),
      I("roundtable", -2.4, 2.4),
      ...around("plasticchair", -2.4, 2.4, 0.85, 3, 0.4),
      I("generator", -4.5, 3.4, H),
      I("lamp", -4.55, 1.3),
      I("bed", 3.6, -2.9, 0),
      I("sidetable", 2.4, -3.45),
      I("lantern", 2.4, -3.45, 0, { y: 0.55 }),
      I("wardrobe", 4.65, -1.0, -H),
      I("rug", 3.6, -1.4, 0, { w: 1.8, d: 1.2, c: "#2f3b82" }),
      I("stove", 2.1, 3.55, R),
      I("counter", 3.0, 3.6, R, { w: 1.1 }),
      I("sink", 3.95, 3.6, R),
      I("fridge", 4.65, 2.4, -H), I("mortar", 4.7, 3.5), I("radio", -2.7, -0.9, 0, { y: 0.42 }), I("meterbox", 4.88, -0.7, -H, { y: 1.3 }), I("calendar", -4.93, 0.6, H, { y: 1.4, c: p.accent }), I("carvedstool", -1.1, -3.3),
    ],
  });
}

/** Bungalow: parlour, kitchen, two bedrooms, bathroom. */
function bungalow(p: Palette, owner?: string): Layout {
  return lay({
    id: "bungalow",
    name: owner ? `${owner}'s bungalow` : "Bungalow",
    w: 12,
    d: 9,
    floor: p.floor,
    wall: p.wall,
    trim: p.trim,
    accent: p.accent,
    exitX: -2.8,
    walls: [
      W(-6, -0.8, -2, -0.8, 0.5),
      W(-2, -0.8, 2, -0.8, 0.5),
      W(2, -0.8, 6, -0.8, 0.5),
      W(-2, -4.5, -2, -0.8),
      W(2, -4.5, 2, -0.8),
      W(1, -0.8, 1, 4.5, 0.62, 1.0),
    ],
    zones: [{ x: 4, z: -2.7, w: 3.9, d: 3.5, floor: "tile", color: "#dfe5e0" }, { x: 3.5, z: 1.9, w: 4.9, d: 5.4, floor: "tile", color: "#e6e2d6" }],
    items: [
      // bedroom 1
      I("bed", -4, -3.3, 0), I("sidetable", -5.3, -3.9), I("wardrobe", -2.6, -1.4, R, { w: 1.2 }), I("rug", -4, -1.9, 0, { w: 2, d: 1.2, c: p.accent }),
      // bedroom 2
      I("singlebed", -0.9, -3.4, 0), I("singlebed", 0.9, -3.4, 0), I("wardrobe", 1.5, -1.4, R),
      // bathroom
      I("toilet", 3.2, -4.1, 0), I("shower", 5.2, -3.8, 0), I("basin", 4.2, -4.2, 0),
      // parlour
      I("sofa", -3.0, 3.9, R), I("loveseat", -5.3, 1.7, H), I("armchair", -0.4, 1.9, -H),
      I("rug", -3.0, 1.6, 0, { w: 3.2, d: 2.4, c: p.accent }), I("coffeetable", -3.0, 1.7), I("tv", -3.0, 0.1, 0),
      I("ceilingfan", -3.0, 1.6), I("plant", -5.4, 3.7), I("lamp", -5.4, 0.3),
      I("wallart", -3.0, -0.72, R, { y: 1.5, c: p.accent }), I("generator", -5.4, -0.2, H),
      // kitchen and dining
      I("stove", 2.0, 4.1, R), I("counter", 3.1, 4.15, R, { w: 1.2 }), I("sink", 4.2, 4.15, R), I("fridge", 5.5, 3.3, -H),
      I("diningtable", 3.9, 1.0), ...around("chair", 3.9, 1.0, 0.95, 4, 0.8),
      I("mortar", 1.7, 3.4), I("calendar", -5.93, 0.9, H, { y: 1.4, c: p.accent }), I("meterbox", -2.0, -0.72, R, { y: 1.3 }), I("radio", -3.0, 1.7, 0, { y: 0.42 }), I("carvedstool", -0.6, 0.5),
    ],
  });
}

/** Duplex: living room, dining, kitchen, study, master suite and two bedrooms. */
function duplex(p: Palette, owner?: string): Layout {
  return lay({
    id: "duplex",
    name: owner ? `${owner}'s duplex` : "Duplex",
    w: 16,
    d: 11,
    floor: p.floor,
    wall: p.wall,
    trim: p.trim,
    accent: p.accent,
    exitX: -4,
    walls: [
      W(-8, -1, -4.5, -1, 0.5),
      W(-4.5, -1, -0.5, -1, 0.5),
      W(-0.5, -1, 3, -1, 0.5),
      W(3, -1, 8, -1, 0.5),
      W(-4.5, -5.5, -4.5, -1),
      W(-0.5, -5.5, -0.5, -1),
      W(3, -5.5, 3, -1),
      W(0.5, -1, 0.5, 5.5, 0.7, 1.2),
    ],
    zones: [
      { x: -2.5, z: -3.2, w: 3.6, d: 4.2, floor: "tile", color: "#dfe5e0" },
      { x: 5.5, z: -3.2, w: 4.8, d: 4.2, floor: "wood" },
      { x: 4.2, z: 2.4, w: 7, d: 6, floor: "tile", color: "#e6e2d6" },
    ],
    items: [
      // master suite
      I("bed", -6.3, -3.6, 0, { w: 1.8 }), I("sidetable", -7.6, -4.3), I("sidetable", -5.0, -4.3), I("wardrobe", -7.6, -1.8, H, { w: 1.4 }),
      I("rug", -6.3, -2.2, 0, { w: 2.6, d: 1.4, c: p.accent }), I("lamp", -4.9, -1.6),
      // en-suite
      I("toilet", -3.4, -5.1), I("shower", -1.2, -4.8), I("basin", -2.3, -5.2),
      // bedroom 2
      I("bed", 1.2, -3.5, 0), I("wardrobe", 2.3, -1.6, R), I("sidetable", 2.4, -4.9),
      // study
      ...[I("pcdesk", 5.5, -4.7, 0, { w: 1.5 }), I("chair", 5.5, -3.9, R), I("bookshelf", 4.0, -5.1, 0), I("bookshelf", 5.1, -5.1, 0), I("bookshelf", 7.4, -3.6, -H), I("plant", 7.4, -1.6), I("armchair", 7.0, -2.2, -H), I("lamp", 3.6, -1.6)],
      // living room
      I("sofa", -6.5, 4.8, R), I("loveseat", -4.0, 4.8, R, { w: 1.4 }), I("sofa", -7.5, 1.6, H), I("armchair", -3.2, 1.2, -H),
      I("rug", -5.0, 2.0, 0, { w: 4, d: 3, c: p.accent }), I("coffeetable", -5.0, 2.1), I("tv", -5.0, 0.05, 0, { w: 1.5 }),
      I("ceilingfan", -5.0, 2.0), I("ceilingfan", 4.5, 2.5), I("plant", -7.6, 3.8), I("plant", -1.5, 0.4), I("lamp", -1.5, 4.8),
      I("wallart", -5.0, -0.92, R, { y: 1.6, c: p.accent, w: 1.4 }), I("generator", -7.6, 0.3, H),
      // dining
      I("diningtable", 4.0, 2.2, 0, { w: 2.2 }), ...around("chair", 4.0, 2.2, 1.15, 6, 0.5),
      // kitchen
      I("stove", 1.4, 5.0, R), I("counter", 2.5, 5.05, R, { w: 1.5 }), I("sink", 3.7, 5.05, R), I("fridge", 7.3, 4.4, -H),
      I("counter", 6.2, 5.05, R, { w: 1.6 }), I("waterdispenser", 7.4, 1.4, -H),
      I("sewingmachine", 7.0, -5.0, 0), I("mortar", 4.7, 4.9), I("radio", -5.0, 2.1, 0, { y: 0.42 }), I("calendar", 0.2, -5.43, 0, { y: 1.5, c: p.accent }), I("carvedstool", -3.0, 0.3),
    ],
  });
}

/** Mansion: grand parlour, home cinema, formal dining, big kitchen, study, master suite, guest rooms. */
function mansion(p: Palette, owner?: string): Layout {
  return lay({
    id: "mansion",
    name: owner ? `${owner}'s mansion` : "Mansion",
    w: 22,
    d: 14,
    floor: p.floor,
    wall: p.wall,
    trim: p.trim,
    accent: p.accent,
    exitX: -2,
    walls: [
      // back row: master suite | bath | guest 1 | guest 2 | study
      W(-11, -2, -6, -2, 0.5),
      W(-6, -2, -2.5, -2, 0.5),
      W(-2.5, -2, 1.5, -2, 0.5),
      W(1.5, -2, 5.5, -2, 0.5),
      W(5.5, -2, 11, -2, 0.5),
      W(-6, -7, -6, -2),
      W(-2.5, -7, -2.5, -2),
      W(1.5, -7, 1.5, -2),
      W(5.5, -7, 5.5, -2),
      // front row: cinema room on the right, kitchen mid-right
      W(5, -2, 5, 7, 0.222, 1.4),
      W(5, 2.2, 11, 2.2, 0.25, 1.4),
    ],
    zones: [
      { x: -8.5, z: -4.5, w: 5, d: 5, floor: "carpet", color: "#7a5a3a" },
      { x: -4.25, z: -4.5, w: 3.5, d: 5, floor: "tile", color: "#dfe5e0" },
      { x: 8.2, z: -4.5, w: 5.5, d: 5, floor: "wood" },
      { x: 8, z: 4.6, w: 6, d: 4.8, floor: "carpet", color: "#2b2540" },
      { x: 8, z: 0.1, w: 6, d: 4, floor: "tile", color: "#e6e2d6" },
    ],
    items: [
      // master suite
      I("bed", -8.5, -5.0, 0, { w: 2.0 }), I("sidetable", -10.2, -5.8), I("sidetable", -6.8, -5.8), I("wardrobe", -10.4, -3.0, H, { w: 1.8 }),
      I("armchair", -7.4, -2.8, R), I("rug", -8.5, -3.6, 0, { w: 3.2, d: 2, c: p.accent }), I("chandelier", -8.5, -4.5), I("lamp", -10.4, -6.2),
      // ensuite
      I("toilet", -5.0, -6.4), I("shower", -3.1, -6.2), I("basin", -4.1, -6.5),
      // guest 1 & 2
      I("bed", -0.5, -5.6, 0), I("wardrobe", 0.8, -2.7, R), I("sidetable", -1.8, -6.6),
      I("bed", 3.5, -5.6, 0), I("wardrobe", 4.9, -2.7, R), I("sidetable", 2.2, -6.6),
      // study / library
      I("pcdesk", 9.0, -6.2, 0, { w: 1.8 }), I("chair", 9.0, -5.3, R), ...col("bookshelf", 10.6, -4.6, 3, 1.15, -H), ...row("bookshelf", 6.3, -6.8, 2, 1.15, 0),
      I("armchair", 6.6, -3.2, H), I("rug", 8.2, -3.7, 0, { w: 2.6, d: 1.6, c: "#2f3b82" }), I("plant", 9.8, -2.7), I("lamp", 6.3, -2.6),
      // grand parlour
      I("sofa", -8.5, 5.9, R, { w: 2.4 }), I("sofa", -4.5, 5.9, R, { w: 2.4 }), I("sofa", -9.8, 2.2, H), I("loveseat", -1.0, 3.2, -H),
      I("rug", -6.0, 3.0, 0, { w: 5, d: 3.6, c: p.accent }), I("coffeetable", -6.0, 3.0, 0, { w: 1.4 }),
      I("tv", -6.0, -1.4, 0, { w: 2.0 }), I("chandelier", -6, 3), I("chandelier", 0, 3), I("ceilingfan", -3, 4),
      I("plant", -10.2, 6.2), I("plant", -1.4, 6.2), I("plant", -10.3, -1.4), I("lamp", -1.6, 0.6), I("lamp", -10.3, 4.4),
      I("fountain", -0.2, 0.3, 0, { w: 1.4, d: 1.4 }), I("wallart", -9.4, -1.9, 0, { y: 1.6, w: 1.4, c: p.accent }), I("generator", -10.4, 0.2, H),
      // formal dining
      I("diningtable", 1.2, 4.4, 0, { w: 3.2, d: 1.1 }), ...row("chair", -0.1, 3.4, 3, 1.3, R), ...row("chair", -0.1, 5.4, 3, 1.3, 0),
      I("cabinet", 3.4, 6.6, R, { w: 1.4 }),
      // kitchen
      I("stove", 10.45, -1.2, -H), I("counter", 10.45, -0.35, -H, { w: 1.0 }), I("sink", 10.45, 0.55, -H), I("fridge", 10.45, 1.5, -H),
      I("counter", 7.9, -0.3, 0, { w: 2.2 }), ...row("barstool", 7.0, 0.55, 3, 0.9, 0), I("waterdispenser", 6.0, 1.9, 0),
      // home cinema
      I("tv", 9.0, 2.75, R, { w: 3.0 }), I("sofa", 7.0, 6.0, R, { w: 2.4 }), I("sofa", 9.6, 6.0, R, { w: 2.4 }), I("armchair", 6.0, 4.3, H), I("armchair", 10.4, 4.3, -H),
      I("coffeetable", 8.3, 4.3), I("plant", 5.6, 6.6),
      I("agbadastand", 0.9, -6.4), I("calabash", 3.1, 6.6, R, { y: 0.95 }), I("ibeji", 3.8, 6.6, R, { y: 0.95 }), I("radio", -6.0, 3.0, 0, { y: 0.42 }), I("gascooker", 9.1, -1.2, -H), I("meterbox", -10.93, 1.4, H, { y: 1.3 }),
    ],
  });
}

const FLAT_LAYOUT = flat(PALETTES[0]);

/** Home interior for a plot tier, styled by owner. */
export function homeLayout(plotTier: number | "flat", ownerSeed: string, ownerName?: string): Layout {
  let h = 0;
  for (let i = 0; i < ownerSeed.length; i++) h = (h * 31 + ownerSeed.charCodeAt(i)) >>> 0;
  const pal = PALETTES[h % PALETTES.length];
  if (plotTier === "flat") return flat(PALETTES[h % 3]);
  if (plotTier >= 3) return mansion(PALETTES[4 - (h % 2)], ownerName);
  if (plotTier === 2) return duplex(pal, ownerName);
  return bungalow(pal, ownerName);
}

export const FLAT = FLAT_LAYOUT;

/* ----------------------------------------------------------------------------------------------
 * Public places
 * -------------------------------------------------------------------------------------------- */

const PLACE_LAYOUTS: Record<string, Layout> = {
  ui: lay({
    id: "ui", name: "Faculty Lecture Hall & Library", w: 18, d: 12, floor: "tile", wall: SAND, trim: COCOA, accent: INDIGO, light: "bright", exitX: -4,
    walls: [W(3, -6, 3, 6, 0.55, 1.4)],
    zones: [{ x: 6, z: 0, w: 6, d: 12, floor: "carpet", color: "#5a4636" }],
    items: [
      I("blackboard", -3, -5.9, 0, { w: 4 }), I("podium", -3, -4.6, 0), I("clock", 0.2, -5.9, 0, { y: 2 }),
      ...grid("studentdesk", -7, -2.4, 4, 3, 2.0, 2.0, R), ...grid("chair", -7, -1.7, 4, 3, 2.0, 2.0, R),
      I("ceilingfan", -5, -1), I("ceilingfan", -1, -1), I("plant", -8.4, -5.2), I("plant", 1.6, 5.2),
      ...col("bookshelf", 8.8, -4.5, 4, 1.4, -H), ...row("bookshelf", 4.4, -5.8, 3, 1.15, 0),
      I("diningtable", 5.8, 0.4, 0, { w: 2.2 }), ...around("chair", 5.8, 0.4, 1.2, 6, 0.4), I("lamp", 4.1, 4.8),
      I("wallart", 6.4, -5.9, 0, { y: 1.9, c: INDIGO, w: 1.2 }),
    ],
  }),

  zoo: lay({
    id: "zoo", name: "UI Zoo Visitor Centre", w: 14, d: 10, floor: "tile", wall: "#dcebc8", trim: COCOA, accent: TEAL, light: "bright", exitX: 0,
    walls: [],
    items: [
      ...row("tank", -4.6, -4.4, 3, 4.6, 0), I("rug", 0, 0.4, 0, { w: 4, d: 3, c: TEAL }),
      I("bench", -3, 1.2, 0), I("bench", 3, 1.2, 0), I("plant", -6.4, -4.6), I("plant", 6.4, -4.6), I("plant", -6.4, 3.8), I("plant", 6.4, 3.8),
      I("counter", 5.2, 3.8, R, { w: 2.2 }), I("rack", 3.6, 3.6, R), I("displaycase", -5.4, 3.2, H, { w: 1.6 }), I("ceilingfan", 0, 0),
      I("wallart", -6.9, 0, H, { y: 1.8, c: TEAL }),
    ],
  }),

  "bodija-market": lay({
    id: "bodija-market", name: "Bodija Market", w: 30, d: 22, floor: "concrete", wall: SAND, trim: COCOA, accent: RUST, exitX: 0,
    walls: [],
    items: [
      ...row("stall", -11.2, -8, 8, 3.2, 0), ...row("stall", -11.2, -4.4, 8, 3.2, 0), ...row("stall", -11.2, -0.8, 8, 3.2, 0), ...row("stall", -11.2, 2.8, 8, 3.2, 0),
      ...row("umbrella", -11.2, -8.9, 8, 3.2), ...row("umbrella", -11.2, -5.3, 8, 3.2), ...row("umbrella", -11.2, -1.7, 8, 3.2), ...row("umbrella", -11.2, 1.9, 8, 3.2),
      ...col("crates", -14.1, -8, 4, 3.6, 0), ...col("sacks", 14.1, -8, 4, 3.6, 0),
      I("rack", -13.8, 8.2, 0, { w: 2 }), I("rack", 13.8, 8.2, 0, { w: 2 }), I("cooler", -9, 7.4), I("cooler", 9, 7.4),
      I("mortar", -5, 7.2), I("mortar", 5, 7.2), I("calabash", -2.5, 7.4), I("calabash", 2.5, 7.4), I("provisions", 14.3, 6.2, -H), I("provisions", -14.3, 6.2, H),
      I("ceilingfan", -6, 5), I("ceilingfan", 6, 5), I("ceilingfan", -6, -2.5), I("ceilingfan", 6, -2.5), I("plant", -14.2, 9.6), I("plant", 14.2, 9.6),
    ],
  }),

  "amala-skye": lay({
    id: "amala-skye", name: "Amala Skye", w: 12, d: 9, floor: "redoxide", wall: "#d9a07a", trim: COCOA, accent: OCHRE, exitX: 0,
    walls: [W(-6, -2.2, 6, -2.2, 0.79, 1.4)],
    zones: [{ x: 0, z: -3.6, w: 12, d: 2.8, floor: "tile", color: "#e6e2d6" }],
    items: [
      I("bar", -1.6, -1.7, 0, { w: 4.0 }), I("stove", -3.5, -4.2, 0), I("stove", -2.5, -4.2, 0), I("sink", 0.2, -4.2, 0), I("fridge", 4.9, -3.9, R), I("counter", 2.2, -4.2, 0, { w: 1.6 }),
      ...[[-3.6, 0.8], [0, 1.0], [3.6, 0.8], [-3.0, 3.4], [3.0, 3.4]].flatMap(([x, z]) => [I("roundtable", x, z), ...around("plasticchair", x, z, 0.85, 3, 0.6)]),
      I("tv", 5.75, 1.0, -H), I("cooler", 5.5, 3.3, -H), I("mortar", 3.8, -4.2), I("provisions", -5.2, -4.2, 0), I("ceilingfan", -2, 2), I("ceilingfan", 3, 2), I("plant", -5.4, 3.8), I("wallart", -5.9, 1.0, H, { y: 1.7, c: OCHRE }),
    ],
  }),

  uch: lay({
    id: "uch", name: "UCH Outpatients", w: 16, d: 11, floor: "tile", wall: "#e4eef0", trim: "#5a7a8c", accent: "#d85a5a", light: "bright", exitX: -3,
    walls: [W(-1, -5.5, -1, 0, 0.8, 1.2), W(1, -5.5, 1, 0, 0.8, 1.2)],
    zones: [{ x: 4.5, z: -2.7, w: 7, d: 5.5, floor: "concrete", color: "#d8e0e4" }],
    items: [
      I("desk", -5.5, -4.6, 0, { w: 1.6 }), I("chair", -5.5, -3.8, R), I("chair", -4.2, -4.4, H), I("hospitalbed", -7.2, -2.2, 0, { w: 0.9 }), I("cabinet", -2.2, -5.1, 0), I("curtain", -6.3, -1.6, 0),
      ...row("hospitalbed", 2.6, -4.3, 4, 1.6, 0), ...row("curtain", 3.4, -1.1, 3, 1.6, 0), I("cabinet", 7.4, -1.0, -H),
      I("counter", -5.5, 2.9, R, { w: 3 }), I("pcdesk", -6.0, 4.1, R), I("chair", -6.0, 4.75, R), ...row("bench", 0.3, 4.2, 3, 1.9, R), ...row("bench", 0.3, 2.0, 3, 1.9, R),
      I("waterdispenser", 6.9, 4.6), I("plant", 7.2, 2.0), I("plant", -7.4, 1.0), I("clock", -0.2, -5.4, 0, { y: 2 }), I("wallart", 5.0, 5.4, R, { y: 1.8, c: "#d85a5a" }),
    ],
  }),

  agodi: lay({
    id: "agodi", name: "Agodi Gardens Pavilion", w: 12, d: 9, floor: "tile", wall: "#d6e8c8", trim: COCOA, accent: TEAL, light: "bright", exitX: 0,
    walls: [],
    zones: [{ x: 0, z: 0, w: 12, d: 9, floor: "grass", color: "#9ad88f" }, { x: 0, z: -0.3, w: 7, d: 5, floor: "tile", color: "#efe8d4" }],
    items: [
      I("fountain", 0, -0.5, 0, { w: 2.2, d: 2.2 }), ...around("bench", 0, -0.5, 2.4, 4, 0.8), I("diningtable", -4.3, 2.6), I("bench", -4.3, 1.8, 0, { w: 1.4 }), I("bench", -4.3, 3.4, R, { w: 1.4 }),
      I("diningtable", 4.3, 2.6), I("bench", 4.3, 1.8, 0, { w: 1.4 }), I("bench", 4.3, 3.4, R, { w: 1.4 }),
      I("plant", -5.4, -3.8), I("plant", 5.4, -3.8), I("plant", -5.4, 0), I("plant", 5.4, 0), I("plant", 0, -3.9), I("plant", -2.6, -3.6), I("plant", 2.6, -3.6),
    ],
  }),

  amusement: lay({
    id: "amusement", name: "Trans-Amusement Arcade", w: 14, d: 10, floor: "carpet", wall: "#3a3470", trim: "#1d1a40", accent: "#e85d9a", light: "cool", exitX: 0,
    walls: [],
    zones: [{ x: 0, z: 0, w: 14, d: 10, floor: "carpet", color: "#2b2540" }],
    items: [
      ...row("arcade", -5.5, -4.5, 6, 2.2, 0), ...row("arcade", -3.3, -1.2, 4, 2.2, R), ...row("barstool", -3.3, -0.2, 4, 2.2, R),
      I("clawmachine", 5.6, 1.6, -H), I("clawmachine", 5.6, 3.2, -H), I("counter", -5.4, 3.4, R, { w: 2.4 }), I("rack", -2.6, 3.9, R), I("bench", 2.6, 3.8, R), I("plant", 6.4, -4.6), I("plant", -6.4, 4.2),
      I("rug", 0, 2, 0, { w: 4, d: 2, c: "#e85d9a" }),
    ],
  }),

  "mapo-hall": lay({
    id: "mapo-hall", name: "Mapo Council Hall", w: 18, d: 12, floor: "wood", wall: CREAM, trim: COCOA, accent: "#8a2f3c", light: "bright", exitX: 0,
    walls: [],
    items: [
      I("stage", 0, -4.6, 0, { w: 8, d: 2.6 }), I("podium", 0, -4.8, 0, { y: 0.5 }), I("flag", -3.6, -5.2), I("flag", 3.6, -5.2), I("chandelier", -4, 0), I("chandelier", 4, 0),
      ...grid("chair", -4.4, -2, 5, 5, 2.2, 1.45, R),
      I("wallart", -8.9, -2, H, { y: 1.8, c: "#8a2f3c" }), I("wallart", 8.9, -2, -H, { y: 1.8, c: "#8a2f3c" }), I("plant", -8.2, -5.2), I("plant", 8.2, -5.2), I("plant", -8.2, 5.0), I("plant", 8.2, 5.0),
      I("rug", 0, -3.0, 0, { w: 3, d: 6, c: "#8a2f3c" }),
    ],
  }),

  dugbe: lay({
    id: "dugbe", name: "Dugbe Cloth Market", w: 16, d: 11, floor: "concrete", wall: "#e0bd86", trim: COCOA, accent: INDIGO, exitX: 0,
    walls: [],
    items: [
      ...row("rack", -6.5, -4.5, 6, 2.6, 0), ...row("stall", -5, -1.2, 3, 5, 0), ...row("rack", -6, 2.2, 5, 3, R),
      I("umbrella", -5, -1.2), I("umbrella", 0, -1.2), I("umbrella", 5, -1.2), I("crates", 7.2, 4.4), I("crates", -7.4, 4.4), I("ceilingfan", -3, 3), I("ceilingfan", 3, 3),
      I("rug", 0, 4.2, 0, { w: 4, d: 1.4, c: INDIGO }),
      I("sewingmachine", -5.5, 4.7, R), I("sewingmachine", -3.5, 4.7, R), I("mannequin", 2.5, 4.6), I("mannequin", 4.2, 4.6), I("agbadastand", 5.8, 4.6),
    ],
  }),

  ventura: lay({
    id: "ventura", name: "Ventura Mall Atrium", w: 18, d: 12, floor: "marble", wall: "#f4f1ec", trim: "#7c7a74", accent: "#c75c9a", light: "bright", exitX: 0,
    walls: [W(-9, -6, -3, -6)],
    items: [
      ...row("rack", -8, -5.2, 3, 2.2, 0), ...row("rack", 3.4, -5.2, 3, 2.2, 0), ...row("counter", -7, -2.8, 2, 3.8, 0, { w: 1.8 }),
      I("fountain", 0, 0, 0, { w: 2.4, d: 2.4 }), ...around("bench", 0, 0, 2.2, 4, 0.8, { w: 1.2 }),
      ...[[-6.5, 3.2], [-3.2, 4], [4, 3.2], [7, 4]].flatMap(([x, z]) => [I("roundtable", x, z), ...around("barstool", x, z, 0.8, 3, 0.4)]),
      I("liftdoor", 8.9, -3, -H), I("plant", -8.4, 5.2), I("plant", 8.4, 5.2), I("plant", -3.4, -2), I("plant", 3.4, -2), I("chandelier", -4, 0), I("chandelier", 4, 0),
      I("clawmachine", 8.3, 0.6, -H), I("arcade", 8.3, 1.8, -H),
    ],
  }),

  premier: lay({
    id: "premier", name: "Premier Hotel Lobby", w: 14, d: 10, floor: "marble", wall: "#e6dcc6", trim: "#5a3a24", accent: "#2f6f66", light: "warm", exitX: 0,
    walls: [],
    items: [
      I("counter", 0, -3.4, 0, { w: 4 }), I("pcdesk", -1.2, -4.5, 0), I("clock", 0, -4.95, 0, { y: 2.2 }), I("wallart", -4.5, -4.95, 0, { y: 1.8, c: "#2f6f66", w: 1.3 }), I("wallart", 4.5, -4.95, 0, { y: 1.8, c: "#2f6f66", w: 1.3 }),
      I("rug", -3.5, 0.6, 0, { w: 3.6, d: 2.8, c: "#2f6f66" }), I("sofa", -3.5, 2.0, R), I("sofa", -5.6, 0.6, H), I("coffeetable", -3.5, 0.6), I("armchair", -1.6, 0.6, -H),
      I("bar", 4.6, 1.4, -H, { w: 3.4 }), ...col("barstool", 3.5, -0.3, 4, 0.8, -H), I("liftdoor", 6.9, -3, -H), I("chandelier", 0, 0), I("chandelier", -3.5, 0.6), I("tv", 6.7, 3.4, -H),
      I("plant", -6.4, -4.5), I("plant", 6.2, -4.5), I("plant", -6.4, 4.2), I("plant", 3.0, 4.2),
    ],
  }),

  cultural: lay({
    id: "cultural", name: "Cultural Centre Mokola", w: 14, d: 11, floor: "wood", wall: "#d9b08c", trim: COCOA, accent: INDIGO, exitX: 0,
    walls: [],
    items: [
      I("stage", 0, -4.2, 0, { w: 6.5, d: 2.8 }), ...row("drum", -1.8, -4.4, 4, 1.2, 0, { y: 0.5 }), I("rug", 0, -1.2, 0, { w: 4.5, d: 1.6, c: INDIGO }),
      ...col("displaycase", -6.4, -2.4, 3, 2.0, H, { w: 1.5 }), ...col("displaycase", 6.4, -2.4, 3, 2.0, -H, { w: 1.5 }),
      ...row("bench", -3, 1.2, 2, 3.6, 0, { w: 2.4 }), ...row("bench", -3, 3.2, 2, 3.6, 0, { w: 2.4 }),
      I("wallart", -6.9, 3.2, H, { y: 1.8, c: INDIGO }), I("wallart", 6.9, 3.2, -H, { y: 1.8, c: INDIGO }),
      I("carvedstool", -0.7, 1.7), I("carvedstool", 0.7, 1.7), I("ibeji", -3.0, -4.4, 0, { y: 0.3 }), I("ibeji", 3.0, -4.4, 0, { y: 0.3 }), I("calabash", -6.0, 4.4, 0), I("calabash", 6.0, 4.4, 0), I("wallart", -3.5, -5.4, 0, { y: 2, c: INDIGO, w: 1.4 }), I("wallart", 3.5, -5.4, 0, { y: 2, c: RUST, w: 1.4 }),
      I("plant", -6.4, -4.8), I("plant", 6.4, -4.8), I("ceilingfan", -3, 0), I("ceilingfan", 3, 0),
    ],
  }),

  "cocoa-house": lay({
    id: "cocoa-house", name: "Cocoa House Offices", w: 16, d: 11, floor: "carpet", wall: "#ece8e0", trim: "#6b6a64", accent: "#d9a22b", light: "bright", exitX: -3,
    walls: [W(4.5, -5.5, 4.5, -0.5, 0.7, 1.2)],
    zones: [{ x: 0, z: 0, w: 16, d: 11, floor: "carpet", color: "#8a8c92" }, { x: 6.5, z: -3, w: 4, d: 5, floor: "wood" }],
    items: [
      ...grid("pcdesk", -6.5, -4.2, 4, 2, 3.0, 3.6, 0), ...grid("chair", -6.5, -3.4, 4, 2, 3.0, 3.6, R).map((c) => ({ ...c, rot: R })),
      I("diningtable", 6.6, -3.0, 0, { w: 2.8 }), ...row("chair", 5.5, -4.2, 3, 1.1, 0), ...row("chair", 5.5, -1.8, 3, 1.1, R), I("blackboard", 6.6, -5.4, 0, { w: 2.4 }),
      I("counter", -5.8, 4.2, R, { w: 3 }), I("pcdesk", -6.8, 5.0, R), ...row("bench", -1, 4.6, 2, 2.4, R), I("waterdispenser", 3.4, 4.8), I("plant", 7.2, 4.6), I("plant", -7.4, -1.0), I("plant", 3.6, -5.0),
      I("bookshelf", 3.9, -4.5, -H), I("ceilingfan", -3.5, -1.2), I("ceilingfan", 2, 1), I("wallart", 0, -5.4, 0, { y: 1.9, c: "#d9a22b", w: 1.6 }), I("clock", 7.4, -5.4, 0, { y: 2 }),
    ],
  }),

  bowers: lay({
    id: "bowers", name: "Bower's Tower Gallery", w: 7, d: 7, floor: "wood", wall: "#c97a52", trim: "#5a3a24", accent: OCHRE, exitX: 0,
    walls: [],
    items: [I("stairs", -2.4, -1.6, H, { w: 3.0, d: 1.1 }), I("displaycase", 2.2, -2.2, 0, { w: 1.4 }), I("bench", 2.2, 0.8, -H, { w: 1.4 }), I("plant", 2.8, -2.9), I("rug", 0, 1, 0, { w: 2.4, d: 1.4, c: OCHRE }), I("wallart", 0, -3.43, 0, { y: 1.7, c: RUST })],
  }),

  mosque: lay({
    id: "mosque", name: "Central Mosque", w: 14, d: 12, floor: "carpet", wall: "#f1ead7", trim: "#8a7a4a", accent: "#2f6f4f", light: "warm", exitX: 3,
    walls: [W(-7, 3.5, -2.5, 3.5, 0.5, 1.2)],
    zones: [{ x: 0, z: 0, w: 14, d: 12, floor: "carpet", color: "#2f6f4f" }, { x: -4.7, z: 4.8, w: 4.5, d: 2.3, floor: "tile", color: "#e6e2d6" }],
    items: [
      I("mimbar", 4, -5.3, 0), I("chandelier", 0, -1), I("chandelier", 0, 3.5), ...grid("prayermat", -4.5, -3.8, 5, 3, 2.2, 2.0, 0),
      ...row("basin", -6, 5.4, 4, 1.1, R), I("bench", -4.6, 4.3, 0, { w: 2 }), I("wallart", -6.9, -1, H, { y: 1.9, c: "#2f6f4f", w: 1.2 }), I("wallart", 6.9, -1, -H, { y: 1.9, c: "#2f6f4f", w: 1.2 }),
      I("plant", -6.4, -5.2), I("plant", 6.4, 4.8), I("ceilingfan", -2.2, 0), I("ceilingfan", 2.2, 0),
    ],
  }),

  cathedral: lay({
    id: "cathedral", name: "St. David's Cathedral", w: 14, d: 16, floor: "wood", wall: "#d8cdbb", trim: "#6b6458", accent: "#7a1f2e", light: "warm", exitX: 0,
    walls: [],
    items: [
      I("altar", 0, -7.0, 0), I("pulpit", -3.6, -5.8, H), I("flag", 4.6, -6.6), I("flag", -4.6, -7.4), I("rug", 0, -4.2, 0, { w: 2.2, d: 8, c: "#7a1f2e" }),
      ...row("pew", -3.2, -2.4, 1, 0, 0), ...[0, 1, 2, 3, 4].flatMap((k) => [I("pew", -3.0, -3.2 + k * 2.0, 0, { w: 2.6 }), I("pew", 3.0, -3.2 + k * 2.0, 0, { w: 2.6 })]),
      I("chandelier", 0, -2), I("chandelier", 0, 3), I("plant", -6.2, -7.2), I("plant", 6.2, -7.2), I("wallart", -6.9, -1.5, H, { y: 1.9, c: "#7a1f2e" }), I("wallart", 6.9, -1.5, -H, { y: 1.9, c: "#7a1f2e" }),
      I("wallart", -6.9, 3.5, H, { y: 1.9, c: "#2f3b82" }), I("wallart", 6.9, 3.5, -H, { y: 1.9, c: "#2f3b82" }), I("ceilingfan", -3, 6), I("ceilingfan", 3, 6),
    ],
  }),

  stadium: lay({
    id: "stadium", name: "Lekan Salami Stadium Concourse", w: 18, d: 12, floor: "concrete", wall: "#8fc7c4", trim: "#3a6b68", accent: "#16a34a", light: "bright", exitX: -1.8,
    walls: [],
    zones: [{ x: 0, z: -3.6, w: 12, d: 4.4, floor: "grass", color: "#58b66a" }],
    items: [
      I("pitch", 0, -3.6, 0, { w: 12, d: 4.4 }), I("goalpost", -5.4, -3.6, H, { w: 3.2 }), I("goalpost", 5.4, -3.6, -H, { w: 3.2 }),
      I("ticketbooth", -6, 3.6, R), I("ticketbooth", 6, 3.6, R), ...row("stall", -3.6, 4.6, 3, 3.6, R), ...row("rack", -2.4, 1.2, 2, 4.8, R), ...row("bench", -7.5, -0.6, 2, 15, 0, { w: 2 }),
      I("flag", -8.4, 0.5), I("flag", 8.4, 0.5), I("flag", 0, 0.5, 0, { c: "#16a34a" }), I("wallart", -8.9, 3, H, { y: 1.9, c: "#16a34a" }), I("wallart", 8.9, 3, -H, { y: 1.9, c: "#16a34a" }),
    ],
  }),

  "ring-road": lay({
    id: "ring-road", name: "Ring Road Motor Park Office", w: 14, d: 9, floor: "concrete", wall: "#f0cd6a", trim: "#7a5a1a", accent: "#2a2f3a", exitX: 0,
    walls: [],
    items: [
      I("counter", -2.5, -3.7, 0, { w: 3 }), I("pcdesk", -5.4, -4.0, 0), I("counter", 3, -3.7, 0, { w: 3 }), I("wallart", 0, -4.45, 0, { y: 1.7, c: "#2a2f3a", w: 2.4 }), I("clock", 6, -4.45, 0, { y: 2 }),
      ...row("bench", -4.5, 0.2, 3, 3.2, 0, { w: 2.4 }), ...row("bench", -4.5, 2.4, 3, 3.2, 0, { w: 2.4 }), I("stall", 5.2, 3.6, R), I("waterdispenser", 6.5, 0), I("ceilingfan", -3, 1), I("ceilingfan", 3, 1), I("plant", -6.4, 3.8),
    ],
  }),

  golf: lay({
    id: "golf", name: "Ibadan Golf Club House", w: 14, d: 10, floor: "wood", wall: "#cfd9c4", trim: "#3f5a3a", accent: "#2f6f4f", exitX: 0,
    walls: [],
    items: [
      I("bar", 0, -3.8, 0, { w: 4.6 }), ...row("barstool", -1.8, -2.9, 5, 0.9, 0), I("trophycase", -5.2, -4.5, 0), I("trophycase", 5.2, -4.5, 0), I("tv", 6.7, -1, -H),
      I("rug", -3.5, 1.0, 0, { w: 3.6, d: 2.6, c: "#2f6f4f" }), I("sofa", -3.5, 2.4, R), I("armchair", -5.4, 0.8, H), I("armchair", -1.6, 0.8, -H), I("coffeetable", -3.5, 0.9),
      I("diningtable", 3.8, 1.8, 0, { w: 1.6 }), ...around("chair", 3.8, 1.8, 1.0, 4, 0.8), I("plant", -6.4, -4.2), I("plant", 6.4, 4.2), I("ceilingfan", -3.5, 1), I("ceilingfan", 3.8, 1.8), I("wallart", -6.9, 2.4, H, { y: 1.8, c: "#2f6f4f" }),
    ],
  }),

  "govt-house": lay({
    id: "govt-house", name: "Government House Reception", w: 16, d: 12, floor: "marble", wall: "#f1eee6", trim: "#8a7a5a", accent: "#1f7a46", light: "bright", exitX: 0,
    walls: [],
    items: [
      I("pcdesk", 0, -4.8, 0, { w: 2.0 }), I("armchair", 0, -3.8, R), I("flag", -2.6, -5.2), I("flag", 2.6, -5.2), I("rug", 0, -1.4, 0, { w: 5, d: 3.6, c: "#1f7a46" }),
      I("diningtable", 0, -1.4, 0, { w: 4.4, d: 1.2 }), ...row("chair", -1.9, -2.5, 4, 1.3, 0), ...row("chair", -1.9, -0.3, 4, 1.3, R),
      I("counter", -5.2, 4.4, R, { w: 3 }), ...row("bench", 2.0, 4.6, 2, 2.4, R, { w: 1.8 }), ...col("bookshelf", -7.7, -4.8, 3, 1.15, H), ...col("bookshelf", 7.7, -4.8, 3, 1.15, -H),
      I("wallart", -5, -5.9, 0, { y: 1.9, c: "#1f7a46", w: 1.2 }), I("wallart", 5, -5.9, 0, { y: 1.9, c: "#1f7a46", w: 1.2 }), I("chandelier", 0, -1.4), I("chandelier", 0, 3), I("plant", -7.2, 5.0), I("plant", 7.2, 5.0), I("clock", 0, -5.9, 0, { y: 2.4 }),
    ],
  }),
};

/* New churches and towers reuse the proven interiors of their older siblings under their own names. */
const reuse = (src: string, id: string, name: string, palette: Partial<Layout> = {}) => {
  PLACE_LAYOUTS[id] = { ...PLACE_LAYOUTS[src], ...palette, id, name };
};
reuse("cathedral", "aladura", "Aladura Prayer House", { accent: "#2b4a7a", wall: "#efe9d8" });
reuse("cathedral", "grace", "Divine Grace Assembly", { accent: "#6a2a7a", wall: "#d6dbe6", floor: "carpet" });
reuse("cathedral", "methodist", "Oke-Bola Methodist Church", { accent: "#3a5a3a" });
reuse("cocoa-house", "secretariat", "State Secretariat Offices", { accent: "#47657f" });
reuse("cocoa-house", "trustbank", "Trust Bank Banking Hall", { accent: "#1f5f8a", wall: "#e6edf2" });
reuse("cocoa-house", "cathay", "Cathay Heights Lobby", { accent: "#2b7a8a", wall: "#eef2f4" });

/* Nightlife: a dance floor, a stage with a DJ, a long bar and VIP booths. */
PLACE_LAYOUTS["club"] = lay({
  id: "club", name: "Afrobeat Lounge", w: 18, d: 13, floor: "tile", wall: "#2a1740", trim: "#150a24", accent: "#c026d3", light: "cool", exitX: -5,
  walls: [],
  zones: [{ x: 0, z: -0.5, w: 10, d: 7, floor: "tile", color: "#3b1d5a" }],
  items: [
    I("stage", 0, -5.2, 0, { w: 8, d: 2.2 }), I("drum", -3.2, -5.1), I("drum", 3.2, -5.1),
    I("bar", 7.4, 0, -H, { w: 7 }), ...col("barstool", 6.2, -2.5, 6, 1.0, 0),
    ...col("loveseat", -7.9, -2.6, 3, 2.6, H, { c: "#7a1fa2" }), ...col("coffeetable", -6.7, -2.6, 3, 2.6),
    I("chandelier", 0, -0.5), I("chandelier", -4, 1.5), I("chandelier", 4, 1.5), I("lantern", -8.4, 5.2), I("lantern", 8.4, 5.2),
    I("plant", -8.4, -5.6), I("plant", 8.4, -5.6), I("wallart", -4, -6.42, 0, { y: 1.9, c: "#c026d3" }), I("wallart", 4, -6.42, 0, { y: 1.9, c: "#22d3ee" }),
  ],
});
reuse("club", "club-afrobeat", "Afrobeat Lounge", { accent: "#c026d3" });
reuse("club", "club-rooftop", "Sky Bar & Lounge", { accent: "#0ea5e9", wall: "#12263a" });
reuse("club", "club-owambe", "Owambe Garden & Dance Hall", { accent: "#d9a22b", wall: "#3a2a12", floor: "wood" });
reuse("club", "palmwine", "Palmwine Joint, Bere", { accent: "#c98b3a", wall: "#3a2410", floor: "wood" });
reuse("club", "suya-lounge", "Suya Spot & Shisha Lounge", { accent: "#b8401f", wall: "#2a1410" });
reuse("ring-road", "airport", "Ibadan Airport Terminal", { accent: "#0ea5e9", wall: "#e6edf4", floor: "tile" });

reuse("ui", "ui-library", "Kenneth Dike Library", { accent: "#8a5a2a", wall: "#e8dcc6" });
reuse("ui", "ui-science", "Faculty of Science", { accent: "#2b5a8a" });
reuse("cultural", "ui-arts", "Faculty of Arts Theatre");
reuse("mapo-hall", "ui-law", "Faculty of Law Moot Court", { accent: "#5a3a7a" });
reuse("mapo-hall", "ui-trenchard", "Trenchard Hall", { accent: "#9a6a1a" });
reuse("uch", "adeoyo", "Adeoyo Teaching Hospital");
reuse("bodija-market", "sango-market", "Sango Market Stalls");
reuse("ring-road", "iwo-road", "Iwo Road Garage Hall");
reuse("ventura", "mokola-mall", "Mokola Plaza");
reuse("ui", "poly", "Polytechnic Lecture Hall", { accent: "#4a6a2a" });
reuse("govt-house", "palace", "Olubadan's Palace Court", { accent: "#8a6a1a" });
reuse("agodi", "eleyele", "Eleyele Lake Pavilion");
reuse("premier", "oluyole-hotel", "Oluyole Hotel Lobby");
reuse("amala-skye", "challenge-eatery", "Mama Put Buka");
reuse("cathedral", "akobo-chapel", "Akobo Faith Chapel", { accent: "#7a3a1a" });
reuse("cocoa-house", "central-bank", "Central Bank Banking Hall", { accent: "#2b4a6a" });
reuse("mosque", "oje-mosque", "Oje Central Mosque");

export function placeLayout(id: string): Layout | null {
  return PLACE_LAYOUTS[id] ?? null;
}

export const ALL_PLACE_LAYOUT_IDS = Object.keys(PLACE_LAYOUTS);

/** The inside of a player's business: it looks like what it is, a gym with gym equipment, a salon with chairs and mirrors... */
export function bizLayout(bizId: string, ownerName?: string): Layout {
  const b = bizById(bizId);
  const name = `${ownerName ? `${ownerName}'s ` : ""}${b?.name ?? "Shop"}`;
  const base = { name, w: 10, d: 8, wall: "#f4efe6", trim: "#3a3f48", accent: b?.color ?? "#16a34a", light: "bright" as const, exitX: 0, walls: [] as Wall[] };
  const fans = [I("ceilingfan", -2.5, 0), I("ceilingfan", 2.5, 0), I("plant", -4.6, 3.4), I("plant", 4.6, 3.4)];
  switch (bizId) {
    case "gym":
      return lay({
        ...base, id: "biz", floor: "concrete", light: "cool", wall: "#e7eaee", trim: "#1f2937", w: 12, d: 9,
        items: [
          // mirrors along the back wall, treadmills facing them
          I("gymmirror", -3, -4.42, 0), I("gymmirror", 3, -4.42, 0),
          ...row("treadmill", -4.6, -2.6, 3, 1.5, 0),
          I("dumbbells", 3.4, -3.9, 0), I("dumbbells", 5.2, -3.9, 0),
          I("weightbench", 3.8, -1.2, 0), I("weightbench", 3.8, 1.0, 0),
          I("punchingbag", -5.2, 0.6, 0),
          ...row("exercisebike", -3.4, 1.3, 3, 1.0, R),
          I("yogamat", 0.4, 0.9, 0, { c: "#7c3aed" }), I("yogamat", 1.3, 0.9, 0, { c: "#0ea5e9" }),
          I("counter", -4.7, 3.7, 0, { w: 2.0 }), I("waterdispenser", -3.2, 3.9), I("cooler", 5.2, 3.6),
          I("tv", 5.8, -0.2, -H), I("standingfan", 5.0, 1.0), I("standingfan", -5.2, 2.4),
          I("ceilingfan", -2.5, 0), I("ceilingfan", 2.5, 0),
        ],
      });
    case "salon":
      return lay({
        ...base, id: "biz", floor: "tile", wall: "#f3ecf7", trim: "#4c1d95",
        items: [
          ...row("mirrorstation", -3.3, -3.55, 3, 2.3, 0),
          ...row("salonchair", -3.3, -2.5, 3, 2.3, R),
          ...col("dryer", 4.3, -2.6, 2, 1.2, 0),
          I("sink", 4.3, -0.2, -H), I("armchair", 3.4, 0.4, H),
          I("counter", -3.2, 3.0, 0, { w: 2.2 }), I("loveseat", 3.4, 3.1, R), I("coffeetable", 2.0, 3.0),
          I("tv", 4.8, 1.6, -H), I("plant", -4.6, -3.5), ...fans.slice(0, 2),
        ],
      });
    case "cafe":
      return lay({
        ...base, id: "biz", floor: "wood", wall: "#f1e4d3", trim: "#5a3a24",
        items: [
          I("menuboard", 0, -3.95, 0, { y: 1.15 }), I("espresso", -2.7, -3.4, 0), I("fridge", -4.3, -3.5, 0),
          I("bar", 0.9, -2.5, 0, { w: 4.0 }), ...row("barstool", -0.6, -1.6, 4, 1.1, 0),
          I("displaycase", 3.3, -3.4, 0), I("stove", 4.55, -3.4, 0),
          ...[[-3.4, 1.2], [0, 0.4], [3.4, 1.2]].flatMap(([x, z]) => [I("roundtable", x, z), ...around("chair", x, z, 0.8, 3, 0.5)]),
          I("tv", 4.8, 0.2, -H), I("coffeetable", -4.2, 2.4), I("armchair", -4.4, 3.1, 0.6), ...fans.slice(0, 2),
        ],
      });
    case "pharmacy":
      return lay({
        ...base, id: "biz", floor: "tile", light: "cool", wall: "#eef6f1", trim: "#166534",
        items: [
          ...row("medshelf", -3.4, -3.6, 3, 1.75, 0),
          I("counter", 0, -1.4, 0, { w: 3.6 }), I("scale", 3.6, 2.4), I("scale", 4.2, 2.4),
          ...row("displaycase", -3.4, 0.4, 2, 2.0, 0), I("fridge", 4.4, -3.6, 0),
          ...row("bench", -3, 2.7, 2, 6.0, 0), I("waterdispenser", 4.6, 0.6), I("wallart", 0, -3.97, 0, { y: 2.0, w: 1.2, c: "#16a34a" }),
          ...fans.slice(0, 2),
        ],
      });
    case "mart":
      return lay({
        ...base, id: "biz", floor: "tile", w: 12, d: 9, wall: "#fbf6e9", trim: "#92400e",
        items: [
          ...row("freezer", -4.2, -4.0, 4, 1.7, 0),
          ...row("rack", -4, -2.3, 5, 2, 0), ...row("rack", -4, 0.1, 5, 2, 0),
          I("provisions", 5.2, -2.4, -H), I("provisions", 5.2, 0.4, -H), I("cooler", 5.3, 2.4, -H),
          I("counter", -4.2, 3.2, 0, { w: 1.6 }), I("counter", -2.2, 3.2, 0, { w: 1.6 }),
          ...row("trolley", 1.6, 3.4, 3, 0.8, 0), ...fans.slice(0, 2),
        ],
      });
    default:
      return lay({
        ...base, id: "biz", floor: "redoxide",
        items: [
          I("counter", 0, -3.2, 0, { w: 3 }), I("radio", -0.6, -3.3), I("provisions", -3.8, -3.6, 0), I("provisions", 3.8, -3.6, 0),
          ...row("rack", -4.2, -0.6, 3, 1.1, 0), ...row("crates", 1.2, -0.6, 3, 1.1, 0),
          I("freezer", 3.7, 1.9, 0), I("cooler", -4.5, 1.8), ...fans,
        ],
      });
  }
}

export function layoutFor(ref: InteriorRef, tierOf?: (plotId: string) => { tier: number; ownerId: string; ownerName: string; biz?: string } | undefined): Layout | null {
  if (ref.kind === "place") return placeLayout(ref.id);
  if (ref.id === "flat") return FLAT_LAYOUT;
  const plot = tierOf?.(ref.id);
  if (!plot || plot.tier < 1) return null;
  if (plot.biz) return { ...bizLayout(plot.biz, plot.ownerName), id: ref.id };
  return { ...homeLayout(plot.tier, plot.ownerId, plot.ownerName), id: ref.id };
}
