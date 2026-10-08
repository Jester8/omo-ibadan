import type { FloorKind, Item, Layout, Zone } from "./interiors";
import { H, I, R, around, col, lay, row } from "./layoutKit";

/* ------------------------------------------------------------------------------------------------
 * The five nightlife venues: Afrobeat Lounge, Sky Bar, Owambe Garden, Palmwine Joint, Suya Spot & Shisha Lounge.
 * Each sets vibe "club" (moving lights and music). The first zone of every room is its dance floor: the
 * coloured lights circle it and the ceiling-light pass puts its spots round it. The floors stay empty for
 * real players. Wall fixtures sit a hand off the wall: back wall rot 0, left wall H, right wall -H.
 * Nothing here is a person: the crowd is whoever walks in.
 * ---------------------------------------------------------------------------------------------- */

/** a neon sign on a wall (the letters are the label, in colour c; y is its centre). Keep w at 3 or less: the letters are drawn for 6:1 at most. */
const neon = (label: string, x: number, z: number, rot: number, c: string, w = 2.4, y = 2.0): Item => I("neonsign", x, z, rot, { label, c, w, y });
const sconce = (x: number, z: number, rot: number, y = 1.9): Item => I("wallsconce", x, z, rot, { y });
/** a coloured ceiling spot (a coloured one sways like a club light) */
const spot = (x: number, z: number, c: string): Item => I("spotlight", x, z, 0, { c });
/** a swag of fairy lights; rot 0 runs along x, H along z; no colour means warm and mixed */
const swag = (x: number, z: number, w: number, rot = 0, c?: string): Item => I("lightstring", x, z, rot, { w, ...(c ? { c } : {}) });
const pendant = (x: number, z: number, c: string): Item => I("pendant", x, z, 0, { c });
/** a talking drum standing on a stage (the stage top is 0.3 m up) */
const drum = (x: number, z: number): Item => I("drum", x, z, 0, { y: 0.3 });
/** a food tray on a table top (variant: burger, rice, chicken, pie) */
const tray = (x: number, z: number, variant: string, rot = 0, y = 0.75): Item => I("tray", x, z, rot, { y, variant });

type Rect = { x0: number; x1: number; z0: number; z1: number };
const rectOf = (z: Zone): Rect => ({ x0: z.x - z.w / 2, x1: z.x + z.w / 2, z0: z.z - z.d / 2, z1: z.z + z.d / 2 });
const whole = (w: number, d: number): Rect => ({ x0: -w / 2, x1: w / 2, z0: -d / 2, z1: d / 2 });
/**
 * Tints the floor of `area` in four strips round `hole` (the dance floor). Zones must never overlap, or the
 * two planes fight over the same pixels and flicker, so the rest of the floor is cut into strips instead.
 */
function floorAround(area: Rect, hole: Zone, floor: FloorKind, color: string): Zone[] {
  const h = rectOf(hole);
  const strips: Rect[] = [
    { x0: area.x0, x1: area.x1, z0: area.z0, z1: h.z0 },
    { x0: area.x0, x1: area.x1, z0: h.z1, z1: area.z1 },
    { x0: area.x0, x1: h.x0, z0: h.z0, z1: h.z1 },
    { x0: h.x1, x1: area.x1, z0: h.z0, z1: h.z1 },
  ];
  return strips
    .filter((r) => r.x1 - r.x0 > 0.05 && r.z1 - r.z0 > 0.05)
    .map((r) => ({ x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2, w: r.x1 - r.x0, d: r.z1 - r.z0, floor, color }));
}

/** a round table with a cloth, plastic chairs round it in aso-ebi colours, a tray of jollof in the middle and a pendant over it */
function party(x: number, z: number, cloth: string, chairs: string, n = 6, variant = "rice"): Item[] {
  return [
    I("roundtable", x, z, 0, { c: cloth }),
    tray(x, z, variant),
    ...around("plasticchair", x, z, 0.9, n, 0.5, { c: chairs }),
    pendant(x, z, cloth),
  ];
}

