"use client";

import { AnimatePresence, motion } from "motion/react";
import { HelpCircle, LogOut, Car, Music2, Check, CheckCircle2, Circle, Copy, Eye, Footprints, Landmark, Moon, PencilLine, PhoneCall, PhoneOff, Sun, SunMoon, Volume2, VolumeX, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useGame, ownedBy } from "@/lib/store";
import { net } from "@/lib/net";
import { PLOTS, TIERS, naira, plotById } from "@/lib/plots";
import { me } from "@/lib/playerState";
import { TITLES, titleProgress } from "@/lib/titles";
import { QUESTS } from "@/lib/quests";
import { walkTo } from "@/lib/movement";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { MuteButton } from "./parts";
import { useSecond } from "@/lib/hooks";
import type { Policy } from "@/lib/protocol";
import { CARS } from "@/lib/cars";
import { signOut } from "@/lib/api";
import InstallApp from "./InstallApp";
import CallAlerts from "./CallAlerts";
import PhoneOS, { type AppId } from "./PhoneOS";
import FriendsTabs from "./FriendsTabs";
import { useSound } from "@/lib/soundStore";
import { THEME_SONG } from "@/lib/themeSong";

/**
 * A panel over the game. On a phone every panel fills the screen until you go back; on a laptop they are popups at the side.
 */
/** True on a phone-sized screen. */
function useIsPhone() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(max-width: 639px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );
}

function Frame({ title, onClose, children, full = false, bare = false }: { title: string; onClose: () => void; children: React.ReactNode; full?: boolean; bare?: boolean }) {
  const shell = full
    ? "inset-0 bg-stone-50"
    : "inset-0 bg-stone-50 sm:inset-x-auto sm:bottom-[calc(5.4rem+env(safe-area-inset-bottom))] sm:right-5 sm:top-20 sm:w-[24rem] sm:rounded-[1.6rem] sm:bg-white/90 sm:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] sm:ring-1 sm:ring-white/60 sm:backdrop-blur-2xl";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={`absolute z-[45] flex flex-col overflow-hidden ${shell} ${full ? "" : "max-sm:pt-[env(safe-area-inset-top)] max-sm:pb-[env(safe-area-inset-bottom)]"}`}
    >
      {bare ? (
        children
      ) : (
        <>
          <div className={`flex shrink-0 items-center justify-between border-b border-stone-200 px-4 py-3 ${full ? "pt-[calc(env(safe-area-inset-top)+0.75rem)]" : ""}`}>
            <h2 className="text-base font-bold text-stone-900">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200 active:scale-90">
              <X className="size-5" />
            </button>
          </div>
          <div className={`min-h-0 flex-1 overflow-y-auto p-4 ${full ? "pb-[calc(env(safe-area-inset-bottom)+1rem)]" : ""}`}>
            <div className={full ? "mx-auto flex h-full w-full max-w-xl flex-col" : ""}>{children}</div>
          </div>
        </>
      )}
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
      <p className="mt-3 text-[11px] text-stone-400">
        Music: {THEME_SONG.artist} — {THEME_SONG.title}
      </p>
    </div>
  );
}

