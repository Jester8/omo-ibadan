/**
 * Chieftaincy-inspired ladder. Reputation is earned by working, serving the community,
 * and owning land. NOTE: titles and order are simplified for gameplay; confirm the
 * real Ibadan line of succession with a local before using these in marketing.
 */
export const TITLES = [
  { name: "Omo'badan", rep: 0, blurb: "Newcomer finding your feet" },
  { name: "Mogaji", rep: 25, blurb: "Head of your own compound" },
  { name: "Jagun", rep: 70, blurb: "Trusted in the community" },
  { name: "Osi", rep: 140, blurb: "A voice at the table" },
  { name: "Otun", rep: 240, blurb: "Right hand of the leaders" },
  { name: "Balogun", rep: 380, blurb: "Commander of the people" },
  { name: "Maye", rep: 560, blurb: "Counsellor to the crown" },
  { name: "Olubadan", rep: 800, blurb: "Ruler of Ibadan" },
] as const;

export function titleIndex(rep: number): number {
  let idx = 0;
  for (let i = 0; i < TITLES.length; i++) if (rep >= TITLES[i].rep) idx = i;
  return idx;
}

export function titleProgress(rep: number) {
  const i = titleIndex(rep);
  const cur = TITLES[i];
  const next = TITLES[i + 1];
  if (!next) return { index: i, cur, next: null, pct: 100 };
  return { index: i, cur, next, pct: Math.round(((rep - cur.rep) / (next.rep - cur.rep)) * 100) };
}
