import type { Item, Layout } from "./interiors";
import { H, I, R, W, around, col, grid, lay, row } from "./layoutKit";

/* ------------------------------------------------------------------------------------------------
 * Malls and markets: Ventura Mall, Mokola Plaza, Dugbe Cloth Market, Bodija Market, Sango Market.
 * Overrides the generic layouts of the same id. Shop units have their back at -z when rot = 0, so rot 0
 * stands against the back wall, H against the left wall, -H against the right wall and R against the
 * front wall; a wall unit sits at (wall + depth / 2). Sign boards and neon use y as their base height.
 * ---------------------------------------------------------------------------------------------- */

/** a lit shop-name board (mount it at y 2.1 so it sits on top of the shelves) */
const sign = (label: string, x: number, z: number, rot: number, c: string, w = 2.4): Item => I("signboard", x, z, rot, { label, c, w, y: 2.1 });
const neon = (label: string, x: number, z: number, rot: number, c: string, w = 1.4, y = 1.9): Item => I("neonsign", x, z, rot, { label, c, w, y });
const pendant = (x: number, z: number, c: string): Item => I("pendant", x, z, 0, { c });
/** a food tray on a table top */
const tray = (x: number, z: number, variant: string, rot = 0): Item => I("tray", x, z, rot, { y: 0.75, variant });
/** a round table with a tray and plastic chairs round it */
const diner = (x: number, z: number, variant: string, chairs = 2, start = 0): Item[] => [
  I("roundtable", x, z),
  tray(x, z, variant),
  ...around("plasticchair", x, z, 0.85, chairs, start),
];

