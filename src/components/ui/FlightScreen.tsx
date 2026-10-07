"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { destById } from "@/lib/flights";
import { audio } from "@/lib/audio";
import { useGame } from "@/lib/store";

const T = 4; // the whole flight, in seconds

/* ------------------------------------------------------------------------------------------------
 * 1. Inside the cabin, as you board: rows of seats running away to the front, overhead bins, windows glowing.
 * ---------------------------------------------------------------------------------------------- */
function Cabin() {
  const rows = Array.from({ length: 7 }, (_, i) => i);
  const vx = 200;
  const vy = 128;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <defs>
        <linearGradient id="cab-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3efe8" />
          <stop offset="1" stopColor="#c9c4ba" />
        </linearGradient>
        <linearGradient id="cab-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4a6a" />
          <stop offset="1" stopColor="#1f2a44" />
        </linearGradient>
        <radialGradient id="cab-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#fff6e0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff6e0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#e7e2d8" />
      {/* ceiling */}
      <polygon points={`0,0 400,0 ${vx + 30},${vy - 22} ${vx - 30},${vy - 22}`} fill="#f7f4ee" />
      {/* side walls */}
      <polygon points={`0,0 ${vx - 30},${vy - 22} ${vx - 30},${vy + 22} 0,300`} fill="url(#cab-wall)" />
      <polygon points={`400,0 ${vx + 30},${vy - 22} ${vx + 30},${vy + 22} 400,300`} fill="url(#cab-wall)" />
      {/* floor and aisle carpet */}
      <polygon points={`0,300 400,300 ${vx + 30},${vy + 22} ${vx - 30},${vy + 22}`} fill="url(#cab-floor)" />
      <polygon points={`150,300 250,300 ${vx + 7},${vy + 22} ${vx - 7},${vy + 22}`} fill="#4b6aa0" opacity="0.8" />
      {/* overhead bins */}
      <polygon points={`0,40 ${vx - 52},${vy - 20} ${vx - 52},${vy - 4} 0,96`} fill="#ece8df" stroke="#cfc9bd" strokeWidth="1" />
      <polygon points={`400,40 ${vx + 52},${vy - 20} ${vx + 52},${vy - 4} 400,96`} fill="#ece8df" stroke="#cfc9bd" strokeWidth="1" />
      {/* windows along both walls, glowing with the daylight outside */}
      {rows.map((i) => {
        const k = 1 / (1 + i * 0.62);
        const lx = (vx - 36) - (vx - 36) * k * 0.98;
        const rx = 400 - lx;
        const y = vy - 4 + (1 - k) * 0;
        const h = 64 * k;
        const w = 26 * k;
        const wy = y - 10 * k;
        return (
          <g key={`w${i}`}>
            <rect x={lx + 2} y={wy} width={w} height={h} rx={w / 2.4} fill="#a9d3f2" stroke="#e4dfd5" strokeWidth={2 * k} />
            <rect x={rx - w - 2} y={wy} width={w} height={h} rx={w / 2.4} fill="#a9d3f2" stroke="#e4dfd5" strokeWidth={2 * k} />
          </g>
        );
      })}
      {/* seat rows, far to near */}
      {[...rows].reverse().map((i) => {
        const k = 1 / (1 + i * 0.62);
        const w = 62 * k;
        const h = 78 * k;
        const baseY = vy + 22 + (300 - vy - 22) * k * 0.78;
        const color = i % 2 ? "#33508a" : "#3f5f9e";
        const side = (cx: number, key: string) => (
          <g key={key}>
            <rect x={cx - w / 2} y={baseY - h} width={w} height={h} rx={9 * k} fill={color} />
            <rect x={cx - w / 2 + 5 * k} y={baseY - h - 12 * k} width={w - 10 * k} height={16 * k} rx={6 * k} fill="#f4f4f2" opacity="0.92" />
            <rect x={cx - w / 2 - 5 * k} y={baseY - h * 0.55} width={9 * k} height={h * 0.5} rx={4 * k} fill="#26396a" />
            <rect x={cx + w / 2 - 4 * k} y={baseY - h * 0.55} width={9 * k} height={h * 0.5} rx={4 * k} fill="#26396a" />
          </g>
        );
        const gap = 78 * k;
        return (
          <g key={`s${i}`}>
            {side(vx - 18 * k - gap * 1.05, `l1${i}`)}
            {side(vx - 18 * k - gap * 1.05 - w * 0.98, `l2${i}`)}
            {side(vx + 18 * k + gap * 1.05, `r1${i}`)}
            {side(vx + 18 * k + gap * 1.05 + w * 0.98, `r2${i}`)}
          </g>
        );
      })}
      {/* the glow of the cabin lights and the front bulkhead */}
      <rect x={vx - 30} y={vy - 22} width="60" height="44" fill="#d9d4ca" />
      <rect x="0" y="0" width="400" height="300" fill="url(#cab-glow)" />
      {/* the seat-belt sign, chiming */}
      <motion.g animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
        <rect x="186" y="26" width="28" height="12" rx="4" fill="#1b2438" />
        <circle cx="200" cy="32" r="3.2" fill="#ffd26a" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------
 * 2. Through the window: the runway falls away, the wing, then clouds rushing past.
 * ---------------------------------------------------------------------------------------------- */
function Cloud({ y, size, delay, dur, o = 0.9 }: { y: string; size: number; delay: number; dur: number; o?: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ top: y, width: size, height: size * 0.45, opacity: o }}
      initial={{ x: "120vw" }}
      animate={{ x: "-60vw" }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 200 90" className="size-full">
        <g fill="#fff">
          <ellipse cx="60" cy="60" rx="52" ry="26" />
          <ellipse cx="105" cy="46" rx="48" ry="34" />
          <ellipse cx="150" cy="62" rx="44" ry="24" />
          <ellipse cx="100" cy="70" rx="80" ry="18" />
        </g>
        <ellipse cx="100" cy="78" rx="84" ry="10" fill="#cfe3f5" opacity="0.7" />
      </svg>
    </motion.div>
  );
}

