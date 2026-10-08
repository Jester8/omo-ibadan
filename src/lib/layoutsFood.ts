import type { Item, Layout } from "./interiors";
import { H, I, R, W, col, lay } from "./layoutKit";

/* ------------------------------------------------------------------------------------------------
 * Eateries and fast-food restaurants: Amala Skye, Mama Put, Item 7, Mr Biggs, Chicken Republic,
 * Sweet Sensation, Kilimanjaro. Each overrides (or adds) the layout of the same id.
 * Counters and display cases face +z at rot 0 (customers stand in front), so a unit on the back wall
 * is rot 0, on the left wall H, on the right wall -H. Wall units sit at (wall + depth / 2). Menu boards
 * hang at y 1.5 (they are 0.9 tall); sign boards at y 2.1 or more are centred on that height.
 * Prices copy the place's own menu in places.ts, so ordering at the counter is as good as the Eat button.
 * ---------------------------------------------------------------------------------------------- */

/** a lit shop-name board on a wall */
const sign = (label: string, x: number, z: number, rot: number, c: string, w = 2.6, y = 2.1): Item => I("signboard", x, z, rot, { label, c, w, y });
const neon = (label: string, x: number, z: number, rot: number, c: string, w = 1.2, y = 1.9): Item => I("neonsign", x, z, rot, { label, c, w, y });
/** a lit menu board (it carries its own pictures) */
const menu = (x: number, z: number, rot: number, c: string, w = 1.8, y = 1.5): Item => I("menulight", x, z, rot, { c, w, y });
const pendant = (x: number, z: number, c: string): Item => I("pendant", x, z, 0, { c });
/** a food tray on a table top (variant: burger, rice, chicken, pie) */
const tray = (x: number, z: number, variant: string, rot = 0, c?: string, y = 0.75): Item => I("tray", x, z, rot, { y, variant, ...(c ? { c } : {}) });
/** a tray on a rectangular table, which has a runner cloth a hair above the top */
const onTable = (x: number, z: number, variant: string, rot = 0, c?: string): Item => tray(x, z, variant, rot, c, 0.765);
/** what a counter, case or fridge sells here: the dish, its price and what it does for you */
const sells = (id: string, label: string, cost: number, hunger: number, fun: number, verb: string, secs = 4): Partial<Item> => ({
  action: { id, label, secs, cost, gain: { hunger, fun } },
  verb,
});

/** chairs round a table, one per angle (0 is the +z side), all facing it */
const seats = (x: number, z: number, angles: number[], o: Partial<Item> = {}, kind: "plasticchair" | "chair" = "plasticchair", r = 0.85): Item[] =>
  angles.map((a) => I(kind, x + Math.sin(a) * r, z + Math.cos(a) * r, Math.atan2(-Math.sin(a), -Math.cos(a)), o));
/** a round table with one tray in the middle, or two side by side, and plastic chairs round it */
function dine(x: number, z: number, variant: string, angles: number[], o: { cloth?: string; chair?: string; trays?: 1 | 2; variant2?: string; wood?: boolean; trayColor?: string } = {}): Item[] {
  return [
    I("roundtable", x, z, 0, o.cloth ? { c: o.cloth } : {}),
    ...(o.trays === 2 ? [tray(x - 0.2, z, variant, H, o.trayColor), tray(x + 0.2, z, o.variant2 ?? variant, H, o.trayColor)] : [tray(x, z, variant, 0, o.trayColor)]),
    ...seats(x, z, angles, o.chair ? { c: o.chair } : {}, o.wood ? "chair" : "plasticchair"),
  ];
}
/** a four-seat table, long side along x, with a tray in front of each pair of chairs */
function table4(x: number, z: number, v1: string, v2: string, c1: string, c2: string): Item[] {
  return [
    I("diningtable", x, z),
    onTable(x - 0.4, z, v1), onTable(x + 0.4, z, v2),
    ...[-0.4, 0.4].flatMap((dx) => [I("plasticchair", x + dx, z - 0.75, 0, { c: c1 }), I("plasticchair", x + dx, z + 0.75, R, { c: c2 })]),
  ];
}
const FOUR = [0.8, 2.4, 3.9, 5.5];
const THREE = [0.6, 2.7, 4.8];

