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
];

export const eventsAt = (hour: number) => EVENTS.filter((e) => hour >= e.from && hour < e.to);
export const eventFor = (placeId: string | null, hour: number) => (placeId ? eventsAt(hour).find((e) => e.placeId === placeId) : undefined);
export const eventById = (id: string) => EVENTS.find((e) => e.id === id);
