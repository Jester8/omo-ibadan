import type { ActionDef } from "./places";

/** Real-world scale factor: interiors are authored in metres and drawn at the avatar's scale. */
export const S = 0.56;

export type FurnKind =
  | "sofa" | "loveseat" | "armchair" | "chair" | "plasticchair" | "stool" | "barstool" | "bench" | "pew"
  | "coffeetable" | "diningtable" | "roundtable" | "desk" | "pcdesk" | "counter" | "bar" | "stall" | "cabinet" | "sidetable"
  | "bed" | "singlebed" | "hospitalbed" | "wardrobe" | "bookshelf" | "fridge" | "stove" | "sink"
  | "tv" | "rug" | "plant" | "lamp" | "standingfan" | "ceilingfan" | "chandelier" | "generator" | "lantern" | "waterdispenser"
  | "toilet" | "shower" | "basin"
  | "podium" | "blackboard" | "studentdesk" | "altar" | "pulpit" | "mimbar" | "prayermat"
  | "displaycase" | "arcade" | "clawmachine" | "fountain" | "stage" | "drum" | "rack" | "crates" | "sacks" | "umbrella"
  | "mortar" | "calabash" | "ibeji" | "mannequin" | "carvedstool" | "gascooker" | "radio" | "sewingmachine" | "meterbox" | "calendar" | "provisions" | "cooler" | "watertank" | "agbadastand"
  | "treadmill" | "dumbbells" | "weightbench" | "punchingbag" | "exercisebike" | "yogamat" | "gymmirror"
  | "salonchair" | "dryer" | "mirrorstation" | "espresso" | "menuboard" | "medshelf" | "scale" | "trolley" | "freezer"
  | "curtain" | "flag" | "trophycase" | "goalpost" | "ticketbooth" | "tank" | "stairs" | "wallart" | "clock" | "pitch" | "liftdoor"
  // shops and malls (drawn in bodiesRetail.tsx)
  | "clothesrail" | "foldedshelf" | "shoeshelf" | "displaytable" | "bagwall" | "jewelrycase" | "perfumeshelf" | "electronicswall" | "gondola" | "produce" | "cashdesk" | "dressedmannequin"
  // eateries and food counters (bodiesFood.tsx)
  | "hotcase" | "foodcounter" | "pastrycase" | "bukapots" | "grillstand" | "drinkfridge" | "prepcounter" | "tray" | "boothseat" | "menulight"
  // lights, signs and nightlife (bodiesLights.tsx)
  | "tubelight" | "pendant" | "neonsign" | "signboard" | "lightstring" | "spotlight" | "discoball" | "ledfloor" | "speaker" | "djbooth" | "bottleshelf" | "vipbooth" | "wallsconce"
  // civic: counters that do business, cell bars, the fire engine, post-office boxes, boreholes and petrol (bodiesCivic.tsx)
  | "servicedesk" | "cellbars" | "fireengine" | "pigeonholes" | "waterpoint" | "fuelpump" | "jerrycans";

export type Pose = "sit" | "lie";

export type UseDef = {
  verb: string;
  pose?: Pose;
  /** height of the seat or mattress, metres */
  seatH?: number;
  needsPower?: boolean;
  action?: ActionDef;
  /** generator/deck/computer/eat are special-cased in interiorRuntime.startUse. "service" opens the desk panel (services.ts). "ward" is a hospital bed (hospital.ts). */
  special?: "generator" | "deck" | "computer" | "eat" | "service" | "ward";
};

export type FurnDef = {
  /** nominal footprint (x by z) and height, metres */
  w: number;
  d: number;
  h: number;
  solid: boolean;
  use?: UseDef;
};

const relax: ActionDef = { id: "sit", label: "Sit and relax", secs: 4, gain: { energy: 8, fun: 5 } };
const sleep: ActionDef = { id: "sleep", label: "Sleep", secs: 8, gain: { energy: 70, hunger: -10 } };

const sit = (seatH = 0.45, action: ActionDef = relax): UseDef => ({ verb: "Sit", pose: "sit", seatH, action });

