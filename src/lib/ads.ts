/** Street banner ads. Edit this list to change what the roadside boards show. */
export type Ad = { id: string; title: string; line: string; bg: string; bg2: string; fg: string };

export const AD_CONTACT = "ibadangameplay@gmail.com";

/** The line every empty billboard carries. */
export const AD_SLOGAN = "PUT YOUR ADS HERE";

const slogan = (id: string, bg: string, bg2: string, fg: string): Ad => ({ id, title: AD_SLOGAN, line: `Advertise on Omo'badan: ${AD_CONTACT}`, bg, bg2, fg });

/** The big billboards, ad boxes and banners outside the city and across it. Same invitation, six colour schemes. */
export const SLOGAN_ADS: Ad[] = [
  slogan("slogan-gold", "#111827", "#1f2937", "#fbbf24"),
  slogan("slogan-red", "#991b1b", "#ef4444", "#ffffff"),
  slogan("slogan-yellow", "#facc15", "#fde047", "#111827"),
  slogan("slogan-blue", "#1e3a8a", "#3b82f6", "#ffffff"),
  slogan("slogan-green", "#064e3b", "#10b981", "#fef08a"),
  slogan("slogan-purple", "#4c1d95", "#a855f7", "#ffffff"),
];

export const ADS: Ad[] = [
  { id: "yours", title: "YOUR AD HERE", line: `Advertise on Omo'badan: ${AD_CONTACT}`, bg: "#1f2937", bg2: "#374151", fg: "#fbbf24" },
  { id: "amala", title: "Amala Night", line: "Hot gbegiri and ewedu, every Friday", bg: "#7c2d12", bg2: "#c2410c", fg: "#ffedd5" },
  { id: "suya", title: "Suya Fire", line: "Spicy, smoky, sold by the stick", bg: "#7f1d1d", bg2: "#dc2626", fg: "#fff7ed" },
  { id: "lake", title: "Eleyele Boat Rides", line: "Paddle at sunset. Bring a friend", bg: "#0c4a6e", bg2: "#0ea5e9", fg: "#f0f9ff" },
  { id: "sky", title: "Sky Bar Fridays", line: "Rooftop vibes above Ibadan", bg: "#312e81", bg2: "#7c3aed", fg: "#faf5ff" },
  { id: "learn", title: "Night School", line: "Learn a skill. Earn more", bg: "#064e3b", bg2: "#10b981", fg: "#ecfdf5" },
  { id: "danfo", title: "Danfo Express", line: "Safe rides across the city, all day", bg: "#854d0e", bg2: "#eab308", fg: "#1c1917" },
  { id: "yours2", title: "ADVERTISE HERE", line: `Reach every player: ${AD_CONTACT}`, bg: "#111827", bg2: "#4b5563", fg: "#34d399" },
];
