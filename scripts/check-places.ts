// npm run check:places            (errors fail the run; warnings are listed)
// npm run check:places -- --strict (warnings fail too: use before a release)
import { PLACES, DISTRICTS, doorOf, isSolid, type Place } from "../src/lib/places";
import { CIVIC_PLACES } from "../src/lib/placesCivic";
import { PLOTS, PLOT_SIZE } from "../src/lib/plots";
import { AD_PLAZA, CAMPUS, ESTATES, ROAD_LINES, inLake } from "../src/lib/world";
import { findPath, getWorldGrid, rebuildGrid } from "../src/lib/pathing";
import { ALL_PLACE_LAYOUT_IDS, placeLayout } from "../src/lib/layouts";
import { RANKS } from "../src/lib/ranks";
import { EVENTS } from "../src/lib/events";
import { SERVICES } from "../src/lib/services";

const strictMode = process.argv.includes("--strict");
const civic = new Set(CIVIC_PLACES.map((p) => p.id));
const layoutIds = new Set(ALL_PLACE_LAYOUT_IDS);
const districts = new Set([...DISTRICTS.map((d) => d.name), ...PLACES.filter((p) => !civic.has(p.id)).map((p) => p.district)]);

let errors = 0, warns = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };
const warn = (s: string) => { warns++; console.log("  warn ", s); };

type R = [number, number, number, number];
const F = (p: Place): R => [p.pos[0] - p.size[0] / 2, p.pos[1] - p.size[2] / 2, p.pos[0] + p.size[0] / 2, p.pos[1] + p.size[2] / 2];
const grow = (r: R, l: number, b: number, rt: number, f: number): R => [r[0] - l, r[1] - b, r[2] + rt, r[3] + f];
const hit = (a: R, b: R) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
const gapBetween = (a: R, b: R) => Math.max(Math.max(a[0], b[0]) - Math.min(a[2], b[2]), Math.max(a[1], b[1]) - Math.min(a[3], b[3]));

// the food picture / eating animation matchers (src/components/ui/FoodArt.tsx dishFor, src/lib/store.ts foodFor): keep in step
const FOODISH = /ofada|jollof|refuel|fried rice|\brice\b|amala|gbegiri|combo|pounded|iyan|egusi|efo|suya|moin|moi-moi|moimoi|akara|pap\b|wing|chicken|pie|burger|soup/;

const ids = new Set<string>();
for (const p of PLACES) {
  if (ids.has(p.id)) err(`duplicate id ${p.id}`);
  ids.add(p.id);
  if (p.id.length > 31) err(`${p.id}: id too long for the server room name (in:place:<id> must be <= 40 chars)`);
  const aid = new Set<string>();
  for (const a of p.actions) {
    if (aid.has(a.id)) err(`${p.id}: duplicate action id ${a.id}`);
    aid.add(a.id);
    if (civic.has(p.id) && a.cost && FOODISH.test(`${a.id} ${a.label}`.toLowerCase())) warn(`${p.id}/${a.id}: a paid action whose words draw a food picture ("${a.label}")`);
    if (["climb", "book", "board"].includes(a.id) && civic.has(p.id)) err(`${p.id}/${a.id}: action id is special-cased by the panels`);
    if (a.svc && !(a.svc in SERVICES)) err(`${p.id}/${a.id}: unknown service ${a.svc}`);
  }
  if (p.service && !(p.service in SERVICES)) err(`${p.id}: unknown service ${p.service}`);
  if (civic.has(p.id)) {
    if (!districts.has(p.district)) err(`${p.id}: district "${p.district}" is not a DISTRICTS label or an existing district`);
    if (isSolid(p) && !layoutIds.has(p.id)) warn(`${p.id}: no interior layout yet (no "Go inside")`);
  }
  if (layoutIds.has(p.id) && p.service) {
    const l = placeLayout(p.id)!;
    if (!l.items.some((it) => it.kind === "servicedesk" && (it.service ?? p.service) === p.service)) err(`${p.id}: declares service "${p.service}" but its layout has no servicedesk for it`);
  }
}
for (const id of layoutIds) {
  const l = placeLayout(id)!;
  const p = PLACES.find((q) => q.id === id);
  for (const it of l.items) if (it.kind === "servicedesk" && !(it.service ?? p?.service) && !it.action) err(`${id}: a servicedesk at ${it.x},${it.z} has no service and no action`);
  if (!p && id !== "club") warn(`layout "${id}" belongs to no place`);
}
for (const e of EVENTS) if (!ids.has(e.placeId)) err(`event ${e.id}: no such place ${e.placeId}`);
console.log(`${PLACES.length} places (${CIVIC_PLACES.length} civic)`);

