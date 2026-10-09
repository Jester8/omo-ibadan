// scripts/check-money.ts: npm run check:money
// 1. Proves the tables in moneyRules.ts (shared with the server, which has no catalogue) still match the game's catalogues.
// 2. Runs src/lib/loans.ts and src/lib/property.ts for real: once as the demo build (no server: any network call fails the run) and
//    once against a fake server that speaks the wire contract (PLAN-social B.10). Nothing here opens a connection.
import { execFileSync } from "node:child_process";
import { PLOTS, TIERS } from "../src/lib/plots";
import { BUSINESSES } from "../src/lib/business";
import { DECOR } from "../src/lib/decor";
import { TITLES } from "../src/lib/titles";
import { MIN } from "../src/lib/custodyRules";
import type { LoanView, PlotState } from "../src/lib/protocol";
import { BIZ_COST, DECOR_PRICE, LAND_PRICE, LOAN, TIER_COST, TITLE_REPS, applyPayment, creditLimit, landPrefix, landPrice, loanAmounts, newLoan, owedNow, paidValue, repEarned, saleValue, SALE } from "../src/lib/moneyRules";

let errors = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };
const ok = (cond: unknown, msg: string) => { if (!cond) err(msg); };

/* ------------------------------------------------ 1. the tables against the catalogues ------------------------------------------------ */

async function tables() {
  for (const p of PLOTS) if (landPrice(p.id) !== p.price) err(`plot ${p.id}: moneyRules says ${landPrice(p.id)}, plots.ts says ${p.price}`);
  const prefixes = new Set(PLOTS.map((p) => landPrefix(p.id)));
  for (const k of Object.keys(LAND_PRICE)) if (!prefixes.has(k)) err(`LAND_PRICE has "${k}" but no plot starts with it`);
  TIERS.forEach((t, i) => { if (TIER_COST[i] !== t.cost) err(`tier ${i}: ${TIER_COST[i]} vs ${t.cost}`); });
  for (const b of BUSINESSES) if (BIZ_COST[b.id] !== b.cost) err(`business ${b.id}: ${BIZ_COST[b.id]} vs ${b.cost}`);
  for (const k of Object.keys(BIZ_COST)) if (!BUSINESSES.some((b) => b.id === k)) err(`BIZ_COST has unknown ${k}`);
  for (const d of DECOR) if (DECOR_PRICE[d.id] !== d.price) err(`decor ${d.id}: ${DECOR_PRICE[d.id]} vs ${d.price}`);
  for (const k of Object.keys(DECOR_PRICE)) if (!DECOR.some((d) => d.id === k)) err(`DECOR_PRICE has unknown ${k}`);
  TITLES.forEach((t, i) => { if (TITLE_REPS[i] !== t.rep) err(`title ${t.name}: ${TITLE_REPS[i]} vs ${t.rep}`); });
  if (TITLE_REPS.length !== TITLES.length) err("TITLE_REPS length differs from TITLES");
  if (LOAN.titleBase.length !== TITLES.length) err(`LOAN.titleBase has ${LOAN.titleBase.length} entries for ${TITLES.length} titles`);
  // the biggest possible sale must fit under the cap
  const top = Math.max(...PLOTS.map((p) => saleValue(p.id, { tier: 3, decor: DECOR.flatMap((d) => [d.id, d.id, d.id]) }).gross));
  if (top >= SALE.max) err(`a mansion with full decor sells for ${top}, at or over SALE.max ${SALE.max}`);

  // selling can never make money: for every plot, every build and a full set of decor, the city pays less than the owner spent
  const full = DECOR.flatMap((d) => [d.id, d.id, d.id]);
  const spent = full.reduce((a, id) => a + (DECOR_PRICE[id] ?? 0), 0);
  let sold = 0;
  for (const p of PLOTS) {
    const builds: Pick<PlotState, "tier" | "biz">[] = [0, 1, 2, 3].map((tier) => ({ tier })).concat(BUSINESSES.map((b) => ({ tier: 1, biz: b.id })));
    for (const b of builds) {
      const q = saleValue(p.id, { ...b, decor: full });
      sold++;
      if (q.gross % SALE.round !== 0) err(`${p.id} ${JSON.stringify(b)}: sale ${q.gross} is not a multiple of ${SALE.round}`);
      if (q.gross >= paidValue(p.id, b) + spent) err(`${p.id} ${JSON.stringify(b)}: the city pays ${q.gross} for something that cost ${paidValue(p.id, b) + spent}`);
      if (q.gross <= 0) err(`${p.id} ${JSON.stringify(b)}: sells for nothing`);
    }
  }
  // the loan limit grows with the title and with property, and never passes the hard cap
  let last = 0;
  for (let t = 0; t < TITLES.length; t++) {
    const l = creditLimit(t, 0);
    if (l < last || l < LOAN.minAmount) err(`creditLimit(${t}, 0) = ${l}`);
    last = l;
  }
  if (creditLimit(7, 99_000_000) !== LOAN.hardCap) err("creditLimit does not stop at the hard cap");
  if (loanAmounts(creditLimit(0, 0)).length !== (creditLimit(0, 0) - LOAN.minAmount) / LOAN.step + 1) err("loanAmounts does not step from the minimum to the limit");

  // the reputation selling takes back is exactly what buying and building gave (store.ts): run the real store actions and compare
  const { useGame } = await import("../src/lib/store");
  const { DEFAULT_LOOK } = await import("../src/lib/look");
  const gain = (steps: (id: string) => (string | null)[], id: string) => {
    useGame.setState({ profile: { id: "me", name: "Me", look: DEFAULT_LOOK }, money: 10_000_000, rep: 0, plots: {} });
    const errs = steps(id).filter(Boolean);
    return { rep: useGame.getState().rep, errs, plot: useGame.getState().plots[id] };
  };
  const s = () => useGame.getState();
  const house = gain((id) => [s().buyPlot(id), s().upgradePlot(id), s().upgradePlot(id), s().upgradePlot(id)], "moniya-1");
  ok(house.errs.length === 0 && house.plot?.tier === 3, `store: could not build a mansion (${house.errs.join(", ")})`);
  ok(house.rep === repEarned({ tier: 3 }), `repEarned says a mansion earns ${repEarned({ tier: 3 })}, the store gave ${house.rep}`);
  for (let t = 0; t <= 2; t++) {
    const part = gain((id) => [s().buyPlot(id), ...Array.from({ length: t }, () => s().upgradePlot(id))], "moniya-1");
    ok(part.rep === repEarned({ tier: t }), `repEarned says tier ${t} earns ${repEarned({ tier: t })}, the store gave ${part.rep}`);
  }
  for (const b of BUSINESSES) {
    const biz = gain((id) => [s().buyPlot(id), s().buildBusiness(id, b.id)], "moniya-1");
    ok(biz.rep === repEarned({ tier: 1, biz: b.id }), `repEarned says a ${b.id} earns ${repEarned({ tier: 1, biz: b.id })}, the store gave ${biz.rep}`);
  }
  console.log(`  tables: ${PLOTS.length} plots, ${sold} sale values checked, top sale ${top}`);
}

