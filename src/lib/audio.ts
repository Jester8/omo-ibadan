/**
 * The game's sound engine, reduced to what is still played:
 *  - the Web Audio context the intro (theme) song is routed through, so it can fade in and out (see themeSong.ts)
 *  - the incoming-call ring
 *
 * The generated Afrobeat groove, street ambience, generator noise and all in-game sound effects were removed:
 * the intro song is the only sound the city plays by itself.
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
  private ringBus: GainNode | null = null;
  private ringTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== "undefined") this.settings = load();
  }

  /** Must be called from a user gesture (browsers block audio until then). */
  start() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor();
    this.ringBus = this.ctx.createGain();
    this.ringBus.gain.value = 0.7;
    this.ringBus.connect(this.ctx.destination);
  }

  setSettings(s: Partial<SoundSettings>) {
    this.settings = { ...this.settings, ...s };
    try {
      localStorage.setItem(KEY, JSON.stringify(this.settings));
    } catch {
      /* private mode */
    }
  }

  private blip(freq: number, at: number, dur: number, vol: number) {
    const ctx = this.ctx;
    if (!ctx || !this.ringBus) return;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, at);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(this.ringBus);
    o.start(at);
    o.stop(at + dur + 0.05);
  }

  private ringOnce() {
    if (!this.ctx || this.settings.muted) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      this.blip(880, t + i * 0.22, 0.12, 0.25);
      this.blip(1100, t + i * 0.22, 0.12, 0.18);
    }
  }

  /** Someone is calling: ring until the call is answered or dropped. */
  startRing() {
    this.stopRing();
    this.ringOnce();
    this.ringTimer = setInterval(() => this.ringOnce(), 1800);
  }

  stopRing() {
    if (this.ringTimer) clearInterval(this.ringTimer);
    this.ringTimer = null;
  }
}

export const audio = new Engine();
