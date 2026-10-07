"use client";

import { useEffect, useMemo, useState } from "react";
import { House, MapPin, Search, Store, UserPlus } from "lucide-react";
import { PLACES } from "@/lib/places";
import { PLOTS, naira, plotById } from "@/lib/plots";
import { useGame } from "@/lib/store";
import { bizById } from "@/lib/business";
import { levelOf } from "@/lib/bonds";
import { friendRequest, openThread, searchPeople, type Person } from "@/lib/social";
import { goToPlot, homeOf, visitHome } from "@/lib/visit";
import { CAMPUS_PLACES } from "@/lib/world";
import ShopPanel from "./ShopPanel";

const row = "flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 ring-1 ring-black/5";
const go = "shrink-0 rounded-full bg-stone-900 px-3 py-1.5 text-[11px] font-bold text-white transition active:scale-95";

/** Groceries for your provisions, and clothes, bought from your phone. */
export function MarketApp() {
  return (
    <>
      <h3 className="text-xl font-extrabold tracking-tight">Market</h3>
      <p className="text-xs text-stone-500">Order groceries and clothes without leaving where you are.</p>
      <ShopPanel />
    </>
  );
}

/** Homes of your friends and every business in town, with one tap to go there. */
export function VisitsApp() {
  const plots = useGame((s) => s.plots);
  const friends = useGame((s) => s.friends);
  const me = useGame((s) => s.profile?.id);
  const homes = friends.map((f) => ({ f, h: homeOf(f.pid) })).filter((x) => x.h);
  const shops = PLOTS.filter((p) => plots[p.id]?.biz);
  const mine = PLOTS.filter((p) => plots[p.id]?.ownerId === me);
  const works = PLOTS.filter((p) => plots[p.id]?.staff?.some((s) => s.pid === me));
  return (
    <>
      <h3 className="text-xl font-extrabold tracking-tight">Visits</h3>
      <p className="text-xs text-stone-500">Go and see friends at home, or drop in on a business.</p>

      {works.length > 0 && (
        <>
          <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Where you work</p>
          <ul className="space-y-1.5">
            {works.map((p) => {
              const st = plots[p.id];
              const b = bizById(st.biz)!;
              return (
                <li key={p.id} className={row}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg text-base" style={{ background: `${b.color}22` }}>
                    {b.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-black">{st.ownerName}&apos;s {b.name.toLowerCase()}</span>
                    <span className="block truncate text-[11px] text-stone-500">{naira(st.wage ?? 2500)} a shift · {p.district}</span>
                  </span>
                  <button className={go} onClick={() => goToPlot(p.id)}>
                    Go
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Friends&apos; homes</p>
      {homes.length === 0 ? (
        <p className="rounded-xl bg-white p-3 text-xs text-stone-500 ring-1 ring-black/5">None of your friends have a home yet.</p>
      ) : (
        <ul className="space-y-1.5">
          {homes.map(({ f }) => (
            <li key={f.pid} className={row}>
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <House className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-black">{f.name}</span>
                <span className="block truncate text-[11px] text-stone-500">
                  {levelOf(f.level).emoji} {levelOf(f.level).label} · {plotById(homeOf(f.pid)!.id)?.district}
                </span>
              </span>
              <button className={go} onClick={() => visitHome(f.pid, f.name)}>
                Visit
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Businesses</p>
      {shops.length === 0 ? (
        <p className="rounded-xl bg-white p-3 text-xs text-stone-500 ring-1 ring-black/5">No businesses yet. Buy land and build the first one.</p>
      ) : (
        <ul className="space-y-1.5">
          {shops.map((p) => {
            const st = plots[p.id];
            const b = bizById(st.biz)!;
            return (
              <li key={p.id} className={row}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg text-base" style={{ background: `${b.color}22` }}>
                  {b.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-black">{st.ownerId === me ? "Your " : `${st.ownerName}'s `}{b.name.toLowerCase()}</span>
                  <span className="block truncate text-[11px] text-stone-500">{p.district}{st.visit === "closed" ? " · closed" : ""}</span>
                </span>
                <button className={go} onClick={() => goToPlot(p.id)}>
                  Go
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {mine.length > 0 && (
        <>
          <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Yours</p>
          <ul className="space-y-1.5">
            {mine.map((p) => {
              const b = bizById(plots[p.id].biz);
              return (
                <li key={p.id} className={row}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-stone-100 text-base">{b ? b.emoji : "🏠"}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-black">{b ? b.name : plots[p.id].tier ? "Your home" : "Your land"}</span>
                    <span className="block truncate text-[11px] text-stone-500">{p.district}</span>
                  </span>
                  <button className={go} onClick={() => goToPlot(p.id)}>
                    Go
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

/** Search places, homes and businesses, and find people by username. */
export function SearchApp() {
  const [q, setQ] = useState("");
  const [people, setPeople] = useState<(Person & { username: string | null })[]>([]);
  const [busy, setBusy] = useState(false);
  const plots = useGame((s) => s.plots);
  const friends = useGame((s) => s.friends);
  const campus = useGame((s) => s.campus);
  const term = q.trim().toLowerCase();

  useEffect(() => {
    if (term.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPeople([]);
      return;
    }
    let live = true;
    setBusy(true);
    const t = setTimeout(() => {
      void searchPeople(term).then((r) => {
        if (live) {
          setPeople(r);
          setBusy(false);
        }
      });
    }, 280);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [term]);

  const places = useMemo(
    () => (term.length < 2 ? [] : PLACES.filter((p) => (campus || !CAMPUS_PLACES.includes(p.id)) && `${p.name} ${p.district} ${p.kind}`.toLowerCase().includes(term)).slice(0, 6)),
    [term, campus],
  );
  const spots = useMemo(
    () =>
      term.length < 2
        ? []
        : PLOTS.filter((p) => {
            const st = plots[p.id];
            return st && `${st.ownerName} ${bizById(st.biz)?.name ?? ""} ${p.district}`.toLowerCase().includes(term);
          }).slice(0, 6),
    [term, plots],
  );
  const isFriend = (pid: string) => friends.some((f) => f.pid === pid);

  return (
    <>
      <label className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-500">
        <Search className="size-4 text-stone-400" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Places, people, shops, homes" className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-stone-400" />
      </label>
      {term.length < 2 && <p className="mt-4 text-center text-xs text-stone-400">Type at least two letters.</p>}

      {places.length > 0 && (
        <>
          <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Places</p>
          <ul className="space-y-1.5">
            {places.map((p) => (
              <li key={p.id} className={row}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-stone-100 text-base">{p.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-black">{p.name}</span>
                  <span className="flex items-center gap-1 truncate text-[11px] text-stone-500"><MapPin className="size-3" /> {p.district}</span>
                </span>
                <button
                  className={go}
                  onClick={() => {
                    // opens the place card, where you choose how to get there
                    useGame.getState().patch({ sheet: null, selected: { type: "place", id: p.id } });
                  }}
                >
                  Go
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {spots.length > 0 && (
        <>
          <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Homes and shops</p>
          <ul className="space-y-1.5">
            {spots.map((p) => {
              const st = plots[p.id];
              const b = bizById(st.biz);
              return (
                <li key={p.id} className={row}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-stone-100 text-base">{b ? b.emoji : <Store className="size-4" />}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-black">{b ? `${st.ownerName}'s ${b.name.toLowerCase()}` : `${st.ownerName}'s home`}</span>
                    <span className="block truncate text-[11px] text-stone-500">{p.district}</span>
                  </span>
                  <button className={go} onClick={() => goToPlot(p.id)}>
                    Go
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {term.length >= 2 && (
        <>
          <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">People {busy ? "· searching…" : ""}</p>
          {people.length === 0 && !busy ? (
            <p className="rounded-xl bg-white p-3 text-xs text-stone-500 ring-1 ring-black/5">No one found with that name or username.</p>
          ) : (
            <ul className="space-y-1.5">
              {people.map((p) => (
                <li key={p.pid} className={row}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{p.name.slice(0, 1).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-black">{p.name}</span>
                    <span className="block truncate text-[11px] text-stone-500">{p.username ? `@${p.username}` : ""}{p.online ? " · online" : ""}</span>
                  </span>
                  {isFriend(p.pid) ? (
                    <button className={go} onClick={() => void openThread(p.pid)}>
                      Message
                    </button>
                  ) : (
                    <button
                      className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white transition active:scale-95"
                      onClick={async () => useGame.getState().toast(await friendRequest(p.pid), "info")}
                    >
                      <UserPlus className="size-3.5" /> Add
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
