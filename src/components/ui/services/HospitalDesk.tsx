"use client";

import { useState } from "react";
import { FEES, HOSPITALS, ILLNESSES, SYMPTOMS, SYMPTOM_IDS, triage, type SymptomId, type Visit } from "@/lib/health";
import { admitEmergency, bookCase, cancelTicket, checkupPrice, falseAlarmWaitSecs, quoteNow, registerPatient, routineCheckup, runLab } from "@/lib/hospital";
import { walkToFreeBed } from "@/lib/hospital";
import { useSecond } from "@/lib/hooks";
import { naira } from "@/lib/plots";
import { closeService } from "@/lib/services";
import { useGame } from "@/lib/store";
import type { ServiceBodyProps } from "./types";

type Screen = "home" | "symptoms" | "emergency" | "records";
const card = "rounded-2xl bg-white p-4 ring-1 ring-black/5";
const big = "rounded-2xl px-4 py-3.5 text-left transition enabled:active:scale-[0.98] disabled:opacity-45";
const primary = "w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition enabled:active:scale-[0.98] disabled:opacity-45";
const ghost = "w-full rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-700 transition active:scale-[0.98]";

const clock = (secs: number) => `${Math.floor(secs / 60)}:${String(Math.max(0, Math.floor(secs % 60))).padStart(2, "0")}`;
const SEVERITY = ["mild", "moderate", "severe"] as const;

