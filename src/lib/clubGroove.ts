import { BPM } from "@/components/interior/power";

/**
 * The house band: an original afrobeat / amapiano-flavoured groove made live with the Web Audio API, so a club is never
 * silent when there are no artist tracks to play. No samples, no files, nothing borrowed: every sound below is an
 * oscillator or a burst of noise shaped in code.
 *
 *  - Four-on-the-floor kick that pumps the chords, a log-drum bass line, shaker, off-beat hats, claps on 2 and 4,
 *    congas, a keys stab on the syncopated steps, a soft pad and a kalimba line through a tempo-synced echo.
 *  - The chords (Am9, Fmaj7, Cmaj9, Gadd9) turn over every two bars, and the arrangement is 32 bars (about a minute and
 *    ten): intro, bass comes in, claps and kalimba, full, a breakdown with a riser, full again. After that it loops from
 *    bar 8 with the stabs and the kalimba line varying each time round, so it never settles into a four-bar loop.
 *  - It runs at the BPM of the room's beat clock and every step is placed on that clock's grid (mapped onto the audio
 *    clock), so the mirror ball, the LED floor and the speakers pulse right on its kick.
 */

/** one 16th note in seconds, and the length of a beat on the room's clock in ms */
const STEP = 60 / BPM / 4;
const BEAT_MS = 60000 / BPM;
/** notes are scheduled this far ahead of the audio clock, by a timer that fires every TICK_MS */
const LOOKAHEAD = 0.3;
const TICK_MS = 40;
const CYCLE = 32;
const LOOP_FROM = 8;
/** headroom under the compressor; the Music slider scales from here */
const MASTER = 0.9;

/* ------------------------------------------------------ the music ------------------------------------------------------ */

const hz = (m: number) => 440 * 2 ** ((m - 69) / 12);

/** log drum and bass roots, one per chord (A2 F2 C3 G2) */
const ROOT = [45, 41, 48, 43];
/** the stab chords as MIDI notes: Am9, Fmaj7, Cmaj9, Gadd9 without their roots (the bass has them), voiced to move by small steps */
const KEYS = [
  [60, 64, 67, 71],
  [57, 60, 64, 69],
  [64, 67, 71, 74],
  [59, 62, 67, 69],
];
/** kalimba notes (A minor pentatonic over two octaves) */
const SCALE = [69, 72, 74, 76, 79, 81, 84, 86, 88];
/** eight scale positions per chord, leaning on that chord's own tones */
const MOTIF = [
  [3, 1, 0, 1, 3, 4, 3, 1],
  [5, 3, 1, 3, 5, 3, 1, 0],
  [1, 3, 4, 3, 6, 4, 3, 1],
  [4, 2, 0, 2, 4, 5, 4, 2],
];
/** log drum bars: [step, semitones above the chord root]; only the root, its 9th, fifth and octave, which suit every chord here */
const LOG = [
  [[0, 0], [3, 0], [6, 7], [10, 0], [12, 0], [14, 12]],
  [[0, 0], [3, 0], [7, 7], [10, 12], [11, 7], [14, 0]],
  [[0, 0], [2, 2], [6, 0], [8, 7], [10, 0], [13, 7], [14, 12]],
  [[0, 0], [3, 0], [6, 7], [9, 0], [10, 7], [12, 0], [15, 12]],
] as const;
/** steps the keys stab on, a pattern per phrase */
const STABS = [
  [0, 6, 10],
  [3, 6, 11, 14],
  [0, 3, 6, 10, 13],
  [2, 5, 8, 11, 14],
] as const;
const STABS_INTRO = [0, 10] as const;
const STABS_BREAK = [0, 7] as const;
/** steps the kalimba plays on, a pattern per bar */
const RHY = [
  [0, 3, 6, 8, 11, 14],
  [0, 2, 5, 8, 10, 13],
  [0, 3, 4, 8, 12, 14],
] as const;
const CONGA = [3, 6, 7, 10, 11, 14] as const;

/** which voices play in a bar of the arrangement */
const K = 1; // kick
const B = 2; // log drum bass
const SH = 4; // shaker
const CL = 8; // claps
const HT = 16; // hats
const KY = 32; // keys stabs
const KA = 64; // kalimba
const PD = 128; // pad
const PC = 256; // congas and ghost notes