/* ================================================================================================
 * 1. Afrobeat Lounge: the flagship. A DJ pit between two stage wings of talking drums, a big LED floor
 *    under a mirror ball, VIP booths down one wall and a long lit bar down the other.
 * ============================================================================================== */

const AFRO_DANCE: Zone = { x: 0, z: 0.2, w: 8, d: 6, floor: "tile", color: "#33135e" };

const AFROBEAT = lay({
  id: "club-afrobeat",
  name: "Afrobeat Lounge",
  w: 18,
  d: 13,
  floor: "tile",
  wall: "#2a1740",
  trim: "#150a24",
  accent: "#c026d3",
  light: "cool",
  vibe: "club",
  exitX: -5,
  walls: [],
  zones: [AFRO_DANCE, ...floorAround(whole(18, 13), AFRO_DANCE, "tile", "#1e0f33")],
  items: [
    /* ---- the stage: two raised wings for the live drummers, the DJ pit between them ---- */
    I("stage", -5.6, -5.4, 0, { w: 4.2, d: 2.2 }), I("stage", 5.6, -5.4, 0, { w: 4.2, d: 2.2 }),
    drum(-6.7, -5.5), drum(-5.6, -5.8), drum(-4.5, -5.5), drum(4.5, -5.5), drum(5.6, -5.8), drum(6.7, -5.5),
    I("djbooth", 0, -5.45, 0),
    // a speaker stack either side of the booth, and one at each end of the stage
    I("speaker", -2.35, -6.1, 0), I("speaker", 2.35, -6.1, 0), I("speaker", -8.4, -6.1, 0), I("speaker", 8.4, -6.1, 0),
    neon("AFROBEAT", 0, -6.45, 0, "#ff4fd8", 3.0, 2.1),
    neon("LOUNGE", -6.5, -6.45, 0, "#22d3ee", 1.8, 2.05), neon("LOUNGE", 6.5, -6.45, 0, "#facc15", 1.8, 2.05),
    spot(-5.6, -4.9, "#22d3ee"), spot(5.6, -4.9, "#facc15"), spot(-1.3, -5.5, "#ff3df2"), spot(1.3, -5.5, "#22d3ee"),

    /* ---- the dance floor, left empty for the crowd ---- */
    I("ledfloor", 0, 0.2, 0, { w: 7, d: 5 }), I("discoball", 0, 0.2, 0, { w: 0.8 }),
    swag(0, -3.5, 16, 0, "#c084fc"), swag(0, 4.0, 16, 0, "#22d3ee"),

    /* ---- VIP booths down the left wall, each with its glowing table ---- */
    I("rug", -6.7, -0.6, 0, { w: 2.6, d: 7.6, c: "#4c1d95" }),
    I("vipbooth", -8.5, -3.1, H, { c: "#7a1fa2" }), I("vipbooth", -8.5, -0.6, H, { c: "#9d174d" }), I("vipbooth", -8.5, 1.9, H, { c: "#4c1d95" }),
    neon("VIP", -8.93, -0.6, H, "#facc15", 1.0, 2.1),
    sconce(-8.93, -1.85, H), sconce(-8.93, 0.65, H), sconce(-8.93, 3.6, H),
    swag(-7.2, -0.5, 7.4, H, "#f0abfc"),
    spot(-7.2, -2.4, "#ff3df2"), spot(-7.2, 1.4, "#c084fc"),
    // a sofa corner by the door
    I("sofa", -8.2, 4.7, H, { c: "#6d28d9" }), I("coffeetable", -6.9, 4.7, H), I("plant", -8.4, 6.1),

    /* ---- the long bar down the right wall: back-bar bottles, pendants, stools, a fridge of drinks ---- */
    ...col("bar", 7.4, -2.0, 3, 2.4, -H, { c2: "#2a1740" }),
    I("bottleshelf", 8.7, -1.7, -H, { c: "#e879f9" }), I("bottleshelf", 8.7, 1.3, -H, { c: "#22d3ee" }), I("bottleshelf", 8.7, 3.4, -H, { w: 1.2, c: "#facc15" }),
    ...col("barstool", 6.4, -2.7, 7, 1.0),
    I("drinkfridge", 8.5, -4.1, -H),
    neon("BAR", 8.93, 0.4, -H, "#22d3ee", 1.2, 2.35),
    pendant(7.4, -2.0, "#e879f9"), pendant(7.4, 0.4, "#22d3ee"), pendant(7.4, 2.8, "#e879f9"),
    I("lantern", 7.4, -1.2, 0, { y: 1.1 }), I("lantern", 7.4, 1.6, 0, { y: 1.1 }), I("calabash", 7.4, 0.4, 0, { y: 1.1 }),
    spot(6.6, -1.4, "#e879f9"), spot(6.6, 2.4, "#22d3ee"),

    /* ---- high tables and stools in front of the floor ---- */
    I("roundtable", -1.4, 4.9), tray(-1.4, 4.9, "chicken"), ...around("stool", -1.4, 4.9, 0.75, 3, 0.4),
    I("roundtable", 1.9, 4.9), I("lantern", 1.9, 4.9, 0, { y: 0.75 }), ...around("stool", 1.9, 4.9, 0.75, 3, 1.1),
    I("loveseat", 7.0, 5.7, R, { c: "#be185d" }), I("plant", 8.5, 6.0), I("plant", 4.4, 6.0),
    sconce(-8.93, 6.0, H), neon("NO SHAKARA", 8.93, 4.9, -H, "#fb7185", 3.0, 2.0), sconce(8.93, 3.0, -H, 2.2),
  ],
});

