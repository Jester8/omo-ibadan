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

export const useStickMode = create<{ mode: StickMode; set: (m: StickMode) => void }>((set) => ({
  mode: typeof window === "undefined" ? "auto" : read(),
  set: (mode) => {
    try {
      localStorage.setItem(KEY, mode);
    } catch {
      /* private mode: it lasts until the tab closes */
    }
    set({ mode });
  },
}));