function layers(cb: number): number {
  if (cb < 4) return K | SH | PD | KY | (cb >= 2 ? HT : 0);
  if (cb < 8) return K | SH | B | HT | KY | PD;
  if (cb < 16) return K | SH | B | HT | CL | KY | KA;
  if (cb < 24) return K | SH | B | HT | CL | KY | KA | PC;
  if (cb < 28) return SH | PD | KA | KY | (cb === 27 ? HT : 0); // breakdown
  return K | SH | B | HT | CL | KY | KA | PC | PD;
}

/** a stateless hash to 0..1, so a bar's little variations are the same wherever the playhead was when it got there */
function rnd(a: number, b: number, c = 0): number {
  let x = (Math.imul(a + 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x7f4a7c15, 0xc2b2ae35) ^ Math.imul(c + 0x165667b1, 0x27d4eb2f)) | 0;
  x = Math.imul(x ^ (x >>> 15), 0x2c1b3c6d);
  x = Math.imul(x ^ (x >>> 12), 0x297a2d39);
  x ^= x >>> 15;
  return (x >>> 0) / 4294967296;
}

/* ----------------------------------------------------- the graph ----------------------------------------------------- */

type Run = {
  ctx: AudioContext;
  noise: AudioBuffer;
  out: GainNode;
  pump: GainNode;
  kickBus: AudioNode;
  bassBus: AudioNode;
  shakeBus: AudioNode;
  hatBus: AudioNode;
  clapBus: AudioNode;
  congaBus: AudioNode;
  harmBus: AudioNode;
  kalBus: AudioNode;
  mix: AudioNode;
  timer: ReturnType<typeof setInterval>;
  /** the next step to schedule, counted from this run's step 0 */
  n: number;
  /** step 0 on the room's clock (performance.now() ms), and on the audio clock (s) */
  p0: number;
  base: number;
  /** the bar of the arrangement step 0 belongs to */
  startBar: number;
  level: number;
};

let run: Run | null = null;
/** where the arrangement got to, so a pause (hidden tab) carries on from there */
let resumeBar = 0;
let noiseOf: { ctx: AudioContext; buf: AudioBuffer } | null = null;

function noise(ctx: AudioContext): AudioBuffer {
  if (noiseOf && noiseOf.ctx === ctx) return noiseOf.buf;
  const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  noiseOf = { ctx, buf };
  return buf;
}

const amp = (ctx: AudioContext, v: number) => {
  const g = ctx.createGain();
  g.gain.value = v;
  return g;
};
const filt = (ctx: AudioContext, type: BiquadFilterType, freq: number, q = 0.7) => {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
};
/** a stereo position (a plain gain where panners are missing) */
const pan = (ctx: AudioContext, v: number): AudioNode => {
  if (typeof ctx.createStereoPanner !== "function") return amp(ctx, 1);
  const p = ctx.createStereoPanner();
  p.pan.value = v;
  return p;
};
const chain = (...nodes: AudioNode[]) => {
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]);
  return nodes[0];
};

/** Where the room's clock time `perfMs` is heard on the audio clock. */
function ctxAt(ctx: AudioContext, perfMs: number): number {
  const ts = typeof ctx.getOutputTimestamp === "function" ? ctx.getOutputTimestamp() : null;
  // contextTime is what the speakers are playing right now, so output latency is already in it
  if (ts && ts.performanceTime && ts.contextTime !== undefined) return ts.contextTime + (perfMs - ts.performanceTime) / 1000;
  return ctx.currentTime + (perfMs - performance.now()) / 1000 - (ctx.outputLatency || ctx.baseLatency || 0);
}

/* ------------------------------------------------------ the voices ------------------------------------------------------ */

function tone(r: Run, dest: AudioNode, t: number, type: OscillatorType, f0: number, f1: number, glide: number, peak: number, attack: number, dur: number) {
  const o = r.ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + glide);
  const g = r.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + dur + 0.03);
}

/** a short burst of the shared noise; the bus it goes to does the colouring */
function burst(r: Run, dest: AudioNode, t: number, dur: number, peak: number) {
  const s = r.ctx.createBufferSource();
  s.buffer = r.noise;
  const g = r.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(g).connect(dest);
  s.start(t, Math.random() * 0.7);
  s.stop(t + dur + 0.02);
}

