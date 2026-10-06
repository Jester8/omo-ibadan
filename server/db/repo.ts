import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { PlotState } from "../../src/lib/protocol";
import { db } from "./index";

type PlotRow = { plot_id: string; owner_pid: string; owner_name: string; tier: number; collected_at: number; decor_json: string | null };

export function loadPlots(): Record<string, PlotState> {
  const out: Record<string, PlotState> = {};
  for (const r of db.prepare("SELECT * FROM plots").all() as PlotRow[]) {
    out[r.plot_id] = { ownerId: r.owner_pid, ownerName: r.owner_name, tier: r.tier, collectedAt: r.collected_at, decor: r.decor_json ? JSON.parse(r.decor_json) : undefined };
  }
  return out;
}

export function savePlot(id: string, p: PlotState) {
  db.prepare(
    `INSERT INTO plots (plot_id, owner_pid, owner_name, tier, collected_at, decor_json) VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(plot_id) DO UPDATE SET owner_pid = excluded.owner_pid, owner_name = excluded.owner_name, tier = excluded.tier, collected_at = excluded.collected_at, decor_json = excluded.decor_json`,
  ).run(id, p.ownerId, p.ownerName, p.tier, p.collectedAt, p.decor ? JSON.stringify(p.decor) : null);
}

/** One-time import of the old plots.json, if it is still lying around. */
export function importLegacyPlots(dir: string) {
  const file = join(dir, "plots.json");
  const count = (db.prepare("SELECT COUNT(*) AS n FROM plots").get() as { n: number }).n;
  if (count > 0 || !existsSync(file)) return;
  const legacy = JSON.parse(readFileSync(file, "utf8")) as Record<string, PlotState>;
  for (const [id, p] of Object.entries(legacy)) savePlot(id, p);
  console.log(`[db] imported ${Object.keys(legacy).length} plots from plots.json`);
}

export function touchPlayer(pid: string, name: string) {
  const now = Date.now();
  db.prepare(
    `INSERT INTO players (pid, name, created_at, last_seen) VALUES (?, ?, ?, ?)
     ON CONFLICT(pid) DO UPDATE SET name = excluded.name, last_seen = excluded.last_seen`,
  ).run(pid, name, now, now);
}

/** Registers an email for a player. Returns false if another player already owns that email. */
export function signUp(pid: string, name: string, email: string): boolean {
  const owner = db.prepare("SELECT pid FROM players WHERE email = ?").get(email) as { pid: string } | undefined;
  if (owner && owner.pid !== pid) return false;
  touchPlayer(pid, name);
  db.prepare("UPDATE players SET email = ? WHERE pid = ?").run(email, pid);
  return true;
}

export function getState(pid: string): { state: unknown; updatedAt: number } | null {
  const r = db.prepare("SELECT state_json, state_updated FROM players WHERE pid = ?").get(pid) as { state_json: string | null; state_updated: number | null } | undefined;
  if (!r?.state_json) return null;
  return { state: JSON.parse(r.state_json), updatedAt: r.state_updated ?? 0 };
}

export function putState(pid: string, name: string, state: unknown) {
  touchPlayer(pid, name);
  db.prepare("UPDATE players SET state_json = ?, state_updated = ? WHERE pid = ?").run(JSON.stringify(state), Date.now(), pid);
}

export function addReport(reporter: string, target: string, reason: string) {
  db.prepare("INSERT INTO reports (at, reporter, target, reason) VALUES (?, ?, ?, ?)").run(Date.now(), reporter, target, reason);
}

export function recordElection(term: number, winner: { pid: string; name: string; slogan: string; votes: number } | null) {
  db.prepare("INSERT OR REPLACE INTO elections (term, winner_pid, winner_name, slogan, votes, ended_at) VALUES (?, ?, ?, ?, ?, ?)").run(
    term,
    winner?.pid ?? null,
    winner?.name ?? null,
    winner?.slogan ?? null,
    winner?.votes ?? 0,
    Date.now(),
  );
}
