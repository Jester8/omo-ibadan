import type { Layout } from "./interiors";
import { H, I, R, W, lay, row } from "./layoutKit";

/**
 * UCH and Adeoyo: reception island (a servicedesk for "hospital"), a staff pen behind it that cannot be entered, a casualty room and a ward.
 * Owned by the HP (hospital) agent. These replace the generic `uch` layout and the `reuse("uch", "adeoyo")` copy in layouts.ts (CIVIC_LAYOUTS is merged after them).
 * The pen holds only kinds that cannot be used (no pcdesk, no chair), so the desk is always approached from the patient side.
 * Bed numbering for the hospital code: casualty beds are the `hospitalbed` items with x < 0, ward beds those with x > 0 (read them from rt.layout.items at runtime).
 */

const UCH: Layout = lay({
  id: "uch", name: "UCH Outpatients", w: 16, d: 11, floor: "tile", wall: "#e4eef0", trim: "#5a7a8c", accent: "#d85a5a", light: "bright", exitX: -3,
  walls: [W(-1, -5.5, -1, 0, 0.8, 1.2), W(1, -5.5, 1, 0, 0.8, 1.2), W(-8, 0, -4, 0)], // the last one closes the staff pen on the north
  zones: [{ x: 4.5, z: -2.7, w: 7, d: 5.5, floor: "concrete", color: "#d8e0e4" }],
  items: [
    // triage + casualty room (left back)
    I("desk", -5.5, -4.6, 0, { w: 1.6 }), I("chair", -5.5, -3.8, R), I("chair", -4.2, -4.4, H),
    I("hospitalbed", -7.2, -2.2, 0, { w: 0.9 }), I("cabinet", -2.2, -5.1, 0), I("curtain", -6.3, -1.6, 0),
    I("medshelf", -3.4, -5.15, 0), I("scale", -3.4, -1.4),
    // ward (right back): 4 beds
    ...row("hospitalbed", 2.6, -4.3, 4, 1.6, 0), ...row("curtain", 3.4, -1.1, 3, 1.6, 0), I("cabinet", 7.4, -1.0, -H),
    // reception island: the patient side faces the exit and the default camera
    I("servicedesk", -6.0, 3.3, 0, { w: 4.0, service: "hospital" }), I("counter", -4.0, 1.5, H, { w: 3.0 }),
    // staff pen (unreachable by design): only kinds that cannot be used
    I("desk", -6.0, 1.9, 0, { w: 1.3 }), I("cabinet", -7.4, 0.6, 0), I("cabinet", -4.9, 0.6, 0),
    // waiting area
    ...row("bench", 0.3, 4.2, 3, 1.9, R), ...row("bench", 0.3, 2.0, 3, 1.9, R),
    I("waterdispenser", 6.9, 4.6), I("plant", 7.2, 2.0), I("plant", -7.4, 4.9), I("clock", -0.2, -5.4, 0, { y: 2 }), I("wallart", 5.0, 5.4, R, { y: 1.8, c: "#d85a5a" }),
    // signs (the west wall faces the camera; back-wall signs face +z)
    I("signboard", -7.94, 3.3, H, { label: "RECEPTION", c: "#1f6f8a", w: 2.2, y: 2.0 }),
    I("signboard", -5.2, -5.43, 0, { label: "TRIAGE", c: "#2f8f83", w: 1.6, y: 2.1 }),
    I("neonsign", -2.9, -5.43, 0, { label: "EMERGENCY", c: "#ff3b3b", w: 1.6, y: 2.25 }),
    I("signboard", 4.5, -5.43, 0, { label: "WARD", c: "#2b7a8a", w: 1.6, y: 2.1 }),
  ],
});

const ADEOYO: Layout = lay({
  id: "adeoyo", name: "Adeoyo Teaching Hospital", w: 20, d: 12, floor: "tile", wall: "#e0ecef", trim: "#4f7f8f", accent: "#2f8f9d", light: "bright", exitX: -4,
  walls: [W(-2, -6, -2, 0, 0.8, 1.2), W(2, -6, 2, 0, 0.8, 1.2), W(-10, 0, -6, 0)],
  zones: [{ x: 6, z: -3, w: 8, d: 6, floor: "concrete", color: "#d8e0e4" }],
  items: [
    I("desk", -7.0, -5.1, 0, { w: 1.6 }), I("chair", -7.0, -4.3, R), I("chair", -5.6, -4.9, H),
    I("hospitalbed", -9.0, -2.6, 0, { w: 0.9 }), I("hospitalbed", -7.4, -2.6, 0, { w: 0.9 }),
    ...row("curtain", -9.0, -1.2, 2, 1.6, 0), I("medshelf", -4.0, -5.3, 0), I("cabinet", -2.8, -5.2, 0), I("scale", -4.6, -2.0),
    ...row("hospitalbed", 3.2, -4.8, 5, 1.5, 0), ...row("curtain", 3.95, -1.5, 4, 1.5, 0), I("cabinet", 9.5, -1.0, -H),
    I("servicedesk", -8.0, 3.8, 0, { w: 4.0, service: "hospital" }), I("counter", -6.0, 1.75, H, { w: 3.5 }),
    I("desk", -8.0, 2.2, 0, { w: 1.3 }), I("cabinet", -9.4, 0.6, 0), I("cabinet", -6.8, 0.6, 0),
    ...row("bench", -1.2, 2.4, 4, 1.9, R), ...row("bench", -1.2, 4.9, 4, 1.9, R),
    I("waterdispenser", 8.8, 5.2), I("plant", 9.0, 2.4), I("plant", -9.2, 5.2), I("plant", 9.0, 0.6), I("clock", 0, -5.9, 0, { y: 2 }), I("wallart", 6.5, 5.9, R, { y: 1.8, c: "#2f8f9d" }),
    I("signboard", -9.94, 3.8, H, { label: "RECEPTION", c: "#1f6f8a", w: 2.2, y: 2.0 }),
    I("signboard", -6.4, -5.93, 0, { label: "TRIAGE", c: "#2f8f83", w: 1.6, y: 2.1 }),
    I("neonsign", -3.4, -5.93, 0, { label: "EMERGENCY", c: "#ff3b3b", w: 1.6, y: 2.25 }),
    I("signboard", 6.2, -5.93, 0, { label: "WARD", c: "#2b7a8a", w: 1.6, y: 2.1 }),
  ],
});

export const HEALTH_LAYOUTS: Record<string, Layout> = { uch: UCH, adeoyo: ADEOYO };