function kick(r: Run, t: number, v: number) {
  tone(r, r.kickBus, t, "sine", 160, 46, 0.11, 0.95 * v, 0.002, 0.34);
  tone(r, r.kickBus, t, "triangle", 900, 120, 0.02, 0.18 * v, 0.001, 0.05);
  // the chords duck for a moment on every kick: the club pump
  const p = r.pump.gain;
  p.cancelScheduledValues(t);
  p.setValueAtTime(1, t);
  p.linearRampToValueAtTime(0.45, t + 0.012);
  p.linearRampToValueAtTime(1, t + 0.26);
}

/** a log drum: a woody knock that drops onto its pitch, with a tok an octave up so small speakers hear it */
function logDrum(r: Run, t: number, midi: number, v: number) {
  const f = hz(midi);
  tone(r, r.bassBus, t, "sine", f * 1.7, f, 0.045, 0.5 * v, 0.003, 0.42);
  tone(r, r.bassBus, t, "triangle", f * 2, f * 2, 0, 0.13 * v, 0.002, 0.09);
}

function clap(r: Run, t: number, v: number) {
  burst(r, r.clapBus, t, 0.012, v);
  burst(r, r.clapBus, t + 0.011, 0.012, v * 0.9);
  burst(r, r.clapBus, t + 0.022, 0.012, v * 0.8);
  burst(r, r.clapBus, t + 0.034, 0.16, v);
}

function conga(r: Run, t: number, f: number, v: number) {
  tone(r, r.congaBus, t, "triangle", f, f * 0.68, 0.08, 0.2 * v, 0.003, 0.13);
}

/** a keys stab: the chord's notes alternating saw and triangle through the harmony bus's low-pass */
function stab(r: Run, t: number, chord: readonly number[], dur: number, v: number) {
  const g = r.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.085 * v, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(r.harmBus);
  chord.forEach((m, i) => {
    const o = r.ctx.createOscillator();
    o.type = i % 2 ? "triangle" : "sawtooth";
    o.frequency.value = hz(m);
    o.connect(g);
    o.start(t);
    o.stop(t + dur + 0.03);
  });
}

/** a slow, soft swell of the chord, two detuned voices per note */
function pad(r: Run, t: number, chord: readonly number[], dur: number, v: number) {
  const g = r.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(v, t + dur * 0.35);
  g.gain.linearRampToValueAtTime(0.0001, t + dur);
  g.connect(r.harmBus);
  for (const m of chord) {
    for (const cents of [-7, 7]) {
      const o = r.ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = hz(m);
      o.detune.value = cents;
      o.connect(g);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  }
}

/** a kalimba pluck: a sine with a bright inharmonic ping on top */
function kalimba(r: Run, t: number, midi: number, v: number) {
  const f = hz(midi);
  tone(r, r.kalBus, t, "sine", f, f, 0, 0.16 * v, 0.003, 0.7);
  tone(r, r.kalBus, t, "sine", f * 2.76, f * 2.76, 0, 0.04 * v, 0.002, 0.18);
}

/** noise that sweeps up and swells over `dur`, into the drop */
function riser(r: Run, t: number, dur: number) {
  const s = r.ctx.createBufferSource();
  s.buffer = r.noise;
  s.loop = true;
  const f = filt(r.ctx, "bandpass", 300, 2);
  f.frequency.setValueAtTime(300, t);
  f.frequency.exponentialRampToValueAtTime(7000, t + dur);
  const g = r.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.16, t + dur);
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.05);
  chain(s, f, g, r.mix);
  s.start(t);
  s.stop(t + dur + 0.1);
}

