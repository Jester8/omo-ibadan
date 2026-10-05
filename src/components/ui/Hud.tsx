"use client";

import { motion } from "motion/react";
import { CarFront, Landmark, Drumstick, DoorOpen, House, ListChecks, Moon, Phone, PartyPopper, Sun, Target, UserRound, Users, Zap, ZapOff, Wifi, WifiOff, Volume2, VolumeX } from "lucide-react";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { formatClock, periodLabel } from "@/lib/time";
import { naira } from "@/lib/plots";
import { TITLES, titleIndex } from "@/lib/titles";
import { QUESTS } from "@/lib/quests";
import { enterInterior, exitInterior, homeRef } from "@/lib/interiorRuntime";
import { useSound } from "@/lib/soundStore";

const NEEDS = [
  { key: "hunger", label: "Hunger", icon: Drumstick, color: "bg-orange-500" },
  { key: "energy", label: "Energy", icon: Zap, color: "bg-amber-400" },
  { key: "fun", label: "Fun", icon: PartyPopper, color: "bg-fuchsia-500" },
  { key: "social", label: "Social", icon: Users, color: "bg-sky-500" },
] as const;

export default function Hud() {
  const needs = useGame((s) => s.needs);
  const money = useGame((s) => s.money);
  const rep = useGame((s) => s.rep);
  const profile = useGame((s) => s.profile);
  const net = useGame((s) => s.net);
  const online = useGame((s) => s.online);
  const call = useGame((s) => s.call.phase);
  const questsDone = useGame((s) => s.questsDone);
  const inside = useGame((s) => !!s.interior);
  const muted = useSound((s) => s.muted);
  const setSound = useSound((s) => s.set);
  const setSheet = useGame((s) => s.setSheet);
  const driving = useGame((s) => s.driving);
  const { minutes, hour, day, nepa } = useClock();
  const title = TITLES[titleIndex(rep)];
  const nextQuest = QUESTS.find((q) => !questsDone.includes(q.id));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
        className="absolute left-3 top-3 z-10 w-[min(21rem,calc(100vw-5.5rem))] sm:w-[21rem] rounded-3xl bg-white/85 p-3.5 shadow-xl ring-1 ring-black/5 backdrop-blur-xl sm:left-5 sm:top-5"
      >
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => setSheet("profile")} className="flex min-w-0 items-center gap-2.5 text-left">
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold leading-tight text-stone-900">{profile?.name}</span>
              <span className="block truncate text-[11px] font-semibold text-amber-600">{title.name}</span>
            </span>
          </button>
          <div className="text-right">
            <div className="text-base font-extrabold tabular-nums leading-tight text-stone-900">{naira(money)}</div>
            <div className="text-[11px] font-medium text-stone-400">{rep} rep</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {NEEDS.map(({ key, label, icon: Icon, color }) => {
            const v = needs[key];
            const low = v < 25;
            return (
              <div key={key} title={label} className="flex items-center gap-2">
                <Icon className={`size-3.5 shrink-0 ${low ? "text-red-500" : "text-stone-400"}`} />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
                  <motion.div className={`h-full rounded-full ${low ? "bg-red-500" : color}`} animate={{ width: `${v}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 text-xs font-medium text-stone-500">
          <span className="flex items-center gap-1.5">
            {day > 0.5 ? <Sun className="size-3.5 text-amber-500" /> : <Moon className="size-3.5 text-indigo-400" />}
            {formatClock(minutes)} · {periodLabel(hour)}
          </span>
          <span className="flex items-center gap-1.5">
            {net === "online" ? <Wifi className="size-3.5 text-emerald-500" /> : <WifiOff className="size-3.5 text-stone-300" />}
            {net === "online" ? `${online} online` : net === "connecting" ? "connecting…" : "offline"}
          </span>
        </div>

        {nextQuest && (
          <button
            onClick={() => setSheet("quests")}
            className="mt-2.5 flex w-full items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 text-left text-xs font-semibold text-amber-800 ring-1 ring-amber-100 transition hover:bg-amber-100"
          >
            <Target className="size-3.5 shrink-0" />
            <span className="truncate">Next goal: {nextQuest.title}</span>
          </button>
        )}

        {nepa && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2.5 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200"
          >
            <ZapOff className="size-3.5" /> NEPA took light. Sleep restores half.
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 22 }}
        className="absolute right-3 top-3 z-10 flex flex-col gap-2 sm:right-5 sm:top-5 sm:flex-row"
      >
        <button
          onClick={() => (inside ? exitInterior() : enterInterior(homeRef()))}
          className="grid size-11 place-items-center rounded-2xl bg-amber-500 text-white shadow-xl ring-1 ring-black/5 transition hover:bg-amber-600 active:scale-95"
          aria-label={inside ? "Leave the building" : "Go home"}
          title={inside ? "Leave" : "Go home"}
        >
          {inside ? <DoorOpen className="size-5" /> : <House className="size-5" />}
        </button>
        <button
          onClick={() => setSound({ muted: !muted })}
          className="grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
        <button
          onClick={() => setSheet("phone")}
          className="relative grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95"
          aria-label="Phone"
        >
          <Phone className="size-5" />
          {call !== "idle" && <span className="absolute right-1.5 top-1.5 size-2.5 animate-pulse rounded-full bg-emerald-500" />}
        </button>
        <button
          onClick={() => {
            const s = useGame.getState();
            if (s.cars.length && !s.sheet) {
              const err = s.toggleDrive();
              if (err) s.toast(err, "bad");
            } else setSheet("garage");
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setSheet("garage");
          }}
          className={`relative grid size-11 place-items-center rounded-2xl shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition active:scale-95 ${driving ? "bg-sky-600 text-white" : "bg-white/85 text-stone-700 hover:bg-white"}`}
          aria-label="Car: drive or park (long-press for dealer)"
        >
          <CarFront className="size-5" />
        </button>
        <button
          onClick={() => setSheet("election")}
          className="relative grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95"
          aria-label="Governor election"
        >
          <Landmark className="size-5" />
        </button>
        <button
          onClick={() => setSheet("quests")}
          className="relative grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95"
          aria-label="Goals"
        >
          <ListChecks className="size-5" />
        </button>
        <button
          onClick={() => setSheet("profile")}
          className="grid size-11 place-items-center rounded-2xl bg-white/85 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95"
          aria-label="Profile"
        >
          <UserRound className="size-5" />
        </button>
      </motion.div>
    </>
  );
}