/** Reception at UCH and Adeoyo: register, describe how you feel, pay and take a ticket, or go to the emergency desk. */
export default function HospitalDesk({ ctx }: ServiceBodyProps) {
  const place = ctx.placeId;
  const hosp = HOSPITALS[place] ?? HOSPITALS.uch;
  const med = useGame((s) => s.medical);
  const money = useGame((s) => s.money);
  const name = useGame((s) => s.profile?.name ?? "");
  const toast = useGame((s) => s.toast);
  const now = useSecond() * 1000;
  const [screen, setScreen] = useState<Screen>(ctx.arg === "emergency" ? "emergency" : "home");
  const [picked, setPicked] = useState<SymptomId[]>([]);
  const [stage, setStage] = useState<"pick" | "result">("pick");
  const [labbed, setLabbed] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  /** A desk step: runs now, shows the reason when it fails. The store charges the money in the same breath, so a double tap cannot pay twice. */
  const step = (fn: () => string | null, then?: () => void) => {
    const err = fn();
    if (err) toast(err, "bad");
    else then?.();
  };
  const back = () => {
    setScreen("home");
    setStage("pick");
    setPicked([]);
    setLabbed(false);
    setNote(null);
  };

  const adm = med.admission;
  const ill = med.illness;
  const def = ill ? ILLNESSES[ill.id] : null;

  /* ------------------------------ records ------------------------------ */
  if (screen === "records") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-stone-600">Your last visits. Tap one for the receipt.</p>
        {!med.history.length && <p className={`${card} text-sm text-stone-500`}>Nothing yet.</p>}
        <ul className="space-y-2">
          {med.history.map((v) => (
            <Receipt key={v.id} v={v} />
          ))}
        </ul>
        <button type="button" className={ghost} onClick={back}>Back</button>
      </div>
    );
  }

  /* ------------------------------ emergency ------------------------------ */
  if (screen === "emergency") {
    const wait = falseAlarmWaitSecs(now);
    return (
      <div className="space-y-3">
        <div className={card}>
          <p className="text-sm font-bold text-stone-900">Emergency desk</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
            <li>No queue, and any condition.</li>
            <li>No health card needed.</li>
            <li>The biggest recovery, and 20 minutes before you can catch anything again.</li>
          </ul>
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
            If we find nothing, you pay {naira(FEES.falseAlarm)} only and cannot use the emergency desk again for 3 minutes.
          </p>
        </div>
        {adm ? (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">You are admitted ({adm.ticket}). Lie on any free bed.</p>
        ) : (
          <button
            type="button"
            className={primary}
            disabled={wait > 0 || money < FEES.emergency}
            onClick={() =>
              step(() => admitEmergency(place), () => {
                const now2 = useGame.getState().medical;
                if (now2.admission) setScreen("home");
                else setNote(`Nothing life-threatening found. ${naira(FEES.falseAlarm)} triage fee.`);
              })
            }
          >
            {wait > 0 ? `Please wait ${clock(wait)}` : `Admit me · ${naira(FEES.emergency)}`}
          </button>
        )}
        {money < FEES.emergency && !adm && <p className="text-center text-xs text-stone-500">You have {naira(money)}.</p>}
        {note && <p className="rounded-xl bg-stone-100 px-3 py-2 text-sm text-stone-700">{note}</p>}
        <button type="button" className={ghost} onClick={back}>Back</button>
      </div>
    );
  }

  /* ------------------------------ symptoms ------------------------------ */
  if (screen === "symptoms") {
    // after the lab, the true diagnosis is known: the picked symptoms no longer matter
    const result = labbed && ill ? "match" : triage(picked, ill);
    if (stage === "result") {
      if (result === "match" && ill && def) {
        const q = quoteNow(place);
        return (
          <div className="space-y-3">
            <div className={card}>
              <p className="text-3xl">{def.emoji}</p>
              <p className="mt-1 text-lg font-extrabold text-stone-900">{def.name} <span className="text-sm font-semibold text-stone-500">({SEVERITY[ill.severity - 1]})</span></p>
              <p className="text-sm text-stone-600">{def.blurb}</p>
            </div>
            {q && (
              <div className={card}>
                <ul className="space-y-1.5 text-sm">
                  {q.lines.map((l) => (
                    <li key={l.label} className="flex justify-between gap-3"><span className="text-stone-600">{l.label}</span><span className="font-semibold tabular-nums">{naira(l.amount)}</span></li>
                  ))}
                  <li className="flex justify-between gap-3 border-t border-stone-100 pt-1.5 font-bold"><span>Total</span><span className="tabular-nums">{naira(q.total)}</span></li>
                </ul>
                <p className="mt-2 text-xs text-stone-500">Queue: about {clock(q.waitSecs)}. {hosp.name}.</p>
              </div>
            )}
            <button type="button" className={primary} disabled={!q || money < q.total || !!adm} onClick={() => step(() => bookCase(place), back)}>
              {q ? `Pay ${naira(q.total)} and join the queue` : "Join the queue"}
            </button>
            {q && money < q.total && <p className="text-center text-xs text-stone-500">You have {naira(money)}.</p>}
            <button type="button" className={ghost} onClick={() => setStage("pick")}>Back</button>
          </div>
        );
      }
      if (result === "inconclusive") {
        return (
          <div className="space-y-3">
            <div className={card}>
              <p className="text-lg font-extrabold text-stone-900">We need tests</p>
              <p className="mt-1 text-sm text-stone-600">What you describe does not point to one thing. A lab test will tell us what is wrong.</p>
            </div>
            <button type="button" className={primary} disabled={money < FEES.lab} onClick={() => step(() => runLab(place), () => setLabbed(true))}>
              Run lab tests · {naira(FEES.lab)}
            </button>
            <button type="button" className={ghost} onClick={() => setStage("pick")}>Pick again</button>
          </div>
        );
      }
      return (
        <div className="space-y-3">
          <div className={card}>
            <p className="text-lg font-extrabold text-stone-900">Nothing serious found</p>
            <p className="mt-1 text-sm text-stone-600">{ill ? "You look unwell. Tell us what you feel." : "Rest, drink water, wash your hands."}</p>
          </div>
          {!ill && (
            <button type="button" className={primary} disabled={money < checkupPrice()} onClick={() => step(() => routineCheckup(place), closeService)}>
              Routine check-up · {naira(checkupPrice())}
            </button>
          )}
          <button type="button" className={ghost} onClick={() => setStage("pick")}>{ill ? "Tell us what you feel" : "Back"}</button>
        </div>
      );
    }
    return (
      <div className="space-y-3">
        <p className="text-sm text-stone-600">What do you feel? Pick up to three.</p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_IDS.map((id) => {
            const on = picked.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== id) : p.length >= 3 ? p : [...p, id]))}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition active:scale-95 ${on ? "bg-red-600 text-white" : "bg-white text-stone-700 ring-1 ring-black/10"}`}
              >
                {SYMPTOMS[id].label}
              </button>
            );
          })}
        </div>
        <button type="button" className={primary} onClick={() => setStage("result")}>
          {picked.length ? "Continue" : "Nothing, just a check-up"}
        </button>
        <button type="button" className={ghost} onClick={back}>Back</button>
      </div>
    );
  }

  /* ------------------------------ home ------------------------------ */
  const waiting = adm ? Math.max(0, Math.ceil((adm.calledAt - now) / 1000)) : 0;
  return (
    <div className="space-y-3">
      <div className={`${card} flex items-center justify-between gap-3`}>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-stone-900">{name}</p>
          <p className="text-xs text-stone-500">{med.card ? `Card ${med.card.no}` : "Not registered"}</p>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">24 hours</span>
      </div>

      {adm && (
        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
          <p className="text-[11px] font-bold uppercase tracking-wide text-red-700">Your ticket</p>
          <p className="text-2xl font-extrabold text-red-900">{adm.ticket}</p>
          <p className="text-sm text-red-900/80">
            {adm.place !== place ? `For ${HOSPITALS[adm.place]?.name ?? "another hospital"}.` : waiting > 0 ? `Called in ${clock(waiting)}. Take a seat in the waiting area.` : "Called: please go to a bed."}
          </p>
          <div className={`mt-3 grid gap-2 ${adm.place === place ? "grid-cols-2" : "grid-cols-1"}`}>
            {adm.place === place && (
              <button type="button" className="rounded-xl bg-red-600 px-3 py-2.5 text-sm font-bold text-white transition active:scale-[0.98]" onClick={() => { closeService(); walkToFreeBed(adm.kind === "emergency" ? "casualty" : "ward"); }}>
                Go to a free bed
              </button>
            )}
            <button type="button" className="rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-red-800 ring-1 ring-red-200 transition active:scale-[0.98]" onClick={cancelTicket}>
              Cancel ticket
            </button>
          </div>
        </div>
      )}

      {!med.card ? (
        <div className={card}>
          <p className="text-sm font-bold text-stone-900">New patient registration</p>
          <p className="mt-0.5 text-xs text-stone-500">One health card works at UCH and Adeoyo. You pay once.</p>
          <button type="button" className={`${primary} mt-3`} disabled={money < FEES.register} onClick={() => step(() => registerPatient(place))}>
            Register · {naira(FEES.register)}
          </button>
        </div>
      ) : (
        <button type="button" disabled={!!adm} onClick={() => setScreen("symptoms")} className={`${big} w-full bg-white ring-1 ring-black/5`}>
          <span className="block text-base font-extrabold text-stone-900">🩺 Report a case</span>
          <span className="text-xs text-stone-500">{ill ? "Tell us how you feel, pay, and take a ticket." : "A check-up, or tell us how you feel."}</span>
        </button>
      )}
      <button type="button" disabled={!!adm} onClick={() => setScreen("emergency")} className={`${big} w-full bg-red-600 text-white`}>
        <span className="block text-base font-extrabold">🚑 Report an emergency</span>
        <span className="text-xs text-red-100">No queue · {naira(FEES.emergency)}</span>
      </button>
      <button type="button" className={ghost} onClick={() => setScreen("records")}>Medical records</button>
    </div>
  );
}

function Receipt({ v }: { v: Visit }) {
  const def = v.illness ? ILLNESSES[v.illness] : null;
  const title = v.kind === "registration" ? "Registration" : v.kind === "checkup" ? "Routine check-up" : v.kind === "lab" ? "Lab tests" : v.kind === "falsealarm" ? "Emergency desk: nothing found" : v.kind === "emergency" ? `Emergency${def ? `: ${def.name}` : ""}` : (def?.name ?? "Treatment");
  return (
    <li className="rounded-2xl bg-white ring-1 ring-black/5">
      <details>
        <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 text-sm">
          <span className="min-w-0">
            <span className="block truncate font-semibold text-stone-900">{title}</span>
            <span className="text-xs text-stone-500">{HOSPITALS[v.place]?.code ?? v.place} · {new Date(v.at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })} {new Date(v.at).toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })}</span>
          </span>
          <span className="shrink-0 font-bold tabular-nums">{naira(v.total)}</span>
        </summary>
        <div className="space-y-1 px-4 pb-3 text-xs text-stone-600">
          {v.lines.map((l) => (
            <p key={l.label} className="flex justify-between"><span>{l.label}</span><span className="tabular-nums">{naira(l.amount)}</span></p>
          ))}
          <p className="pt-1 text-stone-500">{v.note}</p>
        </div>
      </details>
    </li>
  );
}