function WindowView() {
  return (
    <div className="absolute inset-0 bg-stone-900">
      {/* the plane window: oval, with the sky inside */}
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[min(92%,34rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[45%/32%] border-[14px] border-[#e9e5dc] bg-gradient-to-b from-sky-500 via-sky-300 to-sky-100 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]">
        {/* the ground falling away: fields and roofs, then lost in cloud */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[repeating-linear-gradient(90deg,#7aa05a_0_26px,#9bb36a_26px_52px,#b88a5a_52px_70px)]"
          initial={{ y: 0, scaleY: 1 }}
          animate={{ y: ["0%", "60%", "100%"], opacity: [1, 0.8, 0] }}
          transition={{ duration: 1.4, ease: "easeIn", times: [0, 0.6, 1] }}
        />
        <motion.div className="absolute left-[8%] top-[10%] size-16 rounded-full bg-amber-100 blur-[2px]" animate={{ opacity: [0.6, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
        <Cloud y="12%" size={220} delay={0.1} dur={1.1} o={0.95} />
        <Cloud y="34%" size={300} delay={0} dur={0.9} />
        <Cloud y="52%" size={260} delay={0.3} dur={0.8} />
        <Cloud y="68%" size={340} delay={0.15} dur={0.7} />
        {/* the wing, with a tip light */}
        <svg viewBox="0 0 300 120" className="absolute -bottom-2 left-0 w-[88%]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wing" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#d9dde2" />
              <stop offset="1" stopColor="#f1f3f5" />
            </linearGradient>
          </defs>
          <polygon points="0,62 190,34 300,20 296,34 200,62 0,120" fill="url(#wing)" />
          <polygon points="0,62 190,34 300,20 292,26 188,44 0,74" fill="#fff" opacity="0.6" />
          <motion.circle cx="296" cy="26" r="4" fill="#ff5a5a" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
        </svg>
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_60px_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * 3. Outside: the airliner cruising above the clouds.
 * ---------------------------------------------------------------------------------------------- */
function Airliner() {
  return (
    <svg viewBox="0 0 440 160" className="w-[min(82vw,34rem)] drop-shadow-[0_18px_24px_rgba(0,40,90,0.35)]">
      <defs>
        <linearGradient id="fus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e9edf1" />
          <stop offset="1" stopColor="#c3cbd3" />
        </linearGradient>
      </defs>
      {/* far wing */}
      <polygon points="190,84 130,40 164,40 250,84" fill="#b7c0c9" />
      {/* tail fin and stabiliser */}
      <polygon points="40,70 22,18 58,18 96,70" fill="#16a34a" />
      <polygon points="40,70 28,38 44,38 70,70" fill="#fff" opacity="0.9" />
      <polygon points="60,84 14,96 26,102 86,92" fill="#cfd6dc" />
      {/* fuselage */}
      <path d="M12 86 Q12 66 60 64 L330 64 Q400 66 428 86 Q400 106 330 108 L60 108 Q12 106 12 86Z" fill="url(#fus)" />
      <path d="M14 92 L424 92 L428 86 Q400 106 330 108 L60 108 Q14 106 14 92Z" fill="#16a34a" opacity="0.9" />
      <rect x="40" y="86" width="372" height="4" fill="#fff" opacity="0.9" />
      {/* cabin windows and cockpit */}
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={86 + i * 12.3} y="74" width="6" height="8" rx="3" fill="#2a3f5f" />
      ))}
      <path d="M388 74 Q410 74 418 84 L392 84Z" fill="#22344f" />
      {/* near wing and engine */}
      <polygon points="214,94 118,142 168,144 294,98" fill="#dfe4e9" />
      <polygon points="214,94 118,142 126,134 222,92" fill="#fff" opacity="0.7" />
      <ellipse cx="206" cy="124" rx="30" ry="12" fill="#cdd4db" />
      <ellipse cx="236" cy="124" rx="8" ry="11" fill="#2b3340" />
      <circle cx="120" cy="140" r="3" fill="#ff5a5a" />
    </svg>
  );
}

function Outside({ to }: { to: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-500 via-sky-300 to-amber-100">
      <motion.div className="absolute left-[12%] top-[14%] size-20 rounded-full bg-amber-100 blur-[3px]" />
      <Cloud y="16%" size={180} delay={0} dur={3.2} o={0.8} />
      <Cloud y="30%" size={240} delay={0.4} dur={2.6} o={0.9} />
      <div className="absolute inset-x-0 bottom-0 h-[44%]">
        <Cloud y="0%" size={420} delay={0} dur={1.6} />
        <Cloud y="22%" size={520} delay={0.5} dur={1.3} />
        <Cloud y="46%" size={640} delay={0.2} dur={1.0} />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div initial={{ x: "-30%", y: 10, scale: 0.8, opacity: 0 }} animate={{ x: ["-30%", "0%", "6%"], y: [10, -6, 0], scale: [0.8, 1, 1.02], opacity: [0, 1, 1] }} transition={{ duration: 1.3, ease: "easeOut" }}>
          <Airliner />
        </motion.div>
      </div>
      <p className="absolute inset-x-0 bottom-[10%] text-center text-lg font-extrabold tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,30,70,0.6)]">{to}</p>
    </div>
  );
}

/** A four-second flight: the cabin as you board, the view from the window, then the airliner among the clouds. */
export default function FlightScreen() {
  const flight = useGame((s) => s.flight);
  const busy = useGame((s) => s.busy);
  const dest = destById(flight?.dest ?? "");
  const flying = !!busy && busy.label.startsWith("Flight to");
  const returning = !!flight?.returning;
  const start = busy?.start ?? 0;

  // the engines and the seat-belt chime, once per flight
  useEffect(() => {
    if (flying) audio.flight();
  }, [flying, start]);
  // landing back in Ibadan ends the trip
  useEffect(() => {
    if (!flying && returning) {
      useGame.setState({ flight: null });
      useGame.getState().toast("Welcome back to Ibadan Airport!", "good");
    }
  }, [flying, returning]);

  return (
    <AnimatePresence>
      {flight && dest && (
        <motion.div key="flight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[65] overflow-hidden bg-stone-950 text-white">
          {flying ? (
            <div key={start} className="absolute inset-0">
              <motion.div className="absolute inset-0" animate={{ opacity: [1, 1, 0], scale: [1, 1.25, 1.4] }} transition={{ duration: T, times: [0, 0.3, 0.4], ease: "easeIn" }}>
                <Cabin />
              </motion.div>
              <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: T, times: [0, 0.3, 0.4, 0.7, 0.78] }}>
                <WindowView />
              </motion.div>
              <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1] }} transition={{ duration: T, times: [0, 0.7, 0.8, 1] }}>
                <Outside to={returning ? "Landing in Ibadan" : `Flying to ${dest.city}`} />
              </motion.div>
              <p className="absolute inset-x-0 top-[calc(env(safe-area-inset-top)+1.25rem)] text-center text-xs font-bold uppercase tracking-[0.3em] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">{returning ? "Ibadan" : `Ibadan to ${dest.city}`}</p>
            </div>
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100 px-8 text-center">
              <div>
                <div className="text-6xl">{dest.emoji}</div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Welcome to {dest.city}</h2>
                <p className="mx-auto mt-2 max-w-sm text-white/90">{dest.blurb}</p>
                <p className="mt-4 inline-block rounded-full bg-white/25 px-4 py-1.5 text-sm font-semibold backdrop-blur">+40 fun, +3 rep, a few photos for the gram</p>
                <div>
                  <button onClick={() => useGame.getState().flyHome()} className="mt-8 rounded-full bg-white px-8 py-3.5 text-base font-bold text-sky-700 shadow-xl transition active:scale-95">
                    Fly home to Ibadan
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