const AMALA = lay({
  id: "amala-skye",
  name: "Amala Skye",
  w: 12,
  d: 9,
  floor: "redoxide",
  wall: "#d39a74",
  trim: "#4a2a1a",
  accent: "#d89b3c",
  exitX: 0,
  // the kitchen sits behind a waist-high partition, with its door at the right
  walls: [W(-6, -2.5, 6, -2.5, 0.79, 1.4)],
  zones: [{ x: 0, z: -3.5, w: 12, d: 2, floor: "tile", color: "#e6e2d6" }],
  items: [
    /* ---- the serving line: pots and a hot case behind a long counter ---- */
    I("counter", -2.7, -0.95, 0, { w: 6, c: "#d89b3c", c2: "#4a2a1a" }),
    I("bukapots", -4.6, -1.95, 0, { c: "#2f3b82", c2: "#d89b3c", ...sells("amalaplate", "Amala, gbegiri and ewedu", 1800, 58, 5, "Dish up amala", 4) }),
    I("bukapots", -2.6, -1.95, 0, { c: "#8a2f3c", c2: "#e0b038", ...sells("amalaassorted", "Amala with assorted meat and ponmo", 3300, 76, 9, "Dish up the combo", 5) }),
    I("hotcase", -0.6, -1.95, 0, { c: "#b5392a", c2: "#d89b3c", ...sells("jollofdodo", "Jollof rice, dodo and chicken", 3400, 66, 6, "Order a plate", 5) }),
    I("drinkfridge", 1.35, -2.15, 0, sells("zobo", "Chilled zobo", 400, 4, 7, "Take a cold zobo", 2)),

    /* ---- the kitchen ---- */
    I("stove", -5.3, -4.2, 0), I("stove", -4.55, -4.2, 0), I("sink", -3.5, -4.2, 0),
    I("prepcounter", -1.7, -4.125, 0),
    I("gascooker", 0.4, -4.15, 0), I("mortar", 2.0, -4.1), I("calabash", 2.6, -3.35, 0, { y: 0 }),
    I("provisions", 4.0, -4.3, 0), I("mortar", 5.0, -4.1), I("fridge", 5.65, -4.1, 0),
    I("wallart", -4.9, -4.47, 0, { y: 1.95, w: 1.0, c: "#2f3b82" }), I("wallart", 0.4, -4.47, 0, { y: 2.2, w: 0.8, c: "#d89b3c" }),

    /* ---- the dining room: round tables, red and white plastic chairs, a tray on every table ---- */
    ...dine(-4.0, 1.0, "rice", FOUR, { trays: 2, chair: "#c8372d" }),
    ...dine(-1.0, 1.0, "rice", FOUR, { trays: 2, chair: "#e8e4da" }),
    ...dine(1.6, 1.0, "chicken", THREE, { chair: "#c8372d" }),
    ...dine(-4.4, 3.4, "rice", THREE, { trays: 2, chair: "#e8e4da" }),
    ...dine(-1.6, 3.4, "chicken", THREE, { chair: "#c8372d" }),
    I("diningtable", 5.2, 1.3, H, { w: 1.6 }), onTable(5.2, 0.95, "rice", H), onTable(5.2, 1.65, "rice", H),
    I("plasticchair", 4.4, 0.9, H, { c: "#c8372d" }), I("plasticchair", 4.4, 1.7, H, { c: "#c8372d" }),
    I("tv", 5.75, 3.0, -H),
    I("cooler", 5.6, 4.0, -H),

    /* ---- walls and corners ---- */
    menu(-5.95, -1.35, H, "#b5392a"),
    sign("AMALA SKYE", -5.94, 1.8, H, "#b5392a", 2.4),
    neon("OPEN", 5.96, -0.5, -H, "#22d3ee", 1.0),
    I("wallart", -5.93, 3.6, H, { y: 1.8, w: 0.9, c: "#d89b3c" }),
    I("rug", 0, 2.9, 0, { w: 2.2, d: 1.4, c: "#2f3b82" }),
    I("plant", -5.55, 4.05), I("plant", 5.55, -1.2),
    I("ceilingfan", -2.6, 2.2), I("ceilingfan", 3.4, 2.4),
    pendant(-4.0, 1.0, "#b5392a"), pendant(-1.0, 1.0, "#d89b3c"), pendant(1.6, 1.0, "#b5392a"), pendant(-4.4, 3.4, "#d89b3c"), pendant(-1.6, 3.4, "#b5392a"),
  ],
});

/** a long communal table running front to back, with a bench down each side and trays and a lantern on top */
function communal(x: number, z: number, len: number, variants: string[]): Item[] {
  const n = Math.round(len / 1.8);
  const trays = Array.from({ length: n * 2 }, (_, k) => {
    const dz = (Math.floor(k / 2) - (n - 1) / 2) * 1.5;
    return onTable(x + (k % 2 ? 0.2 : -0.2), z + dz, variants[k % variants.length], H);
  });
  return [
    I("diningtable", x, z, H, { w: len }),
    ...trays,
    ...[-len / 2 + 0.35, 0, len / 2 - 0.35].map((dz) => I("lantern", x, z + dz, 0, { y: 0.75 })),
    ...[-0.78, 0.78].flatMap((dx) => col("bench", x + dx, z - len / 4, 2, len / 2, H, { w: len / 2 - 0.05 })),
  ];
}

