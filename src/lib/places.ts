export type Needs = { hunger: number; energy: number; fun: number; social: number };

export type PlaceKind = "night" | "air" | "food" | "work" | "fun" | "culture" | "health" | "learn" | "shop" | "faith" | "gov" | "transport";

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
  | "restaurant"
  | "amusement"
  | "zoo"
  | "terminal"
  | "golf"
  | "govt"
  | "cultural"
  | "airport"
  | "club";

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
  /** the character plays this emote while the action runs */
  emote?: "dance";
  /** raw foodstuff portions added (+) or used (-) */
  pantry?: number;
  /** cooked meals added (+) or eaten (-) */
  plates?: number;
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
    pos: [-5, -15.5],
    size: [8, 1.4, 6.4],
    color: "#e0663a",
    style: "market",
    voice: true,
    actions: [
      { id: "foodstuff", label: "Buy foodstuff (4 meals)", secs: 4, cost: 2500, pantry: 4 },
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
    id: "aladura",
    name: "Aladura Prayer House",
    emoji: "⛪",
    kind: "faith",
    district: "Eleyele",
    blurb: "White garments, drums and all-night vigils.",
    pos: [23.2, -15],
    size: [2.4, 2.5, 2.6],
    color: "#e8e2d0",
    style: "church",
    voice: true,
    actions: [
      { id: "service", label: "Attend service", secs: 6, gain: { fun: 10, social: 15, energy: 5 }, rep: 2 },
      { id: "choir", label: "Sing with the choir", secs: 6, gain: { fun: 22, social: 18, energy: -8 }, rep: 2 },
      { id: "outreach", label: "Join the charity outreach", secs: 7, gain: { energy: -15, social: 12 }, rep: 4 },
    ],
  },
  {
    id: "grace",
    name: "Divine Grace Assembly",
    emoji: "⛪",
    kind: "faith",
    district: "Challenge",
    blurb: "A big Pentecostal auditorium with a loud choir.",
    pos: [23.2, 5],
    size: [2.6, 2.9, 3.0],
    color: "#cfd8e6",
    style: "church",
    voice: true,
    actions: [
      { id: "service", label: "Attend service", secs: 6, gain: { fun: 10, social: 15, energy: 5 }, rep: 2 },
      { id: "choir", label: "Sing with the choir", secs: 6, gain: { fun: 22, social: 18, energy: -8 }, rep: 2 },
      { id: "outreach", label: "Join the charity outreach", secs: 7, gain: { energy: -15, social: 12 }, rep: 4 },
    ],
  },
  {
    id: "methodist",
    name: "Oke-Bola Methodist Church",
    emoji: "⛪",
    kind: "faith",
    district: "Oke-Bola",
    blurb: "Hymns, a pipe organ and very punctual ushers.",
    pos: [-23.2, 5],
    size: [2.5, 2.7, 2.8],
    color: "#d9c3a5",
    style: "church",
    voice: true,
    actions: [
      { id: "service", label: "Attend service", secs: 6, gain: { fun: 10, social: 15, energy: 5 }, rep: 2 },
      { id: "choir", label: "Sing with the choir", secs: 6, gain: { fun: 22, social: 18, energy: -8 }, rep: 2 },
      { id: "outreach", label: "Join the charity outreach", secs: 7, gain: { energy: -15, social: 12 }, rep: 4 },
    ],
  },
  {
    id: "secretariat",
    name: "Oyo State Secretariat Tower",
    emoji: "🏙️",
    kind: "work",
    district: "Agodi",
    blurb: "Ministries, memos and endless queues.",
    pos: [23.2, -4],
    size: [2.4, 6.6, 2.4],
    color: "#8aa3b8",
    style: "tower",
    voice: true,
    actions: [
      { id: "shift", label: "Work an office shift", secs: 6, gain: { energy: -30, hunger: -10 }, pay: 7000, rep: 3 },
      { id: "network", label: "Network at the lobby", secs: 4, gain: { social: 20, energy: -8 }, rep: 2 },
      { id: "meeting", label: "Sit in on a board meeting", secs: 8, gain: { energy: -25, hunger: -8 }, pay: 10000, rep: 4, minRep: 20 },
    ],
  },
  {
    id: "trustbank",
    name: "Ibadan Trust Bank Tower",
    emoji: "🏙️",
    kind: "work",
    district: "Dugbe",
    blurb: "Glass, marble and a very serious vault.",
    pos: [-23.2, -5],
    size: [2.4, 7.4, 2.4],
    color: "#6f93ad",
    style: "tower",
    voice: true,
    actions: [
      { id: "shift", label: "Work an office shift", secs: 6, gain: { energy: -30, hunger: -10 }, pay: 8000, rep: 3 },
      { id: "network", label: "Network at the lobby", secs: 4, gain: { social: 20, energy: -8 }, rep: 2 },
      { id: "meeting", label: "Sit in on a board meeting", secs: 8, gain: { energy: -25, hunger: -8 }, pay: 11000, rep: 4, minRep: 20 },
    ],
  },
  {
    id: "cathay",
    name: "Cathay Heights",
    emoji: "🏙️",
    kind: "work",
    district: "Ring Road",
    blurb: "Ibadan's newest luxury high-rise, all glass.",
    pos: [15, 23.2],
    size: [2.6, 8.2, 2.2],
    color: "#5f8aa6",
    style: "tower",
    voice: true,
    actions: [
      { id: "shift", label: "Work an office shift", secs: 6, gain: { energy: -30, hunger: -10 }, pay: 9000, rep: 3 },
      { id: "network", label: "Network at the lobby", secs: 4, gain: { social: 20, energy: -8 }, rep: 2 },
      { id: "meeting", label: "Sit in on a board meeting", secs: 8, gain: { energy: -25, hunger: -8 }, pay: 12000, rep: 4, minRep: 20 },
    ],
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
  night: "#a21caf",
  air: "#0ea5e9",
};