/* ------------------------------------------------ 2. loans.ts and property.ts, run for real ------------------------------------------------ */

type Reply = { status: number; json?: unknown } | "throw";
type Call = { method: string; path: string; body: Record<string, unknown> | undefined; auth: string | null };

async function behaviour(phase: "demo" | "server") {
  const server = phase === "server";
  // the world this runs in: a clock we move by hand, a localStorage, and a fetch that is a fake bank
  let T = Date.UTC(2026, 9, 9, 12, 0, 0);
  Date.now = () => T;
  const store = new Map<string, string>();
  (globalThis as { localStorage?: unknown }).localStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v), removeItem: (k: string) => void store.delete(k) };
  const calls: Call[] = [];
  const routes = new Map<string, (c: Call) => Reply>();
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input));
    const c: Call = { method: init?.method ?? "GET", path: url.pathname + url.search, body: init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : undefined, auth: new Headers(init?.headers).get("authorization") };
    calls.push(c);
    const reply = routes.get(`${c.method} ${url.pathname}`)?.(c) ?? { status: 404, json: { error: "No such route.", code: "BAD" } };
    if (reply === "throw") throw new TypeError("network down");
    return new Response(JSON.stringify(reply.json ?? {}), { status: reply.status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  store.set("omo-ibadan-token", JSON.stringify({ pid: "me", token: "t0ken" }));

  const { useGame } = await import("../src/lib/store");
  const { NPC_PLOTS } = await import("../src/lib/plots");
  const { DEFAULT_LOOK } = await import("../src/lib/look");
  const { useSocial, DEMO_FLAGS } = await import("../src/lib/socialState");
  const loans = await import("../src/lib/loans");
  const prop = await import("../src/lib/property");

  const toasts: { text: string; tone: string }[] = [];
  const mk = (o: Partial<PlotState> = {}): PlotState => ({ ownerId: "me", ownerName: "Tunde", tier: 0, collectedAt: T, ...o });
  const fresh = (o: Record<string, unknown> = {}) => {
    toasts.length = 0;
    useGame.setState({
      profile: { id: "me", name: "Tunde", look: DEFAULT_LOOK },
      money: 100_000, rep: 0, loan: null, plots: { ...NPC_PLOTS }, decor: {}, custody: null, interior: null, remotes: {}, net: "online", clockSkew: 0, sheet: null, knocks: [],
      toast: (text: string, tone = "info") => void toasts.push({ text, tone }),
      ...o,
    } as never);
    useSocial.setState({ flags: { ...DEMO_FLAGS, now: T, loans: true, sales: true } });
  };
  const st = () => useGame.getState();
  const said = (re: RegExp) => toasts.some((t) => re.test(t.text));
  const loanView = (o: Partial<LoanView> = {}): LoanView => ({ id: 7, ...newLoan(50_000, 180, T), stage: "active", noticeAt: null, seizedPlot: null, ...o });
  const ok2 = (cond: unknown, msg: string) => ok(cond, `[${phase}] ${msg}`);
  const posts = () => calls.filter((c) => c.method === "POST");

  /* ---- the offer ---- */
  fresh();
  let o = loans.loanOffer();
  ok2(o.limit === 10_000 && o.titleBase === 10_000 && o.collateral === 0 && o.blocked === null, `a newcomer may borrow 10,000 (got ${JSON.stringify(o)})`);
  fresh({ rep: 70, plots: { ...NPC_PLOTS, "bodija-estate-3": mk({ tier: 1 }) } });
  o = loans.loanOffer();
  ok2(o.limit === 128_000 && o.collateral === 195_000 && o.titleBase === 50_000, `a Jagun with a Bodija bungalow may borrow 128,000 (got ${JSON.stringify(o)})`);
  fresh({ rep: 70, plots: { ...NPC_PLOTS, "bodija-estate-3": mk({ tier: 1, seized: true }), "moniya-1": mk({ ownerId: "someone-else" }) } });
  ok2(loans.loanOffer().limit === 50_000, "land under lien and other people's land are not collateral");
  fresh({ rep: 70 });
  useSocial.setState({ flags: { ...DEMO_FLAGS, loans: false } });
  ok2(/closed/.test(loans.loanOffer().blocked ?? ""), "the bank is closed when loans are switched off");
  ok2(!loans.loansOn(), "loansOn() follows the flag");
  fresh({ loan: loanView() });
  ok2(/already/.test(loans.loanOffer().blocked ?? ""), "a second loan is refused up front");

  /* ---- taking a loan: every boundary ---- */
  fresh({ money: 0, rep: 70 });
  for (const [amount, term, what] of [[4_999, 180, "below the minimum"], [5_500, 180, "off the 1,000 step"], [51_000, 180, "over the limit"], [Number.NaN, 180, "not a number"], [Number.POSITIVE_INFINITY, 180, "infinite"], [10_000, 90, "a term that is not offered"], [10_000, 0, "no term"], [-5_000, 60, "negative"]] as const) {
    const r = await loans.takeLoan(amount, term);
    ok2(!r.ok && r.message.length > 0, `takeLoan refuses ${what}`);
  }
  ok2(st().money === 0 && st().loan === null, "refused loans change nothing");
  ok2(calls.length === 0, "refused loans never reach the server");
  if (server) {
    useSocial.setState({ flags: { ...DEMO_FLAGS, loans: false } });
    ok2(!(await loans.takeLoan(10_000, 60)).ok && calls.length === 0, "a switched-off bank is not called");
    useSocial.setState({ flags: { ...DEMO_FLAGS, loans: true } });
    useGame.setState({ net: "offline" });
    const r = await loans.takeLoan(10_000, 60);
    ok2(!r.ok && /offline/i.test(r.message) && calls.length === 0, "an offline player cannot borrow (the cash arrives over the socket)");
    useGame.setState({ net: "online" });
  }

  if (!server) {
    const r5 = await loans.takeLoan(5_000.9, 60);
    ok2(r5.ok && st().loan?.principal === 5_000 && st().money === 5_000, "the smallest loan (5,000.9 rounds down) works and pays out at once");
    useGame.setState({ loan: null, money: 0 });
    const r = await loans.takeLoan(50_000, 180);
    const l = st().loan;
    ok2(r.ok && st().money === 50_000, "a loan at the limit pays out at once");
    ok2(!!l && l.principal === 50_000 && l.left === 50_000 && l.interest === 0 && l.stage === "active" && l.noticeAt === null && l.seizedPlot === null, "the new loan starts clean");
    ok2(!!l && l.dueAt === T + 180 * MIN && l.takenAt === T && l.at === Math.ceil(T / MIN) * MIN && l.rateBpm === LOAN.rateBpm && !l.lateFee, "the new loan has the due time and the first whole minute");
    ok2(!(await loans.takeLoan(5_000, 60)).ok && st().money === 50_000, "a second loan is refused");
    ok2(calls.length === 0, "the demo build never calls a server");

    /* ---- repaying: the waterfall, the pre-check, pay-all ---- */
    ok2(!(await loans.repayLoan(Number.NaN)).ok && !(await loans.repayLoan(0)).ok && !(await loans.repayLoan(-1)).ok, "repayLoan refuses nothing, zero and negative");
    T += 60 * MIN; // owed 53,000: 3,000 interest
    ok2(loans.loanNow(st().loan!, T).owed === 53_000 && loans.loanNow(st().loan!, T).saved === 6_000, "an hour in: owed 53,000, and paying now saves 6,000 against the deadline");
    useGame.setState({ money: 1_000 });
    const poor = await loans.repayLoan(10_000);
    ok2(!poor.ok && /1,000/.test(poor.message) && st().money === 1_000 && st().loan?.left === 50_000, "a payment the balance cannot cover changes nothing");
    useGame.setState({ money: 30_000 });
    ok2((await loans.repayLoan(20_000)).ok, "a part payment goes through");
    ok2(st().money === 10_000 && st().loan?.interest === 0 && st().loan?.left === 33_000, "interest is paid before principal (20,000 clears 3,000 interest and 17,000 principal)");
    T += 60 * MIN;
    ok2(loans.loanNow(st().loan!, T).owed === 34_980, "an hour later 33,000 owes 34,980");
    const tooMuch = await loans.repayLoan(1_000_000);
    ok2(!tooMuch.ok && st().money === 10_000, "paying all with too little in the balance is refused before anything moves");
    useGame.setState({ money: 40_000 });
    const all = loans.loanNow(st().loan!, T).payAll;
    ok2(all > 34_980 && all <= 34_980 + 200, `pay-all asks for the debt plus about two minutes (got ${all})`);
    const cleared = await loans.repayLoan(all);
    ok2(cleared.ok && st().loan === null && st().money === 40_000 - 34_980, "pay-all takes only what is owed and clears the loan");
    ok2(said(/cleared/i), "clearing the loan says so");
    ok2(!(await loans.repayLoan(5_000)).ok, "no loan, nothing to repay");
    ok2(calls.length === 0, "repaying never calls a server in the demo build");

    /* ---- the clock: overdue, the late fee, the notice, the reputation hit ---- */
    fresh({ money: 0, rep: 70 });
    await loans.takeLoan(50_000, 60);
    const due = st().loan!.dueAt;
    T = due - 1_000;
    loans.loanTick();
    ok2(st().loan?.stage === "active" && st().rep === 70 && toasts.length === 0, "one second before the deadline nothing has happened");
    T = due + 1_000;
    loans.loanTick();
    ok2(st().loan?.stage === "overdue" && st().rep === 65 && st().loan?.repHit === true && said(/overdue/i), "just after the deadline: overdue, rep -5, a toast");
    for (let i = 0; i < 5; i++) loans.loanTick();
    ok2(st().rep === 65 && toasts.filter((t) => /overdue/i.test(t.text)).length === 1, "the reputation hit and the toast happen once");
    T = due + 30 * MIN - 1_000;
    loans.loanTick();
    ok2(st().loan?.noticeAt === null, "no final notice before 30 minutes");
    T = due + 30 * MIN;
    loans.loanTick();
    ok2(st().loan?.stage === "notice" && st().loan?.noticeAt === T && said(/final notice/i) && st().rep === 65, "30 minutes after the deadline: the final notice, no second reputation hit");
    ok2(st().loan?.seizedPlot === null, "there is never a lien without a server");
    T += 20 * 60 * MIN;
    loans.loanTick();
    ok2(owedNow(st().loan!, T) === 100_000, "the debt stops at twice the amount borrowed");
    ok2(loans.loanStageAt(st().loan!, T) === "notice", "the stage stays at notice");

    fresh({ money: 0, rep: 3 });
    await loans.takeLoan(10_000, 60);
    T = st().loan!.dueAt + 5 * 60 * MIN;
    loans.loanTick();
    ok2(st().rep === 0 && st().loan?.stage === "notice" && toasts.length === 2, "back after hours: overdue and the final notice at once, and rep never goes below 0");
    useGame.setState({ money: 1_000_000 });
    ok2((await loans.repayLoan(1_000_000)).ok && st().loan === null, "a late loan can still be paid off");

    /* ---- selling ---- */
    fresh({ money: 1_000, rep: 100, plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1, collectedAt: T - 10 * MIN }) }, decor: { "moniya-2": ["plant"] } });
    let q = prop.quoteSaleAt("moniya-2", T);
    ok2(q.gross === 31_500 && q.parts.land === 24_000 && q.parts.built === 7_500 && q.net === 31_500 && q.loanPaid === 0 && q.blocked === null, `a Moniya bungalow sells for 31,500 (got ${JSON.stringify(q)})`);
    ok2(q.pendingRent === 4_000 && q.repBack === 18, "10 minutes of bungalow rent is 4,000 and the plot earned 18 reputation");
    const sold = await prop.sellPlot("moniya-2");
    ok2(sold.ok && st().money === 1_000 + 4_000 + 31_500 && st().rep === 82, "the sale pays the price and the rent, and takes the reputation back");
    ok2(!st().plots["moniya-2"] && !st().decor["moniya-2"], "the plot and its decor are gone");
    ok2(!!st().plots["bodija-estate-1"], "NPC homes are untouched");
    ok2(said(/Sold/), "a toast says it sold");
    ok2(!(await prop.sellPlot("moniya-2")).ok, "selling it twice is refused");

    fresh({ money: 0, rep: 5, plots: { ...NPC_PLOTS, "dugbe-1": mk({ tier: 1, biz: "mart", staff: [{ pid: "p1", name: "Ayo" }] }) } });
    q = prop.quoteSaleAt("dugbe-1", T);
    ok2(q.gross === 342_000 && q.repBack === 5, "a Dugbe supermarket sells for 342,000 and the reputation taken back is capped at what the player has");
    fresh({ money: 0, rep: 100, plots: { ...NPC_PLOTS, "dugbe-1": mk({ tier: 1, biz: "mart" }) }, loan: loanView({ ...newLoan(50_000, 180, T - 60 * MIN), takenAt: T - 60 * MIN }) });
    q = prop.quoteSaleAt("dugbe-1", T);
    ok2(q.loanPaid === 53_000 && q.net === 342_000 - 53_000, `the bank is paid first (got ${JSON.stringify(q)})`);
    await prop.sellPlot("dugbe-1");
    ok2(st().loan === null && st().money === 342_000 - 53_000 && said(/paid off/), "a sale that covers the loan clears it, and the player gets the rest");
    fresh({ money: 0, rep: 100, plots: { ...NPC_PLOTS, "moniya-2": mk() }, loan: loanView({ ...newLoan(50_000, 180, T - 60 * MIN), takenAt: T - 60 * MIN }) });
    q = prop.quoteSaleAt("moniya-2", T);
    ok2(q.gross === 24_000 && q.loanPaid === 24_000 && q.net === 0, "land worth less than the debt pays all of itself to the bank");
    await prop.sellPlot("moniya-2");
    ok2(st().money === 0 && owedNow(st().loan!, T) === 53_000 - 24_000 && said(/still owe/), "and the loan shrinks by exactly that much");

    /* ---- the sale refusals ---- */
    const refused = async (why: RegExp, what: string, o: Record<string, unknown>) => {
      const id = (o.plot as string | undefined) ?? "moniya-2";
      fresh({ money: 5, plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1 }), "agbowo-1": mk({ ownerId: "other" }) }, ...o });
      const had = JSON.stringify(st().plots);
      const r = await prop.sellPlot(id);
      ok2(!r.ok && why.test(r.message) && st().money === 5 && JSON.stringify(st().plots) === had, `${what}: ${r.message}`);
    };
    await refused(/do not own/, "someone else's land", { plot: "agbowo-1" });
    await refused(/do not own/, "an NPC home", { plot: "bodija-estate-1" });
    await refused(/do not own/, "land that does not exist", { plot: "nowhere-9" });
    await refused(/frozen/, "in custody", { custody: { caseId: 1 } });
    await refused(/Step outside/, "standing inside the home", { interior: { kind: "home", id: "moniya-2" } });
    await refused(/Someone is inside/, "a visitor inside", { remotes: { c1: { id: "c1", pid: "v", name: "V", look: DEFAULT_LOOK, room: "in:home:moniya-2", x: 0, z: 0, ry: 0 } } });
    fresh({ plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1 }) } });
    useSocial.setState({ flags: { ...DEMO_FLAGS, sales: false } });
    ok2(!(await prop.sellPlot("moniya-2")).ok && !!st().plots["moniya-2"], "selling is refused when switched off");

    /* ---- the server frees a plot ---- */
    fresh({ plots: { ...NPC_PLOTS, "agbowo-1": mk({ ownerId: "other", tier: 1 }), "moniya-2": mk({ tier: 1 }) }, decor: { "agbowo-1": ["lamp"] }, knocks: [{ from: "c9", name: "V", plotId: "agbowo-1" }] });
    prop.applyPlotFree("agbowo-1");
    ok2(!st().plots["agbowo-1"] && !st().decor["agbowo-1"] && st().knocks.length === 0 && toasts.length === 0, "someone else's plot is freed quietly, with its decor and knocks");
    prop.applyPlotFree("bodija-estate-1");
    ok2(!!st().plots["bodija-estate-1"], "an NPC home is never freed");
    prop.applyPlotFree("moniya-2");
    ok2(!st().plots["moniya-2"] && said(/no longer yours/), "a plot of mine freed from elsewhere is removed and I am told");
    prop.applyPlotFree("moniya-2");
    prop.applyPlotFree("nowhere-9");
    ok2(toasts.length === 1, "freeing it again is a no-op");
    fresh({ plots: { ...NPC_PLOTS, "agbowo-1": mk({ ownerId: "other", tier: 1 }) }, interior: { kind: "home", id: "agbowo-1" } });
    prop.applyPlotFree("agbowo-1");
    await new Promise((r) => setTimeout(r, 1_200));
    ok2(st().interior === null, "someone standing in a freed home is put outside");
  } else {
    await serverScenarios();
  }

  async function serverScenarios() {
    const stamp = () => ({ now: T });
    const offer = (o: Record<string, unknown> = {}) => ({ status: 200, json: { limit: 50_000, titleBase: 50_000, collateral: 0, titleIdx: 2, blocked: null, ...stamp(), ...o } });
    routes.set("GET /api/loan/offer", () => offer());
    calls.length = 0;

    /* a late loan before the server has told us its time: a wrong device clock must not cost reputation */
    const late = (id: number, stage: LoanView["stage"] = "active") => loanView({ id, ...newLoan(50_000, 60, T - 61 * MIN), takenAt: T - 61 * MIN, stage });
    fresh({ rep: 50, loan: late(1) });
    loans.loanTick();
    ok2(st().rep === 50 && st().loan?.repHit === undefined, "before the server's time is known the tick leaves reputation alone");
    routes.set("GET /api/loan", () => ({ status: 200, json: { loan: st().loan, ...stamp() } }));
    await loans.loadLoan();
    ok2(st().rep === 45 && st().loan?.repHit === true, "once the server's time is known a late loan costs 5 reputation");
    loans.loanTick();
    loans.loanTick();
    await loans.loadLoan();
    ok2(st().rep === 45, "and only once");

    /* the connect: the server's loan replaces whatever was saved */
    fresh({ rep: 70, loan: loanView({ id: 3 }) });
    routes.set("GET /api/loan", () => ({ status: 200, json: { loan: null, ...stamp() } }));
    await loans.loadLoan();
    ok2(st().loan === null, "GET /api/loan with no loan clears a stale saved loan");
    ok2(calls[0]?.auth === "Bearer t0ken", "calls carry the bearer token");
    const mine = loanView({ id: 9 });
    routes.set("GET /api/loan", () => ({ status: 200, json: { loan: mine, now: T + 4_000 } }));
    await loans.loadLoan();
    ok2(st().loan?.id === 9 && st().clockSkew === 4_000, "the server's loan and clock are taken over");
    routes.set("GET /api/loan", () => ({ status: 503, json: { error: "off", code: "OFF" } }));
    await loans.loadLoan();
    ok2(st().loan?.id === 9, "an error answer leaves the saved loan alone");
    routes.set("GET /api/loan", () => "throw");
    await loans.loadLoan();
    ok2(st().loan?.id === 9, "no answer leaves the saved loan alone");

    /* the offer: the server is the judge */
    fresh({ rep: 70 });
    loans.useLoanOffer.setState({ server: null });
    routes.set("GET /api/loan/offer", () => offer({ limit: 35_000, titleBase: 50_000, collateral: 0, blocked: { code: "TOO_NEW", text: "Your account is too new to borrow." } }));
    await loans.loadOffer();
    const ol = loans.loanOffer();
    ok2(ol.limit === 35_000 && ol.blocked === "Your account is too new to borrow.", `the server's limit and reason are shown (got ${JSON.stringify(ol)})`);
    routes.set("GET /api/loan/offer", () => offer({ blocked: { code: "LOAN_LOCKED", text: "You can borrow again later.", until: T + 5 * MIN } }));
    await loans.loadOffer();
    ok2(/Try again at/.test(loans.loanOffer().blocked ?? ""), "a wait with a time but no time in the text gets the time added");
    T += 6 * MIN;
    ok2(loans.loanOffer().blocked === null, "a wait that is over stops blocking by itself");
    routes.set("GET /api/loan/offer", () => offer({ blocked: { code: "LOAN_ACTIVE", text: "You already have a loan." } }));
    await loans.loadOffer();
    ok2(loans.loanOffer().blocked === null, "a stale 'you have a loan' from the server does not block a player who has none");

    /* taking a loan */
    routes.set("GET /api/loan/offer", () => offer());
    loans.useLoanOffer.setState({ server: null });
    await loans.loadOffer();
    fresh({ rep: 70, money: 1_000 });
    let taken: LoanView | null = null;
    routes.set("POST /api/loan/take", (c) => {
      taken = loanView({ id: 11, ...newLoan(Number(c.body?.amount), Number(c.body?.termMin), T) });
      return { status: 200, json: { loan: taken, ...stamp() } };
    });
    calls.length = 0;
    const t1 = await loans.takeLoan(50_000, 180);
    ok2(t1.ok && posts().length === 1 && posts()[0].path === "/api/loan/take" && posts()[0].body?.amount === 50_000 && posts()[0].body?.termMin === 180, "take sends { amount, termMin } to /api/loan/take");
    ok2(st().loan?.id === 11 && st().money === 1_000, "the loan is saved, and the cash is NOT added here (it arrives as a credit)");
    ok2(!said(/approved/), "the player is told once (by the panel), not by a second toast");
    // the same loan pushed over the socket afterwards changes nothing and says nothing
    loans.applyLoanView(taken!, "take", T);
    ok2(toasts.length === 0, "the socket's copy of the same loan is silent");
    ok2(!(await loans.takeLoan(5_000, 60)).ok && posts().length === 1, "a player with a loan is refused before the network");

    const failure = async (reply: Reply, why: RegExp, what: string) => {
      fresh({ rep: 70, money: 1_000 });
      routes.set("POST /api/loan/take", () => reply);
      routes.set("GET /api/loan", () => ({ status: 200, json: { loan: null, ...stamp() } }));
      calls.length = 0;
      const r = await loans.takeLoan(20_000, 60);
      ok2(!r.ok && why.test(r.message) && st().loan === null && st().money === 1_000, `${what}: ${r.message}`);
      return calls.map((c) => c.path);
    };
    await failure({ status: 422, json: { error: "The most you can borrow is ₦15,000.", code: "LOAN_LIMIT" } }, /15,000/, "over the server's limit");
    await failure({ status: 403, json: { error: "Your account is too new.", code: "TOO_NEW" } }, /too new/, "too new");
    await failure("throw", /Can't reach/, "no answer");
    await failure({ status: 429, json: { error: "Slow down.", code: "RATE" } }, /Slow down/, "rate limited");
    const resync = await failure({ status: 409, json: { error: "You already have a loan.", code: "LOAN_ACTIVE" } }, /already/, "the server already has a loan");
    ok2(resync.includes("/api/loan"), "a 409 makes the client fetch the loan it did not know about");

    /* repaying */
    fresh({ rep: 70, money: 60_000, loan: loanView({ id: 11, ...newLoan(50_000, 180, T - 60 * MIN), takenAt: T - 60 * MIN }) });
    routes.set("POST /api/loan/repay", (c) => {
      const p = applyPayment(st().loan!, Number(c.body?.amount), T);
      return { status: 200, json: { loan: p.closed ? null : p.loan, paid: p.paid, ...stamp() } };
    });
    calls.length = 0;
    const r1 = await loans.repayLoan(20_000);
    ok2(r1.ok && posts().length === 1 && posts()[0].path === "/api/loan/repay" && posts()[0].body?.amount === 20_000, "repay sends { amount } to /api/loan/repay");
    ok2(st().money === 60_000 && st().loan?.left === 33_000 && st().loan?.interest === 0, "the loan is updated, and the money is NOT taken here (the debit arrives over the socket)");
    ok2(/33,000/.test(r1.message), `the message says what is left (${r1.message})`);
    const r2 = await loans.repayLoan(loans.loanNow(st().loan!, T).payAll);
    ok2(r2.ok && st().loan === null && /cleared/i.test(r2.message), "pay-all clears the loan");
    ok2(said(/cleared/i) && toasts.length === 1, "and says so once, even though the socket will say it again");
    loans.applyLoanView(null, "cleared", T);
    ok2(toasts.length === 1, "the socket's second 'cleared' is silent");
    fresh({ rep: 70, money: 49_999, loan: loanView({ id: 12 }) });
    calls.length = 0;
    ok2(!(await loans.repayLoan(60_000)).ok && calls.length === 0, "one naira short of the debt: refused before the network");
    fresh({ rep: 70, money: 50_000, loan: loanView({ id: 12 }) });
    routes.set("POST /api/loan/repay", () => ({ status: 200, json: { loan: null, paid: 50_000, ...stamp() } }));
    const exact = await loans.repayLoan(60_000);
    ok2(exact.ok && posts().at(-1)?.body?.amount === 60_000 && st().loan === null, "asking for more than is owed is fine when the balance covers the debt: the server charges only the debt");
    fresh({ rep: 70, money: 100, loan: loanView({ id: 12 }) });
    calls.length = 0;
    const poor = await loans.repayLoan(5_000);
    ok2(!poor.ok && calls.length === 0 && st().loan?.id === 12, "too little in the balance: nothing is sent");
    fresh({ rep: 70, money: 60_000, loan: loanView({ id: 12 }), net: "offline" });
    ok2(!(await loans.repayLoan(5_000)).ok && calls.length === 0, "offline: nothing is sent");
    fresh({ rep: 70, money: 60_000, loan: loanView({ id: 12 }) });
    routes.set("POST /api/loan/repay", () => ({ status: 404, json: { error: "You have no loan.", code: "LOAN_NONE" } }));
    routes.set("GET /api/loan", () => ({ status: 200, json: { loan: null, ...stamp() } }));
    const gone = await loans.repayLoan(5_000);
    await new Promise((r) => setTimeout(r, 20));
    ok2(!gone.ok && st().loan === null, "the server says there is no loan: the client re-reads and drops the stale one");
    routes.set("POST /api/loan/repay", () => "throw");
    fresh({ rep: 70, money: 60_000, loan: loanView({ id: 12 }) });
    const lost = await loans.repayLoan(5_000);
    ok2(!lost.ok && /Can't reach/.test(lost.message) && st().loan?.id === 12 && st().money === 60_000, "no answer: nothing changes");

    /* what the server pushes: the toasts, once each, and the reputation hit */
    fresh({ rep: 50, loan: late(20) });
    ok2(loans.loanStageAt(st().loan!, T) === "overdue", "past the due time the stage reads overdue before the server has said so");
    useGame.setState({ loan: late(20) });
    loans.applyLoanView(late(20, "overdue"), "overdue", T);
    ok2(st().rep === 45 && st().loan?.repHit === true && said(/overdue/i), "the server's 'overdue' costs 5 reputation and is announced");
    loans.applyLoanView({ ...late(20), stage: "notice", noticeAt: T }, "notice", T);
    ok2(st().rep === 45 && st().loan?.repHit === true && st().loan?.stage === "notice", "the next server copy of the same loan keeps the flag: no second hit");
    ok2(said(/final notice/i), "the final notice is announced");
    const before = toasts.length;
    loans.applyLoanView(st().loan, "notice", T);
    loans.applyLoanView(st().loan, "sync", T);
    ok2(toasts.length === before, "the same stage again is not announced again");
    loans.applyLoanView({ ...st().loan!, stage: "seized", seizedPlot: "dugbe-1" }, "seized", T);
    ok2(said(/lien on/i) && st().loan?.stage === "seized", "the lien is announced");
    fresh({ plots: { ...NPC_PLOTS, "dugbe-1": mk({ tier: 1, biz: "mart", seized: true }) }, loan: loanView({ id: 20, stage: "seized", seizedPlot: "dugbe-1" }) });
    loans.applyLoanView(null, "cleared", T);
    ok2(st().loan === null && said(/lien on .* is lifted/i), "clearing a loan under lien says the lien is lifted");
    fresh({ rep: 50, loan: null });
    loans.applyLoanView(loanView({ id: 21, stage: "overdue", ...newLoan(50_000, 60, T - 61 * MIN) }), "sync", T);
    ok2(st().rep === 45, "a new overdue loan gets its own hit");
    fresh({ loan: loanView({ id: 22 }) });
    loans.applyLoanView(null, "forgiven", T);
    ok2(said(/cancelled/), "a forgiven loan is announced");
    fresh({ loan: loanView({ id: 23 }) });
    loans.applyLoanView(null, "sale", T);
    ok2(said(/sale paid off/), "a loan paid off by a sale is announced");
    fresh({ loan: null });
    loans.applyLoanView(loanView({ id: 24 }), "take", T);
    ok2(said(/approved/i), "a loan taken on another device is announced here");
    // tick in server mode never invents stages
    fresh({ rep: 50, loan: loanView({ id: 25 }) });
    useSocial.setState({ flags: { ...DEMO_FLAGS, loans: false } });
    T += 10 * 60 * MIN;
    loans.loanTick();
    ok2(st().loan?.stage === "active" && st().rep === 50, "with loans switched off the tick does nothing");
    useSocial.setState({ flags: { ...DEMO_FLAGS, loans: true } });
    loans.loanTick();
    ok2(st().loan?.stage === "active" && st().loan?.noticeAt === null, "with a server the tick never makes a notice (only the server can)");

    /* selling */
    fresh({ money: 1_000, rep: 100, plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1, collectedAt: T - 10 * MIN }) } });
    routes.set("GET /api/plots/quote", () => ({ status: 200, json: { blocked: null, ...stamp() } }));
    await prop.loadSaleCheck("moniya-2");
    let sellBody: unknown = null;
    routes.set("POST /api/plots/sell", (c) => {
      sellBody = c.body;
      return { status: 200, json: { ok: true, plotId: "moniya-2", gross: 31_500, loanPaid: 0, net: 31_500, repBack: 18, ...stamp() } };
    });
    const s1 = await prop.sellPlot("moniya-2");
    ok2(s1.ok && JSON.stringify(sellBody) === '{"plotId":"moniya-2"}', "sell posts { plotId }");
    ok2(st().money === 1_000 + 4_000 && st().rep === 82 && !st().plots["moniya-2"], "the plot goes, the reputation goes, the rent is kept; the sale money is NOT added here (it arrives as a credit)");
    ok2(/31,500/.test(s1.message) && /on its way/.test(s1.message), `the message names the server's figures (${s1.message})`);

    // the broadcast can beat the HTTP answer: the rent must still be counted from the plot as it was
    fresh({ money: 0, rep: 100, plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1, collectedAt: T - 10 * MIN }) } });
    routes.set("POST /api/plots/sell", () => {
      prop.applyPlotFree("moniya-2");
      return { status: 200, json: { ok: true, plotId: "moniya-2", gross: 31_500, loanPaid: 0, net: 31_500, repBack: 18, ...stamp() } };
    });
    const s2 = await prop.sellPlot("moniya-2");
    ok2(s2.ok && st().money === 4_000 && st().rep === 82 && !said(/no longer yours/) && toasts.filter((t) => /Sold/.test(t.text)).length === 1, "plotFree before the answer: rent and reputation still settle once, with no 'no longer yours'");
    prop.applyPlotFree("moniya-2");
    ok2(toasts.length === 1, "a late plotFree is silent");

    const sellFails = async (reply: Reply, why: RegExp, what: string) => {
      fresh({ money: 5, rep: 100, plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1 }) } });
      routes.set("POST /api/plots/sell", () => reply);
      const r = await prop.sellPlot("moniya-2");
      ok2(!r.ok && why.test(r.message) && st().money === 5 && st().rep === 100 && !!st().plots["moniya-2"], `${what}: ${r.message}`);
    };
    await sellFails({ status: 409, json: { error: "Someone is inside.", code: "INSIDE" } }, /inside/, "refused by the server");
    await sellFails({ status: 403, json: { error: "Your assets are frozen while you are in custody.", code: "FROZEN" } }, /frozen/, "frozen");
    await sellFails("throw", /Can't reach/, "no answer");
    await sellFails({ status: 200, json: {} }, /did not go through/, "an answer without ok");

    // the server knows who is inside
    fresh({ money: 5, plots: { ...NPC_PLOTS, "moniya-2": mk({ tier: 1 }) } });
    routes.set("GET /api/plots/quote", () => ({ status: 200, json: { blocked: { code: "INSIDE", text: "Someone is inside." }, ...stamp() } }));
    await prop.loadSaleCheck("moniya-2");
    ok2(prop.quoteSaleAt("moniya-2", T).blocked === "Someone is inside.", "the server's reason shows in the quote");
    calls.length = 0;
    ok2(!(await prop.sellPlot("moniya-2")).ok && !calls.some((c) => c.method === "POST"), "and nothing is posted while it holds");
    routes.set("GET /api/plots/quote", () => ({ status: 200, json: { blocked: null, ...stamp() } }));
    await prop.loadSaleCheck("moniya-2");
    ok2(prop.quoteSaleAt("moniya-2", T).blocked === null, "the next answer lifts it");
    useGame.setState({ net: "offline" });
    ok2(/offline/i.test(prop.quoteSaleAt("moniya-2", T).blocked ?? ""), "offline players cannot sell");
  }

  const stray = calls.length;
  if (!server && stray > 0) err(`[demo] the demo build made ${stray} network call(s): ${calls.map((c) => c.path).join(", ")}`);
  console.log(`  ${phase}: done`);
}

async function main() {
  const phase = process.env.MONEY_PHASE;
  if (phase === "demo" || phase === "server") {
    await behaviour(phase);
  } else {
    await tables();
    // the two builds differ by a build-time constant (DEMO_AUTH), so each runs in its own process
    for (const p of ["demo", "server"] as const) {
      const env: NodeJS.ProcessEnv = { ...process.env, MONEY_PHASE: p, NEXT_PUBLIC_API_URL: "http://bank.invalid" };
      if (p === "server") env.NEXT_PUBLIC_REQUIRE_BACKEND = "1";
      else delete env.NEXT_PUBLIC_REQUIRE_BACKEND;
      try {
        execFileSync(process.execPath, [...process.execArgv, process.argv[1]], { env, stdio: "inherit" });
      } catch {
        err(`the ${p} run failed`);
      }
    }
  }
  console.log(errors ? `\n${errors} error(s)` : phase ? "" : `\nmoneyRules.ts matches the catalogues, and loans.ts and property.ts behave (${PLOTS.length} plots).`);
  process.exit(errors ? 1 : 0);
}
void main();
