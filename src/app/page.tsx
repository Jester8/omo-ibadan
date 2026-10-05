"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mic, Map, HeartHandshake, Crown, Landmark } from "lucide-react";

const FEATURES = [
  {
    icon: Map,
    title: "A living Ibadan",
    body: "20 places across 16 districts. Eat amala at Skye, study at UI, climb Bower's Tower, watch the match at Lekan Salami.",
  },
  {
    icon: Landmark,
    title: "Buy land. Build a home.",
    body: "Own a plot in Bodija, Jericho or Oluyole. Build from a bungalow to a mansion, collect rent, host friends.",
  },
  {
    icon: Mic,
    title: "Real voice, real people",
    body: "Hear whoever is in the same venue. Open your in-game phone and call a friend.",
  },
  {
    icon: HeartHandshake,
    title: "Real-life simulation",
    body: "Hunger, energy, jobs and rent. A day and night cycle, and NEPA that takes light when it feels like it.",
  },
  {
    icon: Crown,
    title: "Climb to Olubadan",
    body: "Earn reputation through work, service and land. Rise through the chieftaincy ladder.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#f6f3ea] text-stone-900">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-emerald-300/40 blur-3xl"
        animate={{ scale: [1, 1.12, 1], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-amber-300/40 blur-3xl"
        animate={{ scale: [1, 1.1, 1], y: [0, -24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight">
          Omo <span className="text-emerald-700">Ibadan</span>
        </span>
        <Link
          href="/play"
          className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Play
        </Link>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-12 sm:pt-24">
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-5 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm ring-1 ring-black/5"
        >
          Play free in your browser
        </motion.p>
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Live your life in <span className="text-emerald-700">Ibadan</span>.
        </motion.h1>
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-xl text-lg text-stone-600"
        >
          A real-life simulation of the city of rust-roofs. Work, eat, hang out, and talk to real
          people with live voice.
        </motion.p>
        <motion.div variants={fade} initial="hidden" animate="show" custom={3} className="mt-9 flex gap-3">
          <Link
            href="/play"
            className="rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-800 active:translate-y-0"
          >
            Start your life
          </Link>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
          >
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Icon className="size-5" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{body}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