/** Parks and greens are walkable; everything else is solid. */
/* ------------------------- the wider city: campus, districts, more places ------------------------- */

const A = (id: string, label: string, secs: number, o: Partial<ActionDef> = {}): ActionDef => ({ id, label, secs, ...o });

PLACES.push(
  { id: "ui-library", name: "Kenneth Dike Library", emoji: "📚", kind: "learn", district: "UI Campus", blurb: "Ibadan's great reading room. Silence, please.", pos: [-27, -27], size: [3.2, 2.4, 2.6], color: "#b08a5a", style: "hall", voice: true,
    actions: [A("read", "Study quietly", 6, { gain: { energy: -8, fun: 4 }, rep: 2 }), A("shelve", "Library assistant shift", 6, { gain: { energy: -18 }, pay: 3500, rep: 2 })] },
  { id: "ui-science", name: "Faculty of Science", emoji: "🔬", kind: "learn", district: "UI Campus", blurb: "Labs, lecture rooms and long practicals.", pos: [-35, -26], size: [3.6, 2.4, 2.8], color: "#6f8fb0", style: "campus", voice: true,
    actions: [A("lab", "Lab practical", 6, { gain: { energy: -18 }, rep: 3 }), A("teachlab", "Teach a lab class", 7, { gain: { energy: -25 }, pay: 4800, rep: 3 })] },
  { id: "ui-arts", name: "Faculty of Arts", emoji: "🎭", kind: "culture", district: "UI Campus", blurb: "Drama, Yoruba literature and loud rehearsals.", pos: [-25, -36], size: [3.2, 1.8, 2.6], color: "#b0605a", style: "cultural", voice: true,
    actions: [A("drama", "Drama rehearsal", 6, { gain: { fun: 28, social: 15, energy: -8 }, rep: 2 }), A("lit", "Lecture on Yoruba literature", 6, { gain: { energy: -10, fun: 6 }, rep: 3 })] },
  { id: "ui-law", name: "Faculty of Law", emoji: "⚖️", kind: "learn", district: "UI Campus", blurb: "Moot court and very serious wigs.", pos: [-35, -36], size: [3.0, 2.6, 2.4], color: "#7a6a8a", style: "hall", voice: true,
    actions: [A("moot", "Moot court", 7, { gain: { energy: -20 }, rep: 4 }), A("clinic", "Legal aid clinic", 7, { gain: { energy: -18, social: 8 }, rep: 5 })] },
  { id: "ui-trenchard", name: "Trenchard Hall", emoji: "🏛️", kind: "culture", district: "UI Campus", blurb: "The Great Hall: convocations, concerts and debates.", pos: [-23, -23], size: [3.2, 2.2, 2.6], color: "#c4a86a", style: "hall", voice: true,
    actions: [A("convo", "Attend a convocation", 6, { gain: { fun: 15, social: 20 }, rep: 3 }), A("usher", "Usher at the Great Hall", 6, { gain: { energy: -15 }, pay: 3000, rep: 1 })] },
  { id: "adeoyo", name: "Adeoyo Teaching Hospital", emoji: "🏥", kind: "health", district: "Yemetu", blurb: "Wards, clinics and the busiest corridor in town.", pos: [25, -26], size: [4, 2.4, 2.8], color: "#7aa8b8", style: "hospital", voice: true,
    actions: [A("ward", "Rest in the ward", 8, { cost: 2000, gain: { energy: 40 } }), A("aide", "Nurse's aide shift", 7, { gain: { energy: -28 }, pay: 5000, rep: 3 }), A("blood", "Donate blood", 5, { gain: { energy: -8, social: 6 }, rep: 4 })] },
  { id: "sango-market", name: "Sango Market", emoji: "🧺", kind: "shop", district: "Sango", blurb: "Yams, cloth, pepper and every kind of bargain.", pos: [-35, -6], size: [4, 1.3, 3], color: "#d9a05a", style: "market", voice: true,
    actions: [A("buy", "Buy foodstuff (4 meals)", 4, { cost: 2200, pantry: 4 }), A("stall", "Run a stall", 6, { gain: { energy: -25 }, pay: 4200, rep: 1 })] },
  { id: "iwo-road", name: "Iwo Road Garage", emoji: "🚌", kind: "transport", district: "Iwo Road", blurb: "Interstate buses, touts and the loudest horns in Oyo.", pos: [35, -6], size: [4.2, 0.9, 3.2], color: "#8a8f98", style: "terminal", voice: true,
    actions: [A("tout", "Park attendant hustle", 6, { gain: { energy: -25 }, pay: 3500, rep: 1 }), A("pass", "Keke fast pass (5 min)", 2, { cost: 1500, boostMs: 5 * 60 * 1000 })] },
  { id: "mokola-mall", name: "Mokola Plaza", emoji: "🛍️", kind: "shop", district: "Mokola", blurb: "Boutiques, a cinema and a food court.", pos: [-35, 4.5], size: [4, 1.9, 2.8], color: "#b07ab0", style: "mall", voice: true,
    actions: [A("shop", "Shop for clothes", 5, { cost: 7000, gain: { fun: 24 }, rep: 1 }), A("film", "Watch a film", 7, { cost: 3500, gain: { fun: 40, energy: -5 } }), A("sales", "Shop assistant shift", 6, { gain: { energy: -22 }, pay: 3800, rep: 1 })] },
  { id: "poly", name: "The Polytechnic, Ibadan", emoji: "🎓", kind: "learn", district: "Sapati", blurb: "Engineering workshops and a famously lively campus.", pos: [35, -26], size: [4.4, 2.2, 3], color: "#8fa86a", style: "campus", voice: true,
    actions: [A("lecture", "Attend a lecture", 6, { gain: { energy: -16 }, rep: 3 }), A("workshop", "Workshop instructor", 7, { gain: { energy: -26 }, pay: 4000, rep: 2 })] },
  { id: "palace", name: "Olubadan's Palace, Oja'ba", emoji: "👑", kind: "gov", district: "Oja'ba", blurb: "Chiefs in full regalia and centuries of tradition.", pos: [25, -36], size: [4, 2.6, 2.8], color: "#c8a24a", style: "govt", voice: true,
    actions: [A("audience", "Seek an audience", 8, { gain: { energy: -10, social: 14 }, rep: 5, minRep: 40 }), A("guard", "Palace guard duty", 7, { gain: { energy: -24 }, pay: 4500, rep: 2 })] },
  { id: "eleyele", name: "Eleyele Lake Park", emoji: "🛶", kind: "fun", district: "Eleyele", blurb: "Still water, paddle boats and a cool breeze.", pos: [-35, 16], size: [5, 0.25, 4.6], color: "#7ab87a", style: "park", voice: true,
    actions: [A("boat", "Paddle-boat ride", 6, { cost: 1500, gain: { fun: 32, energy: -6 } }), A("picnic", "Lakeside picnic", 6, { cost: 1500, gain: { hunger: 25, fun: 18, social: 8 } })] },
  { id: "oluyole-hotel", name: "Oluyole Hotel", emoji: "🏨", kind: "fun", district: "Iyaganku", blurb: "Chandeliers, a pool and a very polite doorman.", pos: [25, 26], size: [3, 3.4, 2.4], color: "#6a8aa8", style: "hotel", voice: true,
    actions: [A("dinner", "Buffet dinner", 7, { cost: 9000, gain: { hunger: 65, fun: 20, social: 14 }, rep: 1 }), A("desk", "Concierge shift", 7, { gain: { energy: -28 }, pay: 6500, rep: 2 })] },
  { id: "challenge-eatery", name: "Mama Put, Challenge", emoji: "🍲", kind: "food", district: "Challenge", blurb: "Iyan, efo riro and pepper soup at street prices.", pos: [-25, 16], size: [2.4, 1.5, 2], color: "#e0663a", style: "eatery", voice: true,
    actions: [A("iyan", "Eat iyan & efo riro", 4, { cost: 1500, gain: { hunger: 55, fun: 5 } }), A("peppersoup", "Pepper soup", 4, { cost: 1200, gain: { hunger: 35, fun: 8 } }), A("serve", "Serve at the buka", 6, { gain: { energy: -20 }, pay: 3000, rep: 1 })] },
  { id: "akobo-chapel", name: "Akobo Faith Chapel", emoji: "⛪", kind: "faith", district: "Akobo", blurb: "A lively neighbourhood church with a drum-heavy choir.", pos: [35, 16], size: [2.5, 2.6, 2.8], color: "#d9d1c0", style: "church", voice: true,
    actions: [A("service", "Attend service", 6, { gain: { fun: 10, social: 15, energy: 5 }, rep: 2 }), A("choir", "Sing with the choir", 6, { gain: { fun: 22, social: 18, energy: -8 }, rep: 2 })] },
  { id: "central-bank", name: "Ibadan Central Bank Tower", emoji: "🏦", kind: "work", district: "Odo-Ona", blurb: "Thirty floors of marble, money and nervous interns.", pos: [-25, 36], size: [2.4, 7.8, 2.4], color: "#5f7f9a", style: "tower", voice: true,
    actions: [A("teller", "Teller shift", 6, { gain: { energy: -26 }, pay: 8500, rep: 3 }), A("audit", "Assist the auditors", 8, { gain: { energy: -30 }, pay: 11000, rep: 5, minRep: 30 })] },
  { id: "oje-mosque", name: "Oje Central Mosque", emoji: "🕌", kind: "faith", district: "Oje", blurb: "A grand domed mosque in the old city.", pos: [25, 16], size: [2.4, 2.2, 2.4], color: "#e9e1cc", style: "mosque", voice: true,
    actions: [A("pray", "Pray", 4, { gain: { energy: 10, fun: 5, social: 5 }, rep: 1 })] },
  { id: "airport", name: "Ibadan Airport", emoji: "✈️", kind: "air", district: "Samonda", blurb: "Book a ticket, board a plane, see the world and fly home.", pos: [35, 34], size: [7, 1.6, 3], color: "#cfd8e3", style: "airport", voice: true,
    actions: [A("book", "Book a ticket", 1, {}), A("board", "Board your flight", 1, {}), A("porter", "Baggage handler shift", 6, { gain: { energy: -26 }, pay: 4800, rep: 1 })] },
  { id: "club-afrobeat", name: "Afrobeat Lounge", emoji: "🪩", kind: "night", district: "Jericho Nights", blurb: "Live DJ, talking drums and a floor that never empties.", pos: [35, -15], size: [3.4, 1.8, 2.8], color: "#7a2fa8", style: "club", voice: true,
    actions: [A("dance", "Hit the dance floor", 8, { cost: 2000, gain: { fun: 45, social: 20, energy: -20 }, emote: "dance" }), A("drinks", "Buy a round of drinks", 4, { cost: 4500, gain: { fun: 24, social: 18 } }), A("spray", "Spray money", 5, { cost: 15000, gain: { fun: 30, social: 25 }, rep: 4, emote: "dance" }), A("vip", "Reserve a VIP table", 8, { cost: 40000, gain: { fun: 60, social: 35, hunger: 10 }, rep: 6 })] },
  { id: "club-rooftop", name: "Sky Bar & Lounge", emoji: "🍸", kind: "night", district: "Jericho Nights", blurb: "Cocktails, city lights and slow afrosoul.", pos: [35, -36], size: [3, 2.6, 2.6], color: "#1f5f8a", style: "club", voice: true,
    actions: [A("cocktail", "Order cocktails", 4, { cost: 6000, gain: { fun: 28, social: 16 } }), A("dance", "Dance under the stars", 8, { cost: 2500, gain: { fun: 40, social: 18, energy: -18 }, emote: "dance" }), A("vip", "Reserve a VIP table", 8, { cost: 45000, gain: { fun: 60, social: 35 }, rep: 6 })] },
  { id: "club-owambe", name: "Owambe Garden & Dance Hall", emoji: "🥁", kind: "night", district: "Akobo", blurb: "Aso ebi, jollof, a live band and money-spraying aunties.", pos: [35, 26], size: [4, 1.6, 3], color: "#d9a22b", style: "club", voice: true,
    actions: [A("dance", "Dance with the aso ebi crew", 8, { cost: 1500, gain: { fun: 42, social: 24, energy: -18 }, emote: "dance" }), A("jollof", "Eat jollof and small chops", 4, { cost: 3000, gain: { hunger: 40, fun: 8 } }), A("spray", "Spray money for the band", 5, { cost: 12000, gain: { fun: 28, social: 22 }, rep: 4, emote: "dance" })] },
  { id: "palmwine", name: "Palmwine Joint, Bere", emoji: "🍶", kind: "night", district: "Bere", blurb: "Fresh palmwine, pepper soup and old-school fuji.", pos: [-35, 36], size: [2.6, 1.4, 2.2], color: "#c98b3a", style: "club", voice: true,
    actions: [A("palmwine", "Drink palmwine", 4, { cost: 1500, gain: { fun: 22, social: 16 } }), A("pepper", "Pepper soup", 4, { cost: 2000, gain: { hunger: 32, fun: 8 } }), A("dance", "Dance to fuji", 7, { cost: 1000, gain: { fun: 34, social: 20, energy: -16 }, emote: "dance" })] },
  { id: "suya-lounge", name: "Suya Spot & Shisha Lounge", emoji: "🍢", kind: "night", district: "Iyaganku", blurb: "Smoky suya, cold drinks and loud football talk.", pos: [24, 36], size: [2.8, 1.5, 2.4], color: "#b8401f", style: "club", voice: true,
    actions: [A("suya", "Suya and a cold drink", 4, { cost: 2500, gain: { hunger: 30, fun: 10 } }), A("shisha", "Chill at the shisha lounge", 6, { cost: 4000, gain: { fun: 28, social: 20 } }), A("dance", "Dance to the DJ", 7, { cost: 1500, gain: { fun: 36, social: 18, energy: -16 }, emote: "dance" })] },

);

