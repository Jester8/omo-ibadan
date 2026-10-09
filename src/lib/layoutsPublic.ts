import type { Item, Layout } from "./interiors";
import type { ActionDef } from "./places";
import { FUEL_PRICE } from "./fuel";
import { H, I, R, W, around, col, grid, lay, row } from "./layoutKit";

/**
 * Fire station, post office, school, filling station, Olodo health centre, library & rec centre, food bank and the three boreholes.
 * Owned by the INT-PUBLIC agent. Authored in metres like layouts.ts. No people anywhere: a chair behind a desk is a seat, never a figure.
 * Never put a `generator` in a public layout (InteriorPanel would offer to power the building), and no free bed: only the hospital and the
 * clinic have beds, and they cost money.
 */

const sign = (label: string, x: number, z: number, rot: number, c: string, w = 2.4, y = 2.1): Item => I("signboard", x, z, rot, { label, c, w, y });
const neon = (label: string, x: number, z: number, rot: number, c: string, w = 1.2, y = 1.9): Item => I("neonsign", x, z, rot, { label, c, w, y });
const variant = (base: Layout, id: string, name: string, patch: Partial<Layout> = {}): Layout => ({ ...base, ...patch, id, name });

/** Prices live here AND in placesCivic.ts (the place card): keep them equal. */
const pump = (litres: number, secs: number, label?: string): ActionDef => ({ id: `pump${litres}`, label: label ?? `Buy ${litres} L of petrol`, secs, cost: litres * FUEL_PRICE, fuel: litres });
const TOILET: ActionDef = { id: "toilet", label: "Use the public toilet", secs: 4, cost: 100, gain: { bladder: 100 } };
const BATH: ActionDef = { id: "bath", label: "Pay-and-bathe", secs: 7, cost: 250, gain: { hygiene: 100, energy: 4 } };
const PACK: ActionDef = { id: "pack", label: "Pack food parcels (volunteer)", secs: 6, gain: { energy: -18, social: 8 }, pay: 1500, rep: 3 };
const STACKS: ActionDef = { id: "stacks", label: "Read a book from the stacks", secs: 5, gain: { energy: -4, fun: 6 }, rep: 1, stat: "know", statN: 1 };
const CLINIC_BED: ActionDef = { id: "clinicbed", label: "Rest on a clinic bed", secs: 8, cost: 1000, gain: { energy: 30 } };

const FIRE = lay({
  id: "fire-station", name: "Fire Service Station", w: 16, d: 11, floor: "concrete", wall: "#f1d2cb", trim: "#7f1d1d", accent: "#c81e1e", light: "bright", exitX: 0,
  walls: [W(2.5, -5.5, 2.5, -0.5, 0.75, 1.2), W(2.5, -0.5, 8, -0.5)],
  zones: [{ x: 5.25, z: -3, w: 5.5, d: 5, floor: "tile", color: "#dcd9d2" }],
  items: [
    sign("FIRE SERVICE", -3, -5.43, 0, "#c81e1e", 3.2),
    I("fireengine", -5.0, -1.2, 0), I("fireengine", -1.2, -1.2, 0),
    ...col("wardrobe", -7.7, -4.5, 3, 1.4, H), ...row("rack", -7.0, 4.9, 3, 1.9, R), I("watertank", -7.4, 2.6), I("crates", -1.7, 4.9), I("crates", 1.9, 4.9),
    I("servicedesk", 5.0, 3.6, 0, { w: 2.4, service: "incident" }), I("bench", 7.0, 3.6, R, { w: 1.2 }),
    I("diningtable", 5.5, -3.2, 0, { w: 2.2 }), ...around("chair", 5.5, -3.2, 1.2, 4, 0.8), I("tv", 7.7, -1.8, -H), I("fridge", 7.5, -5.0, 0),
    I("ceilingfan", -3, 1), I("plant", 7.4, 4.6), I("clock", 0.8, -5.43, 0, { y: 2.1 }),
    neon("112 · 199", 7.94, 1.2, -H, "#ef4444", 1.6),
  ],
});

