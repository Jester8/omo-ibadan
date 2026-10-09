"use client";

import { clockAt, loanNow } from "@/lib/loans";
import { naira } from "@/lib/plots";
import { serverNow, useFlag } from "@/lib/socialState";
import { useSecond } from "@/lib/hooks";
import { useGame } from "@/lib/store";
import { PokeSwitch } from "./PokeUI";

/** Extra rows for the Me sheet: the poke switch, the police, and a line about a bank loan. */
export default function SocialProfileExtras() {
  const pokes = useFlag("pokes");
  const loansOn = useFlag("loans");
  const policeOpen = useGame((s) => s.policeOpen);
  const held = useGame((s) => !!s.custody);
  const loan = useGame((s) => s.loan);
  useSecond();
  if (!pokes && !policeOpen && !(loansOn && loan)) return null;
  const owed = loan ? loanNow(loan, serverNow()) : null;
  return (
    <div className="mt-5 space-y-3 rounded-2xl bg-stone-50 p-4 ring-1 ring-black/5">
      {pokes && <PokeSwitch />}
      {policeOpen && (
        <button onClick={() => useGame.getState().setSheet("custody")} className="flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-stone-800 ring-1 ring-black/5 transition active:scale-[0.98]">
          <span>{held ? "You are in custody" : "Police and my cases"}</span>
          <span className="text-stone-400">›</span>
        </button>
      )}
      {loansOn && loan && owed && (
        <button onClick={() => useGame.getState().setSheet("bank")} className="flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-stone-800 ring-1 ring-black/5 transition active:scale-[0.98]">
          <span>
            You owe {naira(owed.owed)}, due {clockAt(loan.dueAt)}
          </span>
          <span className="text-stone-400">›</span>
        </button>
      )}
    </div>
  );
}
