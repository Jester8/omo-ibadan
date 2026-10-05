import * as THREE from "three";
import type { FloorKind } from "@/lib/interiors";

const cache = new Map<string, THREE.CanvasTexture>();

function canvas(key: string, size: number, draw: (g: CanvasRenderingContext2D, s: number) => void): THREE.CanvasTexture {
  const hit = cache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  draw(c.getContext("2d")!, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  cache.set(key, t);
  return t;
}

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const shade = (hex: string, amt: number) => new THREE.Color(hex).multiplyScalar(amt).getStyle();

/** One tile of floor texture covers 2 m x 2 m. */
function floorTexture(kind: FloorKind, color: string): THREE.CanvasTexture {
  return canvas(`floor|${kind}|${color}`, 256, (g, s) => {
    seed = 11;
    g.fillStyle = color;
    g.fillRect(0, 0, s, s);
    switch (kind) {
      case "tile": {
        const n = 4;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            g.fillStyle = shade(color, 0.97 + rnd() * 0.06);
            g.fillRect((i * s) / n + 2, (j * s) / n + 2, s / n - 4, s / n - 4);
          }
        }
        break;
      }
      case "wood": {
        const planks = 8;
        for (let j = 0; j < planks; j++) {
          g.fillStyle = shade(color, 0.88 + rnd() * 0.22);
          g.fillRect(0, (j * s) / planks, s, s / planks - 1.5);
          g.fillStyle = "rgba(0,0,0,0.08)";
          for (let k = 0; k < 3; k++) g.fillRect(rnd() * s, (j * s) / planks + rnd() * (s / planks), 30 + rnd() * 60, 1);
          g.fillStyle = "rgba(0,0,0,0.25)";
          g.fillRect(rnd() * s, (j * s) / planks, 1.5, s / planks);
        }
        break;
      }
      case "redoxide": {
        for (let k = 0; k < 900; k++) {
          g.fillStyle = `rgba(${rnd() > 0.5 ? "255,255,255" : "0,0,0"},${0.02 + rnd() * 0.04})`;
          g.fillRect(rnd() * s, rnd() * s, 2 + rnd() * 5, 2 + rnd() * 5);
        }
        g.strokeStyle = "rgba(0,0,0,0.12)";
        g.lineWidth = 1.5;
        g.strokeRect(0, 0, s, s);
        break;
      }
      case "concrete": {
        for (let k = 0; k < 1400; k++) {
          g.fillStyle = `rgba(${rnd() > 0.5 ? "255,255,255" : "0,0,0"},${0.03 + rnd() * 0.05})`;
          g.fillRect(rnd() * s, rnd() * s, 1 + rnd() * 3, 1 + rnd() * 3);
        }
        g.strokeStyle = "rgba(0,0,0,0.1)";
        g.strokeRect(0, 0, s, s);
        break;
      }
      case "carpet": {
        for (let k = 0; k < 2500; k++) {
          g.fillStyle = `rgba(${rnd() > 0.5 ? "255,255,255" : "0,0,0"},${0.05 + rnd() * 0.07})`;
          g.fillRect(rnd() * s, rnd() * s, 1, 3);
        }
        break;
      }
      case "marble": {
        g.fillStyle = shade(color, 1.02);
        g.fillRect(0, 0, s, s);
        g.strokeStyle = "rgba(120,120,130,0.18)";
        for (let k = 0; k < 7; k++) {
          g.lineWidth = 1 + rnd() * 1.5;
          g.beginPath();
          g.moveTo(rnd() * s, 0);
          g.bezierCurveTo(rnd() * s, s * 0.3, rnd() * s, s * 0.6, rnd() * s, s);
          g.stroke();
        }
        g.strokeStyle = "rgba(0,0,0,0.12)";
        g.lineWidth = 2;
        g.strokeRect(0, 0, s, s);
        g.beginPath();
        g.moveTo(s / 2, 0);
        g.lineTo(s / 2, s);
        g.moveTo(0, s / 2);
        g.lineTo(s, s / 2);
        g.stroke();
        break;
      }
      case "grass": {
        for (let k = 0; k < 1800; k++) {
          g.fillStyle = `rgba(${rnd() > 0.5 ? "40,110,50" : "130,200,110"},${0.1 + rnd() * 0.12})`;
          g.fillRect(rnd() * s, rnd() * s, 1.5, 4 + rnd() * 4);
        }
        break;
      }
    }
  });
}

export const FLOOR_COLORS: Record<FloorKind, string> = {
  tile: "#e6e0d0",
  wood: "#9a6a42",
  concrete: "#b9b6ae",
  redoxide: "#a8483a",
  carpet: "#7a6a5a",
  marble: "#f1eee8",
  grass: "#7cc46a",
};

export function floorMaterial(kind: FloorKind, w: number, d: number, color?: string): THREE.MeshStandardMaterial {
  const base = floorTexture(kind, color ?? FLOOR_COLORS[kind]).clone();
  base.repeat.set(w / 2, d / 2);
  base.needsUpdate = true;
  const glossy = kind === "marble" || kind === "redoxide" || kind === "tile";
  return new THREE.MeshStandardMaterial({ map: base, roughness: glossy ? 0.45 : 0.9, metalness: kind === "marble" ? 0.08 : 0 });
}

/** Adire: Yoruba indigo resist-dye cloth. White circles, rings and dashes on a deep ground. */
export function adireTexture(ground: string): THREE.CanvasTexture {
  return canvas(`adire|${ground}`, 256, (g, s) => {
    seed = 3;
    g.fillStyle = ground;
    g.fillRect(0, 0, s, s);
    const cell = 64;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const x = i * cell + cell / 2;
        const y = j * cell + cell / 2;
        g.strokeStyle = "rgba(245,240,225,0.9)";
        g.lineWidth = 3;
        for (const r of [24, 16, 8]) {
          g.beginPath();
          g.arc(x, y, r, 0, Math.PI * 2);
          g.stroke();
        }
        g.fillStyle = "rgba(245,240,225,0.9)";
        g.beginPath();
        g.arc(x, y, 3, 0, Math.PI * 2);
        g.fill();
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2;
          g.fillRect(x + Math.cos(a) * 29 - 1.5, y + Math.sin(a) * 29 - 1.5, 3, 3);
        }
      }
    }
    g.strokeStyle = "rgba(245,240,225,0.35)";
    g.lineWidth = 2;
    g.strokeRect(2, 2, s - 4, s - 4);
  });
}

/** Louvre window: sky-blue panes behind wooden slats. */
export function louvreTexture(): THREE.CanvasTexture {
  return canvas("louvre", 128, (g, s) => {
    g.fillStyle = "#cfe6f2";
    g.fillRect(0, 0, s, s);
    const slats = 8;
    for (let k = 0; k < slats; k++) {
      const y = (k * s) / slats;
      g.fillStyle = "rgba(255,255,255,0.6)";
      g.fillRect(4, y + 2, s - 8, s / slats - 4);
      g.fillStyle = "rgba(60,90,110,0.25)";
      g.fillRect(4, y + s / slats - 4, s - 8, 2);
    }
  });
}
