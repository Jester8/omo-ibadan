import type { ActionDef, Place } from "./places";

/**
 * The civic places: police, EFCC, the custodial centre, fire, post, court, school, filling station, health centre, library, food bank,
 * three boreholes, and the Olodo community. Appended to PLACES by places.ts (always at the END, which keeps the door tie-break order,
 * the label z-order and the Roofscape/Terrain RNG stable for the older places).
 * Positions were measured against the map on 2026-10-08 (scripts/check-places.ts re-checks them): every door faces +z, sits 1.8 north of an
 * east-west road, is a free pathing cell, and is at least 3.6 from any other door. Type-only import: no runtime cycle with places.ts.
 */

const A = (id: string, label: string, secs: number, o: Partial<ActionDef> = {}): ActionDef => ({ id, label, secs, ...o });

/** What the two police stations offer besides the counter (the counter itself is the `police` service desk). */
const POLICE_ACTIONS: ActionDef[] = [
  A("lostreport", "Report a lost item", 4, { gain: { social: 4 } }),
  A("clearance", "Apply for a police character certificate", 5, { cost: 3000, gain: { energy: -3 }, rep: 2 }),
  A("watch", "Volunteer for community policing", 7, { gain: { energy: -22, social: 10 }, pay: 2500, rep: 4 }),
];

/** The three boreholes share these. The toilet and the shower in their interior use the same prices (Item.action). */
const BOREHOLE_ACTIONS: ActionDef[] = [
  A("toilet", "Use the public toilet", 4, { cost: 100, gain: { bladder: 100 } }),
  A("wash", "Wash up at the tap", 3, { gain: { hygiene: 25 } }),
  A("bath", "Pay-and-bathe", 7, { cost: 250, gain: { hygiene: 100, energy: 4 } }),
  A("drinkwater", "Fetch and drink borehole water", 3, { gain: { hunger: 3, energy: 3 } }),
  A("maiwater", "Fetch and sell water", 6, { gain: { energy: -24, hygiene: -10 }, pay: 2400, rep: 1 }),
];

const borehole = (id: string, name: string, district: string, pos: [number, number]): Place => ({
  id, name, emoji: "\u{1F6B0}", kind: "service", district, pos, size: [2.4, 1.4, 2], color: "#4aa8d8", style: "borehole", voice: true,
  blurb: "A borehole that never runs dry and a pay-and-use toilet. Free water, honest prices.",
  actions: BOREHOLE_ACTIONS,
});