const MAMA = lay({
  id: "challenge-eatery",
  name: "Mama Put Buka",
  w: 12,
  d: 9,
  floor: "concrete",
  wall: "#d9bd8c",
  trim: "#5a3a24",
  accent: "#e0663a",
  exitX: 0,
  walls: [],
  zones: [
    // the pot corner is swept red-oxide cement, the rest is plain concrete
    { x: -3.7, z: -3.2, w: 5.2, d: 2.6, floor: "redoxide", color: "#9a4a30" },
    { x: 3.3, z: -3.4, w: 5.4, d: 2.2, floor: "redoxide", color: "#a85a3a" },
  ],
  items: [
    /* ---- the pot corner: firewood-style cooking, pounding yam, calabashes ---- */
    I("gascooker", -5.3, -4.15, 0), I("stove", -3.7, -4.2, 0), I("gascooker", -2.4, -4.15, 0),
    I("mortar", -4.7, -2.9), I("mortar", -3.9, -2.9),
    I("calabash", -3.0, -3.0, 0, { y: 0 }), I("calabash", -2.2, -2.8, 0, { y: 0 }),
    I("sacks", -5.7, -3.2, H), I("crates", -5.65, -1.7, H),
    I("lantern", -1.5, -4.2, 0, { y: 0 }), I("lantern", -4.4, -3.5, 0, { y: 0 }),

    /* ---- the serving pots, cooler boxes and the signboard ---- */
    sign("MAMA PUT", 0.1, -4.44, 0, "#e0663a", 3.0),
    I("bukapots", 1.9, -4.1, 0, { c: "#e0663a", c2: "#f2c14e", ...sells("iyanplate", "Iyan and efo riro", 1500, 55, 5, "Dish up iyan", 4) }),
    I("bukapots", 4.1, -4.1, 0, { c: "#2f8f83", c2: "#f2c14e", ...sells("pepperpot", "Pepper soup with ponmo", 1200, 36, 8, "Ladle pepper soup", 4) }),
    I("cooler", 5.55, -3.2, -H, sells("coldzobo", "Cold zobo from the cooler box", 300, 3, 6, "Take a cold drink", 2)),
    I("cooler", 5.55, -2.5, -H, sells("coldfanta", "Cold Fanta from the cooler box", 350, 3, 7, "Take a cold drink", 2)),
    I("radio", 5.55, -2.5, 0, { y: 0.5 }), I("lantern", 5.55, -3.2, 0, { y: 0.5 }),
    I("provisions", 5.75, -1.1, -H),
    I("calendar", -2.0, -4.48, 0, { y: 1.5, c: "#e0663a" }), I("wallart", -5.93, -0.2, H, { y: 1.9, w: 1.0, c: "#2f3b82" }),

    /* ---- communal tables with benches ---- */
    ...communal(-3.9, 0.6, 3.6, ["rice", "chicken", "rice"]),
    ...communal(0, 0.6, 3.6, ["rice", "rice", "chicken"]),
    ...communal(3.9, 0.6, 3.6, ["chicken", "rice", "rice"]),

    /* ---- the front, lit by lanterns and one bulb over each table ---- */
    I("wallart", -5.93, 2.6, H, { y: 1.9, w: 1.0, c: "#e0663a" }), I("wallart", 5.93, 1.5, -H, { y: 1.9, w: 1.0, c: "#d89b3c" }),
    I("plant", -5.6, 4.05), I("plant", 5.6, 4.05),
    I("bench", -4.3, 4.2, R, { w: 1.8 }), I("carvedstool", 3.3, 3.9), I("carvedstool", 4.1, 4.1), I("crates", 5.0, 3.2, 0, { c: "#e2a233" }), I("lantern", -4.3, 4.2, 0, { y: 0.45 }), I("lantern", 3.7, 4.0, 0, { y: 0 }),
    I("ceilingfan", -2.0, 1.6), I("ceilingfan", 2.0, 1.6),
    pendant(-3.9, 0.6, "#a85a2a"), pendant(0, 0.6, "#a85a2a"), pendant(3.9, 0.6, "#a85a2a"),
  ],
});

/** a diner booth against a side wall: a bench seat on the wall, a table, and a second bench with its back to the hall */
function booth(wallX: number, z: number, wallSide: 1 | -1, v1: string, v2: string, c: string, c2: string): Item[] {
  // wallSide -1: backs onto the left wall and faces +x; +1: the right wall, faces -x
  const f = -wallSide;
  const face = wallSide < 0 ? H : -H;
  return [
    I("boothseat", wallX + f * 0.375, z, face, { c, c2 }),
    I("diningtable", wallX + f * 1.32, z, H, { w: 1.6 }),
    onTable(wallX + f * 1.32, z - 0.38, v1, H), onTable(wallX + f * 1.32, z + 0.38, v2, H),
    I("boothseat", wallX + f * 2.265, z, -face, { c, c2 }),
  ];
}

