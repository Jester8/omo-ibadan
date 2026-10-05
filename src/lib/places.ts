export type Needs = { hunger: number; energy: number; fun: number; social: number };

export type PlaceKind = "food" | "work" | "fun" | "culture" | "health" | "learn" | "shop" | "faith" | "gov" | "transport";

export type PlaceStyle =
  | "tower"
  | "hall"
  | "market"
  | "campus"
  | "hospital"
  | "mosque"
  | "church"
  | "stadium"
  | "park"
  | "mall"
  | "hotel"
  | "lookout"
  | "eatery"
  | "amusement"
  | "zoo"
  | "terminal"
  | "golf"
  | "govt"
  | "cultural";

export type ActionDef = {
  id: string;
  label: string;
  /** seconds the action takes */
  secs: number;
  cost?: number;
  pay?: number;
  gain?: Partial<Needs>;
  rep?: number;
  minRep?: number;
  /** grants a temporary keke speed boost (ms) */
  boostMs?: number;
};

export type Place = {
  id: string;
  name: string;
  emoji: string;
  kind: PlaceKind;
  district: string;
  blurb: string;
  /** centre on the map (world units) */
  pos: [number, number];
  /** footprint width, height, depth */
  size: [number, number, number];
  color: string;
  style: PlaceStyle;
  /** has a shared voice room */
  voice?: boolean;
  actions: ActionDef[];
};

