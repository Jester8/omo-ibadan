"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BatteryFull, Briefcase, ChevronLeft, Globe, Mail, MapPin, Utensils, Wifi, X } from "lucide-react";
import { useClock } from "@/lib/hooks";
import { eventsAt } from "@/lib/events";
import { formatClock } from "@/lib/time";
import { naira } from "@/lib/plots";
import { PLACES, type ActionDef } from "@/lib/places";
import { TITLES, titleIndex } from "@/lib/titles";
import { pendingRent, useGame } from "@/lib/store";
import JobsPanel from "./JobsPanel";

type App = "browser" | "mail" | "work" | "food";

const APPS: { id: App; name: string; icon: typeof Globe; tint: string }[] = [
  { id: "browser", name: "Browser", icon: Globe, tint: "from-sky-400 to-blue-600" },
  { id: "mail", name: "Mail", icon: Mail, tint: "from-rose-400 to-pink-600" },
  { id: "work", name: "Gigs", icon: Briefcase, tint: "from-emerald-400 to-teal-600" },
  { id: "food", name: "Eat Now", icon: Utensils, tint: "from-amber-400 to-orange-600" },
];

const GIGS: ActionDef[] = [
  { id: "gig-data", label: "Data entry", secs: 4, gain: { energy: -10 }, pay: 1800, rep: 0 },
  { id: "gig-logo", label: "Design a logo", secs: 5, gain: { energy: -15, fun: 5 }, pay: 2800, rep: 1 },
  { id: "gig-report", label: "Write a market report", secs: 6, gain: { energy: -20 }, pay: 4000, rep: 1 },
];

const MEALS: ActionDef[] = [
  { id: "order-jollof", label: "Jollof rice & chicken", secs: 4, cost: 3500, gain: { hunger: 55, fun: 4 } },
  { id: "order-shawarma", label: "Chicken shawarma", secs: 3, cost: 2500, gain: { hunger: 40 } },
  { id: "order-zobo", label: "Chilled zobo", secs: 2, cost: 500, gain: { hunger: 4, fun: 6 } },
];

const NEWS = [
  "Ring Road flyover to reopen after weekend of repairs",
  "Shooting Stars confident ahead of derby at Lekan Salami",
  "Bodija market traders celebrate record tomato harvest",
  "NEPA promises 'stable light' (again) for Oke-Ado",
  "Cocoa House turns 60: city plans night of lights",
];

