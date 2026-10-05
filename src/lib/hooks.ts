import { useSyncExternalStore } from "react";
import { daylight, gameMinutes, nepaOut } from "./time";
import { useGame } from "./store";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const snapshot = () => Math.floor(Date.now() / 1000);

/** Re-renders once a second; returns the current unix second. */
export function useSecond(): number {
  return useSyncExternalStore(subscribe, snapshot, () => 0);
}

export function useClock() {
  const sec = useSecond();
  const override = useGame((s) => s.clockOverride);
  const now = sec * 1000;
  const minutes = gameMinutes(now, override);
  return { minutes, hour: minutes / 60, day: daylight(minutes / 60), nepa: sec === 0 ? false : nepaOut(now), now };
}

const noSub = () => () => {};
/** false during SSR/hydration, true on the client afterwards. */
export function useMounted(): boolean {
  return useSyncExternalStore(noSub, () => true, () => false);
}
