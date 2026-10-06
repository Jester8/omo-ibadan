/** Size and street layout of Ibadan (world units; 1 unit is about 25 m). */
export const WORLD_HALF = 45;
export const ROAD_LINES = [-40, -30, -20, -10, 0, 10, 20, 30, 40];
export const BLOCK_CENTERS = [-35, -25, -15, -5, 5, 15, 25, 35];

const TINTS = ["#dfe6f4", "#f1e6d6", "#e3eed9", "#ebe9de", "#d6eed0", "#f0ead8", "#ece6ef", "#f0e5d3", "#e9e7e1", "#ebe7dc", "#e0eee4", "#f0e8d0", "#d9eed2"];
export const BLOCKS: { c: [number, number]; tint: string }[] = BLOCK_CENTERS.flatMap((cz, j) =>
  BLOCK_CENTERS.map((cx, i) => ({ c: [cx, cz] as [number, number], tint: TINTS[(i * 5 + j * 3) % TINTS.length] })),
);

/* ----------------------------- gated estates and the campus ----------------------------- */

export type Gate = { x: number; z: number; across: "x" | "z" };
export type Zone = { id: string; name: string; rect: [number, number, number, number]; gates: Gate[] };
export type Estate = Zone & { price: number; districts: string[] };

/** Estates have walls and boom gates on the road crossings. Residents (anyone owning a house inside) walk in; others need a pass. */
export const ESTATES: Estate[] = [
  { id: "bodija-estate", name: "Bodija Estate", rect: [1, -29, 9, -11], price: 3000, districts: ["Bodija Estate"], gates: [{ x: 1, z: -20, across: "z" }, { x: 9, z: -20, across: "z" }] },
  { id: "jericho-gra", name: "Jericho GRA", rect: [11, -29, 19, -11], price: 5000, districts: ["Jericho GRA"], gates: [{ x: 11, z: -20, across: "z" }, { x: 19, z: -20, across: "z" }] },
  { id: "oluyole-estate", name: "Oluyole Estate", rect: [-9, 11, -1, 29], price: 4000, districts: ["Oluyole Estate"], gates: [{ x: -9, z: 20, across: "z" }, { x: -1, z: 20, across: "z" }] },
  { id: "iyaganku-heights", name: "Iyaganku Heights", rect: [11, 21, 19, 39], price: 6000, districts: ["Iyaganku Heights"], gates: [{ x: 11, z: 30, across: "z" }, { x: 19, z: 30, across: "z" }] },
];

/** University of Ibadan campus: open to everyone, but only the two gates lead in. */
export const CAMPUS: Zone = { id: "ui-campus", name: "University of Ibadan", rect: [-39, -39, -21, -21], gates: [{ x: -30, z: -21, across: "x" }, { x: -21, z: -30, across: "z" }] };
export const CAMPUS_PLACES = ["ui-library", "ui-science", "ui-arts", "ui-law", "ui-trenchard"];

export const inRect = (r: [number, number, number, number], x: number, z: number, pad = 0) => x >= r[0] - pad && x <= r[2] + pad && z >= r[1] - pad && z <= r[3] + pad;
export const inCampus = (x: number, z: number) => inRect(CAMPUS.rect, x, z, 0.4);

export type WallRect = { x: number; z: number; w: number; d: number };
const GAP = 2.4;

/** Wall pieces around a rectangle, leaving a gap at every gate. */
export function wallsFor(zone: Zone): WallRect[] {
  const [x1, z1, x2, z2] = zone.rect;
  const T = 0.24;
  const out: WallRect[] = [];
  const side = (fixed: number, from: number, to: number, horizontal: boolean) => {
    const gates = zone.gates
      .filter((g) => (horizontal ? Math.abs(g.z - fixed) < 0.01 : Math.abs(g.x - fixed) < 0.01))
      .map((g) => (horizontal ? g.x : g.z))
      .sort((a, b) => a - b);
    let cur = from;
    for (const c of [...gates, to + GAP]) {
      const end = Math.min(c - GAP / 2, to);
      if (end > cur + 0.05) {
        const mid = (cur + end) / 2;
        const len = end - cur;
        out.push(horizontal ? { x: mid, z: fixed, w: len, d: T } : { x: fixed, z: mid, w: T, d: len });
      }
      cur = c + GAP / 2;
    }
  };
  side(z1, x1, x2, true);
  side(z2, x1, x2, true);
  side(x1, z1, z2, false);
  side(x2, z1, z2, false);
  return out;
}

export const ESTATE_BY_ID = Object.fromEntries(ESTATES.map((e) => [e.id, e])) as Record<string, Estate>;