export const PLACES: Place[] = [
  {
    id: "ui",
    name: "University of Ibadan",
    emoji: "🎓",
    kind: "learn",
    district: "UI",
    blurb: "Nigeria's first university. Lectures, libraries and late-night reading.",
    pos: [-14.5, -16.5],
    size: [5, 2.4, 3],
    color: "#7c8de8",
    style: "campus",
    voice: true,
    actions: [
      { id: "lecture", label: "Attend a lecture", secs: 6, gain: { energy: -18, fun: -4 }, rep: 3 },
      { id: "tutor", label: "Tutor students", secs: 7, gain: { energy: -25 }, pay: 4500, rep: 2 },
      { id: "study", label: "Study group", secs: 6, gain: { social: 18, energy: -10 }, rep: 2 },
    ],
  },
  {
    id: "zoo",
    name: "UI Zoo",
    emoji: "🦁",
    kind: "fun",
    district: "UI",
    blurb: "Peacocks, monkeys and a very smug tortoise.",
    pos: [-17, -12.2],
    size: [3, 0.9, 2.2],
    color: "#8fc77b",
    style: "zoo",
    voice: true,
    actions: [
      { id: "animals", label: "See the animals", secs: 5, cost: 500, gain: { fun: 30 } },
      { id: "picnic", label: "Picnic", secs: 6, cost: 1500, gain: { fun: 20, hunger: 25, social: 8 } },
    ],
  },
  {
    id: "bodija-market",
    name: "Bodija Market",
    emoji: "🛒",
    kind: "shop",
    district: "Bodija",
    blurb: "Foodstuff, fabric and fierce bargaining.",
    pos: [-6.5, -16.5],
    size: [4, 1.3, 3],
    color: "#e0663a",
    style: "market",
    voice: true,
    actions: [
      { id: "foodstuff", label: "Buy foodstuff", secs: 4, cost: 2500, gain: { hunger: 35 } },
      { id: "trade", label: "Run a trading stall", secs: 6, gain: { energy: -25 }, pay: 4000, rep: 1 },
    ],
  },
  {
    id: "amala-skye",
    name: "Amala Skye",
    emoji: "🍲",
    kind: "food",
    district: "Bodija",
    blurb: "Gbegiri, ewedu and a long queue. Worth it.",
    pos: [-2.8, -12.6],
    size: [2.4, 1.5, 2],
    color: "#3f9b6a",
    style: "eatery",
    voice: true,
    actions: [
      { id: "amala", label: "Eat amala", secs: 4, cost: 1800, gain: { hunger: 60, fun: 5 } },
      { id: "combo", label: "Full combo with assorted", secs: 5, cost: 3500, gain: { hunger: 80, fun: 10 } },
    ],
  },
  {
    id: "uch",
    name: "UCH",
    emoji: "🏥",
    kind: "health",
    district: "Agbowo",
    blurb: "University College Hospital. Patch yourself up.",
    pos: [-16, -7.2],
    size: [4, 2.4, 2.8],
    color: "#dbe7ef",
    style: "hospital",
    actions: [
      { id: "ward", label: "Rest in the ward", secs: 8, cost: 2000, gain: { energy: 40 } },
      { id: "checkup", label: "Full check-up", secs: 6, cost: 3000, gain: { energy: 15, fun: 5, hunger: 10 } },
      { id: "volunteer", label: "Volunteer", secs: 6, gain: { energy: -20 }, rep: 4 },
    ],
  },
  {
    id: "agodi",
    name: "Agodi Gardens",
    emoji: "🌳",
    kind: "fun",
    district: "Agodi",
    blurb: "Lakes, shade trees and a little peace.",
    pos: [-6.8, -5.8],
    size: [5, 0.25, 4.6],
    color: "#8fd08b",
    style: "park",
    voice: true,
    actions: [
      { id: "relax", label: "Relax by the lake", secs: 6, gain: { energy: 25, fun: 20 } },
      { id: "jog", label: "Go for a jog", secs: 5, gain: { energy: -15, fun: 15, hunger: -10 }, rep: 1 },
    ],
  },
  {
    id: "amusement",
    name: "Trans-Amusement Park",
    emoji: "🎡",
    kind: "fun",
    district: "Agodi",
    blurb: "Ferris wheel, arcade and screaming friends.",
    pos: [-2.6, -2.8],
    size: [2.6, 3.4, 2.4],
    color: "#e85d9a",
    style: "amusement",
    voice: true,
    actions: [
      { id: "wheel", label: "Ride the ferris wheel", secs: 6, cost: 2500, gain: { fun: 45 } },
      { id: "arcade", label: "Arcade with friends", secs: 5, cost: 1000, gain: { fun: 25, social: 10 } },
    ],
  },
  {
    id: "mapo-hall",
    name: "Mapo Hall",
    emoji: "🏛️",
    kind: "culture",
    district: "Mapo",
    blurb: "The hilltop city hall with the best view of Ibadan's rooftops.",
    pos: [3.2, -7],
    size: [3, 2.8, 2.4],
    color: "#f0ede6",
    style: "hall",
    voice: true,
    actions: [
      { id: "meeting", label: "Join the town meeting", secs: 8, gain: { social: 20, energy: -8 }, rep: 4 },
      { id: "view", label: "Enjoy the view", secs: 4, gain: { fun: 15, energy: 5 } },
    ],
  },
  {
    id: "dugbe",
    name: "Dugbe Market",
    emoji: "🧺",
    kind: "shop",
    district: "Dugbe",
    blurb: "Old city trade. Everything is available if you ask loudly.",
    pos: [6.2, -3],
    size: [4, 1.3, 2.6],
    color: "#d9a23a",
    style: "market",
    voice: true,
    actions: [
      { id: "provisions", label: "Buy provisions", secs: 4, cost: 1500, gain: { hunger: 25 } },
      { id: "stall", label: "Run a stall shift", secs: 7, gain: { energy: -28 }, pay: 5000, rep: 2 },
    ],
  },
  {
    id: "ventura",
    name: "Ventura Mall",
    emoji: "🛍️",
    kind: "shop",
    district: "Jericho",
    blurb: "Shops, cinema and an air-conditioned food court.",
    pos: [15.5, -7],
    size: [4, 1.9, 2.8],
    color: "#c75c9a",
    style: "mall",
    voice: true,
    actions: [
      { id: "shop", label: "Shop for clothes", secs: 5, cost: 8000, gain: { fun: 25 }, rep: 1 },
      { id: "cinema", label: "Watch a film", secs: 7, cost: 3500, gain: { fun: 40, energy: -5 } },
    ],
  },
  {
    id: "premier",
    name: "Premier Hotel",
    emoji: "🏨",
    kind: "food",
    district: "Jericho",
    blurb: "Rooftop dinners and a very polite front desk.",
    pos: [15, -2.8],
    size: [3, 3.6, 2.4],
    color: "#5a7a9c",
    style: "hotel",
    voice: true,
    actions: [
      { id: "dinner", label: "Rooftop dinner", secs: 8, cost: 12000, gain: { hunger: 70, fun: 25, social: 20 }, rep: 2 },
      { id: "desk", label: "Front desk shift", secs: 7, gain: { energy: -30 }, pay: 7000, rep: 2 },
    ],
  },
  {
    id: "cultural",
    name: "Cultural Centre Mokola",
    emoji: "🥁",
    kind: "culture",
    district: "Mokola",
    blurb: "Drumming, dance and the stories of old Ibadan.",
    pos: [-16, 7.2],
    size: [3.4, 1.6, 2.6],
    color: "#d9763a",
    style: "cultural",
    voice: true,
    actions: [
      { id: "show", label: "Watch a cultural show", secs: 6, cost: 1500, gain: { fun: 35, social: 10 }, rep: 2 },
      { id: "drum", label: "Learn the talking drum", secs: 6, cost: 800, gain: { fun: 20, energy: -8 }, rep: 3 },
    ],
  },
  {
    id: "cocoa-house",
    name: "Cocoa House",
    emoji: "🏢",
    kind: "work",
    district: "Dugbe",
    blurb: "Ibadan's first skyscraper. Offices, deals and ambition.",
    pos: [-7, 7.2],
    size: [2.4, 6, 2.4],
    color: "#c8a24a",
    style: "tower",
    voice: true,
    actions: [
      { id: "shift", label: "Work an office shift", secs: 6, gain: { energy: -30, hunger: -10 }, pay: 6000, rep: 3 },
      { id: "network", label: "Network at the lobby", secs: 4, gain: { social: 20, energy: -8 }, rep: 2 },
      { id: "pitch", label: "Pitch to investors", secs: 9, gain: { energy: -40, hunger: -12 }, pay: 10000, rep: 5, minRep: 25 },
    ],
  },
  {
    id: "bowers",
    name: "Bower's Tower",
    emoji: "🗼",
    kind: "culture",
    district: "Dugbe",
    blurb: "Climb it and see the whole city of rusted roofs.",
    pos: [-2.5, 3.2],
    size: [1.2, 4.4, 1.2],
    color: "#b9855a",
    style: "lookout",
    actions: [{ id: "climb", label: "Climb to the top", secs: 5, cost: 300, gain: { fun: 30, energy: -10 } }],
  },
  {
    id: "mosque",
    name: "Central Mosque",
    emoji: "🕌",
    kind: "faith",
    district: "Dugbe",
    blurb: "A quiet place to pause between prayers.",
    pos: [3.3, 7.4],
    size: [2.4, 2.2, 2.4],
    color: "#efe6cb",
    style: "mosque",
    actions: [{ id: "pray", label: "Pray", secs: 4, gain: { energy: 10, fun: 5, social: 5 }, rep: 1 }],
  },
  {
    id: "cathedral",
    name: "St. David's Cathedral",
    emoji: "⛪",
    kind: "faith",
    district: "Kudeti",
    blurb: "Old stone, tall tower, long hymns.",
    pos: [7.5, 3.4],
    size: [2.6, 2.8, 3.2],
    color: "#d8cdbb",
    style: "church",
    actions: [{ id: "service", label: "Attend service", secs: 6, gain: { fun: 10, social: 15, energy: 5 }, rep: 2 }],
  },
  {
    id: "stadium",
    name: "Lekan Salami Stadium",
    emoji: "🏟️",
    kind: "fun",
    district: "Adamasingba",
    blurb: "Match day. Shooting Stars and very loud fans.",
    pos: [15, 5],
    size: [6.5, 1.7, 6],
    color: "#4aa3a0",
    style: "stadium",
    voice: true,
    actions: [
      { id: "match", label: "Watch the match", secs: 7, cost: 1000, gain: { fun: 40, social: 15 } },
      { id: "chant", label: "Chant with the ultras", secs: 6, gain: { fun: 25, social: 25, energy: -12 }, rep: 1 },
    ],
  },
  {
    id: "ring-road",
    name: "Ring Road Motor Park",
    emoji: "🚌",
    kind: "transport",
    district: "Challenge",
    blurb: "Danfo, keke and okada. Everyone passes through here.",
    pos: [-15, 12.8],
    size: [4.2, 0.9, 3.2],
    color: "#f2b632",
    style: "terminal",
    voice: true,
    actions: [
      { id: "hustle", label: "Conductor hustle", secs: 6, gain: { energy: -25 }, pay: 3500, rep: 1 },
      { id: "kekepass", label: "Keke fast pass (5 min)", secs: 2, cost: 1500, boostMs: 5 * 60 * 1000 },
    ],
  },
  {
    id: "golf",
    name: "Ibadan Golf Club",
    emoji: "⛳",
    kind: "fun",
    district: "Oluyole",
    blurb: "Manicured greens, cold drinks and quiet deals.",
    pos: [4.5, 13],
    size: [3.8, 0.4, 3.2],
    color: "#7cc46a",
    style: "golf",
    voice: true,
    actions: [
      { id: "round", label: "Play a round", secs: 7, cost: 6000, gain: { fun: 40, energy: -10, social: 10 }, rep: 2 },
      { id: "caddie", label: "Caddie for a member", secs: 6, gain: { energy: -22 }, pay: 4000, rep: 1 },
    ],
  },
  {
    id: "govt-house",
    name: "Government House",
    emoji: "🏛️",
    kind: "gov",
    district: "Iyaganku",
    blurb: "Where the state is run. Earn your seat at the table.",
    pos: [15, 12.8],
    size: [4, 2.4, 2.8],
    color: "#f2efe8",
    style: "govt",
    actions: [
      { id: "gallery", label: "Sit in the public gallery", secs: 5, gain: { energy: -5 }, rep: 3 },
      { id: "council", label: "Council session", secs: 8, gain: { energy: -15, social: 12 }, rep: 8, minRep: 70 },
    ],
  },
];

