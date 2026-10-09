import { PLACES } from "./places";

/** Bower's Tower: the numbers the viewing deck and its telescope share. The tower never moves. */
export const TOWER_ID = "bowers";
const TOWER = PLACES.find((p) => p.id === TOWER_ID)!;
export const TOWER_POS = { x: TOWER.pos[0], z: TOWER.pos[1] };
/** one world unit is this many metres */
export const METRES_PER_UNIT = 25;

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
/** The compass point (N, NE, ...) for a bearing in degrees clockwise from north. */
export const compassOf = (bearing: number) => COMPASS[Math.round((((bearing % 360) + 360) % 360) / 45) % 8];

export type Landmark = { id: string; name: string; emoji: string; blurb: string; x: number; z: number; /** degrees clockwise from north, as seen from the tower */ bearing: number; dir: string; metres: number };

/** What the telescope can point at: well-known places spread round the city, nearest first. No campus faculties and no civic buildings. */
const IDS = ["cocoa-house", "mosque", "cathedral", "dugbe", "mapo-hall", "uch", "stadium", "bodija-market", "ui", "cathay", "secretariat", "eleyele", "palace", "airport"];

export const LANDMARKS: Landmark[] = IDS.map((id) => {
  const p = PLACES.find((q) => q.id === id)!;
  const dx = p.pos[0] - TOWER_POS.x;
  const dz = p.pos[1] - TOWER_POS.z;
  const bearing = ((Math.atan2(dx, -dz) * 180) / Math.PI + 360) % 360;
  return { id, name: p.name.replace(/^The /, ""), emoji: p.emoji, blurb: p.blurb, x: p.pos[0], z: p.pos[1], bearing, dir: compassOf(bearing), metres: Math.hypot(dx, dz) * METRES_PER_UNIT };
}).sort((a, b) => a.metres - b.metres);

/** "150 m" or "1.2 km". */
export const distanceLabel = (metres: number) => (metres < 1000 ? `${Math.round(metres / 10) * 10} m` : `${(metres / 1000).toFixed(1)} km`);
