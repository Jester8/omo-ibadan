/** Shared, per-frame interior state (kept outside React so furniture reads it without re-rendering). */
export const interiorState = {
  /** mains or generator power available */
  power: true,
  /** 0 = broad daylight, 1 = night */
  night: 0,
};

/* ---- the room's beat clock: speakers, mirror ball, LED floor, DJ booth and the club lights all pulse to it ---- */

/** beats per minute of the house sound */
export const BPM = 112;
const BEAT_MS = 60000 / BPM;

/** Beats elapsed since the page loaded, fractional: floor() is the beat number, the remainder is the phase inside the beat. */
export const beat = () => (typeof performance === "undefined" ? 0 : performance.now()) / BEAT_MS;

/** 1 right on the beat, falling away before the next one. `sharp` is how fast it falls (higher = snappier kick). */
export const beatPulse = (sharp = 4.5) => Math.exp(-(beat() % 1) * sharp);
