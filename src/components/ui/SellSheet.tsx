"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/store";
import { naira } from "@/lib/plots";
import { useSecond } from "@/lib/hooks";
import { bizById } from "@/lib/business";
import { plotLabel } from "@/lib/loans";
import { loadSaleCheck, quoteSaleAt, sellPlot, useSaleCheck } from "@/lib/property";

const Row = ({ k, v, strong, minus }: { k: string; v: string; strong?: boolean; minus?: boolean }) => (
  <div className="flex items-baseline justify-between gap-3 py-1">
    <span className={`min-w-0 text-xs ${strong ? "font-bold text-stone-800" : "text-stone-500"}`}>{k}</span>
    <span className={`shrink-0 text-right tabular-nums ${strong ? "text-base font-extrabold text-stone-900" : "text-sm font-semibold text-stone-800"} ${minus ? "text-rose-600" : ""}`}>{v}</span>
  </div>
);

/** The confirm sheet for selling a plot back to the city. The price is the server's own rule (saleValue), shown before anything happens. */
export default function SellSheet({ plotId, onClose }: { plotId: string; onClose: () => void }) {
  const sec = useSecond();
  // everything the quote reads, so the sheet changes the moment one of them does
  const plot = useGame((s) => s.plots[plotId]);
  const oldDecor = useGame((s) => s.decor[plotId]);
  useGame((s) => s.loan);
  useGame((s) => s.custody);
  useGame((s) => s.interior);
  useGame((s) => s.remotes);
  useGame((s) => s.net);
  useSaleCheck((s) => s.check);
  const [wait, setWait] = useState(3);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // the server knows who is inside a house and we do not: ask now and keep asking while the sheet is open
  useEffect(() => {
    void loadSaleCheck(plotId);
    const t = setInterval(() => void loadSaleCheck(plotId), 8000);
    return () => clearInterval(t);
  }, [plotId]);
  // the Sell button wakes up after three seconds, so it cannot be tapped by accident
  useEffect(() => {
    const t = setInterval(() => setWait((w) => Math.max(0, w - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const q = quoteSaleAt(plotId, sec * 1000);
  const biz = bizById(plot?.biz);
  const staff = plot?.staff?.length ?? 0;
  const decor = (plot?.decor ?? oldDecor)?.length ?? 0;
  const sell = async () => {
    setBusy(true);
    setMsg(null);
    const r = await sellPlot(plotId);
    setBusy(false);
    if (r.ok) onClose();
    else setMsg(r.message);
  };

  return (
    <div className="mt-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">Sell this land to the city</p>
      <p className="mt-0.5 text-sm font-semibold text-stone-800">{plotLabel(plotId)}</p>

      <div className="mt-2 rounded-2xl bg-white px-3.5 py-2 ring-1 ring-black/5">
        <Row k="Land" v={naira(q.parts.land)} />
        {q.parts.built > 0 && <Row k={biz ? biz.name : "What you built"} v={naira(q.parts.built)} />}
        {q.parts.decor > 0 && <Row k="Decor" v={naira(q.parts.decor)} />}
        <div className="border-t border-stone-100">
          <Row k="The city pays" v={naira(q.gross)} />
          {q.loanPaid > 0 && <Row k="To the bank, for your loan" v={`-${naira(q.loanPaid)}`} minus />}
        </div>
        <div className="border-t border-stone-100">
          <Row k="You receive" v={naira(q.net)} strong />
        </div>
        {q.pendingRent > 0 && <p className="pb-1.5 text-[11px] text-stone-500">Plus {naira(q.pendingRent)} rent that has built up. You keep it.</p>}
      </div>

      <ul className="mt-2.5 space-y-1 text-xs leading-snug text-stone-600">
        <li>Reputation -{q.repBack}. It is the reputation this land earned you.</li>
        {biz && <li>The {biz.name.toLowerCase()} closes for good and everything in it is lost.</li>}
        {biz && staff > 0 && <li>{staff === 1 ? "1 member of staff is" : `${staff} staff are`} let go. Wages already owed stay owed.</li>}
        {!biz && q.parts.built > 0 && <li>Your house and everything in it goes with the land.</li>}
        {decor > 0 && <li>Your decor ({decor} {decor === 1 ? "item" : "items"}) is lost.</li>}
        <li>The land goes back on sale for everyone.</li>
      </ul>

      {(q.blocked || msg) && <p className="mt-2.5 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{q.blocked ?? msg}</p>}

      <div className="mt-3 flex gap-2">
        <button onClick={onClose} disabled={busy} className="flex-1 rounded-xl bg-stone-100 py-3 text-sm font-bold text-stone-700 transition active:scale-95 disabled:opacity-50">
          Cancel
        </button>
        <button onClick={() => void sell()} disabled={busy || wait > 0 || !!q.blocked} className="flex-1 rounded-xl bg-rose-600 py-3 text-sm font-bold text-white transition active:scale-95 disabled:opacity-40">
          {busy ? "Selling..." : wait > 0 ? `Sell (${wait})` : "Sell"}
        </button>
      </div>
    </div>
  );
}
