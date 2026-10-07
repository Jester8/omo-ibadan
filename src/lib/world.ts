/** Size and street layout of Ibadan (world units; 1 unit is about 25 m). */
export const WORLD_HALF = 75;
export const ROAD_LINES = Array.from({ length: 15 }, (_, i) => -70 + i * 10);
export const BLOCK_CENTERS = Array.from({ length: 14 }, (_, i) => -65 + i * 10);

const TINTS = ["#dfe6f4", "#f1e6d6", "#e3eed9", "#ebe9de", "#d6eed0", "#f0ead8", "#ece6ef", "#f0e5d3", "#e9e7e1", "#ebe7dc", "#e0eee4", "#f0e8d0", "#d9eed2"];
export const BLOCKS: { c: [number, number]; tint: string }[] = BLOCK_CENTERS.flatMap((cz, j) =>
  BLOCK_CENTERS.map((cx, i) => ({ c: [cx, cz] as [number, number], tint: TINTS[(i * 5 + j * 3) % TINTS.length] })),
);

/* ----------------------------- gated estates and the campus ----------------------------- */

export type Gate = { x: number; z: number; across: "x" | "z" };
export type Zone = { id: string; name: string; rect: [number, number, number, number]; gates: Gate[] };

/**
 * Each estate is a small walled town: 4 x 3 city blocks (40 x 30 units) with its own streets, a park, a clubhouse and
 * forty houses. `origin` is the north-west road crossing; sub-blocks sit between the streets that run through it.
 */
export type Estate = Zone & {
  price: number;
  districts: string[];
  plotPrice: number;
  origin: [number, number];
  /** centre of the park sub-block and of the clubhouse sub-block */
  park: [number, number];
  club: [number, number];
};

const subCentre = (x1: number, z1: number, c: number, r: number): [number, number] => [x1 + 5 + c * 10, z1 + 5 + r * 10];

function bigEstate(id: string, name: string, price: number, plotPrice: number, x1: number, z1: number, north: boolean, west: boolean): Estate {
  // the wall sits one unit inside the surrounding streets
  const rect: [number, number, number, number] = [x1 + 1, z1 + 1, x1 + 39, z1 + 29];
  const faceZ = north ? z1 + 29 : z1 + 1; // the wall that faces the old city
  const sideX = west ? x1 + 39 : x1 + 1; // the wall that faces the middle of the map
  return {
    id,
    name,
    rect,
    price,
    plotPrice,
    districts: [name],
    origin: [x1, z1],
    park: subCentre(x1, z1, 1, 1),
    club: subCentre(x1, z1, 2, 1),
    gates: [
      { x: x1 + 20, z: faceZ, across: "x" },
      { x: sideX, z: north ? z1 + 20 : z1 + 10, across: "z" },
    ],
  };
}

/** Estates have walls and boom gates on their streets. Residents (anyone owning a house inside) walk in; others need a pass. */
export const ESTATES: Estate[] = [
  bigEstate("bodija-estate", "Bodija Estate", 3000, 180000, -70, -70, true, true),
  bigEstate("jericho-gra", "Jericho GRA", 5000, 260000, 30, -70, true, false),
  bigEstate("oluyole-estate", "Oluyole Estate", 4000, 220000, -70, 40, false, true),
  bigEstate("iyaganku-heights", "Iyaganku Heights", 6000, 230000, 30, 40, false, false),
];

/** Centres of the forty plots in an estate: four to each sub-block, except the park and the clubhouse. */
export function estatePlotCenters(e: Estate): [number, number][] {
  const out: [number, number][] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const [cx, cz] = subCentre(e.origin[0], e.origin[1], c, r);
      if ((cx === e.park[0] && cz === e.park[1]) || (cx === e.club[0] && cz === e.club[1])) continue;
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) out.push([cx + dx, cz + dz]);
    }
  }
  return out;
}

/** Solid parts of the estates that people cannot walk through. */
export const ESTATE_SOLIDS: { x: number; z: number; w: number; d: number }[] = ESTATES.flatMap((e) => [
  { x: e.club[0] - 1.4, z: e.club[1] - 1.8, w: 4.6, d: 3.2 }, // the clubhouse
  { x: e.park[0], z: e.park[1], w: 1.8, d: 1.8 }, // the fountain
]);

/** University of Ibadan campus: open to everyone, but only the two gates lead in. */
export const CAMPUS: Zone = { id: "ui-campus", name: "University of Ibadan", rect: [-39, -39, -21, -21], gates: [{ x: -30, z: -21, across: "x" }, { x: -21, z: -30, across: "z" }] };
export const CAMPUS_PLACES = ["ui-library", "ui-science", "ui-arts", "ui-law", "ui-trenchard"];

/** Eleyele Lake, on the west side of the map. */
export const inLake = (x: number, z: number) => ((x + 58) / 9.6) ** 2 + ((z + 4) / 16.6) ** 2 < 1;

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
