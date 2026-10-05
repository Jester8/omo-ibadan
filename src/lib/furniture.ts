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
  | "curtain" | "flag" | "trophycase" | "goalpost" | "ticketbooth" | "tank" | "stairs" | "wallart" | "clock" | "pitch" | "liftdoor";

export type Pose = "sit" | "lie";

export type UseDef = {
  verb: string;
  pose?: Pose;
  /** height of the seat or mattress, metres */
  seatH?: number;
  needsPower?: boolean;
  action?: ActionDef;
  special?: "generator";
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
  diningtable: { w: 1.6, d: 0.9, h: 0.75, solid: true },
  roundtable: { w: 1.0, d: 1.0, h: 0.75, solid: true },
  desk: { w: 1.3, d: 0.65, h: 0.75, solid: true },
  pcdesk: {
    w: 1.3, d: 0.65, h: 1.1, solid: true,
    use: { verb: "Work at the desk", needsPower: true, action: { id: "deskwork", label: "Work at the desk", secs: 6, gain: { energy: -18 }, pay: 3000, rep: 1 } },
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
    use: { verb: "Rest", pose: "lie", seatH: 0.65, action: { id: "wardrest", label: "Rest in the ward", secs: 8, cost: 2000, gain: { energy: 40 } } },
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
    use: { verb: "Cook", action: { id: "cook", label: "Cook a meal", secs: 5, cost: 800, gain: { hunger: 40, fun: 3 } } },
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
  toilet: { w: 0.4, d: 0.7, h: 0.8, solid: true },
  shower: {
    w: 0.9, d: 0.9, h: 2.0, solid: true,
    use: { verb: "Freshen up", action: { id: "shower", label: "Freshen up", secs: 4, gain: { energy: 5, fun: 4 } } },
  },
  basin: { w: 0.5, d: 0.4, h: 0.9, solid: true },

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
  curtain: { w: 1.5, d: 0.08, h: 1.8, solid: false },
  flag: { w: 0.3, d: 0.3, h: 2.4, solid: true },
  trophycase: { w: 1.0, d: 0.4, h: 1.8, solid: true },
  goalpost: { w: 5.0, d: 0.2, h: 2.4, solid: false },
  ticketbooth: { w: 1.2, d: 1.2, h: 2.2, solid: true },
  tank: { w: 2.4, d: 0.9, h: 1.4, solid: true },
  stairs: { w: 1.1, d: 3.2, h: 2.4, solid: true },
  wallart: { w: 0.9, d: 0.06, h: 0.7, solid: false },
  clock: { w: 0.4, d: 0.05, h: 0.4, solid: false },
  pitch: { w: 8, d: 5, h: 0.02, solid: false },
  liftdoor: { w: 1.2, d: 0.1, h: 2.1, solid: false },
};
