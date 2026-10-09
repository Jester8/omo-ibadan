/** Cab parks (the cabs themselves are drawn by components/world/CabRanks.tsx). Pure data, so scripts and roof/placement code can import it without React. */
export const RANKS: { id: string; name: string; pos: [number, number] }[] = [
  { id: "ui", name: "UI Cab Park", pos: [-25, -14] },
  { id: "iwo", name: "Iwo Road Cab Park", pos: [25, -6] },
  { id: "dugbe", name: "Dugbe Cab Park", pos: [-2, 5.8] },
];
