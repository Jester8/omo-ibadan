// npm run check:health: the illness table, prices, queue times and triage in src/lib/health.ts, against the design's numbers.
import { ILLNESSES, ILLNESS_IDS, SYMPTOMS, SYMPTOM_IDS, SEV_PRICE, WAIT_SECS, FEES, HOSPITALS, ambulanceFare, cardNumber, nearestDistrict, quoteCase, slowdown, triage, type Illness, type IllnessId, type Severity, type SymptomId } from "../src/lib/health";
import { PLACES } from "../src/lib/places";

let errors = 0;
const err = (s: string) => { errors++; console.log("  ERROR", s); };
const ok = (s: string) => console.log("  ok   ", s);
const check = (name: string, f: () => void) => {
  const before = errors;
  f();
  if (errors === before) ok(name);
};
const ill = (id: IllnessId, severity: Severity): Illness => ({ id, severity, since: 0 });
const total = (id: IllnessId, sev: Severity, o: { hour?: number; place?: string; staff?: boolean; nurse?: boolean } = {}) => quoteCase(ill(id, sev), { hour: o.hour ?? 12, place: o.place ?? "uch", staff: o.staff ?? false, nurse: o.nurse ?? false }).total;

check("every illness row is complete and uses real symptoms", () => {
  for (const id of ILLNESS_IDS) {
    const d = ILLNESSES[id];
    if (d.id !== id) err(`${id}: id mismatch`);
    if (!d.name || !d.emoji || !d.blurb) err(`${id}: missing name, emoji or blurb`);
    if (new Set(d.symptoms).size !== 3) err(`${id}: needs three different symptoms`);
    for (const s of d.symptoms) if (!SYMPTOMS[s]) err(`${id}: unknown symptom ${s}`);
    if (!(d.treat > 0 && d.secs > 0)) err(`${id}: treat and secs must be positive`);
    if (!Object.keys(d.gain).length || !Object.keys(d.drain).length) err(`${id}: gain and drain must not be empty`);
    for (const v of Object.values(d.drain)) if (!(v! > 0 && v! <= 1)) err(`${id}: a drain fraction is outside (0, 1]`);
    if (d.selfClearMin !== null && !(d.selfClearMin > 0)) err(`${id}: selfClearMin must be positive or null`);
  }
  if (SYMPTOM_IDS.length !== 12) err(`expected 12 symptom chips, found ${SYMPTOM_IDS.length}`);
});

check("every symptom belongs to at least one illness (no dead chips)", () => {
  for (const s of SYMPTOM_IDS) if (!ILLNESS_IDS.some((i) => ILLNESSES[i].symptoms.includes(s))) err(`symptom ${s} matches no illness`);
});

check("SEV_PRICE and WAIT_SECS climb with the severity", () => {
  if (!(SEV_PRICE[1] === 1 && SEV_PRICE[2] === 1.25 && SEV_PRICE[3] === 1.5)) err("SEV_PRICE should be 1, 1.25, 1.5");
  if (!(WAIT_SECS[1] < WAIT_SECS[2] && WAIT_SECS[2] < WAIT_SECS[3])) err("WAIT_SECS should climb");
});

check("case totals at UCH match the design table", () => {
  const want: [IllnessId, Severity, number][] = [
    ["cold", 1, 3000], ["exhaustion", 2, 4600], ["foodpoison", 1, 4500], ["malaria", 2, 7100], ["injury", 2, 7800], ["typhoid", 2, 9000],
    ["exhaustion", 3, 5300], ["malaria", 3, 8300], ["injury", 3, 9000], ["typhoid", 3, 10500],
  ];
  for (const [id, sev, t] of want) if (total(id, sev) !== t) err(`${id} sev ${sev}: ${total(id, sev)}, expected ${t}`);
});