export const FURN: Record<FurnKind, FurnDef> = {
  sofa: { w: 2.0, d: 0.9, h: 0.85, solid: true, use: sit() },
  loveseat: { w: 1.4, d: 0.85, h: 0.85, solid: true, use: sit() },
  armchair: { w: 0.85, d: 0.85, h: 0.9, solid: true, use: sit() },
  chair: { w: 0.45, d: 0.45, h: 0.9, solid: true, use: sit() },
  plasticchair: { w: 0.5, d: 0.5, h: 0.85, solid: true, use: sit() },
  stool: { w: 0.4, d: 0.4, h: 0.45, solid: true, use: sit() },
  barstool: { w: 0.4, d: 0.4, h: 0.75, solid: true, use: sit(0.75) },
  bench: { w: 1.6, d: 0.5, h: 0.45, solid: true, use: sit() },
  pew: { w: 2.2, d: 0.55, h: 0.9, solid: true, use: sit(0.45, { id: "pew", label: "Sit and reflect", secs: 4, gain: { energy: 6, fun: 4, social: 3 } }) },

  coffeetable: { w: 1.0, d: 0.6, h: 0.42, solid: true },
  diningtable: { w: 1.6, d: 0.9, h: 0.75, solid: true, use: { verb: "Eat a meal", special: "eat" } },
  roundtable: { w: 1.0, d: 1.0, h: 0.75, solid: true, use: { verb: "Eat a meal", special: "eat" } },
  desk: { w: 1.3, d: 0.65, h: 0.75, solid: true },
  pcdesk: {
    w: 1.3, d: 0.65, h: 1.1, solid: true,
    use: { verb: "Use the computer", needsPower: true, special: "computer" },
  },
  counter: { w: 1.6, d: 0.65, h: 1.0, solid: true },
  bar: { w: 2.4, d: 0.7, h: 1.1, solid: true },
  stall: {
    w: 1.8, d: 0.9, h: 0.95, solid: true,
    use: { verb: "Buy a snack", action: { id: "stallsnack", label: "Buy a snack", secs: 3, cost: 500, gain: { hunger: 12, fun: 2 } } },
  },
  cabinet: { w: 0.9, d: 0.45, h: 0.95, solid: true },
  sidetable: { w: 0.5, d: 0.5, h: 0.55, solid: true },

  bed: { w: 1.5, d: 2.0, h: 0.55, solid: true, use: { verb: "Sleep", pose: "lie", seatH: 0.6, action: sleep } },
  singlebed: { w: 1.0, d: 2.0, h: 0.5, solid: true, use: { verb: "Sleep", pose: "lie", seatH: 0.55, action: sleep } },
  hospitalbed: {
    w: 1.0, d: 2.0, h: 0.6, solid: true,
    use: { verb: "Rest", pose: "lie", seatH: 0.65, special: "ward", action: { id: "wardrest", label: "Rest in the ward", secs: 8, cost: 2000, gain: { energy: 40 } } },
  },
  wardrobe: { w: 1.2, d: 0.6, h: 2.0, solid: true },
  bookshelf: {
    w: 1.0, d: 0.35, h: 1.9, solid: true,
    use: { verb: "Read a book", action: { id: "read", label: "Read a book", secs: 5, gain: { fun: 10, energy: -3 }, rep: 1 } },
  },
  fridge: {
    w: 0.7, d: 0.7, h: 1.8, solid: true,
    use: { verb: "Grab a snack", needsPower: true, action: { id: "fridgesnack", label: "Grab a snack", secs: 3, cost: 300, gain: { hunger: 15 } } },
  },
  stove: {
    w: 0.65, d: 0.6, h: 0.9, solid: true,
    use: { verb: "Cook", action: { id: "cook", label: "Cook a meal", secs: 5, pantry: -1, plates: 1, gain: { energy: -4, fun: 3 } } },
  },
  sink: { w: 0.8, d: 0.6, h: 0.9, solid: true },

  tv: {
    w: 1.2, d: 0.4, h: 1.1, solid: true,
    use: { verb: "Watch TV", needsPower: true, action: { id: "tv", label: "Watch TV", secs: 6, gain: { fun: 22, energy: -2 } } },
  },
  rug: { w: 2.4, d: 1.6, h: 0.02, solid: false },
  plant: { w: 0.5, d: 0.5, h: 1.2, solid: true },
  lamp: { w: 0.35, d: 0.35, h: 1.5, solid: true },
  standingfan: { w: 0.4, d: 0.4, h: 1.2, solid: true },
  ceilingfan: { w: 1.2, d: 1.2, h: 0, solid: false },
  chandelier: { w: 1.0, d: 1.0, h: 0, solid: false },
  generator: {
    w: 0.7, d: 0.45, h: 0.6, solid: true,
    use: { verb: "Fuel the generator", special: "generator" },
  },
  lantern: { w: 0.2, d: 0.2, h: 0.3, solid: false },
  waterdispenser: {
    w: 0.35, d: 0.35, h: 1.1, solid: true,
    use: { verb: "Drink water", action: { id: "water", label: "Drink some water", secs: 2, gain: { hunger: 3, energy: 2 } } },
  },
  toilet: { w: 0.4, d: 0.7, h: 0.8, solid: true, use: { verb: "Use the toilet", action: { id: "toilet", label: "Use the toilet", secs: 4, gain: { bladder: 100 } } } },
  shower: {
    w: 0.9, d: 0.9, h: 2.0, solid: true,
    use: { verb: "Take a bath", action: { id: "bath", label: "Take a bath", secs: 7, gain: { hygiene: 100, energy: 6, fun: 5 } } },
  },
  basin: { w: 0.5, d: 0.4, h: 0.9, solid: true, use: { verb: "Wash up", action: { id: "wash", label: "Wash your hands and face", secs: 2, gain: { hygiene: 15 } } } },

  // the gym: all of it can be used
  treadmill: { w: 0.8, d: 1.7, h: 1.4, solid: true, use: { verb: "Run on the treadmill", needsPower: true, action: { id: "treadmill", label: "Run on the treadmill", secs: 6, gain: { energy: -14, fun: 10, hygiene: -8, hunger: -4 } } } },
  dumbbells: { w: 1.6, d: 0.5, h: 1.0, solid: true, use: { verb: "Lift dumbbells", action: { id: "dumbbells", label: "Lift dumbbells", secs: 5, gain: { energy: -12, fun: 8, hygiene: -6, hunger: -3 } } } },
  weightbench: { w: 1.8, d: 1.0, h: 1.3, solid: true, use: { verb: "Bench press", action: { id: "benchpress", label: "Bench press", secs: 6, gain: { energy: -15, fun: 9, hygiene: -9, hunger: -4 } } } },
  punchingbag: { w: 0.7, d: 0.7, h: 2.0, solid: true, use: { verb: "Hit the bag", action: { id: "punchbag", label: "Hit the punching bag", secs: 5, gain: { energy: -11, fun: 12, hygiene: -7, hunger: -3 } } } },
  exercisebike: { w: 0.55, d: 1.0, h: 1.2, solid: true, use: { verb: "Ride the bike", needsPower: true, action: { id: "spin", label: "Ride the exercise bike", secs: 6, gain: { energy: -11, fun: 8, hygiene: -6, hunger: -3 } } } },
  yogamat: { w: 0.7, d: 1.8, h: 0.02, solid: false, use: { verb: "Stretch", action: { id: "stretch", label: "Stretch and breathe", secs: 5, gain: { energy: 6, fun: 8 } } } },
  gymmirror: { w: 3.0, d: 0.06, h: 2.0, solid: false },
  // the salon, cafe, pharmacy and shops
  salonchair: { w: 0.8, d: 0.8, h: 1.2, solid: true },
  dryer: { w: 0.6, d: 0.6, h: 1.7, solid: true },
  mirrorstation: { w: 1.2, d: 0.4, h: 1.7, solid: true },
  espresso: { w: 0.9, d: 0.6, h: 1.45, solid: true },
  menuboard: { w: 1.5, d: 0.08, h: 1.1, solid: false },
  medshelf: { w: 1.6, d: 0.4, h: 1.9, solid: true },
  scale: { w: 0.4, d: 0.4, h: 0.1, solid: false },
  trolley: { w: 0.6, d: 0.9, h: 1.0, solid: true },
  freezer: { w: 1.4, d: 0.7, h: 0.9, solid: true },

  podium: { w: 0.6, d: 0.5, h: 1.1, solid: true },
  blackboard: { w: 3.0, d: 0.1, h: 1.3, solid: false },
  studentdesk: { w: 1.0, d: 0.55, h: 0.75, solid: true },
  altar: { w: 2.0, d: 0.9, h: 1.0, solid: true },
  pulpit: { w: 0.8, d: 0.7, h: 1.2, solid: true },
  mimbar: { w: 1.0, d: 0.8, h: 1.8, solid: true },
  prayermat: {
    w: 0.7, d: 1.1, h: 0.02, solid: false,
    use: { verb: "Pray", action: { id: "prayer", label: "Pray", secs: 4, gain: { energy: 8, fun: 4, social: 4 }, rep: 1 } },
  },
  displaycase: {
    w: 1.4, d: 0.5, h: 1.0, solid: true,
    use: { verb: "Browse the exhibits", action: { id: "browse", label: "Browse the exhibits", secs: 3, gain: { fun: 6 }, rep: 1 } },
  },
  arcade: {
    w: 0.7, d: 0.8, h: 1.8, solid: true,
    use: { verb: "Play", needsPower: true, action: { id: "arcadeplay", label: "Play an arcade game", secs: 4, cost: 200, gain: { fun: 15 } } },
  },
  clawmachine: {
    w: 0.8, d: 0.8, h: 1.9, solid: true,
    use: { verb: "Try your luck", needsPower: true, action: { id: "claw", label: "Try the claw machine", secs: 4, cost: 300, gain: { fun: 12 } } },
  },
  fountain: { w: 1.6, d: 1.6, h: 0.9, solid: true },
  stage: { w: 4.0, d: 2.2, h: 0.5, solid: false },
  drum: {
    w: 0.5, d: 0.5, h: 0.8, solid: true,
    use: { verb: "Play the talking drum", action: { id: "drum", label: "Play the talking drum", secs: 4, gain: { fun: 12 }, rep: 1 } },
  },
  rack: { w: 1.2, d: 0.5, h: 1.5, solid: true },
  crates: { w: 0.8, d: 0.6, h: 0.7, solid: true },
  sacks: { w: 0.7, d: 0.5, h: 0.7, solid: true },
  umbrella: { w: 2.2, d: 2.2, h: 0, solid: false },
  mortar: {
    w: 0.6, d: 0.6, h: 0.7, solid: true,
    use: { verb: "Pound yam", action: { id: "pound", label: "Pound yam", secs: 5, pantry: -1, plates: 1, gain: { energy: -8, fun: 2 } } },
  },
  calabash: { w: 0.5, d: 0.5, h: 0.3, solid: false },
  ibeji: { w: 0.4, d: 0.3, h: 0.55, solid: false },
  mannequin: { w: 0.5, d: 0.4, h: 1.6, solid: true },
  carvedstool: { w: 0.45, d: 0.45, h: 0.45, solid: true, use: sit(0.45) },
  gascooker: {
    w: 0.7, d: 0.55, h: 0.9, solid: true,
    use: { verb: "Cook on gas", action: { id: "gascook", label: "Cook on the gas cooker", secs: 5, cost: 200, pantry: -1, plates: 1, gain: { energy: -4, fun: 3 } } },
  },
  radio: {
    w: 0.4, d: 0.2, h: 0.3, solid: false,
    use: { verb: "Listen to the radio", needsPower: true, action: { id: "radio", label: "Listen to the radio", secs: 4, gain: { fun: 8, energy: 2 } } },
  },
  sewingmachine: {
    w: 0.9, d: 0.5, h: 0.9, solid: true,
    use: { verb: "Sew an outfit", action: { id: "sew", label: "Sew an outfit", secs: 6, gain: { energy: -18 }, pay: 3500, rep: 1 } },
  },
  meterbox: { w: 0.4, d: 0.12, h: 0.5, solid: false },
  calendar: { w: 0.45, d: 0.04, h: 0.6, solid: false },
  provisions: {
    w: 1.2, d: 0.4, h: 1.7, solid: true,
    use: { verb: "Buy provisions", action: { id: "provisions", label: "Buy provisions", secs: 3, cost: 400, gain: { hunger: 10 } } },
  },
  cooler: {
    w: 0.6, d: 0.4, h: 0.5, solid: true,
    use: { verb: "Cold drink", action: { id: "colddrink", label: "Take a cold drink", secs: 2, cost: 300, gain: { hunger: 3, fun: 6 } } },
  },
  watertank: { w: 0.8, d: 0.8, h: 1.3, solid: true },
  agbadastand: { w: 0.7, d: 0.4, h: 1.7, solid: true },
  curtain: { w: 1.5, d: 0.08, h: 1.8, solid: false },
  flag: { w: 0.3, d: 0.3, h: 2.4, solid: true },
  trophycase: { w: 1.0, d: 0.4, h: 1.8, solid: true },
  goalpost: { w: 5.0, d: 0.2, h: 2.4, solid: false },
  ticketbooth: { w: 1.2, d: 1.2, h: 2.2, solid: true },
  tank: { w: 2.4, d: 0.9, h: 1.4, solid: true },
  stairs: { w: 1.1, d: 3.2, h: 2.4, solid: true, use: { verb: "Climb to the viewing deck", special: "deck" } },
  wallart: { w: 0.9, d: 0.06, h: 0.7, solid: false },
  clock: { w: 0.4, d: 0.05, h: 0.4, solid: false },
  pitch: { w: 8, d: 5, h: 0.02, solid: false },
  liftdoor: { w: 1.2, d: 0.1, h: 2.1, solid: false },

  /* ---- shops and malls ---- */
  clothesrail: { w: 1.4, d: 0.7, h: 1.55, solid: true, use: { verb: "Try on clothes", action: { id: "tryclothes", label: "Try on some clothes", secs: 4, gain: { fun: 12, social: 2 } } } },
  foldedshelf: { w: 1.4, d: 0.5, h: 1.9, solid: true },
  shoeshelf: { w: 1.6, d: 0.45, h: 1.7, solid: true, use: { verb: "Try on shoes", action: { id: "tryshoes", label: "Try on some shoes", secs: 4, gain: { fun: 12 } } } },
  /** a display table in the middle of a shop floor; `variant` says what is on it (shoes, bags, folded, watches, phones, perfume) */
  displaytable: { w: 1.2, d: 1.2, h: 0.85, solid: true },
  bagwall: { w: 1.8, d: 0.4, h: 2.0, solid: true },
  jewelrycase: { w: 1.4, d: 0.6, h: 1.05, solid: true },
  perfumeshelf: { w: 1.4, d: 0.45, h: 1.8, solid: true, use: { verb: "Try a perfume", action: { id: "tryperfume", label: "Try a perfume", secs: 3, gain: { fun: 8, hygiene: 2 } } } },
  electronicswall: { w: 2.4, d: 0.3, h: 2.0, solid: true, use: { verb: "Watch the demo screens", needsPower: true, action: { id: "demotv", label: "Watch the demo screens", secs: 4, gain: { fun: 10 } } } },
  /** a supermarket aisle shelf stocked on both sides; `variant`: snacks, drinks, cereal, cans */
  gondola: { w: 1.8, d: 0.7, h: 1.5, solid: true },
  /** fruit and vegetable bins; `variant`: fruit, veg */
  produce: { w: 1.4, d: 0.8, h: 0.9, solid: true },
  cashdesk: { w: 1.6, d: 0.75, h: 1.1, solid: true },
  /** dressed in a full outfit; `variant`: agbada, suit, dress, ankara */
  dressedmannequin: { w: 0.55, d: 0.5, h: 1.8, solid: true },

  /* ---- eateries and food counters ---- */
  hotcase: { w: 1.8, d: 0.7, h: 1.25, solid: true, use: { verb: "Order a plate", action: { id: "hotplate", label: "Order a plate of jollof and chicken", secs: 5, cost: 2200, gain: { hunger: 50, fun: 4 } } } },
  foodcounter: { w: 2.4, d: 0.8, h: 1.1, solid: true, use: { verb: "Order at the counter", action: { id: "order", label: "Order a meal", secs: 5, cost: 2500, gain: { hunger: 55, fun: 5 } } } },
  pastrycase: { w: 1.6, d: 0.7, h: 1.3, solid: true, use: { verb: "Buy a meat pie", action: { id: "pie", label: "Buy a meat pie", secs: 3, cost: 800, gain: { hunger: 22, fun: 3 } } } },
  bukapots: { w: 2.0, d: 0.8, h: 1.05, solid: true, use: { verb: "Dish up a plate", action: { id: "bukaplate", label: "Get a plate from the pots", secs: 5, cost: 1800, gain: { hunger: 55, fun: 4 } } } },
  grillstand: { w: 1.4, d: 0.7, h: 1.0, solid: true, use: { verb: "Buy suya", action: { id: "suya", label: "Buy fresh suya", secs: 4, cost: 1200, gain: { hunger: 28, fun: 5 } } } },
  drinkfridge: { w: 1.0, d: 0.7, h: 2.0, solid: true, use: { verb: "Take a cold drink", needsPower: true, action: { id: "coldbottle", label: "Take a cold drink", secs: 2, cost: 400, gain: { hunger: 3, fun: 6 } } } },
  prepcounter: { w: 2.0, d: 0.75, h: 1.0, solid: true },
  /** a food tray to put on a table (set `y` to the table height); `variant`: burger, rice, chicken, pie */
  tray: { w: 0.5, d: 0.35, h: 0.12, solid: false },
  boothseat: { w: 1.8, d: 0.75, h: 1.0, solid: true, use: sit() },
  menulight: { w: 1.8, d: 0.1, h: 0.9, solid: false },

  /* ---- lights, signs and nightlife ---- */
  tubelight: { w: 1.2, d: 0.15, h: 0, solid: false },
  pendant: { w: 0.4, d: 0.4, h: 0, solid: false },
  /** text sign on a wall: `label` is the text, `c` its colour */
  neonsign: { w: 1.4, d: 0.06, h: 0.5, solid: false },
  /** lit shop-name board: `label` is the text, `c` the board colour */
  signboard: { w: 2.0, d: 0.1, h: 0.6, solid: false },
  lightstring: { w: 4.0, d: 0.1, h: 0, solid: false },
  spotlight: { w: 0.3, d: 0.3, h: 0, solid: false },
  discoball: { w: 0.6, d: 0.6, h: 0, solid: false },
  ledfloor: { w: 4, d: 4, h: 0.02, solid: false },
  speaker: { w: 0.7, d: 0.6, h: 1.6, solid: true },
  djbooth: { w: 2.6, d: 1.0, h: 1.2, solid: true },
  bottleshelf: { w: 3.0, d: 0.35, h: 2.0, solid: true },
  vipbooth: { w: 2.2, d: 1.0, h: 0.95, solid: true, use: sit() },
  wallsconce: { w: 0.2, d: 0.15, h: 0, solid: false },

  /* ---- civic ---- */
  /** A counter that does business. `Item.service` (or the place's `service`) says which; `Item.w` widens it. Never draw a person behind it. */
  servicedesk: { w: 2.4, d: 0.8, h: 1.1, solid: true, use: { verb: "Speak to the desk", special: "service" } },
  /** An iron bar panel above a cell wall. Not solid: the cell walls (Layout.walls) do the blocking. */
  cellbars: { w: 3.0, d: 0.1, h: 2.4, solid: false },
  fireengine: { w: 2.3, d: 5.0, h: 2.3, solid: true },
  pigeonholes: { w: 2.4, d: 0.4, h: 2.0, solid: true },
  waterpoint: { w: 0.6, d: 0.6, h: 1.1, solid: true, use: { verb: "Pump water", action: { id: "drinkwater", label: "Pump and drink borehole water", secs: 3, gain: { hunger: 3, energy: 3 } } } },
  /** Petrol. A layout overrides the amount with `Item.action` (5, 10 or 25 L). No `needsPower`: the station has its own supply. */
  fuelpump: { w: 0.7, d: 0.5, h: 1.6, solid: true, use: { verb: "Pump petrol", action: { id: "pump5", label: "Buy 5 L of petrol", secs: 4, cost: 2250, fuel: 5 } } },
  jerrycans: { w: 0.8, d: 0.5, h: 1.0, solid: true },
};