const ITEM7 = lay({
  id: "item7",
  name: "Item 7",
  w: 14,
  d: 10,
  floor: "tile",
  wall: "#f7ead6",
  trim: "#c63a1d",
  accent: "#e8532a",
  light: "bright",
  exitX: 0,
  walls: [],
  zones: [
    { x: 0, z: -3.9, w: 14, d: 2.2, floor: "concrete", color: "#c9ccd0" },
    { x: -5.6, z: 1.6, w: 2.8, d: 6.2, floor: "wood", color: "#caa57b" },
    { x: 5.2, z: 3.5, w: 3.6, d: 3, floor: "carpet", color: "#f4b83a" },
  ],
  items: [
    /* ---- the kitchen line along the back wall, under the menu boards ---- */
    sign("ITEM 7", 0, -4.94, 0, "#e8532a", 3.2, 2.36),
    menu(-1.8, -4.95, 0, "#e8532a", 1.8, 1.12), menu(0, -4.95, 0, "#c63a1d", 1.8, 1.12), menu(1.8, -4.95, 0, "#e8532a", 1.8, 1.12),
    I("prepcounter", -6, -4.625, 0), I("prepcounter", -4, -4.625, 0), I("prepcounter", 4, -4.625, 0), I("prepcounter", 6, -4.625, 0),
    I("freezer", -1.0, -4.6, 0), I("freezer", 1.0, -4.6, 0),
    I("sink", -2.7, -4.7, 0), I("cabinet", 2.7, -4.75, 0),

    /* ---- the order counter: burgers, jollof and chicken, pounded yam ---- */
    I("foodcounter", -3.2, -2.3, 0, { c: "#e8532a", c2: "#ffd23f", ...sells("burgerchips", "Chicken burger and chips", 3400, 54, 8, "Order a burger", 4) }),
    I("hotcase", -1.1, -2.3, 0, { c: "#c63a1d", c2: "#ffd23f", ...sells("jollofchicken", "Jollof rice and grilled chicken", 4400, 70, 8, "Order a plate", 5) }),
    I("foodcounter", 1.0, -2.3, 0, { c: "#e8532a", c2: "#ffd23f", ...sells("poundedegusi", "Pounded yam and egusi", 4900, 78, 6, "Order a plate", 5) }),
    I("drinkfridge", 2.8, -2.45, 0, sells("chapman", "Chilled Chapman", 500, 3, 8, "Take a cold Chapman", 2)),
    I("grillstand", 6.55, -3.0, -H, sells("suyaplatter", "Suya platter", 3400, 44, 12, "Buy suya", 4)),
    neon("DRIVE-IN", 6.96, -1.0, -H, "#ff3b2f", 1.8, 1.9),

    /* ---- booths along the left wall ---- */
    ...booth(-7, -0.2, -1, "burger", "chicken", "#e8532a", "#ffd23f"), ...booth(-7, 2.4, -1, "chicken", "burger", "#c63a1d", "#ffd23f"),

    /* ---- tables in the hall ---- */
    ...table4(-2.3, 0.5, "burger", "chicken", "#ffd23f", "#e8532a"),
    ...table4(1.0, 0.5, "chicken", "burger", "#e8532a", "#ffd23f"),
    ...table4(4.1, 0.5, "burger", "burger", "#ffd23f", "#e8532a"),
    ...table4(-2.3, 3.2, "chicken", "burger", "#e8532a", "#ffd23f"),
    ...table4(2.3, 3.2, "burger", "chicken", "#ffd23f", "#e8532a"),

    /* ---- the kids' corner: small coloured stools round a low table ---- */
    I("rug", 5.2, 3.5, 0, { w: 3, d: 2.4, c: "#e8532a" }),
    I("coffeetable", 5.2, 3.5), tray(5.2, 3.5, "pie", 0, "#e8532a", 0.43),
    ...[[4.4, 3.0, "#e8532a"], [6.0, 3.0, "#2f8f83"], [4.4, 4.0, "#ffd23f"], [6.0, 4.0, "#2f3b82"]].map(([x, z, c]) => I("stool", x as number, z as number, 0, { c: c as string })),
    I("plasticchair", 5.2, 2.9, 0, { w: 0.36, d: 0.36, c: "#2f8f83" }), I("plasticchair", 5.2, 4.1, R, { w: 0.36, d: 0.36, c: "#e8532a" }),
    I("tv", 6.8, 1.4, -H), I("drinkfridge", 6.5, -0.1, -H, sells("chapman2", "Chilled Chapman", 500, 3, 8, "Take a cold Chapman", 2)),
    I("plant", -6.55, 4.55), I("plant", 6.55, 4.55), I("wallart", -6.93, 4.0, H, { y: 2.0, w: 0.9, c: "#e8532a" }),
    I("wallart", 6.93, 2.3, -H, { y: 2.0, w: 0.9, c: "#ffd23f" }),

    pendant(-2.3, 0.5, "#e8532a"), pendant(1.0, 0.5, "#e8532a"), pendant(4.1, 0.5, "#e8532a"), pendant(-2.3, 3.2, "#ffd23f"), pendant(2.3, 3.2, "#ffd23f"), pendant(5.2, 3.5, "#ffd23f"),
  ],
});