export default function ComputerScreen() {
  const open = useGame((s) => s.computer);
  const interior = useGame((s) => s.interior);
  const busy = useGame((s) => s.busy);
  const money = useGame((s) => s.money);
  const rep = useGame((s) => s.rep);
  const plots = useGame((s) => s.plots);
  const pid = useGame((s) => s.profile?.id);
  const policy = useGame((s) => s.election?.governor?.policy);
  const [app, setApp] = useState<App | null>(null);
  const { minutes, hour, now } = useClock();

  const close = () => useGame.setState({ computer: false });
  useEffect(() => {
    if (open && !interior) close();
  }, [open, interior]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const run = (a: ActionDef) => {
    const err = useGame.getState().runAction(a);
    if (err) useGame.getState().toast(err, "bad");
  };

  const rent = Object.entries(plots)
    .filter(([, p]) => p.ownerId === pid)
    .reduce((n, [, p]) => n + pendingRent(p, now), 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[60] grid place-items-center bg-black/55 p-3 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-[1.6rem] bg-stone-900 p-2.5 shadow-2xl ring-1 ring-white/10"
          >
            <div className="relative flex h-[min(34rem,78dvh)] flex-col overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-emerald-900 via-teal-800 to-indigo-900 text-white">
              {/* menu bar */}
              <div className="flex items-center justify-between bg-black/30 px-4 py-1.5 text-[11px] font-medium backdrop-blur">
                <span className="font-bold tracking-tight">Omo OS</span>
                <span className="flex items-center gap-3">
                  <Wifi className="size-3.5" />
                  <BatteryFull className="size-3.5" />
                  {formatClock(minutes)}
                  <button onClick={close} aria-label="Close computer" className="rounded-full bg-white/15 p-1 hover:bg-white/25">
                    <X className="size-3.5" />
                  </button>
                </span>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {!app ? (
                    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center gap-6 p-6">
                      <div className="text-center">
                        <p className="text-4xl font-extralight tabular-nums">{formatClock(minutes)}</p>
                        <p className="text-xs text-white/70">
                          {TITLES[titleIndex(rep)].name} · {naira(money)}
                        </p>
                      </div>
                      <div className="grid grid-cols-4 gap-5 sm:gap-8">
                        {APPS.map((a) => (
                          <button key={a.id} onClick={() => setApp(a.id)} className="group flex flex-col items-center gap-1.5">
                            <span className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${a.tint} shadow-lg transition group-hover:scale-110 group-active:scale-95 sm:size-16`}>
                              <a.icon className="size-7" />
                            </span>
                            <span className="text-[11px] font-medium text-white/90">{a.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key={app} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 m-2.5 flex flex-col overflow-hidden rounded-2xl bg-stone-50 text-stone-900 shadow-xl">
                      <div className="flex items-center gap-2 border-b border-stone-200 bg-white px-3 py-2">
                        <button onClick={() => setApp(null)} className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-200">
                          <ChevronLeft className="size-3.5" /> Home
                        </button>
                        <span className="text-sm font-bold">{APPS.find((a) => a.id === app)!.name}</span>
                        {app === "browser" && <span className="ml-2 flex-1 truncate rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500">ibadandaily.ng</span>}
                      </div>

                      <div className="flex-1 overflow-y-auto p-4">
                        {app === "browser" && (
                          <>
                            <h3 className="text-lg font-extrabold tracking-tight">Ibadan Daily</h3>
                            <p className="text-xs text-stone-500">{policy && policy !== "none" ? `Governor's policy: ${policy}` : "No governor policy in force"}</p>
                            <ul className="mt-3 space-y-2">
                              {eventsAt(hour).map((e) => (
                                <li key={e.id} className="flex items-center justify-between gap-2 rounded-xl bg-rose-50 p-3 ring-1 ring-rose-100">
                                  <span className="text-sm font-semibold text-rose-800">
                                    {e.emoji} Live now: {e.title}
                                  </span>
                                  <button
                                    onClick={() => {
                                      useGame.getState().select({ type: "place", id: e.placeId });
                                      close();
                                    }}
                                    className="flex shrink-0 items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white"
                                  >
                                    <MapPin className="size-3" /> Show
                                  </button>
                                </li>
                              ))}
                              {NEWS.map((n) => (
                                <li key={n} className="rounded-xl bg-white p-3 text-sm font-medium ring-1 ring-stone-200">
                                  {n}
                                </li>
                              ))}
                            </ul>
                            <h4 className="mb-2 mt-5 text-sm font-bold">Jobs board</h4>
                            <JobsPanel onPick={close} />
                          </>
                        )}

                        {app === "mail" && (
                          <ul className="space-y-2">
                            {[
                              { from: "Mummy", subj: "Have you eaten?", body: "Please eat well o. And call your aunty." },
                              { from: "Landlord", subj: rent > 0 ? `Rent from your houses: ${naira(rent)}` : "Welcome, landlord", body: rent > 0 ? "Your tenants have paid. Collect it from your plot." : "Buy land and build to start collecting rent." },
                              { from: "Oyo State Govt", subj: "Governor election is on", body: "Run, or vote. Open the Landmark icon in the menu." },
                              { from: "Ibadan Autos", subj: "New arrivals", body: "Corolla, RX 350 and G-Wagon on the lot. Tap the car icon." },
                            ].map((m) => (
                              <li key={m.subj} className="rounded-xl bg-white p-3 ring-1 ring-stone-200">
                                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">{m.from}</p>
                                <p className="text-sm font-semibold">{m.subj}</p>
                                <p className="text-xs text-stone-500">{m.body}</p>
                              </li>
                            ))}
                          </ul>
                        )}

                        {(app === "work" || app === "food") && (
                          <>
                            <p className="mb-3 text-xs text-stone-500">{app === "work" ? "Pick a freelance gig. It pays when you finish." : "Fresh food delivered to your door."}</p>
                            <ul className="space-y-2">
                              {(app === "work" ? GIGS : MEALS).map((a) => (
                                <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-stone-200">
                                  <div>
                                    <p className="text-sm font-semibold">{a.label}</p>
                                    <p className="text-xs text-stone-500">{a.secs} seconds</p>
                                  </div>
                                  <button
                                    disabled={!!busy || (!!a.cost && money < a.cost)}
                                    onClick={() => run(a)}
                                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40 ${app === "work" ? "bg-emerald-600" : "bg-amber-600"}`}
                                  >
                                    {a.pay ? `Earn ${naira(a.pay)}` : `Order ${naira(a.cost ?? 0)}`}
                                  </button>
                                </li>
                              ))}
                            </ul>
                            {busy && (
                              <div className="mt-4 overflow-hidden rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                                <p className="text-sm font-semibold text-emerald-800">{busy.label}…</p>
                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                                  <motion.div key={busy.start} className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: busy.secs, ease: "linear" }} />
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mx-auto mt-1.5 h-1.5 w-24 rounded-full bg-stone-700" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
