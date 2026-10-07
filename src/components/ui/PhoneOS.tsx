"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, BatteryFull, Briefcase, ChevronLeft, DoorOpen, HeartHandshake, HelpCircle, ListChecks, MapPin, MessageCircle, Music2, Newspaper, Phone, Plane, Search, ShoppingBag, Signal, Store, Wifi } from "lucide-react";
import { eventsAt } from "@/lib/events";
import { useClock } from "@/lib/hooks";
import { NEWS } from "@/lib/news";
import { PLACES } from "@/lib/places";
import { me } from "@/lib/playerState";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";
import { formatClock } from "@/lib/time";
import { CAMPUS_PLACES } from "@/lib/world";
import GuideSheet from "./GuideSheet";
import FlightsSheet from "./FlightsSheet";
import JobsPanel from "./JobsPanel";
import MusicSheet from "./MusicSheet";
import { ChatsPanel } from "./FriendsTabs";
import { MarketApp, SearchApp, VisitsApp } from "./PhoneExtras";

export type AppId = "jobs" | "news" | "calls" | "messages" | "maps" | "goals" | "buy" | "flights" | "music" | "family" | "guide" | "market" | "visits" | "search";

const APPS: { id: AppId; label: string; icon: typeof Phone; tint: string }[] = [
  { id: "jobs", label: "Jobs", icon: Briefcase, tint: "from-emerald-400 to-teal-600" },
  { id: "news", label: "News", icon: Newspaper, tint: "from-sky-400 to-blue-600" },
  { id: "messages", label: "Messages", icon: MessageCircle, tint: "from-indigo-400 to-violet-600" },
  { id: "calls", label: "Calls", icon: Phone, tint: "from-green-400 to-emerald-600" },
  { id: "maps", label: "Maps", icon: MapPin, tint: "from-rose-400 to-red-600" },
  { id: "goals", label: "Goals", icon: ListChecks, tint: "from-amber-400 to-orange-600" },
  { id: "buy", label: "Buy", icon: ShoppingBag, tint: "from-fuchsia-400 to-purple-600" },
  { id: "flights", label: "Flights", icon: Plane, tint: "from-cyan-400 to-sky-600" },
  { id: "music", label: "Music", icon: Music2, tint: "from-pink-400 to-rose-600" },
  { id: "family", label: "Family", icon: HeartHandshake, tint: "from-orange-400 to-red-500" },
  { id: "guide", label: "Guide", icon: HelpCircle, tint: "from-stone-400 to-stone-600" },
  { id: "market", label: "Market", icon: Store, tint: "from-lime-400 to-green-600" },
  { id: "visits", label: "Visits", icon: DoorOpen, tint: "from-yellow-400 to-amber-600" },
  { id: "search", label: "Search", icon: Search, tint: "from-slate-400 to-slate-600" },
];
const DOCK: AppId[] = ["calls", "messages", "jobs", "maps"];

/* ---------------------------------- small apps ---------------------------------- */

function NewsApp() {
  const { hour } = useClock();
  const policy = useGame((s) => s.election?.governor?.policy);
  const gov = useGame((s) => s.election?.governor);
  const live = eventsAt(hour);
  return (
    <>
      <h3 className="text-xl font-extrabold tracking-tight">Ibadan Daily</h3>
      <p className="text-xs text-stone-500">{gov ? `Governor ${gov.name}${policy && policy !== "none" ? ` · policy: ${policy}` : ""}` : "Oyo State · no governor yet"}</p>
      <ul className="mt-3 space-y-2">
        {live.map((e) => (
          <li key={e.id} className="flex items-center justify-between gap-2 rounded-xl bg-rose-50 p-3 ring-1 ring-rose-100">
            <span className="text-sm font-semibold text-rose-800">
              {e.emoji} Live now: {e.title}
            </span>
            <button
              onClick={() => {
                useGame.getState().select({ type: "place", id: e.placeId });
                useGame.getState().setSheet(null);
              }}
              className="flex shrink-0 items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white"
            >
              <MapPin className="size-3" /> Show
            </button>
          </li>
        ))}
        {NEWS.map((n) => (
          <li key={n} className="rounded-xl bg-white p-3 text-sm font-medium ring-1 ring-black/5">
            {n}
          </li>
        ))}
      </ul>
    </>
  );
}