const BIGGS = lay({
  id: "mrbiggs",
  name: "Mr Biggs",
  w: 13,
  d: 9,
  floor: "tile",
  wall: "#f3e6c8",
  trim: "#8a1c24",
  accent: "#d62f39",
  light: "bright",
  exitX: 0,
  walls: [],
  zones: [
    { x: 0, z: -3.45, w: 13, d: 2.1, floor: "concrete", color: "#cfd2d6" },
    { x: -5.7, z: 1.95, w: 1.6, d: 5.1, floor: "wood", color: "#d7b588" },
    { x: 4.95, z: 1.5, w: 3.1, d: 6, floor: "wood", color: "#c99a6b" },
  ],
  items: [
    /* ---- the kitchen behind the counter, under the menu boards ---- */
    menu(-5.0, -4.45, 0, "#d62f39"), menu(-3.2, -4.45, 0, "#8a1c24"), menu(-1.4, -4.45, 0, "#d62f39"),
    sign("MR BIGGS", 1.0, -4.44, 0, "#d62f39", 2.4),
    I("freezer", -5.3, -4.15, 0), I("cabinet", -3.9, -4.25, 0), I("sink", -3.0, -4.2, 0), I("freezer", -1.8, -4.15, 0), I("cabinet", 0.2, -4.25, 0), I("cabinet", 1.2, -4.25, 0),
    I("prepcounter", 3.6, -4.125, 0), I("prepcounter", 5.5, -4.125, 0),

    /* ---- the long pie counter, then the hot food and the drinks ---- */
    I("pastrycase", -4.6, -2.0, 0, { c: "#d62f39", c2: "#f3e6c8", ...sells("meatpie", "Meat pie and a cold Fanta", 1800, 32, 4, "Buy a meat pie", 4) }),
    I("pastrycase", -3.0, -2.0, 0, { c: "#d62f39", c2: "#f3e6c8", ...sells("beefpie", "Beef pie and a Coke", 1900, 33, 4, "Buy a beef pie", 4) }),
    I("pastrycase", -1.4, -2.0, 0, { c: "#d62f39", c2: "#f3e6c8", ...sells("sausageroll", "Sausage roll and a doughnut", 1300, 24, 5, "Buy a sausage roll", 3) }),
    I("foodcounter", 0.9, -2.0, 0, { c: "#d62f39", c2: "#ffe14d", ...sells("burgerchips", "Chicken burger and chips", 3400, 54, 8, "Order a burger", 4) }),
    I("hotcase", 3.0, -2.0, 0, { c: "#8a1c24", c2: "#ffe14d", ...sells("friedrice", "Fried rice and chicken", 3900, 68, 6, "Order a plate", 5) }),
    I("drinkfridge", 4.4, -2.15, 0, sells("coldfanta", "Take a cold Fanta", 400, 3, 6, "Take a cold drink", 2)),
    I("drinkfridge", 5.4, -2.15, 0, sells("coldmalt", "Chilled malt", 450, 4, 6, "Take a cold drink", 2)),

    /* ---- the window counter on the left, with tall stools ---- */
    I("bar", -6.15, 0.5, H, { c: "#d62f39", c2: "#8a1c24" }), I("bar", -6.15, 2.9, H, { c: "#d62f39", c2: "#8a1c24" }),
    ...[-0.1, 0.5, 1.1, 2.3, 2.9, 3.5].map((z) => I("barstool", -5.45, z)),

    /* ---- booths on the right ---- */
    ...booth(6.5, 0.6, 1, "pie", "chicken", "#d62f39", "#f3e6c8"), ...booth(6.5, 3.2, 1, "burger", "pie", "#8a1c24", "#f3e6c8"),

    /* ---- the floor ---- */
    ...dine(-3.4, 0.6, "pie", FOUR, { trays: 2, variant2: "chicken", chair: "#d62f39", cloth: "#f3e6c8" }),
    ...dine(-0.6, 0.6, "burger", FOUR, { trays: 2, variant2: "pie", chair: "#f3e6c8", cloth: "#f3e6c8" }),
    ...dine(2.2, 0.6, "chicken", FOUR, { trays: 2, variant2: "burger", chair: "#d62f39", cloth: "#f3e6c8" }),
    ...dine(-3.4, 3.1, "chicken", THREE, { chair: "#f3e6c8", cloth: "#f3e6c8" }),
    ...dine(2.4, 3.1, "pie", THREE, { chair: "#d62f39", cloth: "#f3e6c8" }),

    neon("HOT PIES", 6.47, -0.9, -H, "#ff3b2f", 1.6, 1.9),
    I("wallart", 6.47, 1.9, -H, { y: 2.1, w: 0.9, c: "#d62f39" }),
    I("wallart", -6.47, -1.0, H, { y: 2.1, w: 0.9, c: "#d62f39" }),
    I("plant", -6.1, 4.28), I("plant", 6.1, 4.28),
    I("rug", 0, 3.3, 0, { w: 2.2, d: 1.2, c: "#d62f39" }),
    pendant(-3.4, 0.6, "#d62f39"), pendant(-0.6, 0.6, "#f3e6c8"), pendant(2.2, 0.6, "#d62f39"), pendant(-3.4, 3.1, "#f3e6c8"), pendant(2.4, 3.1, "#d62f39"),
  ],
});

