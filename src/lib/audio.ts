/**
 * Procedural Nigerian soundscape (Web Audio, no sample files, so no licensing worries):
 *  - an Afrobeat / highlife groove: kick, log-drum bass, shekere, congas, guitar, talking-drum fills
 *  - street ambience: traffic, danfo horns, keke engines, morning birds, night crickets
 *  - NEPA: neighbours' generators roar when the light goes
 *  - UI and game sound effects
 */

export type SoundSettings = { music: number; sfx: number; muted: boolean };

const KEY = "omo-ibadan-audio";
const load = (): SoundSettings => {
  try {
    return { music: 0.5, sfx: 0.7, muted: false, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return { music: 0.5, sfx: 0.7, muted: false };
  }
};

export type SoundContext = {
  indoors: boolean;
  night: number; // 0 day .. 1 night
  nepa: boolean;
  /** place id when inside a building, so we can tune the mood */
  place: string | null;
};

const NOTE = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// A minor pentatonic-ish progression typical of highlife: Am - F - C - G
const CHORDS: number[][] = [
  [57, 60, 64],
  [53, 57, 60],
  [60, 64, 67],
  [55, 59, 62],
];
const BASS = [33, 29, 36, 31];

class Engine {
  ctx: AudioContext | null = null;
  settings: SoundSettings = { music: 0.5, sfx: 0.7, muted: false };
  private master!: GainNode;
  private musicBus!: GainNode;
  private musicFilter!: BiquadFilterNode;
  private sfxBus!: GainNode;
  private ambBus!: GainNode;
  private noise!: AudioBuffer;
  private ctxState: SoundContext = { indoors: false, night: 0, nepa: false, place: null };
  private timer: ReturnType<typeof setInterval> | null = null;
  private step = 0;
  private nextTime = 0;
  private bar = 0;
  private trafficGain!: GainNode;
  private genGain!: GainNode;
  private cricketGain!: GainNode;
  private crowdGain!: GainNode;
  private chatterGain!: GainNode;
  private nextAmbient = 0;
  private ringTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== "undefined") this.settings = load();
  }

  get ready() {
    return !!this.ctx;
  }

  /** Must be called from a user gesture (browsers block audio until then). */
  start() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.connect(ctx.destination);
    this.musicFilter = ctx.createBiquadFilter();
    this.musicFilter.type = "lowpass";
    this.musicFilter.frequency.value = 16000;
    this.musicBus = ctx.createGain();
    this.musicBus.connect(this.musicFilter).connect(this.master);
    this.sfxBus = ctx.createGain();
    this.sfxBus.connect(this.master);
    this.ambBus = ctx.createGain();
    this.ambBus.connect(this.master);

    // one second of white noise, reused everywhere
    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    this.buildAmbience();
    this.applySettings();
    this.apply(true);
    this.nextTime = ctx.currentTime + 0.1;
    this.timer = setInterval(() => this.schedule(), 40);
  }

  setSettings(s: Partial<SoundSettings>) {
    this.settings = { ...this.settings, ...s };
    try {
      localStorage.setItem(KEY, JSON.stringify(this.settings));
    } catch {
      /* private mode */
    }
    this.applySettings();
    this.apply();
  }

  setContext(c: SoundContext) {
    this.ctxState = c;
    this.apply();
  }

  private applySettings() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.settings.muted ? 0 : 1, t, 0.05);
    this.sfxBus.gain.setTargetAtTime(this.settings.sfx, t, 0.05);
  }

  /** Smoothly retune music and ambience for where the player is. */
  private apply(instant = false) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const k = instant ? 0.001 : 0.6;
    const c = this.ctxState;
    const sacred = c.place === "mosque" || c.place === "cathedral";
    const hush = sacred || c.place === "uch";
    const musicLevel = hush ? 0 : (c.indoors ? 0.35 : 0.55) * (1 - c.night * 0.35);
    this.musicBus.gain.setTargetAtTime(musicLevel * this.settings.music * 1.6, t, k);
    this.musicFilter.frequency.setTargetAtTime(c.indoors ? 900 : 16000, t, k);

    const out = c.indoors ? 0.18 : 1;
    this.ambBus.gain.setTargetAtTime(0.9 * Math.max(0.05, this.settings.sfx + 0.2), t, k);
    this.trafficGain.gain.setTargetAtTime(0.05 * out * (1 - c.night * 0.5), t, k);
    this.genGain.gain.setTargetAtTime(c.nepa ? (c.indoors ? 0.05 : 0.11) : 0, t, k);
    this.cricketGain.gain.setTargetAtTime(c.night * 0.016 * (c.indoors ? 0.25 : 1), t, k);
    this.crowdGain.gain.setTargetAtTime(c.place === "stadium" ? 0.09 : 0, t, k);
    const market = c.place === "bodija-market" || c.place === "dugbe" || c.place === "amala-skye" || c.place === "ventura";
    this.chatterGain.gain.setTargetAtTime(market ? 0.07 : c.indoors ? 0.012 : 0.02, t, k);
  }

  /* --------------------------------- ambience --------------------------------- */

  private loopNoise(type: BiquadFilterType, freq: number, q = 0.7) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = 0;
    src.connect(f).connect(g).connect(this.ambBus);
    src.start();
    return { g, f };
  }

  private buildAmbience() {
    const ctx = this.ctx!;
    this.trafficGain = this.loopNoise("lowpass", 380).g;
    // a generator: low square drone + rough noise
    const gen = this.loopNoise("bandpass", 140, 1.2);
    this.genGain = gen.g;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 47;
    const og = ctx.createGain();
    og.gain.value = 0.35;
    osc.connect(og).connect(gen.g);
    osc.start();
    // crickets: amplitude-modulated high tone
    const cr = ctx.createOscillator();
    cr.frequency.value = 4300;
    const crg = ctx.createGain();
    crg.gain.value = 0;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 22;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.5;
    const am = ctx.createGain();
    am.gain.value = 0.5;
    lfo.connect(lfoGain).connect(am.gain);
    cr.connect(am).connect(crg).connect(this.ambBus);
    cr.start();
    lfo.start();
    this.cricketGain = crg;
    // crowd: broadband noise that swells
    const crowd = this.loopNoise("bandpass", 700, 0.5);
    this.crowdGain = crowd.g;
    const swell = ctx.createOscillator();
    swell.frequency.value = 0.18;
    const swellG = ctx.createGain();
    swellG.gain.value = 250;
    swell.connect(swellG).connect(crowd.f.frequency);
    swell.start();
    // market / street chatter: murmuring band of noise
    const chat = this.loopNoise("bandpass", 1100, 1.4);
    this.chatterGain = chat.g;
    const mur = ctx.createOscillator();
    mur.frequency.value = 3.1;
    const murG = ctx.createGain();
    murG.gain.value = 400;
    mur.connect(murG).connect(chat.f.frequency);
    mur.start();
  }

  private blip(freq: number, at: number, dur: number, type: OscillatorType, vol: number, bus: GainNode, glideTo?: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, at);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, at + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(bus);
    o.start(at);
    o.stop(at + dur + 0.05);
  }

  private burst(at: number, dur: number, freq: number, q: number, vol: number, bus: GainNode) {
    const ctx = this.ctx!;
    const s = ctx.createBufferSource();
    s.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    s.connect(f).connect(g).connect(bus);
    s.start(at, Math.random() * 1.5);
    s.stop(at + dur + 0.02);
  }

  /** Random street life: danfo horns, keke engines, birds. */
  private ambientEvents(now: number) {
    if (now < this.nextAmbient || this.ctxState.indoors) return;
    this.nextAmbient = now + 5 + Math.random() * 11;
    const bus = this.ambBus;
    const r = Math.random();
    const day = 1 - this.ctxState.night;
    if (r < 0.35) {
      // danfo: two-tone honk
      this.blip(415, now, 0.18, "square", 0.05, bus);
      this.blip(520, now + 0.22, 0.28, "square", 0.05, bus);
    } else if (r < 0.65) {
      // keke putter, passing by
      for (let i = 0; i < 14; i++) this.blip(72 + Math.random() * 6, now + i * 0.085, 0.07, "sawtooth", 0.04 * (1 - i / 18), bus);
    } else if (day > 0.4) {
      // morning/day birds
      const base = 2200 + Math.random() * 900;
      for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) this.blip(base + i * 140, now + i * 0.11, 0.09, "sine", 0.03, bus, base + 600);
    } else {
      // distant dog or a neighbour's radio click
      this.blip(260, now, 0.22, "triangle", 0.025, bus, 180);
    }
  }

  /* ---------------------------------- groove ---------------------------------- */

  private schedule() {
    const ctx = this.ctx;
    if (!ctx) return;
    this.ambientEvents(ctx.currentTime);
    const bpm = 98 - this.ctxState.night * 8;
    const stepLen = 60 / bpm / 4;
    while (this.nextTime < ctx.currentTime + 0.25) {
      this.playStep(this.step, this.nextTime, stepLen);
      this.nextTime += stepLen;
      this.step++;
      if (this.step % 16 === 0) this.bar++;
    }
  }

  private playStep(step: number, t: number, len: number) {
    const bus = this.musicBus;
    const s = step % 16;
    const chordIdx = Math.floor(this.bar / 2) % 4;
    // swing the off-beats a little
    const sw = s % 2 ? len * 0.12 : 0;
    const tt = t + sw;

    // kick: 0, 6, 10
    if (s === 0 || s === 6 || s === 10) this.blip(130, tt, 0.16, "sine", 0.9, bus, 42);
    // log drum bass
    const bassSteps = this.bar % 2 ? [0, 3, 6, 10, 14] : [0, 4, 7, 10, 12];
    if (bassSteps.includes(s)) {
      const n = BASS[chordIdx] + (s === 10 || s === 14 ? 7 : 0);
      this.blip(NOTE(n + 12), tt, 0.28, "sine", 0.7, bus, NOTE(n + 12) * 0.82);
      this.blip(NOTE(n + 24), tt, 0.06, "triangle", 0.18, bus);
    }
    // shekere: every 8th, accent on offbeats
    if (s % 2 === 0) this.burst(tt, 0.05, 6200, 1.4, s % 4 === 2 ? 0.18 : 0.1, bus);
    if (s % 4 === 3) this.burst(tt, 0.035, 8200, 2, 0.08, bus);
    // clave-like conga pattern (3-2 feel)
    if ([0, 3, 6, 10, 12].includes(s)) this.blip(s % 6 === 0 ? 330 : 260, tt, 0.09, "triangle", 0.22, bus, 210);
    if (s === 14) this.blip(420, tt, 0.07, "triangle", 0.18, bus, 300);
    // highlife guitar: arpeggiated chord, bright pluck
    const chord = CHORDS[chordIdx];
    const pick = [0, 2, 3, 5, 6, 8, 10, 11, 13, 14];
    const idx = pick.indexOf(s);
    if (idx >= 0) {
      const n = chord[idx % 3] + 12 + (idx % 5 === 4 ? 12 : 0);
      this.blip(NOTE(n), tt, 0.22, "sawtooth", 0.07, bus);
      this.blip(NOTE(n) * 2, tt, 0.1, "triangle", 0.035, bus);
    }
    // talking drum phrase every 4th bar
    if (this.bar % 4 === 3 && [8, 10, 11, 13, 15].includes(s)) {
      const up = s % 2 ? 1.5 : 0.75;
      this.blip(300 * up, tt, 0.16, "sine", 0.4, bus, 300 * up * (s > 10 ? 1.7 : 0.6));
    }
  }

  /* ----------------------------------- sfx ----------------------------------- */

  private sfx(fn: (t: number, bus: GainNode) => void) {
    if (!this.ctx || this.settings.muted) return;
    fn(this.ctx.currentTime, this.sfxBus);
  }

  click() {
    this.sfx((t, b) => this.blip(900, t, 0.05, "triangle", 0.18, b, 600));
  }
  pop() {
    this.sfx((t, b) => this.blip(520, t, 0.07, "sine", 0.2, b, 780));
  }
  coin() {
    this.sfx((t, b) => {
      this.blip(1318, t, 0.09, "square", 0.1, b);
      this.blip(1760, t + 0.08, 0.22, "square", 0.1, b);
    });
  }
  good() {
    this.sfx((t, b) => {
      [523, 659, 784].forEach((f, i) => this.blip(f, t + i * 0.07, 0.18, "triangle", 0.16, b));
    });
  }
  bad() {
    this.sfx((t, b) => {
      this.blip(220, t, 0.18, "sawtooth", 0.12, b, 150);
      this.blip(165, t + 0.12, 0.22, "sawtooth", 0.12, b, 110);
    });
  }
  /** Car horn (two-tone) and a lighter bike beep. */
  horn(bike = false) {
    this.sfx((t, b) => {
      if (bike) {
        this.blip(820, t, 0.12, "square", 0.1, b);
        this.blip(820, t + 0.17, 0.12, "square", 0.1, b);
        return;
      }
      this.blip(392, t, 0.4, "square", 0.11, b);
      this.blip(494, t, 0.4, "square", 0.11, b);
    });
  }
  door() {
    this.sfx((t, b) => {
      this.burst(t, 0.12, 400, 1, 0.5, b);
      this.blip(160, t + 0.02, 0.18, "sine", 0.4, b, 90);
      this.blip(700, t + 0.2, 0.08, "triangle", 0.15, b);
    });
  }
  sit() {
    this.sfx((t, b) => this.burst(t, 0.18, 260, 0.8, 0.5, b));
  }
  /** NEPA took light: a dull thunk and a fan winding down. */
  nepaOff() {
    this.sfx((t, b) => {
      this.blip(95, t, 0.35, "sine", 0.8, b, 40);
      this.burst(t, 0.1, 1800, 1, 0.3, b);
      this.blip(260, t + 0.1, 1.1, "sawtooth", 0.05, b, 40);
    });
  }
  /** Light is back, and the whole street cheers "UP NEPA!" with a rising chirp. */
  nepaOn() {
    this.sfx((t, b) => {
      this.burst(t, 0.06, 2400, 1, 0.3, b);
      [392, 523, 659, 784].forEach((f, i) => this.blip(f, t + 0.08 + i * 0.09, 0.2, "triangle", 0.15, b));
    });
  }
  wave() {
    this.sfx((t, b) => {
      this.blip(660, t, 0.1, "sine", 0.18, b, 880);
      this.blip(880, t + 0.1, 0.14, "sine", 0.18, b, 990);
    });
  }
  ringOnce() {
    this.sfx((t, b) => {
      for (let i = 0; i < 2; i++) {
        this.blip(880, t + i * 0.22, 0.12, "sine", 0.25, b);
        this.blip(1100, t + i * 0.22, 0.12, "sine", 0.18, b);
      }
    });
  }
  startRing() {
    this.stopRing();
    this.ringOnce();
    this.ringTimer = setInterval(() => this.ringOnce(), 1800);
  }
  stopRing() {
    if (this.ringTimer) clearInterval(this.ringTimer);
    this.ringTimer = null;
  }
  /** A tune on the talking drum for the player: used by in-game drums. */
  drum() {
    this.sfx((t, b) => {
      for (let i = 0; i < 5; i++) this.blip(260 + (i % 3) * 120, t + i * 0.13, 0.14, "sine", 0.4, b, (260 + (i % 3) * 120) * (i % 2 ? 1.6 : 0.6));
    });
  }
}

export const audio = new Engine();