const POST = lay({
  id: "post-office", name: "NIPOST Post Office", w: 12, d: 9, floor: "tile", wall: "#fbf3c8", trim: "#166534", accent: "#eab308", light: "bright", exitX: -3,
  walls: [],
  items: [
    sign("NIPOST", 0, -4.43, 0, "#166534", 2.6),
    I("servicedesk", -2.5, -0.6, 0, { w: 2.6, service: "post" }), I("counter", 2.5, -0.6, 0, { w: 2.6 }),
    I("pigeonholes", -2.5, -3.0, 0), I("pigeonholes", 2.5, -3.0, 0), I("pigeonholes", -5.75, -1.5, H, { w: 2.4 }),
    I("sacks", 5.3, -3.8, 0), I("sacks", 4.6, -3.8, 0), I("crates", 5.3, -2.8, 0),
    I("displaycase", 5.55, 1.8, -H, { w: 1.6 }), I("rack", 5.7, 3.4, -H), ...row("bench", -4.6, 2.6, 2, 2.0, R), I("waterdispenser", -5.4, 3.7), I("plant", 5.4, 3.8), I("ceilingfan", 0, 1.5), I("clock", 4.5, -4.43, 0, { y: 2.1 }),
  ],
});

const SCHOOL = lay({
  id: "primary-school", name: "Community Primary School", w: 20, d: 12, floor: "concrete", wall: "#f7edc4", trim: "#2f6f4f", accent: "#2f6f4f", light: "bright", exitX: 0,
  walls: [W(0, -6, 0, 0.5, 0.8, 1.4)],
  items: [
    I("blackboard", -5.2, -5.93, 0, { w: 4 }), I("podium", -5.2, -4.8, 0), I("blackboard", 5.2, -5.93, 0, { w: 4 }), I("podium", 5.2, -4.8, 0),
    ...grid("studentdesk", -8.2, -2.8, 4, 2, 2.0, 2.2, R), ...grid("chair", -8.2, -2.1, 4, 2, 2.0, 2.2, R),
    ...grid("studentdesk", 2.2, -2.8, 4, 2, 2.0, 2.2, R), ...grid("chair", 2.2, -2.1, 4, 2, 2.0, 2.2, R),
    I("clock", -9.93, -2, H, { y: 2.1 }), I("clock", 9.93, -2, -H, { y: 2.1 }), I("wallart", -9.93, 2.4, H, { y: 1.7, c: "#e0a62a" }), I("wallart", 9.93, 2.4, -H, { y: 1.7, c: "#2f9d77" }),
    I("counter", -6.0, 3.8, 0, { w: 2.4 }), I("flag", -8.7, 4.7), I("flag", -8.1, 4.7), ...row("bench", 3.4, 4.2, 3, 2.0, R),
    I("bookshelf", 8.6, 4.6, -H), I("waterdispenser", 7.8, 5.2), I("plant", -9.2, -5.2), I("plant", 9.2, -5.2), I("ceilingfan", -5, 0.5), I("ceilingfan", 5, 0.5),
  ],
});

const FILLING = lay({
  id: "filling-station", name: "Moniya Filling Station", w: 16, d: 11, floor: "concrete", wall: "#ece7d8", trim: "#6b1d1d", accent: "#d4202a", light: "bright", exitX: 0,
  walls: [W(-8, -1.2, 2, -1.2, 0.8, 1.6), W(2, -5.5, 2, -1.2)],
  zones: [{ x: 0, z: 2.2, w: 16, d: 6.6, floor: "concrete", color: "#5b6068" }],
  items: [
    I("fuelpump", -4.2, 2.4, 0, { action: pump(5, 4), verb: "Buy 5 litres" }),
    I("fuelpump", 0, 2.4, 0, { action: pump(10, 6), verb: "Buy 10 litres" }),
    I("fuelpump", 4.2, 2.4, 0, { action: pump(25, 9, "Fill the jerrycans (25 L)"), verb: "Fill the jerrycans" }),
    I("jerrycans", -6.6, 3.6), I("jerrycans", 6.6, 3.6),
    ...[-6.8, -5.7, -4.6].map((x) => I("drinkfridge", x, -5.15, 0)),
    I("gondola", -5.6, -3.0, 0, { variant: "snacks" }), I("gondola", -2.4, -3.0, 0, { variant: "drinks" }),
    I("stall", 0.8, -4.3, R), I("cooler", 1.5, -2.2),
    sign("PETROL ₦450 / L", 5.5, -5.44, 0, "#d4202a", 3.4), I("waterdispenser", 6.6, -1.0), I("tank", 6.0, -3.2),
    neon("24 HOURS", 7.95, -2.0, -H, "#22c55e", 1.6), I("plant", -7.5, 4.8),
  ],
});

