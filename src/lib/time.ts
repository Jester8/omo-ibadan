/**
 * Shared world clock. One game day = one real hour, derived from wall-clock time,
 * so every player sees the same hour without a server.
 */
export const DAY_REAL_MS = 60 * 60 * 1000;
export const NEPA_SLOT_MS = 3 * 60 * 1000;

/** Game minutes since midnight (0..1440). `override` is a fixed hour for testing (?hour=). */
export function gameMinutes(now: number, override: number | null = null): number {
  if (override !== null) return override * 60;
  return ((now % DAY_REAL_MS) / DAY_REAL_MS) * 1440;
}

export function formatClock(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.floor(minutes % 60);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** 0 = deep night, 1 = full day. */
export function daylight(hour: number): number {
  return smooth(5.5, 7.5, hour) * (1 - smooth(17.5, 19.5, hour));
}

/** Deterministic NEPA blackout: ~28% of 3-minute slots are outages, same for everyone. */
export function nepaOut(now: number): boolean {
  const slot = Math.floor(now / NEPA_SLOT_MS);
  let x = (slot * 2654435761) >>> 0;
  x ^= x >>> 13;
  x = Math.imul(x, 1274126177) >>> 0;
  return x % 100 < 28;
}

export function periodLabel(hour: number): string {
  if (hour < 5) return "Late night";
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  if (hour < 20) return "Evening";
  return "Night";
}
