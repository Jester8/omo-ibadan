import * as THREE from "three";
import type { Ad } from "@/lib/ads";

/**
 * Draws one ad onto a canvas texture. Used by the billboards outside the city and by the mats of the Ad Plaza.
 * `tag` marks a numbered ad space ("AD SPACE 03") and gives the picture a stitched mat edge.
 */
export function drawAd(ad: Ad, w: number, h: number, tag?: string, right?: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, ad.bg);
  grad.addColorStop(1, ad.bg2);
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
  // diagonal stripes so a far-off board still reads as a poster, not a flat colour
  g.fillStyle = "rgba(255,255,255,0.07)";
  const step = Math.max(36, w / 14);
  const bar = Math.max(14, w / 40);
  for (let x = -h; x < w + h; x += step) {
    g.beginPath();
    g.moveTo(x, h);
    g.lineTo(x + h * 0.5, 0);
    g.lineTo(x + h * 0.5 + bar, 0);
    g.lineTo(x + bar, h);
    g.closePath();
    g.fill();
  }
  const edge = Math.max(4, Math.min(w, h) * 0.025);
  g.lineWidth = edge;
  g.strokeStyle = ad.fg;
  g.globalAlpha = 0.85;
  g.strokeRect(edge * 1.5, edge * 1.5, w - edge * 3, h - edge * 3);
  if (tag) {
    // a mat has a stitched seam just inside its edge
    g.lineWidth = Math.max(2, edge * 0.45);
    g.setLineDash([edge * 2.2, edge * 1.6]);
    g.strokeRect(edge * 3.4, edge * 3.4, w - edge * 6.8, h - edge * 6.8);
    g.setLineDash([]);
  }
  g.globalAlpha = 1;

  g.textAlign = "center";
  g.textBaseline = "middle";
  const font = (px: number, weight = 900) => `${weight} ${px}px "Arial Black", system-ui, sans-serif`;
  const fit = (text: string, start: number, max: number, min: number, weight = 900) => {
    let px = start;
    g.font = font(px, weight);
    while (g.measureText(text).width > max && px > min) {
      px -= 2;
      g.font = font(px, weight);
    }
    return px;
  };
  const stamp = (text: string, x: number, y: number, px: number) => {
    g.lineJoin = "round";
    g.lineWidth = Math.max(3, px * 0.09);
    g.strokeStyle = "rgba(0,0,0,0.32)";
    g.strokeText(text, x, y);
    g.fillStyle = ad.fg;
    g.fillText(text, x, y);
  };

  const title = ad.title.toUpperCase();
  const px = fit(title, h * 0.34, w * 0.9, 18);
  stamp(title, w / 2, h * 0.47, px);
  fit(ad.line, h * 0.085, w * 0.86, 10, 700);
  g.globalAlpha = 0.95;
  g.fillStyle = ad.fg;
  g.fillText(ad.line, w / 2, h * 0.78);
  g.globalAlpha = 1;
  // the corner labels use the ad's own text colour, so they stay readable on a pale mat too, and sit inside the stitching
  g.font = font(Math.max(11, h * 0.062), 800);
  g.fillStyle = ad.fg;
  g.globalAlpha = 0.8;
  g.textAlign = "left";
  g.fillText(tag ?? "AD SPACE", w * 0.075, h * 0.18);
  g.textAlign = "right";
  g.fillText(right ?? (ad.id.startsWith("slogan") ? "AVAILABLE NOW" : "NOW SHOWING"), w * 0.925, h * 0.18);
  g.globalAlpha = 1;

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
