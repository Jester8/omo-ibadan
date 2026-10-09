import type { Layout } from "./interiors";
import { H, I, R, W, around, col, lay, row } from "./layoutKit";
import { CELL_SPAWNS } from "./custodyRules";

/**
 * Police stations, EFCC, the custodial centre and the court. Owned by the INT-LAW agent. Authored in metres like layouts.ts.
 * No people anywhere: the "officer" is the servicedesk (a counter with a screen and a bell); a chair behind a desk is just a seat.
 * Validated by `npm run check:interiors` (spawn free, every use item reachable, no overlaps) plus the cell isolation asserts in that script.
 */

const BLUE = "#2f5d8a";
const GREEN = "#0b6b4f";

const police = (id: string, name: string): Layout =>
  lay({
    id, name, w: 14, d: 10, floor: "tile", wall: "#dde7f0", trim: "#1f3a5f", accent: BLUE, light: "bright", exitX: 0,
    walls: [],
    zones: [{ x: 0, z: -3.2, w: 14, d: 3.6, floor: "concrete", color: "#c9d3dc" }],
    items: [
      // the counter: the desk is the officer
      I("servicedesk", 0, -1.0, 0, { w: 2.4, service: "police" }),
      ...row("counter", -5.0, -1.0, 3, 1.5, 0, { w: 1.5 }),
      ...row("counter", 2.0, -1.0, 3, 1.5, 0, { w: 1.5 }),
      // back office (reachable by the 1.25 m gaps at each end of the counter)
      I("pcdesk", -5.4, -4.3, 0, { w: 1.3 }), I("chair", -5.4, -3.5, R),
      I("pcdesk", 5.4, -4.3, 0, { w: 1.3 }), I("chair", 5.4, -3.5, R),
      I("cabinet", -3.0, -4.7, 0), I("cabinet", -2.0, -4.7, 0),
      I("bookshelf", 2.2, -4.7, 0), I("bookshelf", 3.3, -4.7, 0),
      I("flag", -0.9, -4.5), I("flag", 0.9, -4.5),
      I("signboard", 0, -4.92, 0, { y: 2.1, label: "POLICE", c: "#1f3a5f" }),
      I("clock", 4.8, -4.93, 0, { y: 2.2 }),
      I("blackboard", -6.92, -3.2, H, { w: 2.2 }),
      // waiting benches face the counter
      ...row("bench", -6.2, 2.6, 3, 1.8, R), ...row("bench", 2.6, 2.6, 3, 1.8, R),
      I("rug", 0, 2.4, 0, { w: 2.0, d: 4.0, c: BLUE }),
      I("waterdispenser", 6.5, 4.4), I("plant", -6.4, 4.4),
      I("ceilingfan", -3.5, 1.5), I("ceilingfan", 3.5, 1.5),
      I("wallart", 6.93, -2.4, -H, { y: 1.8, w: 1.2, c: BLUE }),
    ],
  });

const efcc = (): Layout =>
  lay({
    id: "efcc", name: "EFCC Zonal Office, Ibadan", w: 12, d: 9, floor: "marble", wall: "#e6efe9", trim: "#12372a", accent: GREEN, light: "bright", exitX: 0,
    walls: [],
    items: [
      I("servicedesk", 0, -1.2, 0, { w: 2.4, service: "efcc" }),
      ...row("counter", -3.45, -1.2, 2, 1.5, 0, { w: 1.5 }),
      ...row("counter", 1.95, -1.2, 2, 1.5, 0, { w: 1.5 }),
      I("pcdesk", -4.6, -3.7, 0, { w: 1.3 }), I("chair", -4.6, -2.9, R),
      I("pcdesk", 4.6, -3.7, 0, { w: 1.3 }), I("chair", 4.6, -2.9, R),
      ...row("bookshelf", -1.15, -4.25, 3, 1.15, 0),
      I("flag", -1.0, -3.0, 0, { c: GREEN }), I("flag", 1.0, -3.0, 0, { c: GREEN }),
      I("signboard", 0, -4.42, 0, { y: 2.1, label: "EFCC", c: GREEN }),
      I("displaycase", -5.7, 0.6, H, { w: 1.6 }),
      I("clock", 5.4, -4.43, 0, { y: 2.2 }),
      I("loveseat", -3.6, 2.8, R), I("loveseat", 3.6, 2.8, R), I("coffeetable", -3.6, 1.8), I("coffeetable", 3.6, 1.8),
      I("rug", 0, 2.2, 0, { w: 2.0, d: 3.4, c: GREEN }),
      I("plant", -5.4, 3.6), I("plant", 5.4, 3.6), I("waterdispenser", 5.5, 0.4),
      I("ceilingfan", -3, 0.8), I("ceilingfan", 3, 0.8),
      I("wallart", -5.93, 3.0, H, { y: 1.8, w: 1.2, c: GREEN }),
    ],
  });

