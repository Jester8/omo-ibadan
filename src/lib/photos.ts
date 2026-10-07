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
