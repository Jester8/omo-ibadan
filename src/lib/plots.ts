import type { ActionDef } from "./places";
import type { PlotState } from "./protocol";

export const PLOT_SIZE = 3.4;

export type Tier = { name: string; cost: number; rentPerMin: number };

/** index = tier. Tier 0 is bare land. */
export const TIERS: Tier[] = [
  { name: "Empty land", cost: 0, rentPerMin: 0 },
  { name: "Bungalow", cost: 15000, rentPerMin: 400 },
  { name: "Duplex", cost: 60000, rentPerMin: 1500 },
  { name: "Mansion", cost: 180000, rentPerMin: 5000 },
];

export const RENT_CAP_MIN = 30;

export type Plot = {
  id: string;
  district: string;
  pos: [number, number];
  price: number;
};

const ZONES: { district: string; price: number; centers: [number, number][] }[] = [
  { district: "Bodija Estate", price: 180000, centers: [[3, -17], [7, -17], [3, -13], [7, -13]] },
  { district: "Jericho GRA", price: 260000, centers: [[13, -17], [17, -17], [13, -13], [17, -13]] },
  { district: "Agbowo", price: 45000, centers: [[-17.5, -2.8], [-13, -2.8]] },
  { district: "Mokola", price: 85000, centers: [[-17.5, 3], [-13, 3]] },
  { district: "Dugbe", price: 320000, centers: [[-6.5, 3]] },
  { district: "Challenge", price: 60000, centers: [[-17.5, 17], [-13, 17]] },
  { district: "Oluyole Estate", price: 220000, centers: [[-7, 13], [-3, 13], [-7, 17], [-3, 17]] },
  { district: "Oluyole", price: 150000, centers: [[3, 17], [7, 17]] },
  { district: "Iyaganku GRA", price: 200000, centers: [[13, 17], [17, 17]] },
];

export const PLOTS: Plot[] = ZONES.flatMap((z) =>
  z.centers.map((pos, i) => ({
    id: `${z.district.toLowerCase().replace(/[^a-z]+/g, "-")}-${i + 1}`,
    district: z.district,
    pos,
    price: z.price,
  })),
);

export const plotById = (id: string) => PLOTS.find((p) => p.id === id);

export const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

/** Things you can do at a house you own (tier 1+). */
export const HOME_ACTIONS: ActionDef[] = [
  { id: "sleep", label: "Sleep", secs: 8, gain: { energy: 70, hunger: -10 } },
  { id: "cook", label: "Cook at home", secs: 5, cost: 800, gain: { hunger: 40, fun: 5 } },
  { id: "host", label: "Host friends", secs: 6, gain: { social: 25, fun: 15 }, rep: 2 },
];

/** Houses already lived in by NPC neighbours. They can be visited but not bought. */
export const NPC_HOMES: Record<string, { ownerName: string; tier: number }> = {
  "bodija-estate-1": { ownerName: "Chief Adeyemi", tier: 3 },
  "bodija-estate-2": { ownerName: "Alhaji Rasheed", tier: 2 },
  "jericho-gra-1": { ownerName: "Mrs Folake", tier: 3 },
  "oluyole-estate-1": { ownerName: "Dr. Okafor", tier: 2 },
  "iyaganku-gra-1": { ownerName: "Engr. Bello", tier: 3 },
  "agbowo-1": { ownerName: "Mama Bisi", tier: 1 },
  "mokola-1": { ownerName: "Mr Seun", tier: 1 },
};

export const NPC_PLOTS: Record<string, PlotState> = Object.fromEntries(
  Object.entries(NPC_HOMES).map(([id, h]) => [
    id,
    { ownerId: `npc:${h.ownerName.toLowerCase().replace(/[^a-z]+/g, "-")}`, ownerName: h.ownerName, tier: h.tier, collectedAt: 0 },
  ]),
);