const CHICKEN = lay({
  id: "chickenrepublic",
  name: "Chicken Republic",
  w: 14,
  d: 10,
  floor: "tile",
  wall: "#f6e3a1",
  trim: "#a3131f",
  accent: "#c8202f",
  light: "bright",
  exitX: 0,
  // a waist-high queue rail in front of the counters: closed at the left end, so the line starts at the right
  walls: [W(-2.2, -1.3, 4.2, -1.3), W(-2.2, -2.4, -2.2, -1.3)],
  zones: [
    { x: 0, z: -3.9, w: 14, d: 2.2, floor: "concrete", color: "#c9ccd0" },
    { x: 0, z: 2.2, w: 14, d: 5.6, floor: "wood", color: "#d7b588" },
  ],
  items: [
    /* ---- the kitchen: fryer line on the left, freezers and grills under the big menu panels ---- */
    sign("CHICKEN REPUBLIC", 1.5, -4.94, 0, "#c8202f", 4.2, 2.36),
    menu(-1.8, -4.95, 0, "#c8202f", 2.2, 1.12), menu(0.4, -4.95, 0, "#a3131f", 2.2, 1.12), menu(2.6, -4.95, 0, "#c8202f", 2.2, 1.12), menu(4.8, -4.95, 0, "#a3131f", 2.2, 1.12),
    I("prepcounter", -6, -4.625, 0), I("prepcounter", -4, -4.625, 0), I("cabinet", -2.6, -4.75, 0),
    I("freezer", -1.4, -4.6, 0), I("freezer", 0.2, -4.6, 0), I("freezer", 1.8, -4.6, 0),
    I("cabinet", 3.4, -4.75, 0), I("cabinet", 4.3, -4.75, 0), I("sink", 5.2, -4.7, 0), I("freezer", 6.2, -4.6, 0),

    /* ---- the counters: burgers, refuel meals, wings, cold drinks ---- */
    I("foodcounter", -1.2, -3.1, 0, { c: "#c8202f", c2: "#ffd23f", ...sells("burgerchips", "Chicken burger and chips", 3400, 54, 8, "Order a burger", 4) }),
    I("hotcase", 1.1, -3.1, 0, { c: "#a3131f", c2: "#ffd23f", ...sells("refuel", "Refuel meal (rice and chicken)", 4400, 74, 8, "Order a refuel meal", 5) }),
    I("foodcounter", 3.4, -3.1, 0, { c: "#c8202f", c2: "#ffd23f", ...sells("wings", "Spicy chicken wings", 3100, 45, 12, "Order wings", 4) }),
    I("drinkfridge", 6.35, -3.25, 0, sells("chapman", "Chilled Chapman", 500, 3, 8, "Take a cold Chapman", 2)),
    I("drinkfridge", -6.65, -2.0, H, sells("coldfanta", "Cold Fanta", 400, 3, 6, "Take a cold drink", 2)),
    I("drinkfridge", -6.65, -0.9, H, sells("coldcoke", "Cold Coke", 400, 3, 6, "Take a cold drink", 2)),

    /* ---- booths on the right ---- */
    ...booth(7, 0.8, 1, "chicken", "burger", "#c8202f", "#ffd23f"), ...booth(7, 3.4, 1, "burger", "chicken", "#a3131f", "#ffd23f"),

    /* ---- the family table, with two small stools at the ends ---- */
    I("diningtable", -4.6, 1.0, 0, { w: 3.0 }),
    onTable(-5.35, 0.8, "chicken"), onTable(-3.85, 0.8, "burger"), onTable(-5.35, 1.2, "rice"), onTable(-3.85, 1.2, "chicken"),
    ...[-5.4, -4.6, -3.8].flatMap((x) => [I("plasticchair", x, 0.25, 0, { c: x < -5 ? "#ffd23f" : "#c8202f" }), I("plasticchair", x, 1.75, R, { c: x > -4 ? "#ffd23f" : "#c8202f" })]),
    I("stool", -6.45, 1.0, 0, { c: "#ffd23f" }), I("stool", -2.75, 1.0, 0, { c: "#c8202f" }),

    /* ---- the hall: tables of four with a tray at every pair ---- */
    ...table4(-0.4, 0.9, "burger", "chicken", "#c8202f", "#ffd23f"),
    ...table4(2.6, 0.9, "chicken", "burger", "#ffd23f", "#c8202f"),
    ...table4(-4.6, 3.6, "rice", "chicken", "#ffd23f", "#c8202f"),
    ...table4(-1.6, 3.6, "chicken", "rice", "#c8202f", "#ffd23f"),
    ...table4(2.6, 3.6, "burger", "chicken", "#ffd23f", "#c8202f"),

    neon("REFUEL", -6.97, 2.4, H, "#ffd23f", 1.2),
    I("wallart", 6.97, -1.4, -H, { y: 2.1, w: 0.9, c: "#c8202f" }),
    I("plant", -6.55, 4.55), I("plant", 0.9, 4.6),
    pendant(-4.6, 1.0, "#ffd23f"), pendant(-0.4, 0.9, "#c8202f"), pendant(2.6, 0.9, "#ffd23f"), pendant(-4.6, 3.6, "#c8202f"), pendant(-1.6, 3.6, "#ffd23f"), pendant(2.6, 3.6, "#c8202f"), pendant(5.6, 0.8, "#ffd23f"), pendant(5.6, 3.4, "#c8202f"),
  ],
});

