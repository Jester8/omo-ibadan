/**
 * The game's sound engine, reduced to what is still played:
 *  - the Web Audio context the intro (theme) song is routed through, so it can fade in and out (see themeSong.ts)
 *  - the same context carries the clubs' house mix (clubGroove.ts), the fallback when no artist tracks are available
 *
 * The generated street ambience, generator noise, the incoming-call ring and all other sound effects were removed: the intro
 * song and the music in clubs (artists' tracks first, the house mix otherwise) are all the city plays by itself.
 */

export type SoundSettings = {
  /** intro song volume, 0 to 1 */
  music: number;
  muted: boolean;
  /** the intro (theme) song on the landing page and in the city */
  theme: boolean;
};

const KEY = "omo-ibadan-audio";
const DEFAULTS: SoundSettings = { music: 0.5, muted: false, theme: true };

/** Only the settings that still exist are read back, so old saved values (such as the effects level) are ignored. */
const load = (): SoundSettings => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return {
      music: typeof saved.music === "number" ? saved.music : DEFAULTS.music,
      muted: typeof saved.muted === "boolean" ? saved.muted : DEFAULTS.muted,
      theme: typeof saved.theme === "boolean" ? saved.theme : DEFAULTS.theme,
    };
  } catch {
    return { ...DEFAULTS };
  }
};

class Engine {
  ctx: AudioContext | null = null;
  settings: SoundSettings = { ...DEFAULTS };

  constructor() {
    if (typeof window !== "undefined") this.settings = load();
  }

  /** Must be called from a user gesture (browsers block audio until then). */
  start() {
    if (this.ctx) {
      // also wakes a context a phone call or the lock screen interrupted (iOS), and never throws
      if (this.ctx.state !== "running" && this.ctx.state !== "closed") this.ctx.resume().catch(() => {});
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor();
  }

  setSettings(s: Partial<SoundSettings>) {
    this.settings = { ...this.settings, ...s };
    try {
      localStorage.setItem(KEY, JSON.stringify(this.settings));
    } catch {
      /* private mode */
    }
  }
}

export const audio = new Engine();