const PHC = lay({
  id: "health-centre", name: "Olodo Primary Health Centre", w: 14, d: 9, floor: "tile", wall: "#e8f3ec", trim: "#166534", accent: "#16a34a", light: "bright", exitX: -3,
  walls: [W(2, -4.5, 2, 0, 0.8, 1.2), W(2, 0, 7, 0, 0.4, 1.2)],
  items: [
    sign("PRIMARY HEALTH CENTRE", -3.5, -4.43, 0, "#16a34a", 3.6),
    I("counter", -3.8, -0.2, 0, { w: 3.0 }), I("pcdesk", -5.4, -2.6, 0), I("chair", -5.4, -1.8, 0), I("cabinet", -2.4, -4.2, 0), I("cabinet", -1.4, -4.2, 0),
    ...row("bench", -6.0, 1.9, 3, 2.0, R), I("waterdispenser", 0.4, 3.6), I("plant", -6.4, 3.8),
    I("hospitalbed", 3.0, -3.3, 0, { w: 0.9, action: CLINIC_BED }), I("curtain", 3.9, -2.0, 0), I("hospitalbed", 4.8, -3.3, 0, { w: 0.9, action: CLINIC_BED }), I("medshelf", 6.15, -4.25, 0),
    I("desk", 5.8, 1.8, R, { w: 1.4 }), I("chair", 5.8, 2.6, R), I("scale", 6.5, 3.6), I("ceilingfan", -2.5, 1), I("ceilingfan", 4.5, 1.5), I("wallart", -6.93, 0.2, H, { y: 1.8, c: "#16a34a" }),
  ],
});

const LIBRARY = lay({
  id: "public-library", name: "Public Library & Rec Centre", w: 18, d: 12, floor: "wood", wall: "#efe4cf", trim: "#5a3a24", accent: "#7c4a1e", light: "bright", exitX: -4,
  walls: [W(1.5, -6, 1.5, 3.5, 0.45, 2.2)],
  zones: [{ x: 5.25, z: -1, w: 7.5, d: 7, floor: "tile", color: "#cfe3d4" }],
  items: [
    sign("PUBLIC LIBRARY", -4.5, -5.93, 0, "#7c4a1e", 3.2), sign("RECREATION CENTRE", 5.3, -5.93, 0, "#0f766e", 3.4),
    ...row("bookshelf", -8.0, -5.8, 6, 1.15, 0, { action: STACKS, verb: "Read from the stacks" }), ...col("bookshelf", -8.8, -4.0, 4, 1.15, H, { action: STACKS, verb: "Read from the stacks" }),
    I("diningtable", -3.8, -1.6, 0, { w: 2.2 }), ...around("chair", -3.8, -1.6, 1.15, 6, 0.4), I("diningtable", -3.8, 1.3, 0, { w: 2.2 }), ...around("chair", -3.8, 1.3, 1.15, 6, 0.4),
    I("pcdesk", -6.4, 2.6, R), I("chair", -6.4, 3.3, R), I("pcdesk", -4.9, 2.6, R), I("chair", -4.9, 3.3, R),
    I("counter", -7.0, 4.6, 0, { w: 2.2 }), I("sofa", -1.0, 5.0, R, { w: 1.6 }), I("plant", -8.4, 5.2), I("plant", 0.5, -5.2), I("clock", -0.6, -5.93, 0, { y: 2.1 }), I("ceilingfan", -4, -4),
    I("pitch", 5.6, -1.5, 0, { w: 6, d: 3.6 }), I("goalpost", 2.6, -1.5, H, { w: 2.6 }), I("goalpost", 8.4, -1.5, -H, { w: 2.6 }),
    I("yogamat", 3.4, 2.4, 0), I("yogamat", 4.6, 2.4, 0, { c: "#0ea5e9" }), I("weightbench", 7.2, 3.4, 0), I("dumbbells", 5.8, 4.8, 0), I("tv", 8.6, 1.2, -H), I("bench", 3.0, 5.0, R, { w: 1.4 }), I("waterdispenser", 8.4, 5.2),
  ],
});

