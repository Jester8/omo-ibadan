import type { Pt } from "./pathing";

/** High-frequency state kept outside React/zustand; mutated from render-loop callbacks. */

export const me = {
  x: 0.5,
  z: 8.2,
  ry: 0,
  /** current speed in units/s (smoothed), drives the walk animation */
  speed: 0,
  path: [] as Pt[],
  /** place id the path is leading to (so we can flag arrival) */
  goalPlace: null as string | null,
  /** riding a keke for the current trip (fast, costs money) */
  ride: false,
  /** world position to return to when leaving an interior */
  worldReturn: null as { x: number; z: number } | null,
  /** furniture index to use once we arrive */
  pendingUse: null as number | null,
  /** leave the interior once we reach the exit mat */
  pendingExit: false,
  /** currently seated or lying on furniture (positions in world units) */
  use: null as null | { pose: "sit" | "lie"; x: number; z: number; ry: number; seatH: number; standX: number; standZ: number },
};

export type RemoteMotion = { x: number; z: number; ry: number; speed: number; tx: number; tz: number; tr: number };

export const remoteMotion = new Map<string, RemoteMotion>();

/** Camera orbit state; wheel/drag handlers write here. */
export const cam = { az: Math.PI / 4, dist: 24 };

/** Keke boost expiry (ms epoch). */
export const boost = { until: 0 };
