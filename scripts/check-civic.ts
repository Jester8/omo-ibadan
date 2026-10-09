// npm run check:civic: the amenities and the education ladder against the real data.
//  - quest ids are unique and well formed, and no quest is done on a fresh save
//  - every action that counts a stat names a real counter, and shop prices agree between the map's actions and the rooms' furniture
//  - the petrol prices are the litre price times the litres; the Education ladder climbs and pays as documented
//  - every event and every opening-hours id is a real place
import { PLACES } from "../src/lib/places";
import { CIVIC_PLACES } from "../src/lib/placesCivic";
import { placeLayout, ALL_PLACE_LAYOUT_IDS } from "../src/lib/layouts";
import { FURN } from "../src/lib/furniture";
import { EVENTS, HOURS_IDS } from "../src/lib/events";
import { EMPTY_STATS, QUESTS } from "../src/lib/quests";
import { FUEL_PRICE } from "../src/lib/fuel";
import { EDUCATION, knowLevel, payBonus } from "../src/lib/knowledge";
import { DONATION_TIERS, REP_CAP_PER_HOUR } from "../src/lib/donate";
import { LETTER_MAX, POSTAGE } from "../src/lib/post";
import type { ActionDef } from "../src/lib/places";

let errors = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };
const ok = (s: string) => console.log("  ok   ", s);
const before = () => errors;

// quests
let e0 = before();
const seen = new Set<string>();
for (const q of QUESTS) {
  if (seen.has(q.id)) err(`quest id ${q.id} is used twice`);
  seen.add(q.id);
  if (!/^[\w-]{1,24}$/.test(q.id)) err(`quest id "${q.id}" is not 1-24 letters, digits, - or _`);
  if (q.done({ stats: { ...EMPTY_STATS, visited: [] }, plots: {}, pid: undefined })) err(`quest ${q.id} is already done on a fresh save`);
}
if (errors === e0) ok(`${QUESTS.length} quests: ids unique and well formed, none done on a fresh save`);

// stats counters and price parity
e0 = before();
const STAT_KEYS = ["know", "letters", "donated", "played", "fires"];
const placeActions = new Map<string, ActionDef[]>();
for (const p of PLACES) {
  placeActions.set(p.id, p.actions);
  for (const a of p.actions) if (a.stat && !STAT_KEYS.includes(a.stat)) err(`${p.id}/${a.id}: stat "${a.stat}" is not a Stats counter`);
}
const civicIds = new Set(CIVIC_PLACES.map((p) => p.id));
for (const id of ALL_PLACE_LAYOUT_IDS) {
  if (!civicIds.has(id)) continue; // older places keep their own prices; only the civic pack is held to this
  const layout = placeLayout(id);
  const acts = placeActions.get(id) ?? [];
  for (const it of layout?.items ?? []) {
    const a = it.action ?? FURN[it.kind].use?.action;
    const twin = a && acts.find((x) => x.id === a.id);
    if (!a || !twin) continue;
    for (const k of ["cost", "pay", "fuel"] as const) if ((a[k] ?? 0) !== (twin[k] ?? 0)) err(`${id}/${a.id}: ${k} is ${a[k] ?? 0} in the room but ${twin[k] ?? 0} on the map`);
  }
}
const price = (placeId: string, actionId: string, key: "cost" | "pay") => PLACES.find((p) => p.id === placeId)?.actions.find((a) => a.id === actionId)?.[key];
for (const [id, litres] of [["pump5", 5], ["pump10", 10], ["pump25", 25]] as const) {
  const c = price("filling-station", id, "cost");
  if (c !== FUEL_PRICE * litres) err(`filling-station/${id}: costs ${c}, expected ${FUEL_PRICE * litres} (${litres} L at ${FUEL_PRICE})`);
}
if (price("borehole-ring-road", "toilet", "cost") !== 100) err("borehole toilet is not 100");
if (price("borehole-ring-road", "bath", "cost") !== 250) err("borehole bath is not 250");
if (price("health-centre", "clinicbed", "cost") !== 1000) err("clinic bed is not 1000");
if (price("food-bank", "pack", "pay") !== 1500) err("food bank parcel pay is not 1500");
if (errors === e0) ok("stat counters are real, and civic room prices match the map (petrol, toilet, bath, clinic bed, parcels)");

// education
e0 = before();
let last = -1;
for (const [i, l] of EDUCATION.entries()) {
  if (l.at <= last) err(`EDUCATION[${i}] does not climb`);
  last = l.at;
}
let lastLevel = 0;
for (let k = 0; k <= 700; k++) {
  const lv = knowLevel(k);
  if (lv < lastLevel) err(`knowLevel falls at ${k}`);
  lastLevel = lv;
}
if (Math.abs(payBonus(600) - 1.18) > 1e-9) err(`payBonus(600) is ${payBonus(600)}, expected 1.18`);
if (payBonus(0) !== 1) err("payBonus(0) is not 1");
if (errors === e0) ok("the Education ladder climbs, and level 9 pays +18%");

// donations and letters
e0 = before();
if (!DONATION_TIERS.every((t, i, a) => i === 0 || (t.amount > a[i - 1].amount && t.rep > a[i - 1].rep))) err("donation tiers do not climb");
if (REP_CAP_PER_HOUR !== 40 || DONATION_TIERS[3].rep !== 40) err("the biggest gift should be worth exactly the hourly cap (40)");
if (LETTER_MAX > 190 || POSTAGE <= 0) err("letters: the server cuts at 200 with a 2-character prefix; keep LETTER_MAX <= 190 and postage positive");
if (errors === e0) ok("donation tiers climb to the hourly cap; letters fit what the server keeps");

// ids
e0 = before();
const ids = new Set(PLACES.map((p) => p.id));
for (const e of EVENTS) if (!ids.has(e.placeId)) err(`event ${e.id}: no such place ${e.placeId}`);
for (const id of HOURS_IDS) if (!ids.has(id)) err(`opening hours for "${id}", which is not a place`);
if (errors === e0) ok(`${EVENTS.length} events and ${HOURS_IDS.length} opening hours all name real places`);

console.log(errors ? `\n${errors} problem(s).` : "\nThe civic data is sound.");
process.exit(errors ? 1 : 0);
