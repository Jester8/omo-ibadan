"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Check, Copy, Landmark } from "lucide-react";
import { useGame } from "@/lib/store";
import { naira } from "@/lib/plots";
import { bankHistory, lookupAccount, sendMoney, type BankItem } from "@/lib/bank";
import { STATE_KINDS } from "@/lib/custodyRules";
import { useSecond } from "@/lib/hooks";
import { loanStageAt, useLoansOn } from "@/lib/loans";
import { EfccReportButton } from "./CustodyUI";
import { LoansPanel } from "./LoansUI";
import { FEATURES } from "@/lib/features";

/** is this statement row money moving to or from the state (the bank, the city, the police)? Older servers send no `kind`. */
const fromState = (i: BankItem) => (STATE_KINDS as readonly string[]).includes((i as BankItem & { kind?: string }).kind ?? "");

const QUICK = [1000, 5000, 10000, 50000];

/** The bank: your account (your name and your username as the account number), and sending money to other players. */
export default function BankApp() {
  const profile = useGame((s) => s.profile);
  const money = useGame((s) => s.money);
  const friends = useGame((s) => s.friends);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [owner, setOwner] = useState<{ found: boolean; name?: string; self?: boolean } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [items, setItems] = useState<BankItem[] | null>(null);
  const [copied, setCopied] = useState(false);
  const loansOn = useLoansOn();
  const loan = useGame((s) => s.loan);
  const skew = useGame((s) => s.clockSkew);
  const sec = useSecond();
  // the Loans tab is there while loans are on, or while a loan is still owed (then it explains why the bank is shut)
  const showLoans = loansOn || (!!loan && FEATURES.loans);
  const late = !!loan && loansOn && loanStageAt(loan, sec * 1000 + skew) !== "active";
  // a player in custody who opens the bank is most likely after money for bail; a player in trouble with a loan wants the loan
  const [tab, setTab] = useState<"account" | "loans">(() => {
    const st = useGame.getState();
    return st.loan ? (st.loan.stage !== "active" ? "loans" : "account") : st.custody ? "loans" : "account";
  });
  const loans = showLoans && tab === "loans";

  const account = to.trim().replace(/^@/, "");
  const value = Math.floor(Number(amount));
  const valid = owner?.found && value >= 100 && value <= money;

  const refresh = () => void bankHistory().then(setItems);
  useEffect(() => {
    void bankHistory().then(setItems);
  }, []);

  // show whose account this is as soon as the number is complete
  useEffect(() => {
    if (account.length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOwner(null);
      return;
    }
    let live = true;
    const t = setTimeout(() => void lookupAccount(account).then((r) => live && setOwner(r)), 300);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [account]);

  const send = async () => {
    setBusy(true);
    const r = await sendMoney(account, value, note.trim());
    setBusy(false);
    setConfirming(false);
    setMsg({ ok: r.ok, text: r.message });
    if (r.ok) {
      setAmount("");
      setNote("");
      refresh();
    }
  };

  const field = "w-full rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-black outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-emerald-500";

  return (
    <>
      {/* the account card */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 p-4 text-white shadow-lg">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/75">
          <Landmark className="size-3.5" /> Omo&apos;badan Bank
        </p>
        <p className="mt-3 text-[11px] font-semibold text-white/70">Balance</p>
        <p className="text-2xl font-extrabold tabular-nums">{naira(money)}</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/65">Account name</p>
            <p className="truncate text-sm font-bold">{profile?.name}</p>
          </div>
          <div className="min-w-0 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/65">Account number</p>
            <button
              onClick={() => {
                if (profile?.username) void navigator.clipboard?.writeText(profile.username).then(() => setCopied(true));
              }}
              className="flex items-center gap-1 text-sm font-bold"
              title="Copy"
            >
              {profile?.username ? `@${profile.username}` : "no username yet"}
              {profile?.username && (copied ? <Check className="size-3.5" /> : <Copy className="size-3.5 opacity-70" />)}
            </button>
          </div>
        </div>
      </div>

      {showLoans && (
        <div role="tablist" className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-stone-200/70 p-1">
          {([["account", "Account"], ["loans", "Loans"]] as const).map(([id, name]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => { setTab(id); if (id === "account") refresh(); }} className={`relative rounded-lg py-2 text-xs font-bold transition active:scale-95 ${tab === id ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}>
              {name}
              {id === "loans" && late && <span aria-label="Your loan is late" className="absolute right-3 top-2 size-2 rounded-full bg-rose-500" />}
            </button>
          ))}
        </div>
      )}

      {loans ? (
        <div className="mt-3">
          <LoansPanel />
        </div>
      ) : (
        <>
      {/* send money */}
      <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Send money</p>
      <div className="space-y-2 rounded-2xl bg-stone-100/70 p-3">
        <input value={to} onChange={(e) => { setTo(e.target.value.slice(0, 20)); setMsg(null); setConfirming(false); }} placeholder="Account number (@username)" autoCapitalize="none" autoCorrect="off" className={field} />
        {account.length >= 3 && owner && (
          <p className={`px-1 text-xs font-semibold ${owner.found ? "text-emerald-700" : "text-rose-600"}`}>{owner.found ? `Account name: ${owner.name}` : owner.self ? "That is your own account." : "No account with that number."}</p>
        )}
        {friends.some((f) => f.username) && !to && (
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {friends
              .filter((f) => f.username)
              .map((f) => (
                <button key={f.pid} onClick={() => setTo(`@${f.username}`)} className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-stone-800 ring-1 ring-black/10 transition active:scale-95">
                  {f.name}
                </button>
              ))}
          </div>
        )}
        <input value={amount} onChange={(e) => { setAmount(e.target.value.replace(/[^\d]/g, "").slice(0, 8)); setMsg(null); setConfirming(false); }} inputMode="numeric" placeholder="Amount in naira" className={field} />
        <div className="flex gap-1.5">
          {QUICK.map((q) => (
            <button key={q} onClick={() => { setAmount(String(q)); setConfirming(false); }} className="flex-1 rounded-lg bg-white py-1.5 text-[11px] font-bold text-stone-700 ring-1 ring-black/10 transition active:scale-95">
              {q >= 1000 ? `${q / 1000}k` : q}
            </button>
          ))}
        </div>
        <input value={note} onChange={(e) => setNote(e.target.value.slice(0, 60))} placeholder="Note (optional)" className={field} />

        {confirming && valid ? (
          <div className="rounded-xl bg-white p-3 ring-1 ring-black/10">
            <p className="text-sm font-semibold text-black">
              Send {naira(value)} to {owner?.name} (@{account})?
            </p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setConfirming(false)} className="flex-1 rounded-xl bg-stone-100 py-2.5 text-xs font-bold text-stone-700 transition active:scale-95">
                Cancel
              </button>
              <button disabled={busy} onClick={() => void send()} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-50">
                {busy ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        ) : (
          <button disabled={!valid} onClick={() => setConfirming(true)} className="w-full rounded-xl bg-stone-900 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-40">
            {value > money ? "Not enough balance" : "Send"}
          </button>
        )}
        {msg && <p className={`px-1 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-rose-600"}`}>{msg.text}</p>}
        <p className="px-1 text-[11px] text-stone-500">Limits: ₦1,000,000 at a time and ₦3,000,000 a day.</p>
      </div>

      {/* statement */}
      <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-wide text-stone-400">Recent</p>
      {items === null ? (
        <p className="text-xs text-stone-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="rounded-xl bg-white p-3 text-xs text-stone-500 ring-1 ring-black/5">No transfers yet.</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((i) => (
            <li key={i.id} className="rounded-xl bg-white px-3 py-2 ring-1 ring-black/5">
              <div className="flex items-center gap-2.5">
                <span className={`grid size-8 shrink-0 place-items-center rounded-full ${i.dir === "in" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
                  {fromState(i) ? <Landmark className="size-4" /> : i.dir === "in" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-black">{i.dir === "in" ? `From ${i.name}` : `To ${i.name}`}</span>
                  <span className="block truncate text-[11px] text-stone-500">{i.username ? `@${i.username}` : ""}{i.note ? `${i.username ? " · " : ""}${i.note}` : ""}</span>
                </span>
                <span className={`shrink-0 text-[13px] font-extrabold tabular-nums ${i.dir === "in" ? "text-emerald-700" : "text-black"}`}>
                  {i.dir === "in" ? "+" : "-"}
                  {naira(i.amount)}
                </span>
              </div>
              {i.dir === "out" && !fromState(i) && (
                <div className="empty:hidden">
                  <EfccReportButton item={i} />
                </div>
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