const SWEET = lay({
  id: "sweetsensation",
  name: "Sweet Sensation",
  w: 12,
  d: 8,
  floor: "tile",
  wall: "#fbe4ea",
  trim: "#8c6a7a",
  accent: "#f2a07b",
  light: "bright",
  exitX: 0,
  walls: [],
  zones: [
    { x: -4.4, z: -2.6, w: 3.2, d: 2.8, floor: "wood", color: "#e9d3b0" },
    { x: 3.0, z: -2.6, w: 6, d: 2.8, floor: "tile", color: "#fff1e6" },
    { x: -3.7, z: 2.3, w: 4.6, d: 3.2, floor: "carpet", color: "#f6d3e0" },
    { x: 4.0, z: 2.5, w: 4.2, d: 3, floor: "carpet", color: "#cfeee3" },
  ],
  items: [
    /* ---- the coffee corner ---- */
    neon("COFFEE", -4.4, -3.95, 0, "#ff7ab6", 1.1, 2.0),
    I("espresso", -4.4, -3.7, 0), I("bar", -4.4, -2.55, 0, { c: "#f2a07b", c2: "#8c6a7a" }),
    ...[-5.1, -4.4, -3.7].map((x) => I("barstool", x, -1.7)),
    I("drinkfridge", -2.6, -3.65, 0, sells("chapman", "Cold Chapman", 500, 3, 8, "Take a cold Chapman", 2)),

    /* ---- the pastry wall: pies, cakes and a hot case ---- */
    menu(-0.9, -3.95, 0, "#f2a07b"),
    sign("SWEET SENSATION", 3.0, -3.94, 0, "#ee7b22", 3.8, 2.15),
    I("pastrycase", 1.2, -3.65, 0, { c: "#f2a07b", c2: "#b8e6d3", ...sells("meatpie", "Meat pie and a cold drink", 1700, 31, 4, "Buy a meat pie", 3) }),
    I("pastrycase", 2.8, -3.65, 0, { c: "#f6c1d1", c2: "#b8e6d3", ...sells("cakeslice", "Slice of cake and a doughnut", 1600, 22, 10, "Buy a cake slice", 3) }),
    I("displaycase", 4.5, -3.75, 0, sells("cakedisplay", "Slice of birthday cake", 1800, 16, 14, "Buy a slice of cake", 3)),
    I("hotcase", 5.65, -1.0, -H, { c: "#f2a07b", c2: "#b8e6d3", ...sells("jollofturkey", "Jollof rice and turkey", 4100, 68, 6, "Order a plate", 5) }),
    I("counter", 5.7, 0.8, -H, { w: 1.4, c: "#f2a07b", c2: "#8c6a7a" }),

    /* ---- the tables between ---- */
    ...dine(-1.0, -0.2, "pie", [1.6, 4.7], { cloth: "#fbe9a0", chair: "#f6c1d1" }),
    ...dine(1.6, -0.2, "pie", [1.6, 4.7], { cloth: "#cfeee3", chair: "#bfe8d8" }),

    /* ---- soft seating: two lounge corners ---- */
    I("rug", -3.7, 2.2, 0, { w: 3.8, d: 2.6, c: "#f2a07b" }),
    I("coffeetable", -3.7, 1.9, 0), tray(-3.7, 1.9, "pie", 0, "#f2a07b", 0.43),
    I("loveseat", -3.7, 3.1, R, { c: "#f6c1d1" }), I("armchair", -5.4, 1.9, H, { c: "#c9b3ee" }), I("armchair", -2.0, 1.9, -H, { c: "#bfe8d8" }),
    I("rug", 4.0, 2.4, 0, { w: 3.6, d: 2.4, c: "#9fdcc4" }),
    I("coffeetable", 4.0, 1.9, 0), tray(4.0, 1.9, "pie", 0, "#9fdcc4", 0.43),
    I("sofa", 4.0, 3.2, R, { c: "#bfe8d8" }), I("armchair", 2.5, 1.9, H, { c: "#fbe9a0" }), I("armchair", 5.5, 1.9, -H, { c: "#f6c1d1" }),

    /* ---- walls and corners ---- */
    I("wallart", -5.93, -0.6, H, { y: 2.0, w: 0.9, c: "#f6c1d1" }), I("wallart", -5.93, 3.3, H, { y: 2.0, w: 0.9, c: "#9fdcc4" }), I("wallart", 5.93, 3.2, -H, { y: 2.0, w: 0.9, c: "#f2a07b" }),
    I("wallsconce", -5.93, 0.6, H), I("wallsconce", 5.93, -2.6, -H), I("wallsconce", 5.93, 2.2, -H),
    I("plant", -5.55, 3.55), I("plant", 5.55, 3.55), I("plant", -1.9, -3.6),
    pendant(-4.4, -2.5, "#f2a07b"), pendant(-1.0, -0.2, "#fbe9a0"), pendant(1.6, -0.2, "#9fdcc4"), pendant(-3.7, 2.1, "#f6c1d1"), pendant(4.0, 2.1, "#c9b3ee"),
  ],
});