/* ================================================================================================
 * 2. Sky Bar & Lounge: a calm navy and teal rooftop. A back bar under pendants, a plant-and-bench
 *    railing on the view side, VIP booths, sofa pods on rugs and a small LED patch with a chill DJ.
 * ============================================================================================== */

const SKY_DANCE: Zone = { x: 2.6, z: 0.8, w: 5, d: 4, floor: "tile", color: "#0c4a5c" };

const ROOFTOP = lay({
  id: "club-rooftop",
  name: "Sky Bar & Lounge",
  w: 16,
  d: 12,
  floor: "marble",
  wall: "#0e2438",
  trim: "#06121f",
  accent: "#14b8a6",
  light: "cool",
  vibe: "club",
  exitX: 3,
  walls: [],
  zones: [SKY_DANCE, ...floorAround(whole(16, 12), SKY_DANCE, "marble", "#1c3856")],
  items: [
    /* ---- the back bar ---- */
    ...row("bar", -4.4, -4.55, 3, 2.4, 0, { c: "#14b8a6", c2: "#0f2a40" }),
    I("bottleshelf", -4.1, -5.78, 0, { c: "#2dd4bf" }), I("bottleshelf", -1.1, -5.78, 0, { c: "#38bdf8" }), I("bottleshelf", 1.0, -5.78, 0, { w: 1.2, c: "#2dd4bf" }),
    ...row("barstool", -5.2, -3.6, 7, 1.0),
    pendant(-4.4, -4.55, "#14b8a6"), pendant(-2.0, -4.55, "#14b8a6"), pendant(0.4, -4.55, "#14b8a6"),
    neon("SKY BAR", -1.5, -5.95, 0, "#5eead4", 3.0, 2.35),
    I("lantern", -3.2, -4.55, 0, { y: 1.1 }), I("lantern", 1.0, -4.55, 0, { y: 1.1 }), I("calabash", -5.2, -4.55, 0, { y: 1.1 }),
    I("plant", -7.4, -5.3), I("plant", 2.3, -5.5), I("wallart", -7.0, -5.95, 0, { y: 1.8, w: 1.1, c: "#14b8a6" }),
    spot(-3.0, -3.0, "#2dd4bf"), spot(0.4, -3.0, "#38bdf8"),

    /* ---- a chill DJ nook in the back right corner ---- */
    I("djbooth", 5.0, -5.3, 0, { w: 2.2 }), I("speaker", 3.1, -5.65, 0), I("speaker", 6.9, -5.65, 0),
    sconce(3.9, -5.93, 0), sconce(6.1, -5.93, 0), spot(5.0, -4.0, "#818cf8"),

    /* ---- the view side: a railing of planters and benches facing out along the left wall ---- */
    ...Array.from({ length: 6 }, (_, k) => I("plant", -7.55, -3.2 + k * 1.6)),
    ...Array.from({ length: 5 }, (_, k) => I("bench", -7.65, -2.4 + k * 1.6, -H, { w: 1.0, c: "#14b8a6" })),
    sconce(-7.93, -0.8, H), sconce(-7.93, 2.4, H),

    /* ---- VIP booths along the right wall, each with a glowing table ---- */
    I("vipbooth", 7.5, -2.7, -H, { c: "#0f766e" }), I("vipbooth", 7.5, -0.2, -H, { c: "#155e75" }), I("vipbooth", 7.5, 2.3, -H, { c: "#1e3a8a" }),
    neon("VIP", 7.93, -0.2, -H, "#5eead4", 1.0, 2.1),
    sconce(7.93, -1.45, -H), sconce(7.93, 1.05, -H), sconce(7.93, 3.9, -H),
    spot(6.8, -1.4, "#2dd4bf"), spot(6.8, 1.2, "#38bdf8"),

    /* ---- the small LED patch ---- */
    I("ledfloor", 2.6, 0.8, 0, { w: 4.4, d: 3.4 }),
    swag(0, -2.2, 14, 0, "#5eead4"), swag(0, 3.4, 14, 0, "#7dd3fc"), swag(5.0, 0.8, 9, H),

    /* ---- sofa pods on teal rugs ---- */
    I("rug", -3.4, 1.4, 0, { w: 4.4, d: 3.4, c: "#0f766e" }),
    I("sofa", -3.4, 0.0, 0, { c: "#155e75" }), I("sofa", -3.4, 2.8, R, { c: "#155e75" }), I("coffeetable", -3.4, 1.4),
    I("loveseat", -5.5, 1.4, H, { c: "#0f766e" }), I("loveseat", -1.3, 1.4, -H, { c: "#0f766e" }),
    I("lantern", -3.4, 1.4, 0, { y: 0.42 }),
    spot(-3.4, 1.4, "#818cf8"),
    I("rug", -3.9, 4.9, 0, { w: 4.4, d: 2.2, c: "#1e3a8a" }),
    I("loveseat", -5.5, 4.9, H, { c: "#1e3a8a" }), I("loveseat", -2.3, 4.9, -H, { c: "#1e3a8a" }), I("coffeetable", -3.9, 4.9, H),
    I("rug", 6.0, 4.8, 0, { w: 3.2, d: 2.0, c: "#155e75" }),
    I("armchair", 4.9, 4.8, H, { c: "#0f766e" }), I("armchair", 7.1, 4.8, -H, { c: "#0f766e" }), I("coffeetable", 6.0, 4.8, H), I("lantern", 6.0, 4.8, 0, { y: 0.42 }),
    I("plant", 0.2, -2.9), I("plant", 7.6, 5.6), I("plant", 4.2, 5.7),
  ],
});

