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
  { district: "Bodija Estate", price: 180000, centers: [[3, -17], [7, -17], [3, -13], [7, -13], [3, -27], [7, -27], [3, -23], [7, -23]] },
  { district: "Jericho GRA", price: 260000, centers: [[13, -17], [17, -17], [13, -13], [17, -13], [13, -27], [17, -27], [13, -23], [17, -23]] },
  { district: "Agbowo", price: 45000, centers: [[-17.5, -2.8], [-13, -2.8]] },
  { district: "Mokola", price: 85000, centers: [[-17.5, 3], [-13, 3]] },
  { district: "Dugbe", price: 320000, centers: [[-6.5, 3]] },
  { district: "Challenge", price: 60000, centers: [[-17.5, 17], [-13, 17]] },
  { district: "Oluyole Estate", price: 220000, centers: [[-7, 13], [-3, 13], [-7, 17], [-3, 17], [-7, 23], [-3, 23], [-7, 27], [-3, 27]] },
  { district: "Oluyole", price: 150000, centers: [[3, 17], [7, 17]] },
  { district: "Iyaganku GRA", price: 200000, centers: [[13, 17], [17, 17]] },
  // the wider city
  { district: "Samonda", price: 90000, centers: [[-17, -36], [-13, -36], [-17, -32], [-13, -32]] },
  { district: "Ojoo", price: 70000, centers: [[-7, -36], [-3, -36], [-7, -32], [-3, -32]] },
  { district: "Akobo Estate", price: 55000, centers: [[3, -36], [7, -36], [3, -32], [7, -32]] },
  { district: "Oje", price: 50000, centers: [[13, -36], [17, -36]] },
  { district: "Sango", price: 65000, centers: [[-37, -16], [-33, -16], [-37, -12], [-33, -12]] },
  { district: "Beere", price: 75000, centers: [[-27, 4], [-23, 4], [-27, 8], [-23, 8]] },
  { district: "Apata", price: 60000, centers: [[-37, 24], [-33, 24], [-37, 28], [-33, 28]] },
  { district: "Odo-Ona", price: 48000, centers: [[-17, 34], [-13, 34], [-17, 38], [-13, 38]] },
  { district: "Moniya", price: 40000, centers: [[3, 34], [7, 34], [3, 38], [7, 38]] },
  { district: "Iyaganku Heights", price: 230000, centers: [[13, 26], [17, 26], [13, 22], [17, 22], [13, 34], [17, 34], [13, 38], [17, 38]] },
  { district: "Iwo Road", price: 52000, centers: [[23, -16], [27, -16], [23, -12], [27, -12]] },
  { district: "Adamasingba East", price: 140000, centers: [[23, 4], [27, 4], [23, 8], [27, 8]] },
  { district: "Sapati", price: 58000, centers: [[33, 4], [37, 4]] },
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
  { id: "cook", label: "Cook at home", secs: 5, pantry: -1, plates: 1, gain: { energy: -4, fun: 5 } },
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
  "samonda-1": { ownerName: "Prof. Adewale", tier: 3 },
  "ojoo-1": { ownerName: "Mr Tunji", tier: 2 },
  "odo-ona-1": { ownerName: "Mama Nkechi", tier: 1 },
  "iyaganku-heights-1": { ownerName: "Chief Ogunleye", tier: 3 },
  "sango-1": { ownerName: "Alhaja Sidikat", tier: 2 },
  "bodija-estate-5": { ownerName: "Barr. Adeniran", tier: 3 },
  "jericho-gra-5": { ownerName: "Dr. Eze", tier: 3 },
  "oluyole-estate-5": { ownerName: "Mrs Alabi", tier: 2 },
  "iyaganku-heights-3": { ownerName: "Gen. Musa", tier: 3 },
};

export const NPC_PLOTS: Record<string, PlotState> = Object.fromEntries(
  Object.entries(NPC_HOMES).map(([id, h]) => [
    id,
    { ownerId: `npc:${h.ownerName.toLowerCase().replace(/[^a-z]+/g, "-")}`, ownerName: h.ownerName, tier: h.tier, collectedAt: 0 },
  ]),
);