/** Everything that happens on one 16th step of the arrangement. */
function playStep(r: Run, n: number, t: number) {
  const bar = r.startBar + (n >> 4);
  const s = n & 15;
  const loop = bar < CYCLE ? 0 : 1 + Math.floor((bar - CYCLE) / (CYCLE - LOOP_FROM));
  const cb = bar < CYCLE ? bar : LOOP_FROM + ((bar - CYCLE) % (CYCLE - LOOP_FROM));
  const ci = (cb >> 1) & 3;
  const L = layers(cb);
  const swing = s & 1 ? STEP * 0.12 : 0;
  const human = 0.85 + 0.3 * rnd(bar, s, 5);
  // the last beat of every eighth bar is a fill
  const fill = (cb & 7) === 7 && s >= 12;

  if (L & K && s % 4 === 0 && !(cb === 23 && s >= 12)) kick(r, t, s === 0 ? 1 : 0.92);
  if (L & K && cb >= LOOP_FROM && s === 10 && rnd(bar, s, 1) < 0.45) kick(r, t, 0.6);
  // the drop after the breakdown lands with a crash
  if (cb === 28 && s === 0) burst(r, r.hatBus, t, 0.9, 0.3);
  if (cb === 26 && s === 0) riser(r, t, STEP * 32);

  if (L & B) {
    const pat = LOG[(cb + loop) & 3];
    for (let i = 0; i < pat.length; i++) {
      if (pat[i][0] !== s) continue;
      const off = pat[i][1];
      logDrum(r, t, ROOT[ci] + off, (s === 0 ? 1 : off === 12 ? 0.6 : 0.8) * human);
    }
  }

  // the shaker runs on every 16th, leaning on the off-beats
  if (L & SH) {
    const lean = s & 1 ? 0.1 : s % 4 === 2 ? 0.065 : 0.045;
    burst(r, r.shakeBus, t + swing, s & 1 ? 0.05 : 0.04, lean * human * (L & PC ? 1.15 : 1) * (L & K ? 1 : 0.8));
  }
  if (L & HT) {
    if (s % 4 === 2) burst(r, r.hatBus, t, (cb & 1) && s === 14 ? 0.17 : 0.035, (cb & 1) && s === 14 ? 0.06 : 0.07 * human);
    else if (L & PC && s & 1 && rnd(bar, s, 2) < 0.22) burst(r, r.hatBus, t + swing, 0.025, 0.035);
  }

  if (L & CL && (s === 4 || s === 12) && !fill) clap(r, t, 0.4);
  if (L & PC && (s === 7 || s === 15) && rnd(bar, s, 3) < 0.25 && !fill) clap(r, t, 0.14);
  // the fill: claps roll into the next section, and a tom falls under them
  if (fill) {
    clap(r, t, 0.25 + (s - 12) * 0.08);
    if (s >= 14) tone(r, r.congaBus, t, "sine", 260 - (s - 14) * 40, 120, 0.12, 0.3, 0.003, 0.2);
  }

  if (L & PC) {
    for (let i = 0; i < CONGA.length; i++) if (CONGA[i] === s && rnd(bar, s, 4) < 0.7) conga(r, t + swing, i & 1 ? 250 : 330, human);
  }

  if (L & KY) {
    const hits = cb < 4 ? STABS_INTRO : cb >= 24 && cb < 28 ? STABS_BREAK : STABS[((cb >> 2) + loop) & 3];
    const long = cb >= 24 && cb < 28;
    for (let i = 0; i < hits.length; i++) if (hits[i] === s) stab(r, t, KEYS[ci], long ? 0.9 : 0.22, (long ? 0.8 : 1) * human);
  }
  if (L & PD && s === 0 && (cb & 1) === 0) pad(r, t, KEYS[ci], STEP * 32, 0.035);

  if (L & KA) {
    const hits = RHY[(cb + loop) % 3];
    const k = (hits as readonly number[]).indexOf(s);
    // sparse at first, then every note; it plays the same bar a little differently each time round
    const dens = cb < 12 ? 0.5 : cb < 16 ? 0.8 : 1;
    if (k >= 0 && rnd(bar, s, 6) < dens) {
      let idx = MOTIF[ci][(k + 3 * (cb & 1)) & 7];
      const v = rnd(bar, s, 7);
      if (loop > 0 && v < 0.25) idx = Math.min(SCALE.length - 1, idx + 1);
      else if (loop > 0 && v > 0.75) idx = Math.max(0, idx - 1);
      kalimba(r, t, SCALE[idx], human);
    }
  }
}

function tick() {
  const r = run;
  if (!r) return;
  const ctx = r.ctx;
  // the phone interrupted the audio: nothing to schedule until it runs again
  if (ctx.state !== "running") return;
  const horizon = ctx.currentTime + LOOKAHEAD;
  for (;;) {
    const t = r.base + r.n * STEP;
    if (t > horizon) break;
    // a step already in the past (a long hitch in the page) is skipped, not played in a rush
    if (t >= ctx.currentTime - 0.01 && r.level > 0) playStep(r, r.n, t);
    r.n++;
    // on every bar line, check the audio clock has not drifted from the lights' clock
    if ((r.n & 15) === 0) {
      const b = ctxAt(ctx, r.p0);
      if (Math.abs(b - r.base) > 0.02) r.base = b;
    }
  }
}

/* ------------------------------------------------------- control ------------------------------------------------------- */

export const grooveRunning = () => !!run;

