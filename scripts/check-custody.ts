// npm run check:custody: the police, the EFCC and the prison against the real place and layout data.
//  - every id in STATIONS and PRISON_ID is a place with an interior layout (and a servicedesk for its service)
//  - every cell spawn is free floor in the prison layout, and the layout has a cell for every CELL_SPAWNS entry
//  - the doors of the stations and the prison are 3.6 or more apart from any other door
//  - the police stations and the prison never close; the EFCC office opens at 8am like the server's filing hours (efccFilingOpen)
//  - the shared files match the server's copies when ../ibadanserver- exists
import { existsSync, readFileSync } from "node:fs";
import { PLACES, doorOf } from "../src/lib/places";
import { placeLayout } from "../src/lib/layouts";
import { buildInteriorGrid, cellSpawnOf } from "../src/lib/interiors";
import { S } from "../src/lib/furniture";
import { opensAt } from "../src/lib/events";
import { CELL_SPAWNS, INTERIOR_SCALE, PRISON_ID, STATIONS } from "../src/lib/custodyRules";

let errors = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };
const ok = (s: string) => console.log("  ok   ", s);

const stationIds = [...STATIONS.police, ...STATIONS.efcc];
for (const id of [...stationIds, PRISON_ID]) {
  const p = PLACES.find((q) => q.id === id);
  if (!p) { err(`${id}: not a place`); continue; }
  const l = placeLayout(id);
  if (!l) { err(`${id}: no interior layout`); continue; }
  if (p.service && !l.items.some((it) => it.kind === "servicedesk" && (it.service ?? p.service) === p.service)) err(`${id}: no servicedesk for "${p.service}"`);
  if (id === "efcc" ? opensAt(id) !== "8am" : opensAt(id)) err(`${id}: opening hours in events.ts are "${opensAt(id)}"${id === "efcc" ? ", the server files from 8am" : ", it never closes"}`);
  const d = doorOf(p);
  for (const q of PLACES) {
    if (q.id === id) continue;
    const e = doorOf(q);
    const gap = Math.hypot(d.x - e.x, d.z - e.z);
    if (gap < 3.6) err(`${id}: door is ${gap.toFixed(2)} from the door of ${q.id} (needs 3.6)`);
  }
}
if (!errors) ok(`${stationIds.length} stations and the prison are places with layouts, desks, and doors at least 3.6 apart`);

const prison = placeLayout(PRISON_ID);
if (prison) {
  const grid = buildInteriorGrid(prison);
  const cells = prison.cells?.length ?? 0;
  if (cells < CELL_SPAWNS.length) err(`prison: ${cells} cells for ${CELL_SPAWNS.length} CELL_SPAWNS`);
  for (let i = 0; i < Math.max(cells, CELL_SPAWNS.length); i++) {
    const [x, z] = cellSpawnOf(prison, i);
    if (grid.isBlockedAt(x * S, z * S)) err(`prison: cell ${i} spawn (${x}, ${z}) is not free floor`);
  }
  CELL_SPAWNS.forEach(([x, z], i) => {
    const [cx, cz] = cellSpawnOf(prison, i);
    // the server places a prisoner at CELL_SPAWNS * INTERIOR_SCALE (world units); the layout spawn is in metres
    if (Math.abs(x * INTERIOR_SCALE - cx * S) > 0.9 || Math.abs(z * INTERIOR_SCALE - cz * S) > 0.9) err(`prison: CELL_SPAWNS[${i}] (${x}, ${z}) is far from the layout's cell ${i} spawn (${cx}, ${cz})`);
  });
  if (!errors) ok(`${cells} cell spawns are free floor and match the server's cell positions`);
}

const server = "../ibadanserver-/src/lib";
if (existsSync(server)) {
  for (const f of ["protocol.ts", "custodyRules.ts", "socialRules.ts", "moneyRules.ts"]) {
    const a = readFileSync(`src/lib/${f}`, "utf8");
    const b = existsSync(`${server}/${f}`) ? readFileSync(`${server}/${f}`, "utf8") : null;
    if (b === null) err(`${f}: the server has no copy`);
    else if (a !== b) err(`${f}: differs from the server's copy`);
  }
  if (!errors) ok("the shared files match the server's copies");
} else console.log("  skip  ../ibadanserver- not found: shared files not compared");

console.log(errors ? `\n${errors} problem(s).` : "\nPolice, EFCC and prison data are sound.");
process.exit(errors ? 1 : 0);
