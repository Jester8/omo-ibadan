import { apiBase, ensureToken } from "./api";
import { useGame } from "./store";

export type BankItem = { id: number; dir: "in" | "out"; name: string; username: string; amount: number; note: string; at: number; /** the other side's player id and what kind of row it is (an older server sends neither) */ pid?: string; kind?: string };

const call = async <T,>(method: string, path: string, body?: unknown): Promise<{ ok: boolean; data: T | null }> => {
  const token = await ensureToken();
  if (!token) return { ok: false, data: null };
  try {
    const r = await fetch(`${apiBase()}${path}`, { method, headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(8000) });
    return { ok: r.ok, data: (await r.json().catch(() => null)) as T | null };
  } catch {
    return { ok: false, data: null };
  }
};

/** Whose account is this number (a username)? */
export async function lookupAccount(u: string): Promise<{ found: boolean; name?: string; username?: string; self?: boolean }> {
  const r = await call<{ found: boolean; name?: string; username?: string; self?: boolean }>("GET", `/api/bank/lookup?u=${encodeURIComponent(u)}`);
  return r.data ?? { found: false };
}

/** Send money. Your balance only goes down once the bank has accepted the transfer. */
export async function sendMoney(to: string, amount: number, note: string): Promise<{ ok: boolean; message: string; name?: string }> {
  const s = useGame.getState();
  if (amount > s.money) return { ok: false, message: "You do not have that much." };
  const r = await call<{ ok?: boolean; error?: string; name?: string }>("POST", "/api/bank/send", { to, amount, note });
  if (!r.ok || !r.data?.ok) return { ok: false, message: r.data?.error ?? "The bank could not be reached. Try again." };
  useGame.setState((st) => ({ money: st.money - amount }));
  return { ok: true, message: `Sent ₦${amount.toLocaleString("en-NG")} to ${r.data.name}.`, name: r.data.name };
}

export async function bankHistory(): Promise<BankItem[]> {
  const r = await call<{ items: BankItem[] }>("GET", "/api/bank/history");
  return (r.data?.items ?? []).filter((i) => i.kind !== "parcel");
}

/** Take a credit into your balance. The bank hands it over only once, so a reload never pays you twice. */
export async function takeCredit(c: { id: number; from: string; amount: number; note: string }) {
  const r = await call<{ ok: boolean; amount: number }>("POST", "/api/bank/claim", { id: c.id });
  if (!r.data?.ok) return;
  useGame.setState((st) => ({ money: st.money + r.data!.amount }));
  // a sale has its own live notice for the owner
  // a loan or a land sale has its own notice too
  if (!c.note.startsWith("Sale:") && !c.note.startsWith("Loan:") && !c.note.startsWith("Land sale:")) useGame.getState().toast(`${c.from} sent you ₦${r.data.amount.toLocaleString("en-NG")}${c.note ? `: ${c.note}` : ""}`, "good");
}

/** Money sent while you were away. */
export async function collectPending() {
  const r = await call<{ credits: { id: number; from: string; amount: number; note: string }[] }>("GET", "/api/bank/pending");
  for (const c of r.data?.credits ?? []) await takeCredit(c);
}

/* ------------------------------------ business ------------------------------------ */

/** Pay a business at the price its owner set. The owner is paid live; your balance drops once the bank accepts. */
export async function payBusiness(plotId: string): Promise<{ ok: boolean; message: string; amount?: number }> {
  const r = await call<{ ok?: boolean; error?: string; amount?: number; item?: string }>("POST", "/api/biz/pay", { plotId });
  if (!r.ok || !r.data?.ok || !r.data.amount) return { ok: false, message: r.data?.error ?? "The payment did not go through." };
  const amount = r.data.amount;
  if (useGame.getState().money < amount) return { ok: false, message: "You do not have enough for that." };
  useGame.setState((st) => ({ money: st.money - amount }));
  return { ok: true, message: `Paid ₦${amount.toLocaleString("en-NG")}`, amount };
}

/** Finish a shift: the owner pays your wage straight away. */
export async function workShift(plotId: string): Promise<{ ok: boolean; message: string }> {
  const r = await call<{ ok?: boolean; error?: string; wage?: number }>("POST", "/api/biz/shift", { plotId });
  return r.data?.ok ? { ok: true, message: `Shift done. Wage: ₦${r.data.wage?.toLocaleString("en-NG")}` } : { ok: false, message: r.data?.error ?? "The shift was not counted." };
}

/** Recent sales for a business you own (the live ones arrive as they happen). */
export async function salesHistory(plotId: string) {
  const r = await call<{ sales: { id: number; from: string; amount: number; item: string; at: number }[] }>("GET", `/api/biz/sales?plotId=${encodeURIComponent(plotId)}`);
  return r.data?.sales ?? [];
}

/** Take a wage out of your balance: you are the employer. The bank does it only once per shift. */
export async function takeDebit(d: { id: number; to: string; amount: number; note: string }) {
  const r = await call<{ ok: boolean; amount: number }>("POST", "/api/bank/debited", { id: d.id });
  if (!r.data?.ok) return;
  useGame.setState((st) => ({ money: Math.max(0, st.money - r.data!.amount) }));
  useGame.getState().toast(`You paid ${d.to} ₦${r.data.amount.toLocaleString("en-NG")}: ${d.note}`, "info");
}

/** Wages owed from shifts worked while you were away. */
export async function collectDebits() {
  const r = await call<{ debits: { id: number; to: string; amount: number; note: string }[] }>("GET", "/api/bank/debits");
  for (const d of r.data?.debits ?? []) await takeDebit(d);
}