const lamps: number[] = [];
for (let t = -44; t <= 44; t += 5.5) if (!ROAD_LINES.some((q) => Math.abs(t - q) < 1.8)) lamps.push(t);
const others: { r: R; why: string }[] = [];
for (const p of PLOTS) others.push({ r: [p.pos[0] - PLOT_SIZE / 2 - 0.7, p.pos[1] - PLOT_SIZE / 2 - 0.7, p.pos[0] + PLOT_SIZE / 2 + 0.7, p.pos[1] + PLOT_SIZE / 2 + 0.7], why: `plot ${p.id}` });
for (const k of RANKS) {
  others.push({ r: [k.pos[0] - 4.2, k.pos[1] - 1.8, k.pos[0] + 4.2, k.pos[1] + 1.8], why: `cab park ${k.id}` });
  others.push({ r: [k.pos[0] + 3.7, k.pos[1], k.pos[0] + 5.5, k.pos[1] + 24], why: `cab lane ${k.id}` });
}
for (const e of ESTATES) others.push({ r: [e.rect[0] - 1.6, e.rect[1] - 1.6, e.rect[2] + 1.6, e.rect[3] + 1.6], why: `estate ${e.id}` });
others.push({ r: [CAMPUS.rect[0] - 1.6, CAMPUS.rect[1] - 1.6, CAMPUS.rect[2] + 1.6, CAMPUS.rect[3] + 1.6], why: "campus" });
others.push({ r: [AD_PLAZA.x - AD_PLAZA.half - 0.9, AD_PLAZA.z - AD_PLAZA.half - 0.9, AD_PLAZA.x + AD_PLAZA.half + 0.9, AD_PLAZA.z + AD_PLAZA.half + 1.5], why: "the Ad Plaza" });

rebuildGrid([]);
const grid = getWorldGrid();
const starts: [number, number][] = [[0, 0], [-30, 30], [30, -30], [-60, 0], [60, 0], [0, 60], [0, -60], [0.5, 8.2]];
for (const p of PLACES) {
  if (!civic.has(p.id)) continue; // older places are never failed (a few of them overlap already)
  const f = F(p);
  const k = grow(f, 0.9, 0.9, 0.9, 1.5);
  for (const o of others) if (hit(k, o.r)) err(`${p.id}: keep-out overlaps ${o.why}`);
  for (const q of PLACES) {
    if (q === p) continue;
    if (civic.has(q.id)) {
      // two civic buildings may share a block, but their footprints must be at least 1.0 apart (a walkable cell between them)
      const gap = gapBetween(f, F(q));
      if (gap < 1.0) err(`${p.id}: only ${gap.toFixed(2)} from ${q.id} (needs 1.0)`);
    } else if (hit(k, grow(F(q), 0.9, 0.9, 0.9, 1.5))) err(`${p.id}: keep-out overlaps ${q.id}`);
  }
  for (const r of ROAD_LINES) if ((f[0] < r + 1.5 && f[2] > r - 1.5) || (f[1] < r + 1.5 && f[3] > r - 1.5)) err(`${p.id}: footprint within 1.5 of road ${r}`);
  lake: for (let x = f[0] - 1.5; x <= f[2] + 1.5; x += 0.75) for (let z = f[1] - 1.5; z <= f[3] + 1.5; z += 0.75) if (inLake(x, z)) { err(`${p.id}: within 1.5 of the lake`); break lake; }
  for (const ix of ROAD_LINES) for (const iz of ROAD_LINES) for (const [dx, dz] of [[1.2, 1.2], [-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2]]) {
    if (ix + dx > f[0] - 0.5 && ix + dx < f[2] + 0.5 && iz + dz > f[1] - 0.5 && iz + dz < f[3] + 0.5) err(`${p.id}: covers a traffic-light post`);
  }
  for (const r of ROAD_LINES) for (const t of lamps) for (const [lx, lz] of [[r + 1.15, t], [t, r - 1.15]]) if (lx > f[0] - 0.35 && lx < f[2] + 0.35 && lz > f[1] - 0.35 && lz < f[3] + 0.35) err(`${p.id}: covers a street lamp`);
  const d = doorOf(p);
  if (ROAD_LINES.find((r) => r - d.z >= 0.7 && r - d.z <= 2.7) === undefined) err(`${p.id}: door point z=${d.z.toFixed(2)} is not 0.7..2.7 north of a road line`);
  for (const q of PLACES) if (q !== p) { const e = doorOf(q); if (Math.hypot(e.x - d.x, e.z - d.z) < 3.6) err(`${p.id}: door within 3.6 of ${q.id}'s door`); }
  if (grid.isBlockedAt(d.x, d.z)) err(`${p.id}: the door cell is blocked (front edge z=${f[3].toFixed(2)} must have a fractional part in [0.10, 0.55))`);
  for (const [sx, sz] of starts) {
    const path = findPath(sx, sz, d.x, d.z);
    const last = path?.[path.length - 1];
    if (!last || Math.hypot(last.x - d.x, last.z - d.z) >= 1.7) { err(`${p.id}: cannot reach the door from (${sx}, ${sz})`); continue; }
    // the nearest door within 1.7 of where the walker stops must be this one (Player.tsx decides atPlace that way)
    let near: string | null = null, best = 1.7;
    for (const q of PLACES) { const e = doorOf(q); const dd = Math.hypot(e.x - last.x, e.z - last.z); if (dd < best) { best = dd; near = q.id; } }
    if (near !== p.id) err(`${p.id}: arriving from (${sx}, ${sz}) resolves to ${near}`);
  }
}
const bad = errors + (strictMode ? warns : 0);
console.log(bad ? `\n${errors} error(s), ${warns} warning(s)` : `\nAll civic places are sound (${warns} warning(s)).`);
process.exit(bad ? 1 : 0);
