import { ALL_PLACE_LAYOUT_IDS, bizLayout, homeLayout, placeLayout } from "../src/lib/layouts";
import { BUSINESSES } from "../src/lib/business";
import { buildInteriorGrid, footprint, spawnOf, type Layout } from "../src/lib/interiors";
import { DECOR, withDecor } from "../src/lib/decor";
import { FURN, S } from "../src/lib/furniture";

const layouts: Layout[] = [
  ...ALL_PLACE_LAYOUT_IDS.map((id) => placeLayout(id)!),
  // players' businesses: a gym with gym kit, a salon with chairs and mirrors...
  ...BUSINESSES.map((b) => ({ ...bizLayout(b.id, "Test"), id: `biz-${b.id}` })),
  homeLayout("flat", "x"),
  homeLayout(1, "a", "Mama Bisi"),
  homeLayout(2, "b", "Alhaji"),
  homeLayout(3, "c", "Chief"),
];
// every home with the full decor set (3 of each) must stay walkable
const allDecor = DECOR.flatMap((d) => [d.id, d.id, d.id]);
for (const l of [...layouts.slice(-4)]) layouts.push({ ...withDecor(l, allDecor), id: `${l.id}+decor` });

let bad = 0;
for (const l of layouts) {
  const g = buildInteriorGrid(l);
  const [sx, sz] = spawnOf(l);
  const problems: string[] = [];
  if (g.isBlockedAt(sx * S, sz * S)) problems.push(`spawn blocked at ${sx},${sz}`);
  for (const it of l.items) {
    const fp = footprint(it);
    if (Math.abs(it.x) + fp.w / 2 > l.w / 2 + 0.05 || Math.abs(it.z) + fp.d / 2 > l.d / 2 + 0.05) {
      if (it.kind !== "stage" && it.kind !== "pitch" && it.kind !== "rug") problems.push(`${it.kind}@${it.x},${it.z} out of bounds`);
    }
    if (FURN[it.kind].use) {
      const path = g.find(sx * S, sz * S, it.x * S, it.z * S);
      if (!path) problems.push(`unreachable: ${it.kind}@${it.x},${it.z}`);
      else {
        const end = path.length ? path[path.length - 1] : { x: sx * S, z: sz * S };
        const gap = Math.hypot(end.x - it.x * S, end.z - it.z * S) / S;
        const fp = footprint(it);
        if (gap > Math.max(fp.w, fp.d) / 2 + 1.4) problems.push(`too far to use: ${it.kind}@${it.x},${it.z} (${gap.toFixed(1)}m)`);
      }
    }
  }
  const solids = l.items.filter((it) => FURN[it.kind].solid);
  for (let a = 0; a < solids.length; a++) {
    for (let b = a + 1; b < solids.length; b++) {
      const A = solids[a];
      const B = solids[b];
      const fa = footprint(A);
      const fb = footprint(B);
      const ox = Math.min(A.x + fa.w / 2, B.x + fb.w / 2) - Math.max(A.x - fa.w / 2, B.x - fb.w / 2);
      const oz = Math.min(A.z + fa.d / 2, B.z + fb.d / 2) - Math.max(A.z - fa.d / 2, B.z - fb.d / 2);
      if (ox > 0.12 && oz > 0.12 && ox * oz > 0.1) problems.push(`overlap: ${A.kind}@${A.x.toFixed(1)},${A.z.toFixed(1)} with ${B.kind}@${B.x.toFixed(1)},${B.z.toFixed(1)}`);
    }
  }
  console.log(`${problems.length ? "✗" : "✓"} ${l.id.padEnd(14)} ${l.w}x${l.d}  items:${l.items.length} walls:${l.walls.length}${problems.length ? "\n    " + problems.join("\n    ") : ""}`);
  bad += problems.length;
}
console.log(bad ? `\n${bad} problem(s)` : "\nAll interiors look sound.");
process.exit(bad ? 1 : 0);
