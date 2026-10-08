import { create } from "zustand";

/** A photo someone sent during a call. It lives only in memory: once opened, or after it expires, it is gone. */
export type IncomingPhoto = { id: string; name: string; data: string; at: number };

type PhotoState = {
  inbox: IncomingPhoto[];
  /** the one being looked at right now */
  viewing: IncomingPhoto | null;
  add: (p: IncomingPhoto) => void;
  open: (id: string) => void;
  close: () => void;
};

const MAX_INBOX = 6;
/** seconds a photo stays up once opened */
export const VIEW_SECS = 10;

export const usePhotos = create<PhotoState>((set) => ({
  inbox: [],
  viewing: null,
  add: (p) => set((s) => ({ inbox: [...s.inbox, p].slice(-MAX_INBOX) })),
  // opening takes it out of the inbox for good: view once
  open: (id) =>
    set((s) => {
      const p = s.inbox.find((x) => x.id === id);
      return p ? { inbox: s.inbox.filter((x) => x.id !== id), viewing: p } : s;
    }),
  close: () => set({ viewing: null }),
}));

/** How many bytes a JPEG data URL really holds. */
const dataBytes = (url: string) => {
  const b64 = url.slice(url.indexOf(",") + 1);
  return Math.floor((b64.length * 3) / 4) - (b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0);
};

/**
 * Shrink a picked image to a JPEG of no more than `maxBytes` (10 KB for the chat). It tries a large picture at lower and
 * lower quality first, then a smaller picture, and gives up (null) only if even a tiny one will not fit.
 */
export async function compressToBytes(file: File, maxBytes = 10_000): Promise<string | null> {
  try {
    const bmp = await createImageBitmap(file);
    try {
      for (const side of [360, 300, 250, 210, 170, 140, 110, 90]) {
        const k = Math.min(1, side / Math.max(bmp.width, bmp.height));
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(bmp.width * k));
        c.height = Math.max(1, Math.round(bmp.height * k));
        const g = c.getContext("2d")!;
        g.fillStyle = "#ffffff"; // a transparent picture would turn black as a JPEG
        g.fillRect(0, 0, c.width, c.height);
        g.drawImage(bmp, 0, 0, c.width, c.height);
        for (const q of [0.72, 0.58, 0.45, 0.33, 0.22]) {
          const data = c.toDataURL("image/jpeg", q);
          if (dataBytes(data) <= maxBytes) return data;
        }
      }
      return null;
    } finally {
      bmp.close();
    }
  } catch {
    return null;
  }
}

/** Shrink a picked image to a small JPEG, so it travels fast and never weighs much. */
export async function compressImage(file: File, maxSide = 1024, quality = 0.72): Promise<string | null> {
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    bmp.close();
    const data = c.toDataURL("image/jpeg", quality);
    return data.length < 420_000 ? data : null;
  } catch {
    return null;
  }
}
