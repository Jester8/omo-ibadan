"use client";

import { motion } from "motion/react";
import { Droplets, Toilet, X, EyeOff, Eye, HelpCircle, Drumstick, Moon, PartyPopper, Sun, Target, UserRound, Users, Zap, ZapOff, Wifi, WifiOff } from "lucide-react";
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
  { key: "bladder", label: "Toilet", icon: Toilet, color: "bg-lime-500" },
  { key: "hygiene", label: "Clean", icon: Droplets, color: "bg-cyan-500" },
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
        <button
          onClick={() => patch({ hideCard: false })}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+3.7rem)] z-10 flex h-9 -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 pl-2.5 pr-3.5 text-black shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition active:scale-95 sm:top-5"
          aria-label="Show profile card"
          title="Show profile card"
        >
          <UserRound className="size-4 text-stone-600" />
          <span className="text-sm font-extrabold tabular-nums">{naira(money)}</span>
        </button>
      )}
      {hideIcons && (
        <button onClick={() => patch({ hideIcons: false })} className={`${small} absolute right-3 top-[calc(env(safe-area-inset-top)+0.9rem)] z-10 sm:right-5 sm:top-5`} aria-label="Show icons" title="Show icons">
          <Eye className="size-4" />
        </button>
      )}
      {!hideCard && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+3.7rem)] z-10 w-[min(36rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-[1.6rem] bg-white/85 p-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] ring-1 ring-white/60 backdrop-blur-2xl sm:top-5 sm:w-[min(36rem,calc(100vw-17rem))]"
        >
          <button onClick={() => patch({ hideCard: true })} className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200 active:scale-90" aria-label="Close" title="Close">
            <X className="size-4" />
          </button>

          {/* who you are, and your money, standing and who is around, all in one row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pr-9">
            <button onClick={() => setSheet("profile")} className="flex min-w-0 items-center gap-2.5 text-left">
              <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <UserRound className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold leading-tight text-black">{profile?.name}</span>
                <span className="block truncate text-[11px] font-semibold leading-tight text-stone-500">
                  {profile?.username ? `@${profile.username} · ` : ""}
                  <span className="text-amber-600">{title.name}</span>
                </span>
              </span>
            </button>
            <div className="flex flex-1 items-center justify-between gap-4 sm:justify-end sm:gap-6">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">Balance</div>
                <div className="text-base font-extrabold tabular-nums leading-tight text-black">{naira(money)}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">Rep</div>
                <div className="text-base font-extrabold tabular-nums leading-tight text-black">{rep}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">Online</div>
                <div className="flex items-center gap-1 text-base font-extrabold tabular-nums leading-tight text-black">
                  {net === "online" ? <Wifi className="size-3.5 text-emerald-500" /> : <WifiOff className="size-3.5 text-stone-300" />}
                  {net === "online" ? online : net === "connecting" ? "..." : 0}
                </div>
              </div>
            </div>
          </div>

          {/* needs, side by side, with the time of day */}
          <div className="mt-2.5 flex items-center gap-3">
            <div className="grid flex-1 grid-cols-6 gap-2">
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
            <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-stone-600">
              {day > 0.5 ? <Sun className="size-3.5 text-amber-500" /> : <Moon className="size-3.5 text-indigo-400" />}
              {formatClock(minutes)}
              {nepa && (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-amber-700">
                  <ZapOff className="size-3" /> NEPA
                </span>
              )}
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
        </motion.div>
      )}

      {!hideIcons && (
        <button onClick={() => useGame.getState().setSheet(useGame.getState().sheet === "guide" ? null : "guide")} className={`${small} absolute right-14 top-[calc(env(safe-area-inset-top)+0.9rem)] z-10 sm:right-16 sm:top-5`} aria-label="How to play" title="How to play">
          <HelpCircle className="size-4" />
        </button>
      )}
      {!hideIcons && (
        <button onClick={() => patch({ hideIcons: true })} className={`${small} absolute right-3 top-[calc(env(safe-area-inset-top)+0.9rem)] z-10 sm:right-5 sm:top-5`} aria-label="Hide menu" title="Hide menu">
          <EyeOff className="size-4" />
        </button>
      )}
    </>
  );
}