const VENTURA = lay({
  id: "ventura",
  name: "Ventura Mall Atrium",
  w: 22,
  d: 15,
  floor: "marble",
  wall: "#f4f1ec",
  trim: "#a8864a",
  accent: "#c75c9a",
  light: "bright",
  exitX: 0,
  walls: [
    // the back row of store bays: five stores, 4.4 m wide, each with a wide doorway on the concourse
    ...[-8.8, -4.4, 0, 4.4, 8.8].map((x) => W(x - 2.2, -3.1, x + 2.2, -3.1, 0.5, 2.8)),
    ...[-6.6, -2.2, 2.2, 6.6].map((x) => W(x, -7.5, x, -3.1)),
    // mini supermarket (left) and food court (right), each open to the atrium through a wide gate
    W(-11, -0.5, -5.6, -0.5),
    W(-5.6, -0.5, -5.6, 2.0),
    W(3.8, 2.2, 11, 2.2),
    W(3.8, 2.2, 3.8, 4.2),
  ],
  zones: [
    { x: -8.8, z: -5.32, w: 4.24, d: 4.3, floor: "wood", color: "#caa57b" },
    { x: -4.4, z: -5.32, w: 4.24, d: 4.3, floor: "carpet", color: "#7a3b52" },
    { x: 0, z: -5.32, w: 4.24, d: 4.3, floor: "carpet", color: "#2b2540" },
    { x: 4.4, z: -5.32, w: 4.24, d: 4.3, floor: "tile", color: "#c9d3df" },
    { x: 8.8, z: -5.32, w: 4.24, d: 4.3, floor: "tile", color: "#f3dbe6" },
    { x: -8.3, z: 3.5, w: 5.4, d: 8, floor: "tile", color: "#e9e6da" },
    { x: 7.43, z: 4.88, w: 7.1, d: 5.2, floor: "wood", color: "#d9b78a" },
  ],
  items: [
    /* ---- the atrium ---- */
    I("fountain", 0, 1.6, 0, { w: 2.4, d: 2.4 }),
    ...around("bench", 0, 1.6, 2.3, 4, 0.8, { w: 1.2 }),
    I("chandelier", 0, 1.6),
    I("plant", -10.5, -2.4), I("plant", -4.9, 6.9), I("plant", -4.9, 3.0), I("plant", 3.1, 6.9),
    I("dressedmannequin", -2.6, 5.2, 0, { variant: "agbada" }), I("dressedmannequin", 2.6, 5.2, 0, { variant: "dress" }),
    I("displaytable", 5.4, -0.7, 0, { variant: "perfume" }), I("displaytable", 7.4, -0.7, 0, { variant: "bags" }), I("dressedmannequin", 6.4, -0.7, 0, { variant: "ankara" }),
    I("liftdoor", 10.9, -1.6, -H), sign("CINEMA, LEVEL 2", 10.93, -1.6, -H, "#be123c", 1.8), I("clawmachine", 10.45, 0.1, -H), I("arcade", 10.45, 1.0, -H),
    neon("SALE", -10.97, -1.8, H, "#ff2d95"), neon("ARCADE", 10.97, 0.55, -H, "#22d3ee", 1.4, 2.0),
    pendant(-8.8, -1.8, "#7c3aed"), pendant(-4.4, -1.8, "#e85d9a"), pendant(0, -1.8, "#d9a22b"), pendant(4.4, -1.8, "#0ea5e9"), pendant(8.8, -1.8, "#a855f7"),
    pendant(-3.5, 4.4, "#f97316"), pendant(3.5, 4.4, "#f97316"),

    /* ---- store 1: fashion boutique ---- */
    sign("ADIRE & CO", -8.8, -7.43, 0, "#7c3aed", 2.6),
    I("foldedshelf", -9.65, -7.23, 0, { c: "#2f3b82" }), I("foldedshelf", -7.95, -7.23, 0, { c: "#8a2f3c" }), I("foldedshelf", -10.73, -5.6, H, { c: "#2f8f83" }),
    I("clothesrail", -7.04, -5.6, H),
    I("displaytable", -8.7, -4.6, 0, { variant: "folded" }),
    I("dressedmannequin", -8.2, -6.1, 0, { variant: "suit" }),
    I("dressedmannequin", -10.5, -3.7, 0, { variant: "ankara" }), I("dressedmannequin", -7.1, -3.7, 0, { variant: "agbada" }),
    pendant(-8.8, -4.6, "#7c3aed"),

    /* ---- store 2: shoes ---- */
    sign("SOLE SISTERS", -4.4, -7.43, 0, "#e85d9a", 2.6),
    I("shoeshelf", -5.35, -7.255, 0), I("shoeshelf", -3.45, -7.255, 0),
    I("shoeshelf", -6.285, -5.6, H), I("shoeshelf", -2.515, -5.6, -H),
    I("displaytable", -5.2, -4.4, 0, { variant: "shoes" }),
    I("stool", -3.4, -4.2), I("stool", -3.4, -3.6),
    I("rug", -4.0, -5.4, 0, { w: 1.8, d: 1.4, c: "#e85d9a" }),
    pendant(-4.4, -4.6, "#e85d9a"),

    /* ---- store 3: bags and jewellery ---- */
    sign("GLAM BAGS & GOLD", 0, -7.43, 0, "#b45309", 3.0),
    I("bagwall", -1.0, -7.28, 0, { c: "#7f1d1d", c2: "#e0b038" }), I("bagwall", 1.0, -7.28, 0, { c: "#2f3b82", c2: "#e0b038" }),
    I("bagwall", 1.91, -5.6, -H, { c: "#8a2f3c", c2: "#e0b038" }),
    I("jewelrycase", -1.8, -5.5, H),
    I("displaytable", -1.0, -4.1, 0, { variant: "watches" }), I("displaytable", 1.2, -4.1, 0, { variant: "bags" }),
    pendant(0, -5.4, "#d9a22b"),

    /* ---- store 4: electronics and phones ---- */
    sign("GADGET HUB", 4.4, -7.43, 0, "#0ea5e9", 2.6),
    I("electronicswall", 3.4, -7.33, 0, { w: 2.0 }), I("electronicswall", 5.4, -7.33, 0, { w: 2.0 }),
    I("cashdesk", 6.1, -5.6, -H),
    I("displaytable", 3.2, -4.5, 0, { variant: "phones" }),
    pendant(4.4, -4.6, "#0ea5e9"),

    /* ---- store 5: perfume and cosmetics ---- */
    sign("ESSENCE", 8.8, -7.43, 0, "#a855f7", 2.2),
    I("perfumeshelf", 7.8, -7.255, 0), I("perfumeshelf", 9.8, -7.255, 0),
    I("perfumeshelf", 6.915, -5.6, H), I("perfumeshelf", 10.755, -5.6, -H),
    I("displaytable", 9.6, -4.4, 0, { variant: "perfume" }),
    pendant(8.8, -4.6, "#a855f7"),

    /* ---- mini supermarket ---- */
    sign("MAMA'S MINI-MART", -10.93, 1.9, H, "#16a34a", 2.8),
    I("produce", -10.55, 1.0, H, { variant: "veg" }), I("produce", -10.55, 2.6, H, { variant: "fruit" }),
    I("drinkfridge", -10.65, 4.6, H), I("drinkfridge", -10.65, 5.7, H),
    I("gondola", -8.6, 1.0, H, { variant: "snacks" }), I("gondola", -8.6, 4.2, H, { variant: "drinks" }), I("gondola", -6.3, 3.0, H, { variant: "cereal" }),
    I("freezer", -10.0, -0.06), I("freezer", -6.9, -0.06),
    I("cashdesk", -7.0, 6.4, R),
    ...row("trolley", -10.4, 6.8, 3, 0.7, 0),
    pendant(-8.3, 3.3, "#16a34a"),

    /* ---- food court ---- */
    sign("FOOD COURT", 10.93, 3.6, -H, "#f97316", 2.2),
    ...diner(5.3, 5.2, "burger"), ...diner(7.65, 5.2, "rice"), ...diner(10.0, 5.2, "chicken"),
    I("pastrycase", 6.0, 2.64), I("drinkfridge", 7.35, 2.64), I("drinkfridge", 8.35, 2.64), I("hotcase", 10.0, 2.64),
    I("menulight", 10.93, 5.9, -H),
    pendant(5.3, 5.2, "#f97316"), pendant(7.65, 5.2, "#f97316"), pendant(10.0, 5.2, "#f97316"),
  ],
});

