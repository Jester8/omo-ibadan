"use client";

import { useEffect, useState } from "react";
import { useSecond } from "@/lib/hooks";
import { fileReport, loadCases, loadPayees } from "@/lib/custody";
import { REASONS, RULES, type Payee } from "@/lib/custodyRules";
import { naira } from "@/lib/plots";
import { efccFilingOpen } from "@/lib/socialRules";
import { useGame } from "@/lib/store";
import { CasesList, PoliceRules, WhoToReport } from "../CustodyUI";
import type { ServiceBodyProps } from "./types";

const button = "rounded-full px-3.5 py-1.5 text-xs font-bold transition active:scale-95 disabled:opacity-40";

/** People the player has sent money to lately: the EFCC counter's picker. */
function Payees() {
  const [list, setList] = useState<Payee[] | null>(null);
  const [picked, setPicked] = useState<Payee | null>(null);
  const [reason, setReason] = useState<"scam" | "fraud">("scam");
  const [busy, setBusy] = useState(false);
  const money = useGame((s) => s.money);
  useEffect(() => {
    let dead = false;
    void loadPayees().then((l) => !dead && setList(l));
    return () => {
      dead = true;
    };
  }, []);
  if (list === null) return <p className="text-sm text-stone-500">Loading…</p>;
  if (picked) {
    const info = REASONS[reason];
    return (
      <div className="space-y-2 rounded-2xl bg-white p-3.5 ring-1 ring-black/5">
        <p className="text-sm font-bold text-stone-900">Report {picked.name} to the EFCC</p>
        <p className="text-xs text-stone-500">
          You sent them {naira(picked.total)} in {picked.count} transfer{picked.count === 1 ? "" : "s"}
          {picked.repaid > 0 ? ` and they paid back ${naira(picked.repaid)}` : ""}.
        </p>
        <div className="flex gap-1.5">
          {(["scam", "fraud"] as const).map((r) => (
            <button key={r} onClick={() => setReason(r)} className={`${button} ${reason === r ? "bg-emerald-700 text-white" : "bg-stone-100 text-stone-700"}`}>
              {REASONS[r].label}
            </button>
          ))}
        </div>
        <p className="text-xs text-stone-600">
          Filing costs {naira(info.fee)}, refunded if the case stands. The other side has {Math.round(RULES.efccGraceMs / 60_000)} minutes to pay back before you can book it.
        </p>
        <div className="flex gap-2">
          <button
            disabled={busy || money < info.fee}
            onClick={async () => {
              setBusy(true);
              const r = await fileReport(picked.pid, reason, "counter");
              setBusy(false);
              useGame.getState().toast(r.message, r.ok ? "good" : "bad");
              if (r.ok) setPicked(null);
            }}
            className={`${button} bg-emerald-700 text-white`}
          >
            File it ({naira(info.fee)})
          </button>
          <button onClick={() => setPicked(null)} className={`${button} bg-stone-100 text-stone-700`}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
  if (!list.length) return <p className="rounded-2xl bg-white p-3.5 text-sm text-stone-600 ring-1 ring-black/5">You have not sent {naira(RULES.efcc.minTransfer)} or more to anyone in the last 2 days, so there is nothing to report.</p>;
  return (
    <ul className="space-y-2">
      {list.map((p) => (
        <li key={p.pid} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-black/5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-stone-900">{p.name}</p>
            <p className="text-xs text-stone-500">You sent {naira(p.total)}</p>
          </div>
          <button onClick={() => setPicked(p)} className={`${button} bg-emerald-700 text-white`}>
            Report
          </button>
        </li>
      ))}
    </ul>
  );
}

/** The police or EFCC counter: report someone, see and book your cases, read the rules. */
export default function StationCounter({ ctx }: ServiceBodyProps) {
  const efcc = ctx.id === "efcc";
  const open = useGame((s) => (efcc ? s.efccOpen : s.policeOpen));
  const waiting = useGame((s) => s.cases.some((c) => c.role === "reporter" && c.status === "filed" && (c.kind === "efcc") === efcc));
  const [tab, setTab] = useState<"report" | "cases" | "rules">("cases");
  const now = useSecond() * 1000;
  useEffect(() => {
    void loadCases();
  }, []);
  const seg = (on: boolean) => `flex-1 rounded-lg py-1.5 text-xs font-semibold transition active:scale-95 ${on ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`;
  if (!open) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">{efcc ? "Money cases are not open yet." : "The police are not open yet. They will be soon."}</p>;
  return (
    <div className="space-y-3">
      {waiting && tab !== "cases" && (
        <button onClick={() => setTab("cases")} className="w-full rounded-2xl bg-blue-700 py-2.5 text-sm font-bold text-white transition active:scale-[0.98]">
          You have a case waiting to be booked
        </button>
      )}
      <div className="flex gap-0.5 rounded-xl bg-stone-200/70 p-0.5">
        <button onClick={() => setTab("cases")} className={seg(tab === "cases")}>
          My cases
        </button>
        <button onClick={() => setTab("report")} className={seg(tab === "report")}>
          Report
        </button>
        <button onClick={() => setTab("rules")} className={seg(tab === "rules")}>
          Rules
        </button>
      </div>
      {tab === "cases" && <CasesList />}
      {tab === "report" && (efcc ? (efccFilingOpen(now) ? <Payees /> : <p className="rounded-2xl bg-white p-3.5 text-sm text-stone-600 ring-1 ring-black/5">The EFCC office takes new money cases between 8:00 and 16:50.</p>) : <WhoToReport />)}
      {tab === "rules" && <PoliceRules />}
    </div>
  );
}
