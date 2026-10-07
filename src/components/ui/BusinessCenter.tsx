"use client";

import { useEffect, useState } from "react";
import { Briefcase, Minus, Plus, TrendingUp, UserMinus, UserPlus } from "lucide-react";
import { bizById } from "@/lib/business";
import { lookupAccount, salesHistory } from "@/lib/bank";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";
import { useSecond } from "@/lib/hooks";

const box = "mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/5";
const label = "text-[11px] font-bold uppercase tracking-wide text-stone-400";
const input = "min-w-0 flex-1 rounded-xl bg-stone-100 px-3 py-2 text-sm font-semibold text-black outline-none ring-1 ring-transparent focus:bg-white focus:ring-emerald-500";

const ago = (t: number, now: number) => {
  const s = Math.max(0, Math.round((now - t) / 1000));
  return s < 60 ? "just now" : s < 3600 ? `${Math.floor(s / 60)} min ago` : `${Math.floor(s / 3600)} h ago`;
};

/** The owner's office: what you charge, a live list of sales as customers pay, and the people you have hired. */
export default function BusinessCenter({ plotId }: { plotId: string }) {
  const plot = useGame((s) => s.plots[plotId]);
  const sales = useGame((s) => s.sales).filter((x) => x.plotId === plotId);
  const update = useGame((s) => s.updateBiz);
  const now = useSecond() * 1000;
  const biz = bizById(plot?.biz);
  const [price, setPrice] = useState(String(plot?.price ?? biz?.price ?? 0));
  const [wage, setWage] = useState(String(plot?.wage ?? 2500));
  const [who, setWho] = useState("");
  const [found, setFound] = useState<{ found: boolean; name?: string; self?: boolean } | null>(null);
  const [older, setOlder] = useState<{ id: number; from: string; amount: number; item: string; at: number }[]>([]);
  const account = who.trim().replace(/^@/, "");

  useEffect(() => {
    void salesHistory(plotId).then(setOlder);
  }, [plotId]);
  useEffect(() => {
    if (account.length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFound(null);
      return;
    }
    let live = true;
    const t = setTimeout(() => void lookupAccount(account).then((r) => live && setFound(r)), 300);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [account]);

  if (!plot || !biz) return null;
  const current = plot.price ?? biz.price;
  const currentWage = plot.wage ?? 2500;
  const staff = plot.staff ?? [];
  // today's takings: live sales plus the saved ones that are not already in the live list
  const liveKeys = new Set(sales.map((x) => `${x.name}|${x.amount}|${Math.round(x.at / 4000)}`));
  const saved = older.filter((o) => !liveKeys.has(`${o.from}|${o.amount}|${Math.round(o.at / 4000)}`));
  const day = now - 24 * 3600_000;
  const total = sales.filter((x) => x.at > day).reduce((n, x) => n + x.amount, 0) + saved.filter((x) => x.at > day).reduce((n, x) => n + x.amount, 0);
  const rows = [...sales.map((x) => ({ key: x.id, from: x.name, item: x.item, amount: x.amount, at: x.at })), ...saved.map((x) => ({ key: `s${x.id}`, from: x.from, item: x.item, amount: x.amount, at: x.at }))].slice(0, 12);
  const priceNum = Math.floor(Number(price));

  return (
    <div className="mt-3 rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
      <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-950">
        <Briefcase className="size-4" /> Business center
      </p>
      <p className="mt-0.5 text-xs text-emerald-900/80">Set your prices, watch the sales come in live, and hire people to work for you.</p>

      {/* price */}
      <div className={box}>
        <p className={label}>Your price for {biz.item}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <button onClick={() => setPrice(String(Math.max(100, (priceNum || current) - 100)))} className="grid size-9 place-items-center rounded-xl bg-stone-100 text-stone-700 transition active:scale-90" aria-label="Lower the price">
            <Minus className="size-4" />
          </button>
          <input value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" className={input} />
          <button onClick={() => setPrice(String(Math.min(50000, (priceNum || current) + 100)))} className="grid size-9 place-items-center rounded-xl bg-stone-100 text-stone-700 transition active:scale-90" aria-label="Raise the price">
            <Plus className="size-4" />
          </button>
          <button
            disabled={!(priceNum >= 100 && priceNum <= 50000) || priceNum === current}
            onClick={() => {
              update(plotId, { price: priceNum });
              useGame.getState().toast(`Customers now pay ${naira(priceNum)}`, "good");
            }}
            className="rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
          >
            Save
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-stone-500">Now charging {naira(current)}. Usual price {naira(biz.price)}. Between ₦100 and ₦50,000. A high price earns more per sale but customers may think twice.</p>
      </div>

      {/* live sales */}
      <div className={box}>
        <div className="flex items-center justify-between">
          <p className={label}>Live sales</p>
          <p className="flex items-center gap-1 text-xs font-extrabold text-emerald-700">
            <TrendingUp className="size-3.5" /> {naira(total)} today
          </p>
        </div>
        {rows.length === 0 ? (
          <p className="mt-2 text-xs text-stone-500">No sales yet. When someone pays at your counter, it shows up here the moment it happens.</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {rows.map((r) => (
              <li key={r.key} className="flex items-center gap-2.5 rounded-xl bg-stone-50 px-2.5 py-1.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">{r.from.slice(0, 1).toUpperCase()}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-semibold text-black">{r.from}</span>
                  <span className="block truncate text-[10.5px] text-stone-500">
                    {r.item} · {ago(r.at, now)}
                  </span>
                </span>
                <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-emerald-700">+{naira(r.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* staff */}
      <div className={box}>
        <p className={label}>Staff and jobs</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-xs font-semibold text-stone-600">Wage per shift</span>
          <input value={wage} onChange={(e) => setWage(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" className={input} />
          <button
            disabled={Math.floor(Number(wage)) === currentWage || Number(wage) > 20000}
            onClick={() => {
              update(plotId, { wage: Math.floor(Number(wage)) });
              useGame.getState().toast(`Staff now earn ${naira(Math.floor(Number(wage)))} a shift`, "good");
            }}
            className="rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
          >
            Save
          </button>
        </div>
        <p className="mt-1 text-[11px] text-stone-500">Paid by you, straight away, each time a member of staff finishes a shift in your business. Up to ₦20,000.</p>

        {staff.length === 0 ? (
          <p className="mt-2 rounded-xl bg-stone-50 p-2.5 text-xs text-stone-500">You have not hired anyone yet.</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {staff.map((s) => (
              <li key={s.pid} className="flex items-center gap-2.5 rounded-xl bg-stone-50 px-2.5 py-1.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-800">{s.name.slice(0, 1).toUpperCase()}</span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-black">{s.name}</span>
                <button onClick={() => update(plotId, { staff: staff.filter((x) => x.pid !== s.pid) })} className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-rose-600 ring-1 ring-rose-200 transition active:scale-95">
                  <UserMinus className="size-3.5" /> Let go
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex items-center gap-1.5">
          <input value={who} onChange={(e) => setWho(e.target.value.slice(0, 20))} placeholder="Hire someone: their @username" autoCapitalize="none" className={input} />
        </div>
        {account.length >= 3 && found && <p className={`mt-1 px-1 text-xs font-semibold ${found.found ? "text-emerald-700" : "text-rose-600"}`}>{found.found ? `Hire ${found.name}?` : found.self ? "That is you." : "No account with that username."}</p>}
        <button
          disabled={!found?.found || staff.length >= 12 || staff.some((s) => s.name === found?.name)}
          onClick={async () => {
            const r = await fetchPid(account);
            if (!r) return useGame.getState().toast("Could not find them.", "bad");
            update(plotId, { staff: [...staff, { pid: r.pid, name: r.name }] });
            setWho("");
            useGame.getState().toast(`${r.name} is hired. They have been told.`, "good");
          }}
          className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
        >
          <UserPlus className="size-4" /> Hire
        </button>
      </div>
    </div>
  );
}

/** The account number only gives a name, so the hire looks the person up by username to get their id. */
async function fetchPid(username: string): Promise<{ pid: string; name: string } | null> {
  const { searchPeople } = await import("@/lib/social");
  const hit = (await searchPeople(username)).find((p) => p.username?.toLowerCase() === username.toLowerCase());
  return hit ? { pid: hit.pid, name: hit.name } : null;
}
