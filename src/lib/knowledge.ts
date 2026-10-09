/** The Education ladder: study points ("know") earned at the library and the school. Each level adds a little to everything you earn. */
export const EDUCATION = [
  { name: "No certificate", at: 0 },
  { name: "First School Leaving Certificate", at: 10 },
  { name: "WAEC / SSCE", at: 30 },
  { name: "OND", at: 60 },
  { name: "HND / B.Sc", at: 100 },
  { name: "PGD", at: 160 },
  { name: "M.Sc", at: 240 },
  { name: "MBA", at: 340 },
  { name: "PhD", at: 460 },
  { name: "Professor", at: 600 },
] as const;

/** Pay bonus per level. 0.02 means +2% per level (at most +18%). Set to 0 to switch the bonus off without touching anything else. */
export const KNOWLEDGE_PAY_PER_LEVEL = 0.02;

export const knowLevel = (k = 0): number => {
  let level = 0;
  for (let i = 0; i < EDUCATION.length; i++) if (k >= EDUCATION[i].at) level = i;
  return level;
};
export const payBonus = (k = 0): number => 1 + KNOWLEDGE_PAY_PER_LEVEL * knowLevel(k);
export function knowProgress(k = 0): { level: number; name: string; cur: number; next: number | null; pct: number } {
  const level = knowLevel(k);
  const next = EDUCATION[level + 1]?.at ?? null;
  const from = EDUCATION[level].at;
  return { level, name: EDUCATION[level].name, cur: k, next, pct: next === null ? 100 : Math.min(100, Math.round(((k - from) / (next - from)) * 100)) };
}
