"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldAlert, X, BatteryFull, Briefcase, ChevronLeft, DoorOpen, Landmark, HeartHandshake, HelpCircle, ListChecks, MapPin, MessageCircle, Music2, Newspaper, Phone, Plane, Search, ShoppingBag, Signal, Store, Wifi } from "lucide-react";
import { eventsAt } from "@/lib/events";
import { useClock } from "@/lib/hooks";
import { NEWS } from "@/lib/news";
import { PLACES } from "@/lib/places";
import { me } from "@/lib/playerState";
import { useGame } from "@/lib/store";
import { relationOf, roleOf, ROLES, type FamilyRole } from "@/lib/family";
import { answerFamily, askFamily, leaveFamily, loadFamily } from "@/lib/social";
import { formatClock } from "@/lib/time";
import { CAMPUS_PLACES } from "@/lib/world";
import GuideSheet from "./GuideSheet";
import FlightsSheet from "./FlightsSheet";
import JobsPanel from "./JobsPanel";
import MusicSheet from "./MusicSheet";
import { ChatsPanel } from "./FriendsTabs";
import { MarketApp, SearchApp, VisitsApp } from "./PhoneExtras";
import BankApp from "./BankApp";
import { PoliceApp } from "./CustodyUI";

export type AppId = "jobs" | "news" | "calls" | "messages" | "maps" | "goals" | "buy" | "flights" | "music" | "family" | "guide" | "market" | "visits" | "search" | "bank" | "police";

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
  { id: "bank", label: "Bank", icon: Landmark, tint: "from-emerald-500 to-green-700" },
  { id: "police", label: "Police", icon: ShieldAlert, tint: "from-blue-500 to-indigo-700" },
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

/** Everyone starts with no family. Ask a friend to be your dad, mum or sibling; they have to accept. */
function FamilyApp() {
  const family = useGame((s) => s.family);
  const friends = useGame((s) => s.friends);
  const [adding, setAdding] = useState(false);
  const [role, setRole] = useState<FamilyRole>("dad");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    void loadFamily();
  }, []);

  const linked = new Set([...family.members, ...family.incoming, ...family.outgoing].map((p) => p.pid));
  const askable = friends.filter((f) => !linked.has(f.pid));
  // one dad and one mum: taken once someone is, or has been asked to be
  const taken = (r: FamilyRole) => r !== "sibling" && (family.members.some((m) => m.relation === r) || family.outgoing.some((o) => o.role === r));
  const roleChoice = taken(role) ? (ROLES.find((r) => !taken(r.id))?.id ?? "sibling") : role;

  const ask = async (pid: string) => {
    setBusy(pid);
    const r = await askFamily(pid, roleChoice);
    setBusy(null);
    setNote(r.message);
    if (r.ok) setAdding(false);
  };
  const who = (p: { name: string; username?: string | null }) => (
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-bold">{p.name}</span>
      {p.username && <span className="block truncate text-[11px] font-semibold text-stone-400">@{p.username}</span>}
    </span>
  );
  const pill = "rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95";

  return (
    <>
      <h3 className="text-xl font-extrabold tracking-tight">Family</h3>
      <p className="text-xs text-stone-500">Real people, not characters. Ask a friend to be your dad, mum or sibling, and they have to say yes.</p>
      {note && <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">{note}</p>}

      {family.incoming.length > 0 && (
        <>
          <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Asking you</p>
          <ul className="space-y-2">
            {family.incoming.map((a) => (
              <li key={a.pid} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-100 text-xl">{roleOf(a.role).emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{a.name}</span>
                  <span className="block text-[11px] text-stone-500">wants you to be their {roleOf(a.role).label.toLowerCase()}</span>
                </span>
                <button onClick={() => void answerFamily(a.pid, false)} className={`${pill} bg-stone-100 text-stone-700`}>
                  Not yet
                </button>
                <button onClick={() => void answerFamily(a.pid, true)} className={`${pill} bg-emerald-600 text-white`}>
                  Yes
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Your family</p>
      {family.members.length === 0 ? (
        <div className="rounded-2xl bg-white p-5 text-center ring-1 ring-black/5">
          <p className="text-3xl">🫥</p>
          <p className="mt-1 text-sm font-bold">No family yet</p>
          <p className="mt-1 text-xs text-stone-500">You start on your own. Ask a friend to be your dad, mum or sibling.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {family.members.map((m) => (
            <li key={m.pid} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-orange-100 text-xl">
                {relationOf(m.relation).emoji}
                {m.online && <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-white" />}
              </span>
              {who(m)}
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-700">{relationOf(m.relation).label}</span>
              <button onClick={() => void leaveFamily(m.pid)} className="rounded-full px-2 py-1 text-[11px] font-semibold text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {family.outgoing.length > 0 && (
        <>
          <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Waiting for an answer</p>
          <ul className="space-y-2">
            {family.outgoing.map((o) => (
              <li key={o.pid} className="flex items-center gap-3 rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-stone-200 text-xl">{roleOf(o.role).emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{o.name}</span>
                  <span className="block text-[11px] text-stone-500">asked to be your {roleOf(o.role).label.toLowerCase()}</span>
                </span>
                <button onClick={() => void leaveFamily(o.pid)} className={`${pill} bg-stone-200 text-stone-700`}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {!adding ? (
        <button onClick={() => setAdding(true)} className="mt-4 w-full rounded-2xl bg-stone-900 py-3 text-sm font-bold text-white transition active:scale-[0.98]">
          Add family
        </button>
      ) : (
        <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Ask a friend to be your…</p>
            <button onClick={() => setAdding(false)} className="text-xs font-semibold text-stone-400 hover:text-stone-700">
              Close
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                disabled={taken(r.id)}
                onClick={() => setRole(r.id)}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition active:scale-95 disabled:opacity-35 ${roleChoice === r.id ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-700"}`}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </div>
          {askable.length === 0 ? (
            <p className="mt-3 rounded-xl bg-stone-50 px-3 py-2.5 text-xs text-stone-500">{friends.length === 0 ? "You need friends first. Add some from the Friends tab, then come back." : "All your friends are already family, or have a request waiting."}</p>
          ) : (
            <ul className="mt-3 max-h-56 space-y-1.5 overflow-y-auto">
              {askable.map((f) => (
                <li key={f.pid} className="flex items-center gap-3 rounded-xl bg-stone-50 px-3 py-2">
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-amber-500 text-sm font-bold text-white">
                    {f.name.slice(0, 1).toUpperCase()}
                    {f.online && <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-stone-50" />}
                  </span>
                  {who(f)}
                  <button disabled={busy === f.pid} onClick={() => void ask(f.pid)} className={`${pill} bg-orange-500 text-white disabled:opacity-50`}>
                    {busy === f.pid ? "Asking…" : "Ask"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
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
  const current = app;

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
      case "bank":
        return <BankApp />;
      case "police":
        return <PoliceApp />;
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
