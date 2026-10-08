import { create } from "zustand";
import { audio, type SoundSettings } from "./audio";

type SoundState = SoundSettings & { set: (s: Partial<SoundSettings>) => void; sync: () => void };

/** UI-facing mirror of the audio engine's settings. */
export const useSound = create<SoundState>((set) => ({
  music: 0.5,
  muted: false,
  theme: true,
  set: (s) => {
    audio.setSettings(s);
    set(s);
  },
  sync: () => set({ ...audio.settings }),
}));