export const CIVIC_PLACES: Place[] = [
  /* ---- law and order ---- */
  { id: "police-dugbe", name: "Dugbe Police Station", emoji: "\u{1F693}", kind: "law", district: "Dugbe", pos: [-5, 15.8], size: [4, 1.9, 3], color: "#1d3a8a", style: "police", voice: true, service: "police",
    blurb: "The divisional station a short walk from Cocoa House. The counter never closes: report a problem, book a case, pay a fine.", actions: POLICE_ACTIONS },
  { id: "police-mokola", name: "Mokola Police Station", emoji: "\u{1F693}", kind: "law", district: "Mokola", pos: [-45, 5.8], size: [4, 1.9, 3], color: "#1d3a8a", style: "police", voice: true, service: "police",
    blurb: "The Mokola division, on the lake side of the plaza. Same blue-and-white station, same long bench, same counter that never closes.", actions: POLICE_ACTIONS },
  { id: "efcc", name: "EFCC Zonal Office, Ibadan", emoji: "\u{1F50E}", kind: "law", district: "Odo-Ona", pos: [-26.7, 26], size: [3.4, 3.8, 2.6], color: "#1f9d55", style: "office", voice: true, service: "efcc",
    blurb: "The anti-graft commission's glass office. Money cases are filed and booked here. Quiet corridors and very serious filing cabinets.",
    actions: [A("seminar", "Attend an anti-corruption seminar", 6, { gain: { energy: -10, social: 8 }, rep: 3 }), A("analyst", "Intern as a research analyst", 7, { gain: { energy: -24 }, pay: 6500, rep: 4, minRep: 25 })] },
  { id: "prison", name: "Agodi Custodial Centre", emoji: "\u{26D3}\u{FE0F}", kind: "law", district: "Agodi", pos: [15, -15.3], size: [6.4, 2.4, 5.2], color: "#6b7078", style: "prison", voice: true, service: "bail",
    blurb: "A walled compound with watchtowers and one steel gate. People wait here for bail. Visitors are welcome in the hall, and friends can talk through the bars.",
    actions: [A("chaplaincy", "Join the chaplaincy outreach", 6, { gain: { energy: -10, social: 12 }, rep: 3 }), A("workshop", "Volunteer in the prison workshop", 7, { gain: { energy: -24 }, pay: 3000, rep: 3 })] },
  { id: "high-court", name: "Oyo State High Court", emoji: "\u{2696}\u{FE0F}", kind: "law", district: "Iyaganku", pos: [15, 35.7], size: [4.4, 2.8, 3.2], color: "#7a1f2e", style: "court", voice: true,
    blurb: "Columns, a pediment and a public gallery. Sit in, or work as the clerk's assistant.",
    actions: [A("gallery", "Sit in the public gallery", 5, { gain: { energy: -5 }, rep: 3 }), A("clerk", "Court clerk's assistant shift", 7, { gain: { energy: -24 }, pay: 5200, rep: 3 }), A("legaltalk", "Attend a legal awareness talk", 6, { gain: { energy: -8, social: 6 }, rep: 3 })] },

  /* ---- public services ---- */
  { id: "fire-station", name: "Fire Service Station", emoji: "\u{1F692}", kind: "service", district: "Ring Road", pos: [-5, 25.8], size: [4.4, 2.4, 3], color: "#c81e1e", style: "firestation", voice: true, service: "incident",
    blurb: "Red roller doors, a hose tower and an engine that is always ready. Open day and night.",
    actions: [A("tour", "Take the station tour", 4, { gain: { fun: 12 }, rep: 1 }), A("drill", "Join the fire drill", 7, { gain: { energy: -22, hygiene: -12, fun: 3 }, rep: 3 }), A("washeng", "Wash the fire engine", 5, { gain: { energy: -14 }, pay: 2200, rep: 1 }), A("standby", "Fire crew standby shift", 7, { gain: { energy: -26 }, pay: 4800, rep: 3 })] },
  { id: "post-office", name: "NIPOST Post Office", emoji: "\u{1F4EE}", kind: "service", district: "Ring Road", pos: [-16.8, 26.1], size: [3.4, 1.6, 2.4], color: "#166534", style: "postoffice", voice: true, service: "post",
    blurb: "Yellow and green, with a red post box by the door. Stamps, letters to your friends and a very patient queue.",
    actions: [A("stamps", "Buy a book of stamps", 3, { cost: 300, gain: { fun: 2 } }), A("post", "Post a letter to a friend", 1, { svc: "post" }), A("sortmail", "Sort the mail", 6, { gain: { energy: -18 }, pay: 3200, rep: 1 }), A("riders", "Deliver parcels by motorbike", 8, { gain: { energy: -28 }, pay: 4600, rep: 2 })] },
  borehole("borehole-ring-road", "Ring Road Borehole & Toilet", "Ring Road", [-12.8, 26.3]),
  borehole("borehole-odo-ona", "Odo-Ona Borehole & Toilet", "Odo-Ona", [-22.8, 26.3]),
  borehole("borehole-sango", "Sango Borehole & Toilet", "Sango", [-45, -3.7]),
  { id: "filling-station", name: "Moniya Filling Station", emoji: "\u{26FD}", kind: "service", district: "Moniya", pos: [-5, 35.7], size: [4.6, 1.5, 3.2], color: "#d4202a", style: "filling", voice: true,
    blurb: "A lit canopy, three pumps and a kiosk with cold drinks. Petrol by the litre for your generator. Open all night.",
    actions: [A("pump5", "Buy 5 L of petrol", 4, { cost: 2250, fuel: 5 }), A("pump10", "Buy 10 L of petrol", 6, { cost: 4500, fuel: 10 }), A("pump25", "Fill the jerrycans (25 L)", 9, { cost: 11250, fuel: 25 }), A("attendant", "Pump attendant shift", 6, { gain: { energy: -22 }, pay: 3600, rep: 1 }), A("snack", "Buy a cold drink and gala", 3, { cost: 900, gain: { hunger: 22, fun: 3 } })] },
  { id: "food-bank", name: "Hope Food Bank", emoji: "\u{1F96B}", kind: "service", district: "Eleyele", pos: [-45, 16], size: [3.4, 1.7, 2.6], color: "#d9822b", style: "foodbank", voice: true, service: "donate",
    blurb: "Sacks, shelves and a long table of volunteers. Give what you can; take what you need.",
    actions: [A("donate", "Donate to the food bank", 1, { svc: "donate" }), A("givefood", "Donate 2 portions of foodstuff", 4, { pantry: -2, gain: { social: 4 }, rep: 2, stat: "donated", statN: 2500 }), A("pack", "Pack food parcels (volunteer)", 6, { gain: { energy: -18, social: 8 }, pay: 1500, rep: 3 })] },

  /* ---- learning ---- */
  { id: "primary-school", name: "Community Primary School", emoji: "\u{1F3EB}", kind: "learn", district: "Sapati", pos: [45, -24.8], size: [6, 1.4, 4.2], color: "#2f6f4f", style: "school", voice: true,
    blurb: "A long classroom block, a football field and a bell you can hear across the whole street. Adult literacy class in the evening.",
    actions: [A("teach", "Teach a primary class", 7, { gain: { energy: -24 }, pay: 4200, rep: 3 }), A("adult", "Adult literacy class", 6, { gain: { energy: -8, social: 8 }, rep: 1, stat: "know", statN: 2 }), A("pta", "Join the PTA meeting", 6, { gain: { energy: -6, social: 16 }, rep: 3 }), A("coach", "Coach the school football team", 6, { gain: { energy: -18, fun: 10 }, pay: 2800, rep: 2 })] },
  { id: "public-library", name: "Public Library & Rec Centre", emoji: "\u{1F4DA}", kind: "learn", district: "Sango", pos: [-45, -14.2], size: [4.4, 1.9, 3], color: "#7c4a1e", style: "library", voice: true,
    blurb: "Shelves and reading tables on one side, a small court and fitness corner on the other. Study to raise your education.",
    actions: [A("read", "Read in the reading room", 6, { gain: { energy: -6, fun: 6 }, rep: 2, stat: "know", statN: 1 }), A("research", "Research project (library card)", 8, { cost: 500, gain: { energy: -14, fun: 2 }, rep: 2, stat: "know", statN: 3 }), A("shelving", "Library volunteer shift", 6, { gain: { energy: -16 }, pay: 3000, rep: 2 }), A("fivea", "Join a five-a-side game", 7, { gain: { energy: -18, fun: 28, social: 16, hygiene: -10 }, rep: 1, team: 0.25, stat: "played" }), A("fitness", "Join a community fitness class", 6, { cost: 500, gain: { energy: -10, fun: 14, hygiene: -4 } })] },

  /* ---- Olodo: a busy community on the edge of the city ---- */
  { id: "olodo-market", name: "Olodo Market", emoji: "\u{1F9FA}", kind: "shop", district: "Olodo", pos: [55, 15.8], size: [4.4, 1.3, 3], color: "#d9a05a", style: "market", voice: true,
    blurb: "Olodo's market: foodstuff, provisions and a stall of your own to run for the day.",
    actions: [A("buy", "Buy foodstuff (4 meals)", 4, { cost: 2200, pantry: 4 }), A("trade", "Run a trading stall", 6, { gain: { energy: -25 }, pay: 4000, rep: 1 })] },
  { id: "olodo-motor-park", name: "Olodo Motor Park", emoji: "\u{1F68C}", kind: "transport", district: "Olodo", pos: [45, 25.7], size: [4.2, 0.9, 3.2], color: "#f2b632", style: "terminal", voice: true,
    blurb: "Where the roads meet at Olodo. Buses load, kekes queue and the conductors shout the next stop.",
    actions: [A("hustle", "Conductor hustle", 6, { gain: { energy: -25 }, pay: 3500, rep: 1 }), A("kekepass", "Keke fast pass (5 min)", 2, { cost: 1500, boostMs: 5 * 60 * 1000 })] },
  { id: "olodo-mosque", name: "Olodo Community Mosque", emoji: "\u{1F54C}", kind: "faith", district: "Olodo", pos: [42.9, 16.1], size: [2.4, 2.2, 2.4], color: "#efe6cb", style: "mosque", voice: true,
    blurb: "A community mosque in Olodo. A quiet place to pause between prayers.",
    actions: [A("pray", "Pray", 4, { gain: { energy: 10, fun: 5, social: 5 }, rep: 1 })] },
  { id: "olodo-church", name: "Olodo Community Church", emoji: "\u{26EA}", kind: "faith", district: "Olodo", pos: [46.7, 15.9], size: [2.5, 2.6, 2.8], color: "#d9c3a5", style: "church", voice: true,
    blurb: "A community church in Olodo with a warm choir.",
    actions: [A("service", "Attend service", 6, { gain: { fun: 10, social: 15, energy: 5 }, rep: 2 }), A("choir", "Sing with the choir", 6, { gain: { fun: 22, social: 18, energy: -8 }, rep: 2 })] },
  { id: "health-centre", name: "Olodo Primary Health Centre", emoji: "\u{1FA7A}", kind: "health", district: "Olodo", pos: [55, 26], size: [3.6, 1.5, 2.6], color: "#16a34a", style: "clinic", voice: true,
    blurb: "The community clinic for Olodo: a green cross, a waiting veranda and a water tank on stilts. Check-ups, a clinic bed and health-worker shifts.",
    actions: [A("checkup", "Basic check-up", 5, { cost: 500, gain: { energy: 10, fun: 2 } }), A("clinicbed", "Rest on a clinic bed", 8, { cost: 1000, gain: { energy: 30 } }), A("chw", "Community health worker shift", 7, { gain: { energy: -24 }, pay: 3800, rep: 3 })] },
];
