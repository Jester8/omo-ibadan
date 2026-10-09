// scripts/check-money.ts: npm run check:money
// Proves the tables in moneyRules.ts (shared with the server, which has no catalogue) still match the game's catalogues.
import { PLOTS, TIERS } from "../src/lib/plots";
import { BUSINESSES } from "../src/lib/business";
import { DECOR } from "../src/lib/decor";
import { TITLES } from "../src/lib/titles";
import { BIZ_COST, DECOR_PRICE, LAND_PRICE, TIER_COST, TITLE_REPS, landPrefix, landPrice, saleValue, SALE } from "../src/lib/moneyRules";

let errors = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };

for (const p of PLOTS) if (landPrice(p.id) !== p.price) err(`plot ${p.id}: moneyRules says ${landPrice(p.id)}, plots.ts says ${p.price}`);
const prefixes = new Set(PLOTS.map((p) => landPrefix(p.id)));
for (const k of Object.keys(LAND_PRICE)) if (!prefixes.has(k)) err(`LAND_PRICE has "${k}" but no plot starts with it`);
TIERS.forEach((t, i) => { if (TIER_COST[i] !== t.cost) err(`tier ${i}: ${TIER_COST[i]} vs ${t.cost}`); });
for (const b of BUSINESSES) if (BIZ_COST[b.id] !== b.cost) err(`business ${b.id}: ${BIZ_COST[b.id]} vs ${b.cost}`);
for (const k of Object.keys(BIZ_COST)) if (!BUSINESSES.some((b) => b.id === k)) err(`BIZ_COST has unknown ${k}`);
for (const d of DECOR) if (DECOR_PRICE[d.id] !== d.price) err(`decor ${d.id}: ${DECOR_PRICE[d.id]} vs ${d.price}`);
for (const k of Object.keys(DECOR_PRICE)) if (!DECOR.some((d) => d.id === k)) err(`DECOR_PRICE has unknown ${k}`);
TITLES.forEach((t, i) => { if (TITLE_REPS[i] !== t.rep) err(`title ${t.name}: ${TITLE_REPS[i]} vs ${t.rep}`); });
if (TITLE_REPS.length !== TITLES.length) err("TITLE_REPS length differs from TITLES");
// the biggest possible sale must fit under the cap
const top = Math.max(...PLOTS.map((p) => saleValue(p.id, { tier: 3, decor: DECOR.flatMap((d) => [d.id, d.id, d.id]) }).gross));
if (top >= SALE.max) err(`a mansion with full decor sells for ${top}, at or over SALE.max ${SALE.max}`);
console.log(errors ? `\n${errors} error(s)` : `\nmoneyRules.ts matches the catalogues (${PLOTS.length} plots, top sale ${top}).`);
process.exit(errors ? 1 : 0);
