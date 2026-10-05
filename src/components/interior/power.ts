/** Shared, per-frame interior state (kept outside React so furniture reads it without re-rendering). */
export const interiorState = {
  /** mains or generator power available */
  power: true,
  /** 0 = broad daylight, 1 = night */
  night: 0,
};