export const KIND_COLORS: Record<PlaceKind, string> = {
  food: "#3f9b6a",
  work: "#d9a22b",
  fun: "#2fa3a0",
  culture: "#8b6bd6",
  health: "#e25a5a",
  learn: "#4c6ad6",
  shop: "#d9568e",
  faith: "#a68a4f",
  gov: "#5b7088",
  transport: "#d98a1f",
};

/** Parks and greens are walkable; everything else is solid. */
export const isSolid = (p: Place) => p.style !== "park" && p.style !== "golf" && p.style !== "zoo";

/** Where the player stands to use a place. */
export const doorOf = (p: Place) => ({ x: p.pos[0], z: p.pos[1] + p.size[2] / 2 + 0.9 });

export const DISTRICTS: { name: string; pos: [number, number] }[] = [
  { name: "UI", pos: [-15, -19.2] },
  { name: "Bodija", pos: [-5, -19.2] },
  { name: "Bodija Estate", pos: [5, -19.4] },
  { name: "Jericho GRA", pos: [15, -19.4] },
  { name: "Agbowo", pos: [-15, -10.4] },
  { name: "Agodi", pos: [-5, -9.6] },
  { name: "Mapo", pos: [5, -9.6] },
  { name: "Jericho", pos: [15, -9.6] },
  { name: "Mokola", pos: [-15, 0.4] },
  { name: "Dugbe", pos: [-5, 0.4] },
  { name: "Kudeti", pos: [5, 0.4] },
  { name: "Adamasingba", pos: [15, 0.4] },
  { name: "Challenge", pos: [-15, 10.4] },
  { name: "Oluyole Estate", pos: [-5, 10.4] },
  { name: "Oluyole", pos: [5, 10.4] },
  { name: "Iyaganku GRA", pos: [15, 10.4] },
];

export const WORLD_HALF = 24;