const MOKOLA = lay({
  id: "mokola-mall",
  name: "Mokola Plaza",
  w: 16,
  d: 11,
  floor: "tile",
  wall: "#d7ecea",
  trim: "#1d5c63",
  accent: "#f97316",
  light: "bright",
  exitX: -2,
  walls: [
    // three open-fronted boutique bays down the left wall
    W(-8, -1.9, -4, -1.9), W(-8, 1.7, -4, 1.7),
    // three phone and accessory kiosks along the back wall
    W(-0.45, -5.5, -0.45, -3.2), W(2.85, -5.5, 2.85, -3.2),
  ],
  zones: [
    { x: -6, z: -3.72, w: 3.9, d: 3.5, floor: "wood", color: "#caa57b" },
    { x: -6, z: -0.1, w: 3.9, d: 3.5, floor: "carpet", color: "#5b3a6b" },
    { x: -6, z: 3.64, w: 3.9, d: 3.7, floor: "tile", color: "#f3e3ee" },
    { x: 0.9, z: -4.4, w: 9.4, d: 2.2, floor: "tile", color: "#cdd8de" },
    { x: 6.85, z: -2.25, w: 2.3, d: 6.5, floor: "carpet", color: "#7f1d1d" },
    { x: 4.35, z: 3.8, w: 7.3, d: 3.4, floor: "wood", color: "#d9b78a" },
  ],
  items: [
    /* ---- the plaza: an arcade island in the middle, airtime stalls under umbrellas ---- */
    I("rug", -1.0, 0.3, 0, { w: 4.8, d: 2.6, c: "#2f3b82" }),
    I("clawmachine", -2.8, -0.1, R), ...[-1.9, -1.1, -0.3].map((x) => I("arcade", x, -0.1, R)), I("clawmachine", 0.6, -0.1, R),
    ...[-2.3, -1.5, -0.7, 0.1].map((x) => I("arcade", x, 0.7, 0)),
    I("bench", -1.0, 2.3, R), I("stall", 2.4, 0.3), I("stall", 4.6, 0.3), I("umbrella", 3.5, 0.3),
    I("plant", -3.6, -1.4), I("plant", 1.6, -1.4), I("plant", -3.6, 2.4), I("calabash", 1.0, 1.7),
    neon("CHOP LIFE", 7.97, 3.0, -H, "#a3e635", 1.2),
    pendant(-1.0, 0.3, "#a855f7"), pendant(-1.0, -2.4, "#22d3ee"), pendant(3.5, -1.6, "#f97316"),

    /* ---- boutique 1: KEMI'S, women's wear ---- */
    sign("KEMI'S BOUTIQUE", -7.93, -3.6, H, "#e85d9a", 2.8),
    I("foldedshelf", -7.73, -4.6, H, { c: "#8a2f3c" }), I("foldedshelf", -7.73, -3.0, H, { c: "#2f8f83" }),
    I("clothesrail", -6.6, -4.1, H),
    I("dressedmannequin", -4.5, -5.0, 0, { variant: "ankara" }), I("dressedmannequin", -6.6, -2.5, 0, { variant: "dress" }),
    pendant(-6, -3.7, "#e85d9a"),

    /* ---- boutique 2: shoes ---- */
    sign("STEP UP SHOES", -7.93, -0.1, H, "#0ea5e9", 2.6),
    I("shoeshelf", -7.775, -1.0, H), I("shoeshelf", -7.775, 0.8, H),
    I("displaytable", -5.9, -0.1, 0, { variant: "shoes" }), I("stool", -4.7, -0.9), I("stool", -4.7, 0.6),
    pendant(-6, -0.1, "#0ea5e9"),

    /* ---- boutique 3: beads, gele and bags ---- */
    sign("BEADS, GELE & BAGS", -7.93, 3.6, H, "#7c3aed", 3.0),
    I("bagwall", -7.8, 2.9, H, { c: "#7c3aed", c2: "#e0b038" }), I("jewelrycase", -7.7, 4.7, H),
    I("displaytable", -5.8, 3.6, 0, { variant: "bags" }),
    I("dressedmannequin", -4.6, 2.4, 0, { variant: "ankara" }),
    pendant(-6, 3.6, "#7c3aed"),

    /* ---- kiosk row ---- */
    sign("GSM WORLD", -2.2, -5.43, 0, "#0ea5e9", 2.4),
    I("electronicswall", -2.2, -5.35, 0, { w: 2.0 }), I("displaytable", -1.2, -3.9, 0, { variant: "phones" }),
    sign("ACCESSORIES HUB", 1.2, -5.43, 0, "#f97316", 2.8),
    I("bagwall", 1.2, -5.3, 0, { w: 2.0, c: "#1f6f5a", c2: "#e0b038" }), I("displaytable", 0.4, -3.9, 0, { variant: "watches" }),
    sign("PHONE DOCTOR", 4.4, -5.43, 0, "#16a34a", 2.4),
    I("electronicswall", 4.4, -5.35, 0, { w: 2.0 }), I("displaytable", 5.4, -3.9, 0, { variant: "phones" }),
    pendant(-2.2, -3.5, "#0ea5e9"), pendant(1.2, -3.5, "#f97316"), pendant(4.4, -3.5, "#16a34a"),

    /* ---- cinema ---- */
    sign("CINEMA", 7.93, -1.6, -H, "#be123c", 4.4),
    I("ticketbooth", 7.35, -4.75, -H),
    ...["#ef4444", "#f59e0b", "#22c55e", "#a855f7"].map((c, k) => I("wallart", 7.95, -3.4 + k * 1.15, -H, { y: 1.45, w: 1.0, c })),
    I("liftdoor", 7.9, 1.4, -H, { w: 1.6 }), sign("SCREEN 1", 7.93, 1.4, -H, "#7f1d1d", 1.6),
    I("bench", 6.3, -2.9, H), I("bench", 6.3, -0.9, H),
    neon("FILMS", 6.2, -5.47, 0, "#f43f5e", 0.9),

    /* ---- small food court ---- */
    ...diner(2.3, 2.9, "burger"), ...diner(4.7, 2.9, "rice"), ...diner(7.0, 2.9, "pie"),
    I("grillstand", 2.6, 5.12, R), I("drinkfridge", 3.85, 5.12, R), I("drinkfridge", 4.85, 5.12, R), I("pastrycase", 6.4, 5.12, R),
    I("menulight", 7.93, 4.6, -H),
    pendant(2.3, 2.9, "#f97316"), pendant(4.7, 2.9, "#f97316"), pendant(7.0, 2.9, "#f97316"),
  ],
});

