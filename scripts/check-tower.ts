// npm run check:tower: Bower's Tower: always open, a door you can walk to, and a telescope that points at real places.
import { PLACES, doorOf } from "../src/lib/places";
import { CAMPUS_PLACES } from "../src/lib/world";
import { RANKS } from "../src/lib/ranks";
import { isOpen } from "../src/lib/events";
import { findPath, getWorldGrid, rebuildGrid } from "../src/lib/pathing";
import { DECK_Y } from "../src/lib/towerRuntime";
import { LANDMARKS, TOWER_POS, compassOf } from "../src/lib/tower";

let errors = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };
const ok = (s: string) => console.log("  ok   ", s);
const check = (name: string, f: () => void) => {
  const before = errors;
  f();
  if (errors === before) ok(name);
};

const tower = PLACES.find((p) => p.id === "bowers")!;
rebuildGrid([]);
const grid = getWorldGrid();

check("the tower is open every hour of the day", () => {
  for (let h = 0; h <= 24; h += 0.5) if (!isOpen("bowers", h)) err(`closed at ${h}h`);
});

check("the tower's door is a free cell you can walk to, clear of the cab parks", () => {
  const d = doorOf(tower);
  if (grid.isBlockedAt(d.x, d.z)) err(`the door cell (${d.x.toFixed(2)}, ${d.z.toFixed(2)}) is blocked`);
  for (const k of RANKS) if (Math.abs(d.x - k.pos[0]) < 4.2 && Math.abs(d.z - k.pos[1]) < 1.8) err(`the door is inside the ${k.id} cab park`);
  for (const [sx, sz] of [[0.5, 8.2], [-10, 10], [10, 10], [-3, -3]] as [number, number][]) {
    const path = findPath(sx, sz, d.x, d.z);
    const end = path && path.length ? path[path.length - 1] : null;
    if (!end || Math.hypot(end.x - d.x, end.z - d.z) > 0.6) err(`a walk from (${sx}, ${sz}) ends ${end ? Math.hypot(end.x - d.x, end.z - d.z).toFixed(2) : "nowhere"} from the door`);
  }
});

check("the telescope's landmarks are real, not campus faculties, nearest first", () => {
  if (LANDMARKS.length !== 14) err(`${LANDMARKS.length} landmarks, expected 14`);
  for (const l of LANDMARKS) {
    if (!PLACES.some((p) => p.id === l.id)) err(`${l.id} is not a place`);
    if (CAMPUS_PLACES.includes(l.id)) err(`${l.id} is a campus faculty`);
    if (l.id === "bowers") err("the tower cannot look at itself");
  }
  for (let i = 1; i < LANDMARKS.length; i++) if (LANDMARKS[i].metres < LANDMARKS[i - 1].metres) err("landmarks are not sorted by distance");
  const cocoa = LANDMARKS.find((l) => l.id === "cocoa-house")!;
  if (Math.round(cocoa.bearing) !== 228 || cocoa.dir !== "SW" || Math.round(cocoa.metres) !== 151) err(`Cocoa House reads ${cocoa.dir} ${Math.round(cocoa.bearing)} degrees ${Math.round(cocoa.metres)} m, expected SW 228 151`);
  if (compassOf(359) !== "N" || compassOf(91) !== "E" || compassOf(-45) !== "NW") err("compassOf is wrong");
});

check("the deck stands above the tower's own footprint and TOWER_POS is the place", () => {
  if (TOWER_POS.x !== tower.pos[0] || TOWER_POS.z !== tower.pos[1]) err("TOWER_POS does not match the place");
  if (!(DECK_Y > 0)) err("DECK_Y must be positive");
});

console.log(errors ? `\n${errors} problem(s).` : "\nBower's Tower is sound.");
process.exit(errors ? 1 : 0);
