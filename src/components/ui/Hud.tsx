"use client";

import { motion } from "motion/react";
import { ChevronUp, EyeOff, Eye, Drumstick, Moon, PartyPopper, Sun, Target, UserRound, Users, Zap, ZapOff, Wifi, WifiOff } from "lucide-react";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { formatClock } from "@/lib/time";
import { naira } from "@/lib/plots";
import { eventsAt } from "@/lib/events";
import { walkToPlace } from "@/lib/movement";
import { TITLES, titleIndex } from "@/lib/titles";
import { QUESTS } from "@/lib/quests";

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
  const questsDone = useGame((s) => s.questsDone);
  const inside = useGame((s) => !!s.interior);
  const setSheet = useGame((s) => s.setSheet);
  const hideCard = useGame((s) => s.hideCard);
  const hideIcons = useGame((s) => s.hideIcons);
  const patch = useGame((s) => s.patch);
  const { minutes, hour, day, nepa } = useClock();
  const live = eventsAt(hour);
  const title = TITLES[titleIndex(rep)];
  const nextQuest = QUESTS.find((q) => !questsDone.includes(q.id));

  const small = "grid size-9 place-items-center rounded-full bg-white/85 text-stone-600 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95";

  return (
    <>
      {hideCard && (
        <button onClick={() => patch({ hideCard: false })} className={`${small} absolute left-3 top-3 z-10 sm:left-5 sm:top-5`} aria-label="Show profile card" title="Show profile card">
          <UserRound className="size-4" />
        </button>
      )}
      {hideIcons && (
        <button onClick={() => patch({ hideIcons: false })} className={`${small} absolute right-3 top-3 z-10 sm:right-5 sm:top-5`} aria-label="Show icons" title="Show icons">
          <Eye className="size-4" />
        </button>
      )}
      {!hideCard && <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
        className="absolute left-3 top-3 z-10 w-[min(21rem,calc(100vw-5.5rem))] sm:w-[21rem] rounded-[1.6rem] bg-white/75 p-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] ring-1 ring-white/60 backdrop-blur-2xl sm:left-5 sm:top-5"
      >
        <button onClick={() => patch({ hideCard: true })} className="absolute -bottom-2.5 left-1/2 grid h-5 w-10 -translate-x-1/2 place-items-center rounded-full bg-white/90 text-stone-400 shadow ring-1 ring-black/5 hover:text-stone-700" aria-label="Hide card" title="Hide card">
          <ChevronUp className="size-3.5" />
        </button>
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

        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {NEEDS.map(({ key, label, icon: Icon, color }) => {
            const v = needs[key];
            const low = v < 25;
            return (
              <div key={key} title={`${label} ${Math.round(v)}%`} className="flex flex-col items-center gap-1">
                <Icon className={`size-3.5 ${low ? "animate-pulse text-red-500" : "text-stone-400"}`} />
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-900/10">
                  <motion.div className={`h-full rounded-full ${low ? "bg-red-500" : color}`} animate={{ width: `${v}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-stone-500">
          <span className="flex items-center gap-1.5">
            {day > 0.5 ? <Sun className="size-3.5 text-amber-500" /> : <Moon className="size-3.5 text-indigo-400" />}
            {formatClock(minutes)}
            {nepa && (
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-amber-700">
                <ZapOff className="size-3" /> NEPA
              </span>
            )}
          </span>
          <span className="flex items-center gap-1.5">
            {net === "online" ? <Wifi className="size-3.5 text-emerald-500" /> : <WifiOff className="size-3.5 text-stone-300" />}
            {net === "online" ? `${online} online` : net === "connecting" ? "connecting…" : "offline"}
          </span>
        </div>

        {!inside &&
          live.slice(0, 1).map((e) => (
            <button
              key={e.id}
              onClick={() => {
                useGame.getState().select({ type: "place", id: e.placeId });
                walkToPlace(e.placeId);
              }}
              className="mt-2 flex w-full items-center gap-1.5 rounded-xl bg-rose-500/10 px-2.5 py-1 text-left text-[11px] font-semibold text-rose-700 transition hover:bg-rose-500/20"
            >
              <span>{e.emoji}</span>
              <span className="truncate">Live now: {e.title}</span>
            </button>
          ))}

        {nextQuest && (inside || live.length === 0) && (
          <button
            onClick={() => setSheet("quests")}
            className="mt-2 flex w-full items-center gap-1.5 rounded-xl bg-amber-500/10 px-2.5 py-1 text-left text-[11px] font-semibold text-amber-800 transition hover:bg-amber-500/20"
          >
            <Target className="size-3 shrink-0" />
            <span className="truncate">{nextQuest.title}</span>
          </button>
        )}
      </motion.div>}

      {!hideIcons && (
        <button onClick={() => patch({ hideIcons: true })} className={`${small} absolute right-3 top-3 z-10 sm:right-5 sm:top-5`} aria-label="Hide menu" title="Hide menu">
          <EyeOff className="size-4" />
        </button>
      )}
    </>
  );
}