export const isSolid = (p: Place) => p.style !== "park" && p.style !== "golf" && p.style !== "zoo";

/** Where the player stands to use a place. */
PLACES.push(
  { id: "item7", name: "Item 7", emoji: "🍗", kind: "food", district: "Bodija", blurb: "Ibadan's favourite fast-food stop. Jollof, grilled chicken and a drive-in crowd.", pos: [5, -24.6], size: [3.4, 1.7, 2.4], color: "#e8532a", style: "restaurant", voice: true,
    actions: [A("jollof", "Jollof rice & grilled chicken", 5, { cost: 4500, gain: { hunger: 72, fun: 8 } }), A("pounded", "Pounded yam & egusi", 5, { cost: 5000, gain: { hunger: 80, fun: 6 } }), A("suya", "Suya platter", 4, { cost: 3500, gain: { hunger: 45, fun: 12 } }), A("cashier", "Cashier shift", 6, { gain: { energy: -22 }, pay: 4200, rep: 1 })] },
  { id: "mrbiggs", name: "Mr Biggs", emoji: "🥧", kind: "food", district: "UI Junction", blurb: "Meat pies, fried rice and the classic fast-food counter.", pos: [-15, -24.6], size: [3.4, 1.7, 2.4], color: "#d62f39", style: "restaurant", voice: true,
    actions: [A("pie", "Meat pie & drink", 3, { cost: 1500, gain: { hunger: 30, fun: 4 } }), A("rice", "Fried rice & chicken", 5, { cost: 4000, gain: { hunger: 70, fun: 6 } }), A("burger", "Chicken burger", 4, { cost: 3500, gain: { hunger: 55, fun: 8 } }), A("counter", "Counter shift", 6, { gain: { energy: -20 }, pay: 3800, rep: 1 })] },
  { id: "chickenrepublic", name: "Chicken Republic", emoji: "🍟", kind: "food", district: "Challenge", blurb: "Spicy chicken, refuel meals and a busy dine-in hall.", pos: [15, -24.6], size: [3.4, 1.7, 2.4], color: "#c8202f", style: "restaurant", voice: true,
    actions: [A("refuel", "Refuel meal (rice & chicken)", 5, { cost: 4500, gain: { hunger: 75, fun: 8 } }), A("wings", "Spicy chicken wings", 4, { cost: 3200, gain: { hunger: 45, fun: 12 } }), A("burger", "Chicken burger", 4, { cost: 3500, gain: { hunger: 55, fun: 8 } }), A("crew", "Crew member shift", 6, { gain: { energy: -22 }, pay: 4000, rep: 1 })] },
  { id: "sweetsensation", name: "Sweet Sensation", emoji: "🥐", kind: "food", district: "Mokola", blurb: "Snacks, pies, jollof and cold drinks for the quick lunch.", pos: [-5, -24.6], size: [3.4, 1.7, 2.4], color: "#ee7b22", style: "restaurant", voice: true,
    actions: [A("jollof", "Jollof rice & turkey", 5, { cost: 4200, gain: { hunger: 70, fun: 6 } }), A("pie", "Meat pie & drink", 3, { cost: 1500, gain: { hunger: 30, fun: 4 } }), A("akara", "Akara & pap", 3, { cost: 1200, gain: { hunger: 30, fun: 5 } }), A("till", "Till shift", 6, { gain: { energy: -20 }, pay: 3800, rep: 1 })] },
  { id: "kilimanjaro", name: "Kilimanjaro", emoji: "🍛", kind: "food", district: "Oluyole", blurb: "Rice, stew and ofada for a long lunch break.", pos: [5, 24.6], size: [3.4, 1.7, 2.4], color: "#e7a915", style: "restaurant", voice: true,
    actions: [A("jollof", "Jollof rice & moin-moin", 5, { cost: 3600, gain: { hunger: 68, fun: 6 } }), A("rice", "Fried rice & plantain", 5, { cost: 3700, gain: { hunger: 70, fun: 6 } }), A("ofada", "Ofada rice & stew", 5, { cost: 4200, gain: { hunger: 74, fun: 8 } }), A("serve", "Serve the lunch crowd", 6, { gain: { energy: -22 }, pay: 4000, rep: 1 })] },
);

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
  // the wider city
  { name: "UI Campus", pos: [-30, -30] },
  { name: "Samonda", pos: [-15, -34] },
  { name: "Ojoo", pos: [-5, -34] },
  { name: "Akobo", pos: [5, -34] },
  { name: "Oje", pos: [15, -34] },
  { name: "Oja'ba", pos: [25, -34] },
  { name: "Sapati", pos: [35, -30] },
  { name: "Yemetu", pos: [25, -24] },
  { name: "Sango", pos: [-35, -10] },
  { name: "Beere", pos: [-25, 2] },
  { name: "Eleyele", pos: [-35, 20] },
  { name: "Apata", pos: [-35, 31] },
  { name: "Odo-Ona", pos: [-20, 36] },
  { name: "Iyaganku", pos: [20, 28] },
  { name: "Moniya", pos: [5, 36] },
  { name: "Iwo Road", pos: [30, -10] },
  { name: "Ring Road", pos: [-5, 26] },
  { name: "Jericho Nights", pos: [35, -25] },
  { name: "Samonda", pos: [35, 31] },
  { name: "Bere", pos: [-35, 31] },
];