const KILI = lay({
  id: "kilimanjaro",
  name: "Kilimanjaro",
  w: 14,
  d: 10,
  floor: "wood",
  wall: "#e5ecd3",
  trim: "#9a7424",
  accent: "#2f6f4e",
  exitX: 0,
  // the kitchen is a walled room in the back right corner, with its door onto the dining room
  walls: [W(2.6, -5, 2.6, -2.3), W(2.6, -2.3, 7, -2.3, 0.3, 1.4)],
  zones: [
    { x: 4.8, z: -3.65, w: 4.4, d: 2.7, floor: "tile", color: "#e6e2d6" },
    { x: 0, z: 4.0, w: 14, d: 2, floor: "marble", color: "#efe8d6" },
  ],
  items: [
    /* ---- the buffet along the back wall: ofada, fried rice, jollof ---- */
    sign("KILIMANJARO", -4.0, -4.94, 0, "#2f6f4e", 3.2, 2.2),
    I("bukapots", -5.4, -4.6, 0, { c: "#2f6f4e", c2: "#c9a24a", ...sells("ofadastew", "Ofada rice and stew", 4100, 73, 8, "Dish up ofada", 5) }),
    I("bukapots", -3.3, -4.6, 0, { c: "#c9a24a", c2: "#2f6f4e", ...sells("friedriceplantain", "Fried rice and plantain", 3600, 69, 6, "Dish up fried rice", 5) }),
    I("hotcase", -1.2, -4.65, 0, { c: "#2f6f4e", c2: "#c9a24a", ...sells("jollofmoimoi", "Jollof rice and moi moi", 3500, 67, 6, "Order a plate", 5) }),
    menu(-1.2, -4.95, 0, "#2f6f4e"),
    I("wallart", 0.9, -4.97, 0, { y: 2.1, w: 0.9, c: "#c9a24a" }), I("plant", 0.9, -4.55),
    I("wallsconce", 1.7, -4.95, 0), I("wallsconce", -6.5, -4.95, 0),

    /* ---- the drinks: fridges and a bar with tall stools ---- */
    I("drinkfridge", -6.65, -2.6, H, sells("chapman", "Chilled Chapman", 500, 3, 8, "Take a cold Chapman", 2)),
    I("drinkfridge", -6.65, -1.6, H, sells("zobo", "Chilled zobo", 400, 4, 7, "Take a cold zobo", 2)),
    I("bar", -6.15, 0.3, H, { c: "#c9a24a", c2: "#2f6f4e" }),
    ...[-0.3, 0.3, 0.9].map((z) => I("barstool", -5.45, z)),

    /* ---- the kitchen and the waiters' station ---- */
    I("stove", 3.4, -4.7, 0), I("stove", 4.1, -4.7, 0), I("sink", 4.9, -4.7, 0), I("prepcounter", 6.1, -4.625, 0, { w: 1.7 }), I("freezer", 6.6, -3.1, -H),
    I("counter", 6.0, -1.75, 0, { w: 1.6, c: "#c9a24a", c2: "#2f6f4e" }), I("waterdispenser", 4.9, -1.85), I("plant", 6.7, -1.0),

    /* ---- white tablecloths: round tables, wooden chairs, a gold charger tray at each ---- */
    ...dine(-3.4, -0.2, "rice", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),
    ...dine(-0.2, -0.2, "chicken", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),
    ...dine(3.0, -0.2, "rice", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),
    ...dine(-4.4, 2.3, "chicken", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),
    ...dine(-1.8, 2.3, "rice", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),
    ...dine(1.9, 2.3, "rice", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),
    ...dine(4.7, 2.3, "chicken", FOUR, { cloth: "#f6f1e4", wood: true, trayColor: "#c9a24a" }),

    /* ---- the entrance ---- */
    I("rug", 0, 4.2, 0, { w: 2.4, d: 1.2, c: "#2f6f4e" }),
    I("plant", -6.55, 4.55), I("plant", 6.55, 4.55), I("loveseat", 5.6, 4.1, R, { c: "#2f6f4e" }),
    I("wallart", -6.97, 3.4, H, { y: 2.1, w: 0.9, c: "#2f6f4e" }), I("wallart", 6.97, 0.9, -H, { y: 2.1, w: 0.9, c: "#c9a24a" }),
    I("wallsconce", -6.93, -0.2, H), I("wallsconce", -6.93, 3.0, H), I("wallsconce", 6.93, 1.8, -H), I("wallsconce", 6.93, 3.4, -H),
    pendant(-3.4, -0.2, "#c9a24a"), pendant(-0.2, -0.2, "#c9a24a"), pendant(3.0, -0.2, "#c9a24a"), pendant(-4.4, 2.3, "#c9a24a"), pendant(-1.8, 2.3, "#c9a24a"), pendant(1.9, 2.3, "#c9a24a"), pendant(4.7, 2.3, "#c9a24a"),
  ],
});

export const FOOD_LAYOUTS: Record<string, Layout> = {
  "amala-skye": AMALA,
  "challenge-eatery": MAMA,
  item7: ITEM7,
  mrbiggs: BIGGS,
  chickenrepublic: CHICKEN,
  sweetsensation: SWEET,
  kilimanjaro: KILI,
};
