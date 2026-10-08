/** Businesses you can build on land you own. They earn money by the minute, like rent, and everyone sees them. */
export type Biz = { id: string; name: string; emoji: string; cost: number; perMin: number; color: string; blurb: string; /** what a customer buys, and the usual price */ item: string; price: number; /** what to tap inside, shown in the room panel */ tip: string };

export const BUSINESSES: Biz[] = [
  { id: "shop", name: "Corner shop", emoji: "🏪", cost: 25000, perMin: 600, color: "#16a34a", blurb: "Snacks, drinks and airtime for the street.", item: "snacks and a cold drink", price: 800, tip: "Browse the shelves and fridges, then pay at the counter below." },
  { id: "salon", name: "Barber & salon", emoji: "💈", cost: 45000, perMin: 1100, color: "#7c3aed", blurb: "Fresh cuts, braids and a queue by Friday.", item: "a fresh cut", price: 2500, tip: "Take a seat in the waiting area, then pay below for your cut." },
  { id: "cafe", name: "Cafe", emoji: "☕", cost: 90000, perMin: 2300, color: "#b45309", blurb: "Coffee, pastries and fast wifi.", item: "coffee and a pastry", price: 1500, tip: "Grab a table, then order from the counter below." },
  { id: "pharmacy", name: "Pharmacy", emoji: "💊", cost: 150000, perMin: 3800, color: "#0ea5e9", blurb: "A steady stream of customers, day and night.", item: "vitamins", price: 1200, tip: "Browse the shelves, then buy at the counter below." },
  { id: "gym", name: "Gym", emoji: "🏋️", cost: 220000, perMin: 5600, color: "#dc2626", blurb: "Memberships that renew every month.", item: "a day-pass workout", price: 2000, tip: "Tap the treadmills, bench, weights, punching bag or bikes to train." },
  { id: "mart", name: "Supermarket", emoji: "🛒", cost: 300000, perMin: 8000, color: "#f59e0b", blurb: "The biggest earner on the block.", item: "a big shop", price: 3500, tip: "Walk the aisles, then pay at the till below." },
];

export const bizById = (id: string | undefined) => BUSINESSES.find((b) => b.id === id);
