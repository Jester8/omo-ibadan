/** Size and street layout of Ibadan (world units; 1 unit is about 25 m). */
export const WORLD_HALF = 45;
export const ROAD_LINES = [-40, -30, -20, -10, 0, 10, 20, 30, 40];
export const BLOCK_CENTERS = [-35, -25, -15, -5, 5, 15, 25, 35];

const TINTS = ["#dfe6f4", "#f1e6d6", "#e3eed9", "#ebe9de", "#d6eed0", "#f0ead8", "#ece6ef", "#f0e5d3", "#e9e7e1", "#ebe7dc", "#e0eee4", "#f0e8d0", "#d9eed2"];
export const BLOCKS: { c: [number, number]; tint: string }[] = BLOCK_CENTERS.flatMap((cz, j) =>
  BLOCK_CENTERS.map((cx, i) => ({ c: [cx, cz] as [number, number], tint: TINTS[(i * 5 + j * 3) % TINTS.length] })),
);