function ViewSettings() {
  const timeMode = useGame((s) => s.timeMode);
  const placesOnly = useGame((s) => s.placesOnly);
  const hasCar = useGame((s) => s.cars.length > 0);
  const driving = useGame((s) => s.driving);
  const soundMuted = useSound((s) => s.muted);
  const setSound = useSound((s) => s.set);
  const patch = useGame((s) => s.patch);
  const seg = (on: boolean) => `flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition active:scale-95 ${on ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-700"}`;
  const row = "flex w-full items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-800 ring-1 ring-black/5 transition active:scale-[0.98]";

  return (
    <>
      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Time of day</p>
      <div className="flex gap-2">
        {([
          ["auto", "Auto", SunMoon, null],
          ["day", "Day", Sun, 12],
          ["night", "Night", Moon, 22],
        ] as const).map(([id, label, Icon, hour]) => (
          <button key={id} onClick={() => patch({ timeMode: id, clockOverride: hour })} className={seg(timeMode === id)}>
            <Icon className="size-3.5" /> {label}
          </button>
        ))}
      </div>

      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Quick settings</p>
      <div className="space-y-2">
        <button onClick={() => patch({ placesOnly: !placesOnly })} className={row}>
          <span className="flex items-center gap-2.5">
            <Eye className="size-4 text-stone-500" /> Show only locations
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs ${placesOnly ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-600"}`}>{placesOnly ? "On" : "Off"}</span>
        </button>
        <button onClick={() => setSound({ muted: !soundMuted })} className={row}>
          <span className="flex items-center gap-2.5">
            {soundMuted ? <VolumeX className="size-4 text-stone-500" /> : <Volume2 className="size-4 text-stone-500" />} Sound
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs ${soundMuted ? "bg-stone-200 text-stone-600" : "bg-emerald-600 text-white"}`}>{soundMuted ? "Off" : "On"}</span>
        </button>
        <button onClick={() => useGame.getState().setSheet("guide")} className={row}>
          <span className="flex items-center gap-2.5">
            <HelpCircle className="size-4 text-stone-500" /> How to play
          </span>
          <span className="text-stone-400">›</span>
        </button>
        <button onClick={() => useGame.getState().setSheet("music")} className={row}>
          <span className="flex items-center gap-2.5">
            <Music2 className="size-4 text-stone-500" /> Music &amp; sounds
          </span>
          <span className="text-stone-400">›</span>
        </button>
        <button onClick={() => useGame.getState().setSheet("election")} className={row}>
          <span className="flex items-center gap-2.5">
            <Landmark className="size-4 text-stone-500" /> Governor election
          </span>
          <span className="text-stone-400">›</span>
        </button>
        {hasCar && (
          <button
            onClick={() => {
              const err = useGame.getState().toggleDrive();
              if (err) useGame.getState().toast(err, "bad");
              else useGame.getState().setSheet(null);
            }}
            className={row}
          >
            <span className="flex items-center gap-2.5">
              <Car className="size-4 text-stone-500" /> {driving ? "Park your car" : "Drive your car"}
            </span>
            <span className="text-stone-400">›</span>
          </button>
        )}
      </div>
    </>
  );
}

function BuySheet() {
  const [tab, setTab] = useState<"land" | "cars">("land");
  const plots = useGame((s) => s.plots);
  const money = useGame((s) => s.money);
  const forSale = PLOTS.filter((p) => !plots[p.id])
    .map((p) => ({ p, d: Math.hypot(p.pos[0] - me.x, p.pos[1] - me.z) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 12);
  const seg = (on: boolean) => `flex-1 rounded-xl py-2 text-sm font-semibold transition active:scale-95 ${on ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`;

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setTab("land")} className={seg(tab === "land")}>
          Land
        </button>
        <button onClick={() => setTab("cars")} className={seg(tab === "cars")}>
          Cars
        </button>
      </div>
      {tab === "cars" ? (
        <GarageSheet />
      ) : (
        <>
          <p className="mb-3 text-xs text-stone-500">Plots for sale nearest to you. Tap one to see it on the map and buy.</p>
          <ul className="space-y-2">
            {forSale.map(({ p, d }) => (
              <li key={p.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-900">{p.district}</p>
                  <p className="text-xs text-stone-500">{Math.round(d * 25)} m away</p>
                </div>
                <button
                  onClick={() => {
                    useGame.getState().patch({ selected: { type: "plot", id: p.id }, sheet: null });
                    walkTo(p.pos[0], p.pos[1] + 2.3);
                  }}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition active:scale-95 ${money >= p.price ? "bg-emerald-600" : "bg-stone-400"}`}
                >
                  {naira(p.price)}
                </button>
              </li>
            ))}
            {forSale.length === 0 && <li className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">Every plot is taken. Check back later.</li>}
          </ul>
        </>
      )}
    </>
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
          {profile.username && <p className="text-sm font-semibold text-stone-400">@{profile.username}</p>}
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

      <ViewSettings />

      <CallAlerts className="mt-5" />
      <InstallApp className="mt-3" />

      <button
        onClick={() => {
          if (confirm("Sign out of Omo'badan? Your progress is saved to your account.")) void signOut();
        }}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-100 transition active:scale-[0.98]"
      >
        <LogOut className="size-4" /> Sign out
      </button>

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

