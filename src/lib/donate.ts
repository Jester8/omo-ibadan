import { naira } from "./plots";
import { useGame } from "./store";

/** The food bank: cash turns into standing, with an hourly cap, and people who cannot afford a meal can ask for one. */
export const DONATION_TIERS = [
  { amount: 5_000, rep: 1 },
  { amount: 20_000, rep: 3 },
  { amount: 100_000, rep: 10 },
  { amount: 500_000, rep: 40 },
] as const;

/** At most this much reputation is credited in each 60-minute window, which opens with the first gift after the last one closed; a gift beyond it is still accepted. */
export const REP_CAP_PER_HOUR = 40;
const HOUR_MS = 60 * 60_000;

export const FREE_MEAL = { moneyBelow: 3_000, hungerBelow: 60, gapMs: 15 * 60_000, hunger: 45 } as const;

/** Reputation left to earn in the current rolling hour, and the minutes until the window opens again. */
export function capStatus(now: number): { left: number; resetMin: number } {
  const st = useGame.getState().stats;
  const start = st.donT ?? 0;
  if (!start || now - start >= HOUR_MS) return { left: REP_CAP_PER_HOUR, resetMin: 0 };
  return { left: Math.max(0, REP_CAP_PER_HOUR - (st.donR ?? 0)), resetMin: Math.ceil((start + HOUR_MS - now) / 60_000) };
}

/** Give a tier. Returns the toast text and whether it went through. */
export function donate(amount: number, now = Date.now()): { ok: boolean; message: string } {
  const tier = DONATION_TIERS.find((t) => t.amount === amount);
  const s = useGame.getState();
  if (!tier) return { ok: false, message: "Pick one of the amounts." };
  if (s.money < tier.amount) return { ok: false, message: `You need ${naira(tier.amount)}.` };
  const window = capStatus(now);
  const credited = Math.min(tier.rep, window.left);
  const fresh = !s.stats.donT || now - s.stats.donT >= HOUR_MS;
  useGame.setState((st) => ({
    money: st.money - tier.amount,
    rep: st.rep + credited,
    stats: {
      ...st.stats,
      donated: (st.stats.donated ?? 0) + tier.amount,
      donT: fresh ? now : st.stats.donT,
      donR: (fresh ? 0 : st.stats.donR ?? 0) + credited,
    },
  }));
  const message =
    credited === tier.rep ? `Thank you. ${naira(tier.amount)} given, +${credited} reputation.`
    : credited > 0 ? `Thank you. ${naira(tier.amount)} given. Only +${credited} reputation counts this hour.`
    : `Thank you. ${naira(tier.amount)} given. No more reputation counts this hour, it opens again in ${window.resetMin} min.`;
  return { ok: true, message };
}

/** Why a free meal is not available right now, or null when it is. */
export function mealWhy(now: number): string | null {
  const s = useGame.getState();
  const wait = (s.stats.mealAt ?? 0) + FREE_MEAL.gapMs - now;
  if (wait > 0) return `You had a meal a little while ago. Come back in ${Math.ceil(wait / 60_000)} min.`;
  if (s.money >= FREE_MEAL.moneyBelow || s.needs.hunger >= FREE_MEAL.hungerBelow) return "The food bank keeps meals for people who cannot afford one.";
  return null;
}

export function freeMeal(now = Date.now()): string | null {
  const why = mealWhy(now);
  if (why) return why;
  const err = useGame.getState().runAction({ id: "freemeal", label: "Free meal from the food bank", secs: 5, gain: { hunger: FREE_MEAL.hunger } });
  if (err) return err;
  useGame.setState((st) => ({ stats: { ...st.stats, mealAt: now } }));
  return null;
}