const DUGBE = lay({
  id: "dugbe",
  name: "Dugbe Cloth Market",
  w: 16,
  d: 11,
  floor: "redoxide",
  wall: "#e0bd86",
  trim: "#6b4a2f",
  accent: "#2f3b82",
  light: "warm",
  exitX: 0,
  walls: [],
  zones: [
    { x: -6, z: -3.7, w: 3.9, d: 3.6, floor: "wood", color: "#b98a58" },
    { x: 7.0, z: 1.6, w: 1.9, d: 5.4, floor: "concrete", color: "#c8b79a" },
  ],
  items: [
    /* ---- tailors' corner ---- */
    sign("OLA & SONS TAILORS", -6, -5.43, 0, "#1f6f5a", 3.0),
    ...row("sewingmachine", -7.3, -5.2, 3, 1.3, 0), ...row("stool", -7.3, -4.3, 3, 1.3, 0),
    I("counter", -7.65, -2.6, H, { w: 2.0, c: "#1f6f5a", c2: "#8a5a2a" }),
    I("agbadastand", -5.7, -2.5, 0, { c: "#2f3b82" }), I("agbadastand", -4.5, -2.5, 0, { c: "#8a2f3c" }),

    /* ---- the cloth wall: ankara, aso oke, adire ---- */
    ...[-2.2, -0.65, 0.9, 2.45, 4.0, 5.55].map((x, k) => I("foldedshelf", x, -5.23, 0, { w: 1.5, c: ["#2f3b82", "#8a2f3c", "#2f8f83", "#d97706", "#7c3aed", "#1f6f5a"][k] })),
    I("bagwall", 7.1, -5.3, 0, { w: 1.6, c: "#b45309", c2: "#e0b038" }),
    sign("ANKARA", -0.65, -5.43, 0, "#d97706", 2.6), sign("ASO OKE", 2.45, -5.43, 0, "#a16207", 2.6), sign("ADIRE", 5.55, -5.43, 0, "#1e3a8a", 2.6),

    /* ---- rails and dressed mannequins ---- */
    I("clothesrail", -1.6, -2.6), I("clothesrail", 3.0, -2.6),
    I("dressedmannequin", 0.7, -2.6, 0, { variant: "ankara" }), I("dressedmannequin", 5.2, -2.6, 0, { variant: "agbada" }), I("dressedmannequin", 7.0, -3.4, 0, { variant: "dress" }),

    /* ---- shoes and bags down the right wall ---- */
    sign("SHOES & BAGS", 7.93, 1.6, -H, "#b91c1c", 2.8),
    I("bagwall", 7.8, -0.8, -H, { c: "#1f6f5a", c2: "#e0b038" }),
    I("shoeshelf", 7.775, 1.2, -H), I("shoeshelf", 7.775, 3.0, -H),
    I("displaytable", 5.5, 1.2, 0, { variant: "shoes" }), I("displaytable", 5.5, 3.0, 0, { variant: "shoes" }),

    /* ---- cloth sellers' tables under umbrellas ---- */
    I("displaytable", -5.6, 1.5, 0, { variant: "folded" }), I("displaytable", -3.4, 1.5, 0, { variant: "folded" }),
    I("counter", -5.8, 4.0, 0, { w: 1.8, c: "#d97706", c2: "#6b4a2f" }), I("counter", -3.4, 4.0, 0, { w: 1.8, c: "#7c3aed", c2: "#6b4a2f" }),
    I("umbrella", -4.5, 1.5), I("umbrella", -4.6, 4.0), I("umbrella", 5.5, 2.1),
    I("sacks", -7.2, 4.7), I("sacks", 7.2, 4.7),
    I("displaytable", 2.9, 2.3, 0, { variant: "folded" }), I("displaytable", 2.9, 4.0, 0, { variant: "folded" }), I("dressedmannequin", -1.8, 3.3, 0, { variant: "suit" }),
    I("clothesrail", 3.2, -0.2), I("dressedmannequin", 1.4, -0.2, 0, { variant: "dress" }),
    ...[-0.2, 1.5, 3.1].map((z, k) => I("wallart", -7.97, z + 0.4, H, { y: 1.9, w: 1.2, c: ["#2f3b82", "#d97706", "#8a2f3c"][k] })),
    pendant(-5.8, -3.4, "#1f6f5a"), pendant(1.2, -3.9, "#d97706"), pendant(5.5, -3.9, "#7c3aed"),
  ],
});