function MapsApp() {
  const [q, setQ] = useState("");
  const campus = useGame((s) => s.campus);
  const px = Math.round(me.x);
  const pz = Math.round(me.z);
  const term = q.trim().toLowerCase();
  const list = PLACES.filter((p) => (campus || !CAMPUS_PLACES.includes(p.id)) && (!term || `${p.name} ${p.district} ${p.kind}`.toLowerCase().includes(term)))
    .map((p) => ({ p, d: Math.hypot(p.pos[0] - px, p.pos[1] - pz) * 25 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 20);
  return (
    <>
      <label className="flex items-center gap-2 rounded-2xl bg-stone-100 px-3.5 py-2.5 ring-2 ring-transparent focus-within:bg-white focus-within:ring-emerald-500">
        <Search className="size-4 text-stone-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search places and districts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400" />
      </label>
      <ul className="mt-3 space-y-2">
        {list.map(({ p, d }) => (
          <li key={p.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-2.5 ring-1 ring-black/5">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {p.emoji} {p.name}
              </p>
              <p className="text-xs text-stone-500">
                {p.district} · {Math.round(d)} m
              </p>
            </div>
            <button
              onClick={() => {
                useGame.getState().select({ type: "place", id: p.id });
                useGame.getState().setSheet(null);
              }}
              className="shrink-0 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95"
            >
              Go
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

const FAMILY = [
  { id: "mummy", name: "Mummy", emoji: "👩🏾", msgs: ["Have you eaten? Don't skip meals o.", "I'm praying for you. Greet your landlord.", "Don't stay out late. Ibadan is not Lagos but still."], gift: "Send ₦5,000 to Mummy", rep: 1 },
  { id: "bola", name: "Sis Bola", emoji: "👩🏽", msgs: ["Are you coming to the owambe on Saturday?", "That your agbada is old school. Let's go shopping.", "I got the job! Celebrate me."], gift: "Send ₦5,000 to Bola", rep: 0 },
  { id: "tayo", name: "Bro Tayo", emoji: "🧑🏿", msgs: ["Abeg, can you borrow me small money? 😅", "Shooting Stars will win. Bet?", "I saw you with that girl o. I will tell Mummy!"], gift: "Send ₦5,000 to Tayo", rep: 0 },
];
const cooldown = new Map<string, number>();

/** Run `fn` unless the same action was done in the last 45 seconds. */
function tryAct(key: string, fn: () => void, tooSoon: () => void) {
  if (Date.now() < (cooldown.get(key) ?? 0)) return tooSoon();
  cooldown.set(key, Date.now() + 45_000);
  fn();
}

function FamilyApp() {
  const { hour } = useClock();
  const money = useGame((s) => s.money);
  const [note, setNote] = useState("");
  const act = (id: string, fn: () => void, label: string) => tryAct(`${id}:${label}`, fn, () => setNote("Give them a little time to reply."));
  return (
    <>
      <h3 className="text-xl font-extrabold tracking-tight">Family</h3>
      <p className="text-xs text-stone-500">The people who miss you, and want to be sure you&apos;ve eaten.</p>
      {note && <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">{note}</p>}
      <ul className="mt-3 space-y-3">
        {FAMILY.map((f) => (
          <li key={f.id} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
            <p className="text-sm font-bold">
              <span className="mr-1.5 text-lg">{f.emoji}</span>
              {f.name}
            </p>
            <p className="mt-2 rounded-2xl rounded-tl-sm bg-stone-100 px-3.5 py-2 text-[13px] text-stone-700">{f.msgs[Math.floor(hour) % f.msgs.length]}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() =>
                  act(f.id, () => {
                    useGame.getState().adjustNeeds({ social: 10 });
                    setNote(`${f.name}: “Ah, my pikin! E se o.” +10 social`);
                  }, "reply")
                }
                className="flex-1 rounded-xl bg-stone-900 py-2 text-xs font-bold text-white transition active:scale-95"
              >
                Reply & chat
              </button>
              <button
                disabled={money < 5000}
                onClick={() =>
                  act(f.id, () => {
                    useGame.setState((s) => ({ money: s.money - 5000, rep: s.rep + f.rep }));
                    useGame.getState().adjustNeeds({ social: 14, fun: 4 });
                    setNote(`${f.name} is so happy. “God bless you!” +14 social${f.rep ? `, +${f.rep} rep` : ""}`);
                  }, "gift")
                }
                className="flex-1 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
              >
                {f.gift.replace("₦5,000", naira(5000))}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ---------------------------------- the phone ---------------------------------- */

export type Renderers = { goals: () => React.ReactNode; buy: () => React.ReactNode; calls: () => React.ReactNode };

/** A phone you hold in the game: home screen, dock and apps. Jobs, news, messages, calls, maps, goals, shopping, flights, music, family and the guide. */
export default function PhoneOS({ initial = null, render, fullscreen = false, onClose }: { initial?: AppId | null; render: Renderers; fullscreen?: boolean; onClose?: () => void }) {
  const [app, setApp] = useState<AppId | null>(initial);
  const { minutes, day } = useClock();
  const call = useGame((s) => s.call.phase);
  const unread = useGame((s) => s.threads.reduce((n, t) => n + t.unread, 0));
  const meta = APPS.find((a) => a.id === app);
  const current = call !== "idle" && app !== "calls" ? "calls" : app;

  const body = () => {
    switch (current) {
      case "jobs":
        return <JobsPanel onPick={() => useGame.getState().setSheet(null)} />;
      case "news":
        return <NewsApp />;
      case "messages":
        return <ChatsPanel />;
      case "calls":
        return render.calls();
      case "maps":
        return <MapsApp />;
      case "goals":
        return render.goals();
      case "buy":
        return render.buy();
      case "flights":
        return <FlightsSheet />;
      case "music":
        return <MusicSheet />;
      case "family":
        return <FamilyApp />;
      case "guide":
        return <GuideSheet />;
      case "market":
        return <MarketApp />;
      case "visits":
        return <VisitsApp />;
      case "search":
        return <SearchApp />;
      default:
        return null;
    }
  };

  const Icon = ({ id, big }: { id: AppId; big?: boolean }) => {
    const a = APPS.find((x) => x.id === id)!;
    const badge = (id === "messages" && unread > 0 ? unread : 0) || (id === "calls" && call !== "idle" ? 1 : 0);
    return (
      <button onClick={() => setApp(id)} className="group relative flex flex-col items-center gap-1.5" aria-label={a.label}>
        <span className={`grid ${big ? "size-11" : "size-10"} place-items-center rounded-xl bg-gradient-to-br ${a.tint} text-white shadow-md ring-1 ring-white/20 transition group-hover:scale-105 group-active:scale-90`}>
          <a.icon className={big ? "size-5" : "size-[1.15rem]"} />
        </span>
        {!big && <span className="text-[10px] font-medium leading-none text-white/90">{a.label}</span>}
        {badge > 0 && <span className="absolute -right-0.5 -top-1 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-4 text-white ring-2 ring-stone-900">{badge}</span>}
      </button>
    );
  };

  return (
    <div className={fullscreen ? "mx-auto h-full w-full max-w-lg bg-stone-950" : "mx-auto w-full max-w-[17rem] rounded-[2.2rem] sm:max-w-[19.5rem] sm:rounded-[2.4rem] bg-stone-950 p-2 shadow-2xl ring-1 ring-black/40"}>
      <div className={`relative flex flex-col overflow-hidden bg-gradient-to-b from-indigo-950 via-[#3a2a3a] to-[#8a4326] text-white ${fullscreen ? "h-full pt-[env(safe-area-inset-top)]" : "h-[min(34rem,70dvh)] rounded-[1.9rem]"}`}>
        {/* status bar */}
        <div className="relative z-10 flex items-center justify-between px-5 pb-1 pt-2.5 text-[11px] font-semibold">
          <span>{formatClock(minutes)}</span>
          <span className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1.5">
            <Signal className="size-3.5" />
            <Wifi className="size-3.5" />
            <BatteryFull className="size-4" />
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {!current ? (
            <motion.div key="home" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.18 }} className="relative flex flex-1 flex-col px-4 pb-3 pt-3">
              {fullscreen && onClose && (
                <button onClick={onClose} aria-label="Close the phone" className="absolute right-4 top-1 grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition active:scale-90">
                  <X className="size-4" />
                </button>
              )}
              <p className="text-center text-5xl font-extralight tabular-nums">{formatClock(minutes).replace(/ (am|pm)/, "")}</p>
              <p className="mt-0.5 text-center text-xs text-white/70">
                Ibadan · {day > 0.5 ? "☀️ 29°C, sunny" : "🌙 24°C, clear"}
              </p>
              <div className={`mt-4 grid grid-cols-4 gap-x-3 px-1 ${fullscreen ? "gap-y-7" : "gap-y-5"}`}>
                {APPS.filter((a) => !DOCK.includes(a.id)).map((a) => (
                  <Icon key={a.id} id={a.id} />
                ))}
              </div>
              <div className="mt-auto flex items-center justify-around rounded-[1.5rem] bg-white/15 px-3 py-2.5 backdrop-blur">
                {DOCK.map((id) => (
                  <Icon key={id} id={id} big />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key={current} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="relative flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center gap-2 px-3 pb-2 pt-1">
                <button onClick={() => setApp(null)} aria-label="Home" className="grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition active:scale-90">
                  <ChevronLeft className="size-5" strokeWidth={2.4} />
                </button>
                <p className="flex-1 text-sm font-bold">{meta?.label ?? APPS.find((a) => a.id === current)?.label}</p>
                {fullscreen && onClose && (
                  <button onClick={onClose} aria-label="Close the phone" className="grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition active:scale-90">
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <div className="mx-1.5 flex-1 overflow-y-auto rounded-t-[1.5rem] bg-stone-50 p-4 text-stone-900">{body()}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setApp(null)} aria-label="Go to the home screen" className="grid h-6 shrink-0 place-items-center">
          <span className="h-1 w-24 rounded-full bg-white/70" />
        </button>
      </div>
    </div>
  );
}
