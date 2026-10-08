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

/* ---------------------------------- lit signs ---------------------------------- */
/* The text of a neon sign or shop board is drawn once per label, colour and shape, then shared. Client only. */

const signCache = new Map<string, THREE.CanvasTexture>();
const SIGN_FONT = '"Arial Rounded MT Bold", "Trebuchet MS", "Segoe UI", Arial, sans-serif';

const mix = (hex: string, to: string, t: number) => new THREE.Color(hex).lerp(new THREE.Color(to), t).getStyle();

type Line = { text: string; start: number };

/** One line, or two when a long name has a space near its middle. `start` is where the line begins in the label. */
function splitLabel(label: string): Line[] {
  const mid = label.length / 2;
  let cut = -1;
  if (label.length > 11) for (let i = 0; i < label.length; i++) if (label[i] === " " && (cut < 0 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i;
  if (cut <= 0) return [{ text: label, start: 0 }];
  return [{ text: label.slice(0, cut), start: 0 }, { text: label.slice(cut + 1), start: cut + 1 }];
}

/** Which letter of a neon sign flickers (-1 when the name is too short to spare one). Stable per label. */
export function flickerLetter(label: string): number {
  const letters: number[] = [];
  for (let i = 0; i < label.length; i++) if (label[i] !== " ") letters.push(i);
  if (letters.length < 3) return -1;
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  return letters[1 + (h % (letters.length - 1))];
}

/** Font size that fits the label inside `limit` pixels across and `rows` lines high. */
function fitText(g: CanvasRenderingContext2D, lines: Line[], limit: number, maxSize: number): number {
  g.font = `800 100px ${SIGN_FONT}`;
  let widest = 1;
  for (const l of lines) widest = Math.max(widest, g.measureText(l.text).width);
  return Math.min(maxSize, (100 * limit) / widest);
}

function roundedRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function drawNeon(g: CanvasRenderingContext2D, cw: number, ch: number, label: string, color: string, layer: number) {
  const lines = splitLabel(label);
  const fs = fitText(g, lines, cw * 0.8, ch * (lines.length > 1 ? 0.3 : 0.46));
  const flick = flickerLetter(label);
  const core = mix(color, "#ffffff", 0.72);
  const passes: [number, number, string][] = [
    [fs * 0.2, fs * 0.5, color],
    [fs * 0.1, 0, color],
    [fs * 0.04, 0, core],
  ];
  g.clearRect(0, 0, cw, ch);
  g.lineJoin = "round";
  g.textBaseline = "middle";
  g.textAlign = "left";
  g.font = `800 ${fs}px ${SIGN_FONT}`;
  const lineH = fs * 1.2;
  for (const [lw, blur, style] of passes) {
    g.shadowColor = color;
    g.shadowBlur = blur;
    g.strokeStyle = style;
    g.lineWidth = lw;
    lines.forEach((l, row) => {
      const y = ch / 2 + (row - (lines.length - 1) / 2) * lineH;
      const x0 = (cw - g.measureText(l.text).width) / 2;
      for (let k = 0; k < l.text.length; k++) {
        if ((l.start + k === flick) !== (layer === 1)) continue;
        g.strokeText(l.text[k], x0 + g.measureText(l.text.slice(0, k)).width, y);
      }
    });
    // the tube frame round the edge, on the steady layer only
    if (layer === 0) {
      roundedRect(g, ch * 0.07, ch * 0.07, cw - ch * 0.14, ch * 0.86, ch * 0.16);
      g.stroke();
    }
  }
  g.shadowBlur = 0;
}

function drawBoard(g: CanvasRenderingContext2D, cw: number, ch: number, label: string, color: string) {
  const grad = g.createLinearGradient(0, 0, 0, ch);
  grad.addColorStop(0, mix(color, "#ffffff", 0.16));
  grad.addColorStop(1, mix(color, "#000000", 0.25));
  g.fillStyle = grad;
  g.fillRect(0, 0, cw, ch);
  // keyline and an adire-style row of dots at both ends
  g.strokeStyle = "rgba(255,255,255,0.5)";
  g.lineWidth = ch * 0.025;
  g.strokeRect(ch * 0.07, ch * 0.07, cw - ch * 0.14, ch * 0.86);
  g.fillStyle = "rgba(255,255,255,0.65)";
  for (const side of [0, 1]) for (let k = 0; k < 3; k++) {
    g.beginPath();
    g.arc(side ? cw - ch * 0.2 : ch * 0.2, ch * (0.3 + k * 0.2), ch * 0.028, 0, Math.PI * 2);
    g.fill();
  }
  const lines = splitLabel(label);
  const fs = fitText(g, lines, cw * 0.74, ch * (lines.length > 1 ? 0.3 : 0.44));
  g.font = `800 ${fs}px ${SIGN_FONT}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#ffffff";
  g.shadowColor = "rgba(0,0,0,0.5)";
  g.shadowBlur = fs * 0.08;
  g.shadowOffsetY = fs * 0.05;
  lines.forEach((l, row) => g.fillText(l.text, cw / 2, ch / 2 + (row - (lines.length - 1) / 2) * fs * 1.2));
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
}

/**
 * The picture on a lit sign. "neon" is glowing outline lettering on a clear ground (layer 1 holds only the flickering letter),
 * "board" is white lettering on a coloured board. `aspect` is the sign's width over its height. Null on the server.
 */
export function signTexture(kind: "neon" | "board", label: string, color: string, aspect: number, layer = 0): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const a = Math.round(Math.max(1.2, Math.min(6, aspect)) * 20) / 20;
  const key = `sign|${kind}|${layer}|${a}|${color}|${label}`;
  const hit = signCache.get(key);
  if (hit) return hit;
  const cw = 768;
  const ch = Math.round(cw / a);
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const g = c.getContext("2d")!;
  if (kind === "neon") drawNeon(g, cw, ch, label, color, layer);
  else drawBoard(g, cw, ch, label, color);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  signCache.set(key, t);
  return t;
}
