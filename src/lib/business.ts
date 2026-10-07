/** Businesses you can build on land you own. They earn money by the minute, like rent, and everyone sees them. */
export type Biz = { id: string; name: string; emoji: string; cost: number; perMin: number; color: string; blurb: string };

export const BUSINESSES: Biz[] = [
  { id: "shop", name: "Corner shop", emoji: "🏪", cost: 25000, perMin: 600, color: "#16a34a", blurb: "Snacks, drinks and airtime for the street." },
  { id: "salon", name: "Barber & salon", emoji: "💈", cost: 45000, perMin: 1100, color: "#7c3aed", blurb: "Fresh cuts, braids and a queue by Friday." },
  { id: "cafe", name: "Cafe", emoji: "☕", cost: 90000, perMin: 2300, color: "#b45309", blurb: "Coffee, pastries and fast wifi." },
  { id: "pharmacy", name: "Pharmacy", emoji: "💊", cost: 150000, perMin: 3800, color: "#0ea5e9", blurb: "A steady stream of customers, day and night." },
  { id: "gym", name: "Gym", emoji: "🏋️", cost: 220000, perMin: 5600, color: "#dc2626", blurb: "Memberships that renew every month." },
  { id: "mart", name: "Supermarket", emoji: "🛒", cost: 300000, perMin: 8000, color: "#f59e0b", blurb: "The biggest earner on the block." },
];

export const bizById = (id: string | undefined) => BUSINESSES.find((b) => b.id === id);
