/** Daily city events, keyed to the shared game clock so everyone sees the same ones. */
export type CityEvent = {
  id: string;
  placeId: string;
  title: string;
  emoji: string;
  blurb: string;
  from: number; // game hour
  to: number;
  payMul?: number;
  gainMul?: number;
};

export const EVENTS: CityEvent[] = [
  { id: "market-rush", placeId: "bodija-market", title: "Market rush", emoji: "🛒", blurb: "Buyers everywhere. Jobs here pay 40% more.", from: 7, to: 11, payMul: 1.4 },
  { id: "lecture-fair", placeId: "ui", title: "Career fair", emoji: "🎓", blurb: "Companies are hiring on campus. Jobs pay 30% more.", from: 10, to: 14, payMul: 1.3 },
  { id: "match-day", placeId: "stadium", title: "Match day", emoji: "⚽", blurb: "Shooting Stars at home. Everything here is 50% more fun.", from: 15, to: 19, gainMul: 1.5 },
  { id: "owambe", placeId: "cocoa-house", title: "Owambe party", emoji: "🥁", blurb: "Aso ebi, jollof and live band. Social gains +60%.", from: 19, to: 23, gainMul: 1.6 },
  { id: "jumat", placeId: "mosque", title: "Jumu'ah gathering", emoji: "🕌", blurb: "A full congregation. Blessings come easier: +60% gains.", from: 12, to: 14, gainMul: 1.6 },
  { id: "sunday-grace", placeId: "grace", title: "Sunday service", emoji: "🎶", blurb: "A packed hall and a powerful choir. +50% gains.", from: 8, to: 12, gainMul: 1.5 },
  { id: "vigil", placeId: "aladura", title: "Night vigil", emoji: "🕯️", blurb: "White-robed worshippers pray till late. +60% gains.", from: 21, to: 24, gainMul: 1.6 },
];

export const eventsAt = (hour: number) => EVENTS.filter((e) => hour >= e.from && hour < e.to);
export const eventFor = (placeId: string | null, hour: number) => (placeId ? eventsAt(hour).find((e) => e.placeId === placeId) : undefined);
export const eventById = (id: string) => EVENTS.find((e) => e.id === id);

/** Opening hours (game hours). Places not listed are open all day and night. */
const HOURS: Record<string, [number, number]> = {
  "bodija-market": [6, 20],
  dugbe: [6, 20],
  ui: [7, 21],
  "mapo-hall": [8, 18],
  "cocoa-house": [8, 18],
  secretariat: [8, 17],
  trustbank: [8, 16],
  cathay: [7, 22],
  zoo: [8, 18],
  amusement: [10, 23],
  ventura: [9, 22],
  stadium: [9, 23],
  cultural: [9, 20],
  golf: [6, 19],
  agodi: [6, 20],
  bowers: [8, 19],
  "ring-road": [5, 23],
  "govt-house": [8, 17],
  "amala-skye": [7, 22],
  item7: [8, 23],
  mrbiggs: [7, 22],
  chickenrepublic: [8, 23],
  sweetsensation: [7, 22],
  kilimanjaro: [8, 22],
  cathedral: [6, 21],
  grace: [6, 22],
  methodist: [6, 20],
  "ui-library": [8, 22],
  "ui-science": [8, 18],
  "ui-arts": [9, 19],
  "ui-law": [8, 18],
  "ui-trenchard": [9, 21],
  adeoyo: [0, 24],
  "sango-market": [6, 19],
  "iwo-road": [5, 23],
  "mokola-mall": [9, 22],
  poly: [8, 18],
  palace: [9, 17],
  eleyele: [6, 19],
  "challenge-eatery": [8, 23],
  "akobo-chapel": [6, 21],
  "central-bank": [8, 16],
  airport: [5, 23],
  // nightlife runs past midnight (an end above 24 means "into the next morning")
  "club-afrobeat": [20, 28],
  "club-rooftop": [18, 27],
  "club-owambe": [14, 26],
  palmwine: [16, 26],
  "suya-lounge": [17, 27],
};

export const isOpen = (placeId: string, hour: number) => {
  const h = HOURS[placeId];
  if (!h) return true;
  return h[1] > 24 ? hour >= h[0] || hour < h[1] - 24 : hour >= h[0] && hour < h[1];
};

const fmt = (n: number) => {
  const h = n % 24;
  return `${h % 12 === 0 ? 12 : h % 12}${h >= 12 ? "pm" : "am"}`;
};
export const opensAt = (placeId: string) => (HOURS[placeId] ? fmt(HOURS[placeId][0]) : "");
export const closesAt = (placeId: string) => (HOURS[placeId] ? fmt(HOURS[placeId][1]) : "");
