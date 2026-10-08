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

/**
 * Where the club sound system stands (written by clubMusic.ts). It lives here, a leaf with no heavy imports, so the
 * theme song and the Interior panel can read it without pulling in the room runtime.
 */
type ClubState = {
  /** the player is standing in a club: the theme song keeps out of it for the whole visit */
  inClub: boolean;
  /** the player chose other music (or stopped this): the club stays quiet until their next visit or until they ask for it */
  yielded: boolean;
};

export const useClub = create<ClubState>(() => ({ inClub: false, yielded: false }));