const POLICY_INFO: { id: Policy; label: string; blurb: string }[] = [
  { id: "none", label: "No policy", blurb: "Business as usual." },
  { id: "transport", label: "Free keke", blurb: "Every keke ride in Ibadan costs nothing." },
  { id: "food", label: "Cheap food", blurb: "20% off everything that fills your stomach." },
  { id: "wages", label: "Pay rise", blurb: "Every job pays 15% more." },
];

function ElectionSheet() {
  const e = useGame((s) => s.election);
  const myVote = useGame((s) => s.myVote);
  const pid = useGame((s) => s.profile?.id);
  const [slogan, setSlogan] = useState("");
  const sec = useSecond();
  if (!e) return <p className="text-sm text-stone-500">Connect to the city to see the election.</p>;
  const left = Math.max(0, Math.round(e.endsAt / 1000 - sec));
  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  const running = e.candidates.some((c) => c.pid === pid);
  const total = e.candidates.reduce((n, c) => n + c.votes, 0) || 1;
  const isGov = e.governor?.pid === pid;
  const sorted = [...e.candidates].sort((a, b) => b.votes - a.votes);

  return (
    <>
      <div className="rounded-2xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Governor · term {e.term}</p>
        {e.governor ? (
          <>
            <p className="mt-1 text-lg font-bold text-indigo-950">{isGov ? "You" : e.governor.name}</p>
            <p className="text-xs italic text-indigo-800/80">“{e.governor.slogan}”</p>
            <p className="mt-2 text-xs text-indigo-900">
              Policy: <b>{POLICY_INFO.find((p) => p.id === e.governor!.policy)?.label}</b>
            </p>
          </>
        ) : (
          <p className="mt-1 text-sm text-indigo-900">Seat is empty. Be the first to rule Oyo State.</p>
        )}
        <p className="mt-2 text-[11px] text-indigo-700">Next election in {mm}</p>
      </div>

      {isGov && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-bold text-stone-900">Your policy</p>
          <div className="space-y-1.5">
            {POLICY_INFO.map((p) => (
              <button
                key={p.id}
                onClick={() => net.policy(p.id)}
                className={`w-full rounded-xl p-3 text-left ring-1 transition ${e.governor?.policy === p.id ? "bg-indigo-600 text-white ring-indigo-600" : "bg-white ring-black/10 hover:bg-stone-50"}`}
              >
                <p className="text-sm font-semibold">{p.label}</p>
                <p className={`text-xs ${e.governor?.policy === p.id ? "text-indigo-100" : "text-stone-500"}`}>{p.blurb}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mb-2 mt-5 text-sm font-bold text-stone-900">Candidates</p>
      {sorted.length === 0 && <p className="text-xs text-stone-500">Nobody is running yet.</p>}
      <ul className="space-y-2">
        {sorted.map((c) => (
          <li key={c.pid} className="rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-stone-900">{c.pid === pid ? `${c.name} (you)` : c.name}</p>
                <p className="truncate text-xs italic text-stone-500">“{c.slogan}”</p>
              </div>
              <button
                onClick={() => net.vote(c.pid)}
                disabled={myVote === c.pid}
                className="shrink-0 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition active:scale-95 disabled:bg-emerald-600"
              >
                {myVote === c.pid ? "Voted" : "Vote"}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(c.votes / total) * 100}%` }} />
              </div>
              <span className="text-[11px] font-semibold text-stone-500">{c.votes}</span>
            </div>
          </li>
        ))}
      </ul>

      {!running && (
        <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-black/10">
          <p className="text-sm font-bold text-stone-900">Run for Governor</p>
          <input
            value={slogan}
            onChange={(ev) => setSlogan(ev.target.value.slice(0, 60))}
            placeholder="Your slogan, e.g. Ibadan First!"
            className="mt-2 w-full rounded-xl bg-stone-50 px-3 py-2 text-sm outline-none ring-1 ring-black/10 focus:ring-indigo-400"
          />
          <button
            onClick={() => {
              net.run(slogan.trim());
              setSlogan("");
            }}
            className="mt-2 w-full rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white transition active:scale-95"
          >
            Join the race
          </button>
        </div>
      )}
    </>
  );
}

function GarageSheet() {
  const money = useGame((s) => s.money);
  const owned = useGame((s) => s.cars);
  const active = useGame((s) => s.activeCar);
  const driving = useGame((s) => s.driving);
  const colors = useGame((s) => s.carColors);
  const speedLabel = (n: number) => (n >= 12 ? "Very fast" : n >= 10 ? "Fast" : n >= 8 ? "Quick" : "Nippy");
  return (
    <>
      <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
        <p className="text-sm font-bold text-sky-950">Ibadan Autos</p>
        <p className="mt-1 text-xs text-sky-900/80">Buy a ride, then drive anywhere in the city. No more keke fares, and you move much faster than on foot.</p>
      </div>
      <ul className="mt-4 space-y-3">
        {CARS.map((c) => {
          const have = owned.includes(c.id);
          const on = driving && active === c.id;
          const color = colors[c.id] ?? c.colors[0];
          return (
            <li key={c.id} className="rounded-2xl bg-stone-50 p-3.5 ring-1 ring-black/5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-stone-900">{c.name}</p>
                  <p className="text-xs text-stone-500">{c.blurb}</p>
                  <p className="mt-1 text-[11px] font-semibold text-stone-600">{speedLabel(c.speed)} · {c.speed} u/s</p>
                </div>
                <span className="mt-0.5 size-6 shrink-0 rounded-full ring-2 ring-white shadow" style={{ background: color }} />
              </div>
              {have && (
                <div className="mt-2 flex items-center gap-1.5">
                  {c.colors.map((col) => (
                    <button key={col} aria-label={`Paint ${col}`} onClick={() => useGame.getState().setCarColor(c.id, col)} className={`size-6 rounded-full ring-2 transition ${color === col ? "ring-stone-900" : "ring-white"}`} style={{ background: col }} />
                  ))}
                </div>
              )}
              <div className="mt-3">
                {have ? (
                  <button
                    onClick={() => {
                      const err = useGame.getState().toggleDrive(c.id);
                      if (err) useGame.getState().toast(err, "bad");
                      else useGame.getState().setSheet(null);
                    }}
                    className={`w-full rounded-xl py-2 text-sm font-semibold transition active:scale-95 ${on ? "bg-stone-900 text-white" : "bg-emerald-600 text-white"}`}
                  >
                    {on ? "Park it" : "Drive"}
                  </button>
                ) : (
                  <button
                    disabled={money < c.price}
                    onClick={() => {
                      const err = useGame.getState().buyCar(c.id);
                      if (err) useGame.getState().toast(err, "bad");
                      else useGame.getState().toast(`${c.name} is yours!`, "good");
                    }}
                    className="w-full rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white transition active:scale-95 disabled:bg-stone-200 disabled:text-stone-400"
                  >
                    Buy · {naira(c.price)}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Sheets() {
  const sheet = useGame((s) => s.sheet);
  const setSheet = useGame((s) => s.setSheet);
  // every phone-related sheet opens the phone, on the right app
  const PHONE_APPS: Record<string, AppId | null> = { phone: null, quests: "goals", buy: "buy", garage: "buy", flights: "flights", music: "music", guide: "guide" };
  const phoneApp = sheet && sheet in PHONE_APPS ? PHONE_APPS[sheet] : undefined;
  const onPhone = useIsPhone();
  return (
    <AnimatePresence>
      {phoneApp !== undefined && (
        <Frame key="phone" title="Phone" onClose={() => setSheet(null)} full={onPhone} bare={onPhone}>
          <PhoneOS key={sheet} fullscreen={onPhone} onClose={() => setSheet(null)} initial={phoneApp} render={{ goals: () => <QuestsSheet />, buy: () => <BuySheet />, calls: () => <PhoneSheet /> }} />
        </Frame>
      )}
      {sheet === "friends" && (
        <Frame key="friends" title="Friends" onClose={() => setSheet(null)}>
          <FriendsTabs />
        </Frame>
      )}
      {sheet === "election" && (
        <Frame key="election" title="Governor election" onClose={() => setSheet(null)}>
          <ElectionSheet />
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