/* ================================================================================================
 * 3. Owambe Garden & Dance Hall: gold and wine. A live band stage, a wooden dance floor, round
 *    aso-ebi tables in the hall and on the lawn, a buffet line and a drinks bar down the sides.
 * ============================================================================================== */

const OWAMBE_DANCE: Zone = { x: 0, z: -1.7, w: 10, d: 5, floor: "wood", color: "#b8862e" };
const OWAMBE_LAWN: Zone = { x: 0, z: 5.2, w: 20, d: 3.6, floor: "grass", color: "#2d6a3e" };

const OWAMBE = lay({
  id: "club-owambe",
  name: "Owambe Garden & Dance Hall",
  w: 20,
  d: 14,
  floor: "carpet",
  wall: "#4a1424",
  trim: "#8a6a1a",
  accent: "#d9a22b",
  light: "cool",
  vibe: "club",
  exitX: 0,
  walls: [],
  zones: [OWAMBE_DANCE, OWAMBE_LAWN, ...floorAround({ x0: -10, x1: 10, z0: -7, z1: 3.4 }, OWAMBE_DANCE, "carpet", "#5a1a2a")],
  items: [
    /* ---- the live band's stage, drums, PA and the sound desk ---- */
    I("stage", 0, -5.7, 0, { w: 9.2, d: 2.6 }),
    drum(-3.8, -5.9), drum(-2.9, -5.5), drum(2.9, -5.5), drum(3.8, -5.9),
    I("calabash", -4.2, -4.8, 0, { y: 0.3 }), I("calabash", 4.2, -4.8, 0, { y: 0.3 }),
    I("speaker", -5.2, -6.55, 0), I("speaker", 5.2, -6.55, 0), I("speaker", -5.2, -5.0, 0), I("speaker", 5.2, -5.0, 0),
    I("djbooth", -8.0, -6.35, 0),
    neon("OWAMBE", 0, -6.95, 0, "#fbbf24", 3.0, 2.15),
    // the celebrants' seats
    I("armchair", 7.2, -6.3, 0, { c: "#d9a22b" }), I("armchair", 8.6, -6.3, 0, { c: "#d9a22b" }), I("plant", 9.4, -4.9),
    I("wallart", -8.0, -6.95, 0, { y: 1.9, w: 1.4, c: "#d9a22b" }), I("wallart", 7.9, -6.95, 0, { y: 1.9, w: 1.4, c: "#8a1f3c" }),
    sconce(-6.6, -6.93, 0), sconce(6.6, -6.93, 0), sconce(-9.5, -6.93, 0),
    spot(-3.0, -4.0, "#fbbf24"), spot(0, -4.0, "#fb7185"), spot(3.0, -4.0, "#fde68a"),
    // a gift and cake table, and the aso-ebi robes on show
    I("desk", 6.4, -3.3, 0, { w: 1.8 }), tray(5.9, -3.3, "pie", 0, 0.75), tray(6.9, -3.3, "pie", 0, 0.75), I("lantern", 6.4, -3.3, 0, { y: 0.75 }),
    I("agbadastand", -6.9, -3.3, 0, { c: "#d9a22b" }), I("agbadastand", -6.0, -3.3, 0, { c: "#8a1f3c" }),

    /* ---- the dance floor and the lights over it ---- */
    I("ledfloor", 0, -1.7, 0, { w: 6, d: 3.4 }), I("discoball", 0, -1.7, 0, { w: 0.6 }),
    I("chandelier", -6.3, -1.7), I("chandelier", 6.3, -1.7),
    swag(0, -3.9, 18), swag(0, 1.4, 18), swag(0, 4.4, 18, 0, "#fde68a"),

    /* ---- the drinks bar down the left wall ---- */
    ...col("bar", -8.4, -3.0, 3, 2.4, H, { c: "#d9a22b", c2: "#4a1424" }),
    I("bottleshelf", -9.7, -2.7, H, { c: "#fbbf24" }), I("bottleshelf", -9.7, 0.3, H, { c: "#fb7185" }), I("bottleshelf", -9.7, 2.4, H, { w: 1.2, c: "#fbbf24" }),
    ...col("barstool", -7.55, -3.7, 6, 1.0),
    I("drinkfridge", -9.5, 3.9, H),
    neon("DRINKS", -9.93, 0.3, H, "#fb7185", 1.8, 2.35),
    I("lantern", -8.4, -0.6, 0, { y: 1.1 }), I("calabash", -8.4, 1.8, 0, { y: 1.1 }),
    spot(-7.2, -1.2, "#fb7185"), spot(-7.2, 1.8, "#fbbf24"),

    /* ---- the buffet down the right wall ---- */
    I("hotcase", 9.5, -3.0, -H, { c: "#8a1f3c", c2: "#d9a22b" }), I("bukapots", 9.5, -1.0, -H, { c: "#8a1f3c", c2: "#d9a22b" }),
    I("bukapots", 9.5, 1.1, -H, { c: "#d9a22b", c2: "#8a1f3c" }), I("pastrycase", 9.5, 3.0, -H),
    I("signboard", 9.93, -0.1, -H, { label: "BUFFET", c: "#8a1f3c", w: 2.4, y: 2.2 }),
    sconce(9.93, -3.0, -H, 2.0), sconce(9.93, 3.0, -H, 2.0),
    spot(7.6, -1.4, "#fbbf24"), spot(7.6, 1.6, "#fb7185"),

    /* ---- round tables: gold and wine cloths, the chairs in the other colour ---- */
    ...party(-6.2, 2.6, "#d9a22b", "#8a1f3c"), ...party(-2.9, 2.6, "#8a1f3c", "#d9a22b"),
    ...party(2.9, 2.6, "#f1e4c8", "#8a1f3c"), ...party(6.2, 2.6, "#d9a22b", "#f1e4c8"),
    // on the lawn
    ...party(-7.6, 5.7, "#8a1f3c", "#d9a22b", 5, "chicken"), ...party(-4.3, 5.7, "#d9a22b", "#8a1f3c", 5),
    ...party(4.3, 5.7, "#f1e4c8", "#d9a22b", 5), ...party(7.6, 5.7, "#8a1f3c", "#f1e4c8", 5, "chicken"),
    I("plant", -9.4, 5.6), I("plant", 9.4, 4.8), I("plant", -9.4, 6.5), I("plant", 9.4, 6.4),
  ],
});