/**
 * Start the groove on the next beat of the room's clock, fading in over `fadeIn` seconds at `level` (0 to 1).
 * Returns false when the audio context is not running yet (the browser wants a tap): try again then.
 */
export function grooveStart(ctx: AudioContext, level: number, fadeIn = 1.5): boolean {
  if (run) {
    grooveSetLevel(level);
    return true;
  }
  if (ctx.state !== "running") return false;

  const mix = amp(ctx, 1);
  // glue the mix together, bring it back up, and keep the peaks from clipping
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -12;
  comp.knee.value = 12;
  comp.ratio.value = 3.5;
  comp.attack.value = 0.006;
  comp.release.value = 0.2;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -3;
  limiter.knee.value = 0;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.001;
  limiter.release.value = 0.08;
  const out = amp(ctx, 0);
  chain(mix, comp, amp(ctx, 1.5), limiter, out, ctx.destination);

  // a dotted-eighth echo that follows the tempo, shared by the kalimba, the claps and a little of the keys
  const send = amp(ctx, 1);
  const dly = ctx.createDelay(1);
  dly.delayTime.value = STEP * 3;
  const dlp = filt(ctx, "lowpass", 2400);
  const fb = amp(ctx, 0.36);
  chain(send, dly, dlp, amp(ctx, 0.4), pan(ctx, -0.25), mix);
  chain(dlp, fb, dly);

  const kickBus = amp(ctx, 1);
  kickBus.connect(mix);
  const bassBus = chain(amp(ctx, 0.9), filt(ctx, "lowpass", 1100), mix);
  const shakeBus = chain(filt(ctx, "highpass", 6500), amp(ctx, 0.9), pan(ctx, -0.3), mix);
  const hatBus = chain(filt(ctx, "highpass", 8000), amp(ctx, 0.8), pan(ctx, 0.25), mix);
  const clapBus = chain(filt(ctx, "bandpass", 1500, 0.9), amp(ctx, 1), mix);
  chain(clapBus, amp(ctx, 0.18), send);
  const congaBus = chain(amp(ctx, 1), pan(ctx, 0.35), mix);
  const pump = amp(ctx, 1);
  const harmBus = chain(amp(ctx, 1), filt(ctx, "lowpass", 2600), pump, pan(ctx, 0.05), mix);
  chain(pump, amp(ctx, 0.12), send);
  const kalBus = chain(amp(ctx, 1), pan(ctx, 0.2), mix);
  chain(kalBus, amp(ctx, 0.7), send);

  // step 0 lands on a beat of the room's clock, far enough ahead that the first kick is not already in the past
  const now = performance.now();
  let p0 = Math.ceil((now + 80) / BEAT_MS) * BEAT_MS;
  let base = ctxAt(ctx, p0);
  for (let i = 0; i < 8 && base < ctx.currentTime + 0.05; i++) {
    p0 += BEAT_MS;
    base = ctxAt(ctx, p0);
  }

  const t = ctx.currentTime;
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(level * MASTER, t + Math.max(0.05, fadeIn));

  run = {
    ctx,
    noise: noise(ctx),
    out,
    pump,
    kickBus,
    bassBus,
    shakeBus,
    hatBus,
    clapBus,
    congaBus,
    harmBus,
    kalBus,
    mix,
    timer: setInterval(tick, TICK_MS),
    n: 0,
    p0,
    base,
    startBar: resumeBar,
    level,
  };
  tick();
  return true;
}

/** The next start begins the set again from the top (a new visit), instead of carrying on from where a pause left it. */
export function grooveRewind() {
  resumeBar = 0;
}

/** Follow the Music slider or the mute switch. */
export function grooveSetLevel(level: number, secs = 0.15) {
  const r = run;
  if (!r || r.level === level) return;
  r.level = level;
  const g = r.out.gain;
  const t = r.ctx.currentTime;
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value, t);
  g.linearRampToValueAtTime(level * MASTER, t + secs);
}

/** Fade out and stop. A later start carries on from the bar it stopped at. */
export function grooveStop(fade = 1.2) {
  const r = run;
  if (!r) return;
  run = null;
  resumeBar = r.startBar + (r.n >> 4);
  clearInterval(r.timer);
  const g = r.out.gain;
  const t = r.ctx.currentTime;
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value, t);
  g.linearRampToValueAtTime(0, t + Math.max(0.02, fade));
  // the last notes ring out silently; then the whole graph can go
  setTimeout(() => r.out.disconnect(), (fade + 1) * 1000);
}