const BODIJA = lay({
  id: "bodija-market",
  name: "Bodija Market",
  w: 30,
  d: 22,
  floor: "concrete",
  wall: "#ead7b7",
  trim: "#6b4a2f",
  accent: "#b5533c",
  light: "warm",
  exitX: 0,
  walls: [],
  zones: [
    { x: -8.6, z: -6.7, w: 12.0, d: 8.2, floor: "concrete", color: "#aebd9c" },
    { x: 8.6, z: -6.7, w: 12.0, d: 8.2, floor: "concrete", color: "#a9bcc6" },
    { x: -8.6, z: 6.7, w: 12.0, d: 8.2, floor: "concrete", color: "#c9b59c" },
    { x: 8.6, z: 6.7, w: 12.0, d: 8.2, floor: "concrete", color: "#c4bda8" },
  ],
  items: [
    /* ---- the open square in the middle ---- */
    I("watertank", 0, 0), ...around("bench", 0, 0, 2.2, 4, 0.8, { w: 1.2 }),
    I("calabash", -1.2, -2.7), I("calabash", 1.2, 2.7), I("plant", -3.0, 0.0), I("plant", 3.0, 0.0),
    pendant(0, 0, "#f59e0b"),

    /* ---- north-west: tomato lane and the veg stalls ---- */
    sign("TOMATO LANE", -11.0, -10.93, 0, "#dc2626", 3.0), sign("FRUIT & VEG", -6.2, -10.93, 0, "#16a34a", 2.8),
    ...[-13.4, -11.8, -10.2, -8.6, -7.0, -5.4].map((x, k) => I("produce", x, -10.58, 0, { variant: k % 3 === 2 ? "fruit" : "veg" })),
    I("umbrella", -12.6, -9.6), I("umbrella", -9.4, -9.6), I("umbrella", -6.2, -9.6),
    ...[-12.0, -10.0].flatMap((x, k) => [I("produce", x, -7.8, R, { variant: k === 1 ? "fruit" : "veg" }), I("produce", x, -7.0, 0, { variant: k === 1 ? "veg" : "fruit" })]),
    I("crates", -13.9, -7.4, H, { c: "#dc2626" }), I("crates", -8.4, -7.4, H, { c: "#16a34a" }), I("sacks", -7.4, -7.4), I("sacks", -6.6, -7.4), I("umbrella", -11.0, -7.4),
    ...[-11.6, -8.8, -6.0].map((x) => I("stall", x, -4.4, 0)), I("umbrella", -10.2, -4.4), I("umbrella", -7.4, -4.4),
    I("provisions", -14.8, -6.2, H), I("provisions", -14.8, -4.8, H),

    /* ---- north-east: fresh fish, beans and garri ---- */
    sign("FRESH FISH", 6.6, -10.93, 0, "#0284c7", 2.8), sign("BEANS & GARRI", 12.8, -10.93, 0, "#a16207", 3.0),
    ...[4.2, 5.8, 7.4, 9.0].map((x) => I("freezer", x, -10.63, 0)),
    I("cooler", 4.9, -9.4), I("cooler", 7.1, -9.4), I("cooler", 9.3, -9.4),
    ...grid("sacks", 11.2, -10.4, 4, 2, 0.95, 0.7),
    I("provisions", 14.8, -7.2, -H), I("provisions", 14.8, -5.8, -H),
    ...[4.6, 7.4, 10.2].map((x) => I("stall", x, -7.2, 0)), I("umbrella", 6.0, -7.2), I("umbrella", 8.8, -7.2),
    ...row("mortar", 12.2, -7.3, 3, 0.9, 0),
    ...[4.2, 5.6, 7.0].flatMap((x) => [I("provisions", x, -4.5, R), I("provisions", x, -4.1, 0)]),
    I("stall", 10.2, -4.2, 0), I("stall", 12.6, -4.2, 0), I("umbrella", 11.4, -4.2),

    /* ---- south-west: aso, ankara and the shoe row ---- */
    sign("ASO & ANKARA", -14.93, 6.3, H, "#7c3aed", 3.2), sign("SHOE ROW", -14.93, 9.4, H, "#b91c1c", 2.2),
    ...[3.9, 5.5, 7.1, 8.7].map((z, k) => I("foldedshelf", -14.73, z, H, { c: ["#2f3b82", "#8a2f3c", "#2f8f83", "#d97706"][k] })),
    I("clothesrail", -11.0, 3.8), I("clothesrail", -7.6, 3.8), I("dressedmannequin", -9.3, 3.8, 0, { variant: "ankara" }), I("dressedmannequin", -5.9, 3.8, 0, { variant: "agbada" }),
    I("clothesrail", -12.2, 6.2), I("clothesrail", -8.8, 6.2), I("dressedmannequin", -10.5, 6.2, 0, { variant: "dress" }), I("dressedmannequin", -7.1, 6.2, 0, { variant: "suit" }),
    I("umbrella", -9.3, 3.8), I("umbrella", -10.5, 6.2),
    ...[-12.6, -10.8, -9.0].map((x) => I("shoeshelf", x, 10.755, R)),
    I("displaytable", -12.0, 8.6, 0, { variant: "shoes" }), I("displaytable", -9.6, 8.6, 0, { variant: "shoes" }), I("umbrella", -10.8, 8.6),

    /* ---- south-east: provisions, pots and household goods ---- */
    sign("PROVISIONS", 14.93, 5.9, -H, "#16a34a", 2.8), sign("HOUSEHOLD & POTS", 14.93, 9.3, -H, "#ea580c", 3.0),
    ...[3.8, 5.2, 6.6, 8.0].map((z) => I("provisions", 14.8, z, -H)),
    ...["snacks", "cans", "cereal", "drinks"].map((v, k) => I("gondola", 4.4 + k * 2.2, 4.0, 0, { variant: v })),
    ...["cans", "drinks", "snacks"].map((v, k) => I("gondola", 4.4 + k * 2.2, 6.6, 0, { variant: v })), I("crates", 11.0, 6.6, 0, { c: "#e2a233" }), I("sacks", 12.0, 6.6),
    ...row("mortar", 4.6, 9.0, 4, 1.4, 0), I("calabash", 10.2, 9.0), I("calabash", 11.4, 9.0), I("umbrella", 6.4, 9.0),
    ...row("cooler", 4.5, 10.78, 4, 1.0, R), ...row("crates", 10.4, 10.65, 3, 1.1, R, { c: "#e2a233" }),
    I("gascooker", 13.5, 10.6, R), I("gascooker", 14.3, 10.6, R), I("standingfan", 12.9, 9.4), I("standingfan", 13.8, 9.4),

    /* ---- along the cross lane: iru and egusi on the left, okirika (second-hand clothes) racks on the right ---- */
    sign("IRU & EGUSI", -14.93, 0, H, "#7c3aed", 2.2), I("provisions", -14.8, -0.8, H), I("provisions", -14.8, 0.8, H),
    sign("OKIRIKA", 14.93, 0, -H, "#0f766e", 2.4), ...[-1.3, 0, 1.3].map((z) => I("rack", 14.75, z, -H)),
    sign("PEPPER ROW", -14.93, -8.5, H, "#b91c1c", 2.0), ...col("sacks", -14.55, -8.9, 2, 0.8, H),
    sign("IRU & OGIRI", 14.93, -9.6, -H, "#a16207", 2.0),
    I("displaytable", -4.0, 4.4, 0, { variant: "folded" }), I("displaytable", -4.0, 6.8, 0, { variant: "folded" }), I("umbrella", -4.0, 5.6),
  ],
});