/** Where the prisoners stand, in layout metres: one per cell. Same numbers as CELL_SPAWNS in custodyRules.ts (the server places them there). */
const CELLS = CELL_SPAWNS.map(([x]) => x); // [-6, 0, 6]

const prison = (): Layout => ({
  ...lay({
    id: "prison", name: "Agodi Custodial Centre", w: 18, d: 12, floor: "concrete", wall: "#aeb4bb", trim: "#2b2f36", accent: "#475569", light: "cool", exitX: 0,
    // the cell-front wall and two cell dividers: sealed (no door), so the grid keeps prisoners in and visitors out
    walls: [W(-9, -0.5, 9, -0.5), W(-3, -6, -3, -0.5), W(3, -6, 3, -0.5)],
    zones: [
      { x: 0, z: -3.25, w: 18, d: 5.5, floor: "concrete", color: "#8a8f98" },
      { x: 0, z: 3.25, w: 18, d: 5.5, floor: "tile", color: "#cfd4da" },
    ],
    items: [
      ...CELLS.map((cx) => I("cellbars", cx, -0.5, 0, { w: 5.8 })),
      ...CELLS.flatMap((cx) => [
        I("singlebed", cx - 1.9, -4.9, 0), I("singlebed", cx + 1.9, -4.9, 0),
        I("toilet", cx - 0.5, -5.55, 0), I("basin", cx + 0.5, -5.7, 0),
        I("bukapots", cx, -1.4, 0, { w: 2.0, verb: "Eat the prison meal", action: { id: "prisonmeal", label: "Eat the prison meal", secs: 5, gain: { hunger: 40, fun: -3 } } }),
        I("waterdispenser", cx + 2.4, -1.3),
        I("rug", cx, -3.0, 0, { w: 2.0, d: 1.4, c: "#6b7280" }),
      ]),
      // visitors' hall: benches face the bars so friends can sit and talk (room chat, no extra protocol)
      ...CELLS.map((cx) => I("bench", cx, 0.7, R)),
      I("servicedesk", 5.6, 3.2, 0, { w: 2.4, service: "bail" }),
      ...row("bench", -7.6, 3.4, 3, 2.0, 0),
      I("flag", 4.0, 2.2), I("flag", 7.2, 2.2),
      I("signboard", 8.93, 0.8, -H, { y: 2.0, label: "VISITORS", c: "#334155" }),
      I("clock", -8.93, 2.2, H, { y: 2.2 }),
      I("plant", -8.2, 5.0), I("plant", 8.2, 5.0),
      I("ceilingfan", -4, 2.6), I("ceilingfan", 4, 5),
    ],
  }),
  cells: CELL_SPAWNS.map((spawn) => ({ spawn })),
});

const court = (): Layout =>
  lay({
    id: "high-court", name: "Oyo State High Court", w: 18, d: 12, floor: "wood", wall: "#efe6d4", trim: "#5a3a24", accent: "#7a1f2e", light: "bright", exitX: 0,
    walls: [],
    zones: [{ x: 0, z: -2.5, w: 18, d: 7, floor: "wood" }],
    items: [
      I("stage", 0, -4.6, 0, { w: 7, d: 2.2 }), I("desk", 0, -4.6, 0, { w: 2.2 }), I("chair", 0, -5.4, 0), I("flag", -3.6, -5.0), I("flag", 3.6, -5.0),
      I("wallart", 0, -5.93, 0, { y: 2.0, w: 1.6, c: "#7a1f2e" }), I("clock", -2.4, -5.93, 0, { y: 2.2 }),
      ...col("bookshelf", -8.4, -4.8, 3, 1.15, H), ...col("bookshelf", 8.4, -4.8, 3, 1.15, -H),
      I("desk", -2.6, -1.0, R, { w: 1.8 }), I("chair", -2.6, 0.0, R), I("desk", 2.6, -1.0, R, { w: 1.8 }), I("chair", 2.6, 0.0, R),
      I("podium", 4.9, -2.7, 0), I("bench", -5.0, -2.3, 0, { w: 2.4 }),
      ...[0, 1, 2, 3].flatMap((k) => [I("pew", -3.4, 2.1 + k * 1.0, R, { w: 3.0 }), I("pew", 3.4, 2.1 + k * 1.0, R, { w: 3.0 })]),
      I("counter", -6.6, 4.4, 0, { w: 2.2 }), I("waterdispenser", 7.6, 4.6), I("plant", -8.2, 5.0), I("plant", 8.2, 1.0), I("chandelier", 0, -1), I("chandelier", 0, 3.5),
      I("signboard", 0, -5.93, 0, { y: 2.55, label: "OYO STATE HIGH COURT", c: "#7a1f2e", w: 3.4 }),
    ],
  });

void around;
export const LAW_LAYOUTS: Record<string, Layout> = {
  "police-dugbe": police("police-dugbe", "Dugbe Police Station"),
  "police-mokola": police("police-mokola", "Mokola Police Station"),
  efcc: efcc(),
  prison: prison(),
  "high-court": court(),
};
