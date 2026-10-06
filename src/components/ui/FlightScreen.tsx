"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plane } from "lucide-react";
import { destById } from "@/lib/flights";
import { useGame } from "@/lib/store";

/** The cabin window: clouds drift past while you fly, then you land and fly home. */
export default function FlightScreen() {
  const flight = useGame((s) => s.flight);
  const busy = useGame((s) => s.busy);
  const dest = destById(flight?.dest ?? "");
  const flying = !!busy && busy.label.startsWith("Flight to");

  return (
    <AnimatePresence>
      {flight && dest && (
        <motion.div key="flight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[65] overflow-hidden bg-gradient-to-b from-sky-300 via-sky-400 to-indigo-500 text-white">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute h-14 rounded-full bg-white/70 blur-[2px]"
              style={{ top: `${14 + i * 15}%`, width: `${110 + i * 40}px` }}
              initial={{ x: "110vw" }}
              animate={{ x: "-40vw" }}
              transition={{ duration: 7 + i * 2.2, repeat: Infinity, ease: "linear", delay: i * 0.9 }}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-2/5 rounded-t-[3rem] bg-gradient-to-t from-stone-950/70 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
            {flying ? (
              <>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <Plane className="size-16 rotate-45 drop-shadow-lg" />
                </motion.div>
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight">Flying to {dest.city}</h2>
                <p className="mt-1 text-white/80">Fasten your seat belt. Enjoy your complimentary zobo.</p>
                {busy && (
                  <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-white/25">
                    <motion.div key={busy.start} className="h-full rounded-full bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: busy.secs, ease: "linear" }} />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-6xl">{dest.emoji}</div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Welcome to {dest.city}</h2>
                <p className="mt-2 max-w-sm text-white/85">{dest.blurb}</p>
                <p className="mt-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur">+40 fun · +3 rep · a few photos for the gram</p>
                <button
                  onClick={() => {
                    useGame.setState({ flight: null });
                    useGame.getState().toast("Back home at Ibadan Airport. Welcome back!", "good");
                  }}
                  className="mt-8 rounded-full bg-white px-8 py-3.5 text-base font-bold text-sky-700 shadow-xl transition active:scale-95"
                >
                  Fly home to Ibadan
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