/** a double row of stalls (or racks) running north-south, back to back along x = xc, with the fronts facing the lanes either side */
const stallColumn = (kind: "stall" | "rack", xc: number, zs: number[], tops: string[]): Item[] =>
  zs.flatMap((z, k) => {
    const off = kind === "stall" ? 0.45 : 0.27;
    return [I(kind, xc - off, z, -H, { c: tops[k % tops.length] }), I(kind, xc + off, z, H, { c: tops[(k + 2) % tops.length] })];
  });
const TOPS = ["#d94a3a", "#2f8f83", "#d9a22b", "#2f3b82", "#8a2f3c", "#7c3aed"];

const SANGO = lay({
  id: "sango-market",
  name: "Sango Market Stalls",
  w: 30,
  d: 22,
  floor: "concrete",
  wall: "#e3c79a",
  trim: "#5a3a24",
  accent: "#2f8f83",
  light: "warm",
  exitX: 0,
  walls: [
    // lock-up shops down both sides: a low frontage with a doorway each, and dividers between them
    ...[-6.4, -2.4, 1.6, 5.6].flatMap((z) => [W(-11.4, z, -11.4, z + 4, 0.5, 2.8), W(11.4, z, 11.4, z + 4, 0.5, 2.8)]),
    ...[-6.4, -2.4, 1.6, 5.6, 9.6].flatMap((z) => [W(-15, z, -11.4, z), W(11.4, z, 15, z)]),
  ],
  zones: [
    { x: -13.2, z: 1.6, w: 3.4, d: 15.8, floor: "tile", color: "#e0d8c4" },
    { x: 13.2, z: 1.6, w: 3.4, d: 15.8, floor: "tile", color: "#e0d8c4" },
    { x: 0, z: -8.8, w: 29.8, d: 4.4, floor: "concrete", color: "#aebd9c" },
  ],
  items: [
    /* ---- the produce hall at the north end ---- */
    sign("FRESH PRODUCE", -11.0, -10.93, 0, "#16a34a", 4.2), sign("ATA, TATASE & TOMATO", -6.0, -10.93, 0, "#dc2626", 3.6), sign("YAM & PLANTAIN", 5.2, -10.93, 0, "#a16207", 3.4),
    ...[-13.6, -12.0, -10.4, -8.8, -7.2, -5.6, -4.0].map((x, k) => I("produce", x, -10.58, 0, { variant: k % 3 === 1 ? "fruit" : "veg" })),
    ...[-11.4, -8.4].flatMap((x, k) => [I("produce", x, -8.3, R, { variant: k === 1 ? "veg" : "fruit" }), I("produce", x, -7.5, 0, { variant: k === 1 ? "fruit" : "veg" })]),
    I("sacks", -5.4, -7.9), I("sacks", -4.5, -7.9), I("sacks", -3.6, -7.9),
    ...grid("sacks", 1.8, -10.4, 5, 2, 0.95, 0.7), ...row("crates", 7.4, -10.6, 4, 1.1, 0, { c: "#a3b83c" }),
    I("stall", 3.2, -7.8, 0), I("stall", 6.2, -7.8, 0), I("stall", 9.2, -7.8, 0), I("umbrella", 4.7, -7.8), I("umbrella", 7.7, -7.8),
    ...row("mortar", 2.0, -6.0, 3, 1.0, 0),

    /* ---- left lock-ups: phones, wears, gadgets, shoes ---- */
    sign("PHONE CITY", -14.93, -4.4, H, "#0ea5e9", 2.8),
    I("electronicswall", -14.85, -4.4, H), I("jewelrycase", -13.3, -5.95, 0), I("cashdesk", -13.3, -2.865, R),
    sign("MAMA TUNDE WEARS", -14.93, -0.4, H, "#e85d9a", 3.0),
    I("foldedshelf", -14.73, -1.5, H, { c: "#2f3b82" }), I("foldedshelf", -14.73, 0.4, H, { c: "#8a2f3c" }), I("clothesrail", -13.0, -1.9),
    I("dressedmannequin", -13.5, 1.2, R, { variant: "ankara" }), I("dressedmannequin", -12.3, 1.2, R, { variant: "agbada" }),
    sign("GADGET WORLD", -14.93, 3.6, H, "#7c3aed", 2.8),
    I("electronicswall", -14.85, 3.6, H), I("tv", -13.8, 1.95, 0), I("tv", -12.4, 1.95, 0), I("cashdesk", -13.2, 5.15, R),
    sign("SOLE & SOUL", -14.93, 7.6, H, "#b91c1c", 2.6),
    I("shoeshelf", -14.775, 7.6, H), I("shoeshelf", -13.2, 5.95, 0), I("displaytable", -13.8, 8.8, 0, { variant: "shoes" }),

    /* ---- right lock-ups: bags, household, gold, perfume ---- */
    sign("BAG VILLAGE", 14.93, -4.4, -H, "#b45309", 2.8),
    I("bagwall", 14.8, -4.4, -H, { c: "#7f1d1d", c2: "#e0b038" }), I("bagwall", 13.0, -5.9, 0, { c: "#2f3b82", c2: "#e0b038" }), I("displaytable", 13.4, -3.3, 0, { variant: "bags" }),
    sign("HOUSEHOLD PLUS", 14.93, -0.4, -H, "#ea580c", 3.0),
    I("gondola", 14.65, -1.2, -H, { variant: "cans" }), I("gondola", 14.65, 0.6, -H, { variant: "cereal" }), I("gascooker", 12.9, -1.95, 0), I("gascooker", 14.0, -1.95, 0), I("crates", 12.6, 1.2, R), I("cooler", 13.6, 1.25, R),
    sign("GOLD & BEADS", 14.93, 3.6, -H, "#ca8a04", 2.8),
    I("jewelrycase", 14.7, 2.9, -H), I("jewelrycase", 14.7, 4.4, -H), I("displaytable", 13.0, 2.3, 0, { variant: "watches" }), I("cashdesk", 13.2, 5.15, R),
    sign("PERFUME HOUSE", 14.93, 7.6, -H, "#a855f7", 3.0),
    I("perfumeshelf", 14.775, 7.6, -H), I("perfumeshelf", 13.2, 5.95, 0), I("displaytable", 13.4, 8.7, 0, { variant: "perfume" }),

    /* ---- stall columns: cloth racks and market stalls ---- */
    ...stallColumn("stall", -8.0, [-4.2, -2.0, 0.2, 3.6, 5.8, 8.0], TOPS),
    ...stallColumn("rack", -4.2, [-4.2, -2.7, -1.2, 3.6, 5.1, 6.6, 8.1], TOPS),
    ...stallColumn("rack", 4.2, [-4.2, -2.7, -1.2, 3.6, 5.1, 6.6, 8.1], TOPS),
    ...stallColumn("stall", 8.0, [-4.2, -2.0, 0.2, 3.6, 5.8, 8.0], [...TOPS].reverse()),
    I("umbrella", -8.0, -3.1), I("umbrella", -8.0, 4.7), I("umbrella", 8.0, -3.1), I("umbrella", 8.0, 4.7), I("umbrella", -4.2, 5.1), I("umbrella", 4.2, 5.1),

    /* ---- the spine: phone and accessory kiosks down the middle ---- */
    I("displaytable", 0, -4.3, 0, { variant: "phones" }), I("jewelrycase", 0, -2.5, H), I("displaytable", 0, -0.7, 0, { variant: "watches" }),
    I("displaytable", 0, 2.4, 0, { variant: "phones" }), I("cooler", 0, 4.2, 0), I("cooler", 0.8, 4.2, 0), I("displaytable", 0, 6.0, 0, { variant: "bags" }),
    pendant(0, -4.3, "#0ea5e9"), pendant(0, -0.7, "#f59e0b"), pendant(0, 2.4, "#0ea5e9"), pendant(0, 6.0, "#e85d9a"),
    neon("FRESH DAILY", 0.1, -10.97, 0, "#a3e635"),
    I("bukapots", 13.9, 10.55, R), I("grillstand", 12.0, 10.6, R),
  ],
});

export const RETAIL_LAYOUTS: Record<string, Layout> = {
  ventura: VENTURA,
  "mokola-mall": MOKOLA,
  dugbe: DUGBE,
  "bodija-market": BODIJA,
  "sango-market": SANGO,
};
