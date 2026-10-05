"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, CheckCircle2, Circle, Copy, Footprints, PencilLine, PhoneCall, PhoneOff, X } from "lucide-react";
import { useState } from "react";
import { useGame, ownedBy } from "@/lib/store";
import { net } from "@/lib/net";
import { TIERS, naira, plotById } from "@/lib/plots";
import { TITLES, titleProgress } from "@/lib/titles";
import { QUESTS } from "@/lib/quests";
import { walkTo } from "@/lib/movement";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { MuteButton } from "./parts";
import { useSound } from "@/lib/soundStore";

function Frame({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="absolute inset-x-3 bottom-3 top-20 z-30 flex flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:w-[24rem]"
    >
      <div className="flex items-center justify-between border-b border-stone-100 px-5 py-3.5">
        <h2 className="text-base font-bold text-stone-900">{title}</h2>
        <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
    </motion.div>
  );
}

function PhoneSheet() {
  const remoteMap = useGame((s) => s.remotes);
  const remotes = Object.values(remoteMap);
  const call = useGame((s) => s.call);
  const netState = useGame((s) => s.net);
  const [copied, setCopied] = useState(false);

  if (call.phase !== "idle") {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <motion.div
          animate={call.phase === "live" ? { scale: 1 } : { scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="grid size-24 place-items-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700"
        >
          {call.peerName.slice(0, 1).toUpperCase()}
        </motion.div>
        <p className="mt-4 text-xl font-bold text-stone-900">{call.peerName}</p>
        <p className="mt-1 text-sm text-stone-500">{call.phase === "calling" ? "Calling…" : "Connected"}</p>
        <div className="mt-6 flex items-center gap-3">
          {call.phase === "live" && <MuteButton />}
          <button onClick={() => net.hangup()} className="grid size-14 place-items-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition active:scale-90" aria-label="Hang up">
            <PhoneOff className="size-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">People online</p>
      {netState !== "online" && (
        <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          You&apos;re offline. Start the game server (<code className="font-mono text-xs">npm run server</code>) to see and call other players.
        </div>
      )}
      {netState === "online" && remotes.length === 0 && (
        <div className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">
          <p>No one else is online right now.</p>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(location.origin + "/play").then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              });
            }}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition active:scale-95"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied ? "Link copied" : "Copy invite link"}
          </button>
        </div>
      )}
      <ul className="space-y-2">
        {remotes.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{r.name.slice(0, 1).toUpperCase()}</span>
              <div>
                <p className="text-sm font-semibold text-stone-900">{r.name}</p>
                <p className="text-xs text-stone-400">{r.room === "streets" ? "Out and about" : r.room.replace(/-/g, " ")}</p>
              </div>
            </div>
            <button onClick={() => net.call(r.id, r.name)} className="grid size-10 place-items-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:scale-90" aria-label={`Call ${r.name}`}>
              <PhoneCall className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function QuestsSheet() {
  const done = useGame((s) => s.questsDone);
  const stats = useGame((s) => s.stats);
  const plots = useGame((s) => s.plots);
  const pid = useGame((s) => s.profile?.id);
  const qs = { stats, plots, pid };
  const nextId = QUESTS.find((q) => !done.includes(q.id))?.id;

  return (
    <>
      <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
        <p className="text-sm font-bold text-amber-900">
          {done.length} of {QUESTS.length} goals complete
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-100">
          <motion.div className="h-full rounded-full bg-amber-500" animate={{ width: `${(done.length / QUESTS.length) * 100}%` }} transition={{ duration: 0.6 }} />
        </div>
        <p className="mt-2 text-xs text-amber-800/80">Goals pay cash and reputation, and nudge you through everything Ibadan offers.</p>
      </div>
      <ul className="mt-4 space-y-2">
        {QUESTS.map((q) => {
          const isDone = done.includes(q.id);
          const prog = q.progress?.(qs);
          return (
            <li
              key={q.id}
              className={`rounded-2xl p-3.5 ring-1 ${isDone ? "bg-emerald-50/60 ring-emerald-100" : q.id === nextId ? "bg-white ring-amber-300 shadow-sm" : "bg-stone-50 ring-black/5"}`}
            >
              <div className="flex items-start gap-3">
                {isDone ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" /> : <Circle className={`mt-0.5 size-5 shrink-0 ${q.id === nextId ? "text-amber-500" : "text-stone-300"}`} />}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold ${isDone ? "text-stone-400 line-through" : "text-stone-900"}`}>{q.title}</p>
                  <p className="text-xs text-stone-500">{q.blurb}</p>
                  {prog && !isDone && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: `${(prog.cur / prog.max) * 100}%` }} />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500">
                        {prog.cur}/{prog.max}
                      </span>
                    </div>
                  )}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {q.reward.money ? <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-emerald-700">+{naira(q.reward.money)}</span> : null}
                    {q.reward.rep ? <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-amber-700">+{q.reward.rep} rep</span> : null}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function SoundSliders() {
  const music = useSound((s) => s.music);
  const sfx = useSound((s) => s.sfx);
  const set = useSound((s) => s.set);
  return (
    <div className="mt-5 rounded-2xl bg-stone-50 p-4 ring-1 ring-black/5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">Sound</p>
      {(
        [
          ["Music", music, (v: number) => set({ music: v })],
          ["Effects and street", sfx, (v: number) => set({ sfx: v })],
        ] as const
      ).map(([label, value, onChange]) => (
        <label key={label} className="mb-2 flex items-center gap-3 text-sm text-stone-600 last:mb-0">
          <span className="w-32 shrink-0">{label}</span>
          <input type="range" min={0} max={1} step={0.05} value={value} onChange={(e) => onChange(Number(e.target.value))} className="h-1.5 w-full accent-emerald-600" />
        </label>
      ))}
    </div>
  );
}

function ProfileSheet() {
  const profile = useGame((s) => s.profile)!;
  const rep = useGame((s) => s.rep);
  const money = useGame((s) => s.money);
  const plots = useGame((s) => s.plots);
  const owned = ownedBy(plots, profile.id);
  const prog = titleProgress(rep);
  const muted = useGame((s) => s.muted);
  const clearMuted = useGame((s) => s.clearMuted);

  return (
    <>
      <div className="relative -mx-5 -mt-5 h-52 bg-gradient-to-b from-emerald-50 to-amber-50">
        <AvatarPreview look={profile.look} className="absolute inset-0" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-stone-900">{profile.name}</p>
          <p className="text-sm font-semibold text-amber-600">{prog.cur.name}</p>
        </div>
        <button
          onClick={() => {
            useGame.getState().patch({ editingAvatar: true, sheet: null });
          }}
          className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-200 active:scale-95"
        >
          <PencilLine className="size-3.5" /> Edit look
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-stone-50 p-4 ring-1 ring-black/5">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
          <span>{prog.cur.name}</span>
          <span>{prog.next ? prog.next.name : "Top of the ladder"}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200">
          <motion.div className="h-full rounded-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${prog.pct}%` }} transition={{ duration: 0.8 }} />
        </div>
        <p className="mt-2 text-xs text-stone-500">
          {rep} rep{prog.next ? ` · ${prog.next.rep - rep} more to ${prog.next.name}` : ""}. Work, volunteer, join town meetings and own land to climb.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
          <p className="text-lg font-extrabold tabular-nums text-stone-900">{naira(money)}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Cash</p>
        </div>
        <div className="rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
          <p className="text-lg font-extrabold tabular-nums text-stone-900">{owned.length}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Plots owned</p>
        </div>
      </div>

      {owned.length > 0 && (
        <>
          <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Your land</p>
          <ul className="space-y-2">
            {owned.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-2.5 ring-1 ring-black/5">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{p.district}</p>
                  <p className="text-xs text-stone-400">{TIERS[plots[p.id].tier].name}</p>
                </div>
                <button
                  onClick={() => {
                    const pl = plotById(p.id)!;
                    useGame.getState().patch({ selected: { type: "plot", id: p.id }, sheet: null });
                    walkTo(pl.pos[0], pl.pos[1] + 2.3);
                  }}
                  className="grid size-9 place-items-center rounded-full bg-white text-stone-700 ring-1 ring-black/10 transition hover:bg-stone-100 active:scale-90"
                  aria-label="Go to plot"
                >
                  <Footprints className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {muted.length > 0 && (
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 text-sm ring-1 ring-black/5">
          <span className="text-stone-600">
            {muted.length} muted player{muted.length > 1 ? "s" : ""}
          </span>
          <button onClick={clearMuted} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 ring-1 ring-black/10 transition hover:bg-stone-100 active:scale-95">
            Unmute all
          </button>
        </div>
      )}

      <SoundSliders />

      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">The ladder</p>
      <ol className="space-y-1.5">
        {TITLES.map((t, i) => (
          <li key={t.name} className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${i <= prog.index ? "bg-amber-50 font-semibold text-amber-800" : "text-stone-400"}`}>
            <span>{t.name}</span>
            <span className="text-xs">{t.rep} rep</span>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function Sheets() {
  const sheet = useGame((s) => s.sheet);
  const setSheet = useGame((s) => s.setSheet);
  return (
    <AnimatePresence>
      {sheet === "phone" && (
        <Frame key="phone" title="Phone" onClose={() => setSheet(null)}>
          <PhoneSheet />
        </Frame>
      )}
      {sheet === "quests" && (
        <Frame key="quests" title="Goals" onClose={() => setSheet(null)}>
          <QuestsSheet />
        </Frame>
      )}
      {sheet === "profile" && (
        <Frame key="profile" title="You" onClose={() => setSheet(null)}>
          <ProfileSheet />
        </Frame>
      )}
    </AnimatePresence>
  );
}

