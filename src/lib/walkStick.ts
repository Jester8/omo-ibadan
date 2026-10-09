import { create } from "zustand";

/** Where the on-screen walking stick shows: on touch screens only ("auto"), always, or never. Remembered on this device. */
export type StickMode = "auto" | "on" | "off";
const KEY = "omo-ibadan-stick";

const read = (): StickMode => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "on" || v === "off" ? v : "auto";
  } catch {
    return "auto";
  }
};

const HIDE_KEY = "omo-ibadan-stick-hidden";
const readHidden = () => {
  try {
    return localStorage.getItem(HIDE_KEY) === "1";
  } catch {
    return false;
  }
};

export const useStickMode = create<{ mode: StickMode; set: (m: StickMode) => void; tucked: boolean; tuck: (v: boolean) => void }>((set) => ({
  mode: typeof window === "undefined" ? "auto" : read(),
  /** Tapped away for now: only a tiny dot stays at the edge to bring it back. */
  tucked: typeof window === "undefined" ? false : readHidden(),
  tuck: (tucked) => {
    try {
      localStorage.setItem(HIDE_KEY, tucked ? "1" : "0");
    } catch {
      /* private mode */
    }
    set({ tucked });
  },
  set: (mode) => {
    try {
      localStorage.setItem(KEY, mode);
    } catch {
      /* private mode: it lasts until the tab closes */
    }
    set({ mode });
  },
}));