check("night, Adeoyo, nurse and staff variants", () => {
  if (total("malaria", 2, { hour: 23 }) !== 7100 + FEES.night) err("a night call adds the night fee");
  if (total("malaria", 2, { hour: 3 }) !== 7100 + FEES.night) err("3am is night");
  if (total("malaria", 2, { hour: 6 }) !== 7100 || total("malaria", 2, { hour: 21.9 }) !== 7100) err("6am to 10pm is day");
  // Adeoyo: 0.9 x 5625 = 5062.5 -> 5100, so 1500 + 5100
  if (total("malaria", 2, { place: "adeoyo" }) !== 6600) err(`Adeoyo malaria sev 2: ${total("malaria", 2, { place: "adeoyo" })}, expected 6600`);
  // nurse: 25% off the treatment line only: 5600 -> 4200, plus 1500
  if (total("malaria", 2, { nurse: true }) !== 5700) err(`nurse malaria sev 2: ${total("malaria", 2, { nurse: true })}, expected 5700`);
  const q = quoteCase(ill("malaria", 2), { hour: 12, place: "adeoyo", staff: false, nurse: false });
  const qs = quoteCase(ill("malaria", 2), { hour: 12, place: "adeoyo", staff: true, nurse: false });
  if (q.waitSecs !== 40 || qs.waitSecs !== 20) err(`Adeoyo wait: ${q.waitSecs} (staff ${qs.waitSecs}), expected 40 (20)`);
  if (quoteCase(ill("cold", 1), { hour: 12, place: "uch", staff: false, nurse: false }).waitSecs !== 20) err("UCH cold waits 20 s");
});

check("emergency always costs more than any case", () => {
  for (const id of ILLNESS_IDS) for (const sev of [1, 2, 3] as Severity[]) for (const hour of [12, 23]) if (total(id, sev, { hour }) >= FEES.emergency) err(`${id} sev ${sev} at ${hour}h is not cheaper than the emergency desk`);
});

check("triage: match, inconclusive, healthy", () => {
  const t = (p: SymptomId[], i: Illness | null) => triage(p, i);
  const m = ill("malaria", 2);
  if (t(["fever", "headache"], m) !== "match") err("fever + headache is malaria");
  if (t(["fever", "chills", "headache"], m) !== "match") err("all three is a match");
  if (t(["fever", "headache", "cough"], m) !== "match") err("two right and one wrong is still a match");
  if (t(["fever", "stomach"], m) !== "inconclusive") err("fever + stomach is not malaria");
  if (t(["fever"], m) !== "inconclusive") err("one right symptom is not enough");
  if (t(["cough", "sneezing"], m) !== "inconclusive") err("wrong symptoms need tests");
  if (t([], m) !== "healthy") err("nothing picked is healthy");
  if (t(["fever", "headache"], null) !== "healthy") err("not ill is healthy");
});

check("cardNumber is stable and well formed; ambulance fares round to 50", () => {
  const at = Date.UTC(2026, 3, 1);
  if (cardNumber("pid-a", at) !== cardNumber("pid-a", at)) err("cardNumber is not stable");
  if (!/^HC-26-\d{5}$/.test(cardNumber("pid-a", at))) err(`cardNumber looks wrong: ${cardNumber("pid-a", at)}`);
  if (cardNumber("pid-a", at) === cardNumber("pid-b", at)) err("two players got the same card (unlucky hash, change the inputs)");
  if (ambulanceFare(0) !== 1500 || ambulanceFare(400) !== 1750 || ambulanceFare(1000) % 50 !== 0) err(`ambulanceFare: ${ambulanceFare(0)}, ${ambulanceFare(400)}, ${ambulanceFare(1000)}`);
});

check("hospitals are real places, and illness slows walking", () => {
  for (const id of Object.keys(HOSPITALS)) if (!PLACES.some((p) => p.id === id && p.service === "hospital")) err(`${id} is not a place with service "hospital"`);
  if (slowdown(null) !== 1 || Math.abs(slowdown(ill("malaria", 2)) - 0.86) > 1e-9 || Math.abs(slowdown(ill("malaria", 3)) - 0.79) > 1e-9) err("slowdown should be 1, 0.86 at sev 2, 0.79 at sev 3");
  const d = nearestDistrict(PLACES.find((p) => p.id === "uch")!.pos[0], PLACES.find((p) => p.id === "uch")!.pos[1]);
  if (!d) err("nearestDistrict returned nothing");
});

console.log(errors ? `\n${errors} problem(s).` : "\nThe health data is sound.");
process.exit(errors ? 1 : 0);