const FOOD_BANK = lay({
  id: "food-bank", name: "Hope Food Bank", w: 14, d: 9, floor: "concrete", wall: "#f3ead8", trim: "#6b3a1f", accent: "#d9822b", light: "bright", exitX: 0,
  walls: [],
  items: [
    ...row("sacks", -5.5, -4.15, 6, 2.2, 0), ...row("rack", -5.0, -2.9, 3, 5, 0, { w: 1.6 }),
    ...row("crates", -6.4, -0.4, 3, 1.0, H), ...row("crates", 4.6, -0.4, 3, 1.0, H),
    // the two packing desks are work counters (an action, no service); the third is the donations desk
    I("servicedesk", -2.5, 0.4, 0, { w: 1.8, action: PACK, verb: "Pack food parcels", c: "#d9822b" }),
    I("servicedesk", 0.0, 0.4, 0, { w: 1.8, action: PACK, verb: "Pack food parcels", c: "#d9822b" }),
    I("servicedesk", 4.0, 2.9, R, { w: 1.8, service: "donate" }),
    ...row("trolley", -2.0, -2.0, 2, 1.0, 0), ...row("bench", -4.0, 3.5, 2, 2.2, R, { w: 1.6 }),
    sign("HOPE FOOD BANK", 0, -4.44, 0, "#d9822b", 3.4), I("waterdispenser", 6.4, 3.6), I("calendar", -6.97, 0.8, H, { y: 1.4 }),
    I("ceilingfan", -2.5, 1.5), I("ceilingfan", 2.5, 1.5), I("plant", -6.4, 3.8),
  ],
});

const BOREHOLE = lay({
  id: "borehole", name: "Community Borehole & Public Toilet", w: 9, d: 7, floor: "concrete", wall: "#d5e4ea", trim: "#2b5a6e", accent: "#0ea5e9", light: "bright", exitX: 0,
  walls: [-3.75, -2.25, -0.75, 0.75].map((x) => W(x, -3.5, x, -1.5)),
  items: [
    I("toilet", -3.0, -3.0, 0, { action: TOILET, verb: "Pay ₦100 and use the toilet" }),
    I("toilet", -1.5, -3.0, 0, { action: TOILET, verb: "Pay ₦100 and use the toilet" }),
    I("shower", 0, -3.0, 0, { action: BATH, verb: "Pay ₦250 and take a bath" }),
    I("basin", 2.2, -3.2, 0), I("basin", 3.4, -3.2, 0),
    I("waterpoint", -3.4, 1.0), I("waterpoint", 3.4, 1.0), I("watertank", 3.8, -0.4),
    I("bench", -2.2, 2.7, R), sign("PAY & USE ₦100 · WATER FREE", 0, -3.44, 0, "#0ea5e9", 3.0), I("plant", -4.0, 2.8),
  ],
});

void variant;
export const PUBLIC_LAYOUTS: Record<string, Layout> = {
  "fire-station": FIRE,
  "post-office": POST,
  "primary-school": SCHOOL,
  "filling-station": FILLING,
  "health-centre": PHC,
  "public-library": LIBRARY,
  "food-bank": FOOD_BANK,
  "borehole-ring-road": variant(BOREHOLE, "borehole-ring-road", "Ring Road Borehole & Toilet"),
  "borehole-odo-ona": variant(BOREHOLE, "borehole-odo-ona", "Odo-Ona Borehole & Toilet"),
  "borehole-sango": variant(BOREHOLE, "borehole-sango", "Sango Borehole & Toilet"),
};