/* ================================================================================================
 * 4. Palmwine Joint, Bere: an old-school bar of dark timber. Calabashes on the counter, carved
 *    stools, kerosene lanterns, a fuji speaker pair by a little stage and a pepper-soup grill.
 * ============================================================================================== */

const PALM_DANCE: Zone = { x: 2.6, z: 0.6, w: 5, d: 3.2, floor: "wood", color: "#8a5a2a" };

const PALMWINE = lay({
  id: "palmwine",
  name: "Palmwine Joint, Bere",
  w: 14,
  d: 10,
  floor: "redoxide",
  wall: "#3a2410",
  trim: "#24160a",
  accent: "#c98b3a",
  light: "warm",
  vibe: "club",
  exitX: 3,
  walls: [],
  zones: [PALM_DANCE],
  items: [
    /* ---- the counter, with calabashes, a radio and lanterns, and the kegs behind it ---- */
    ...row("bar", -4.4, -3.6, 2, 2.4, 0, { c: "#c98b3a", c2: "#4a2f18" }),
    ...row("carvedstool", -5.0, -2.75, 5, 1.0),
    I("calabash", -5.2, -3.6, 0, { y: 1.1 }), I("calabash", -3.7, -3.6, 0, { y: 1.1 }), I("calabash", -2.1, -3.6, 0, { y: 1.1 }),
    I("lantern", -4.5, -3.6, 0, { y: 1.1 }), I("lantern", -2.9, -3.6, 0, { y: 1.1 }), I("radio", -1.2, -3.6, 0, { y: 1.1 }),
    I("cooler", 0.1, -3.6, 0, { verb: "Drink palmwine", action: { id: "palmwine", label: "Drink palmwine", secs: 4, cost: 1500, gain: { fun: 22, social: 16 } } }),
    I("cabinet", -5.4, -4.7, 0), I("cabinet", -3.2, -4.7, 0), I("cabinet", -1.4, -4.7, 0),
    I("calabash", -4.3, -4.65, 0, { y: 0 }), I("crates", -6.3, -4.6, 0), I("sacks", -6.3, -3.9, 0), I("crates", -0.2, -4.6, 0), I("sacks", 1.0, -4.65, 0),
    I("signboard", -2.8, -4.97, 0, { label: "PALMWINE JOINT", c: "#7a4a1a", w: 3.4, y: 2.2 }),
    I("signboard", -6.95, 3.4, H, { label: "PEPPER SOUP", c: "#8a2f1c", w: 1.8, y: 2.1 }),
    pendant(-4.4, -3.1, "#d89b3c"), pendant(-1.6, -3.1, "#d89b3c"), pendant(2.8, -1.0, "#c98b3a"), pendant(-3.6, 0.7, "#c98b3a"),

    /* ---- the stage corner: drums, and a pair of speakers for old-school fuji and highlife ---- */
    I("stage", 5.3, -3.9, 0, { w: 3.4, d: 2.2 }),
    drum(4.6, -4.0), drum(5.5, -4.2), I("ibeji", 6.5, -4.2, 0, { y: 0.3 }),
    I("speaker", 3.0, -4.4, 0), I("speaker", 6.5, -2.2, 0),
    spot(5.3, -2.8, "#f59e0b"), spot(2.6, -1.2, "#fb923c"),

    /* ---- the dance spot for fuji ---- */
    swag(0, -1.5, 12), swag(0, 2.5, 12), swag(2.8, 0.6, 7, H),

    /* ---- low tables with carved stools, and benches along the walls ---- */
    I("rug", -3.6, 0.7, 0, { w: 4.0, d: 2.6, c: "#8a2f1c" }),
    I("coffeetable", -3.6, 0.7), ...around("carvedstool", -3.6, 0.7, 1.0, 5, 0.3), I("calabash", -3.6, 0.7, 0, { y: 0.42 }),
    I("coffeetable", -4.2, 3.5), ...around("carvedstool", -4.2, 3.5, 0.95, 4, 0.8), I("lantern", -4.2, 3.5, 0, { y: 0.42 }),
    ...col("bench", -6.5, -0.4, 2, 1.7, H), I("lantern", -6.4, 0.45, 0, { y: 0.45 }),
    I("coffeetable", 0.6, 3.4), ...around("carvedstool", 0.6, 3.4, 0.95, 4, 0.2), I("calabash", 0.6, 3.4, 0, { y: 0.42 }),
    ...col("bench", 6.7, 0.0, 2, 1.7, -H), I("lantern", 6.6, 0.85, 0, { y: 0.45 }),
    I("bench", 5.6, 4.3, R), I("bench", 3.6, -1.5, 0, { w: 1.2 }),

    /* ---- the pepper-soup and suya grill ---- */
    I("grillstand", -6.4, 3.4, H, { verb: "Order pepper soup", action: { id: "pepper", label: "Pepper soup", secs: 4, cost: 2000, gain: { hunger: 32, fun: 8 } } }),
    I("wallart", 6.9, -1.0, -H, { y: 1.8, w: 1.0, c: "#8a2f1c" }), I("wallart", -6.9, -2.2, H, { y: 1.8, w: 1.0, c: "#2f3b82" }),
    sconce(-6.93, 1.9, H, 1.8), sconce(6.93, 2.4, -H, 1.8), sconce(6.93, -2.0, -H, 1.8), sconce(2.0, -4.93, 0, 1.8),
    I("ceilingfan", -1.5, 1.2), I("ceilingfan", 3.4, 3.0),
    I("plant", 6.5, 4.5), I("plant", -6.5, 4.6),
  ],
});

/* ================================================================================================
 * 5. Suya Spot & Shisha Lounge: a smoky open-air lounge. Two grills and an order counter, a bar,
 *    a football wall of TVs with VIP booths facing it, low pods on rugs and a dance corner.
 * ============================================================================================== */

const SUYA_DANCE: Zone = { x: 5.0, z: 3.2, w: 5, d: 4, floor: "tile", color: "#3b1a12" };

const SUYA = lay({
  id: "suya-lounge",
  name: "Suya Spot & Shisha Lounge",
  w: 16,
  d: 11,
  floor: "concrete",
  wall: "#3a1a12",
  trim: "#1a0d09",
  accent: "#b8401f",
  light: "cool",
  vibe: "club",
  exitX: 0,
  walls: [],
  zones: [SUYA_DANCE, ...floorAround(whole(16, 11), SUYA_DANCE, "concrete", "#6f655d")],
  items: [
    /* ---- the suya bay: two grills, an order counter and a fridge ---- */
    I("grillstand", -6.2, -4.9, 0), I("grillstand", -4.6, -4.9, 0), I("foodcounter", -2.0, -4.85, 0), I("drinkfridge", -0.1, -4.95, 0),
    neon("SUYA", -5.0, -5.45, 0, "#fb923c", 2.2, 2.15),
    sconce(-7.3, -5.43, 0), sconce(-2.0, -5.43, 0), sconce(1.2, -5.43, 0),
    spot(-5.4, -3.7, "#fb923c"), spot(-2.0, -3.7, "#facc15"),

    /* ---- the football wall: two TVs, a speaker at each end, booths facing them ---- */
    I("tv", 3.4, -5.1, 0), I("tv", 5.6, -5.1, 0), I("speaker", 1.9, -5.15, 0), I("speaker", 7.1, -5.15, 0),
    neon("FOOTBALL", 4.5, -5.45, 0, "#4ade80", 3.0, 2.2),
    I("vipbooth", 3.0, -1.2, R, { c: "#9a3412" }), I("vipbooth", 5.8, -1.2, R, { c: "#7c2d12" }),
    swag(4.5, -3.0, 7, 0, "#fdba74"),
    spot(4.5, -2.6, "#4ade80"),
    I("plant", 1.6, -3.2), I("plant", 7.3, -2.8),

    /* ---- the bar down the left wall ---- */
    ...col("bar", -6.45, -2.4, 2, 2.4, H, { c: "#b8401f", c2: "#2a1410" }),
    I("bottleshelf", -7.8, -0.9, H, { c: "#fb923c" }), I("bottleshelf", -7.8, 1.5, H, { w: 1.8, c: "#22d3ee" }),
    ...col("barstool", -5.6, -1.8, 5, 1.0),
    I("drinkfridge", -7.5, 3.6, H),
    neon("BAR", -7.93, 0.3, H, "#22d3ee", 1.2, 2.35),
    I("lantern", -6.45, -1.2, 0, { y: 1.1 }), I("calabash", -6.45, 1.2, 0, { y: 1.1 }),
    sconce(-7.93, 3.5, H, 2.2), sconce(-7.93, -3.4, H, 2.2),

    /* ---- low lounge pods on adire rugs, a gourd and a lantern on each table ---- */
    I("rug", -2.7, 3.0, 0, { w: 4.2, d: 2.6, c: "#7c2d12" }),
    I("loveseat", -4.3, 3.0, H, { c: "#9a3412" }), I("loveseat", -1.1, 3.0, -H, { c: "#9a3412" }), I("coffeetable", -2.7, 3.0, H), I("lantern", -2.7, 3.0, 0, { y: 0.42 }),
    I("rug", -2.7, 0.7, 0, { w: 4.2, d: 2.2, c: "#2f3b82" }),
    I("loveseat", -4.3, 0.7, H, { c: "#1e3a8a" }), I("loveseat", -1.1, 0.7, -H, { c: "#1e3a8a" }), I("coffeetable", -2.7, 0.7, H), I("calabash", -2.7, 0.7, 0, { y: 0.42 }),
    swag(-2.7, 1.9, 9, 0), swag(0, 4.6, 14, 0, "#fb923c"),
    spot(-2.7, 1.9, "#f43f5e"),

    /* ---- the dance corner ---- */
    I("ledfloor", 5.0, 3.2, 0, { w: 4.4, d: 3.2 }), I("discoball", 5.0, 3.2, 0, { w: 0.5 }),
    I("speaker", 7.6, 0.9, -H), I("speaker", 7.6, 5.0, -H),
    neon("DANCE", 7.93, 3.0, -H, "#f472b6", 1.4, 2.1),
    I("plant", 2.4, 5.0), I("plant", 2.7, 1.0), I("plant", -7.4, 5.0),
  ],
});

export const NIGHT_LAYOUTS: Record<string, Layout> = {
  "club-afrobeat": AFROBEAT,
  "club-rooftop": ROOFTOP,
  "club-owambe": OWAMBE,
  palmwine: PALMWINE,
  "suya-lounge": SUYA,
};
