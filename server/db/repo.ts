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
export function signUp(pid: string, name: string, email: string, look?: unknown): boolean {
  const owner = db.prepare("SELECT pid FROM players WHERE email = ?").get(email) as { pid: string } | undefined;
  if (owner && owner.pid !== pid) return false;
  touchPlayer(pid, name);
  db.prepare("UPDATE players SET email = ?, profile_json = COALESCE(?, profile_json) WHERE pid = ?").run(email, look ? JSON.stringify(look) : null, pid);
  return true;
}

export const findByEmail = (email: string) => db.prepare("SELECT pid, name, profile_json FROM players WHERE email = ?").get(email) as { pid: string; name: string; profile_json: string | null } | undefined;

export function getState(pid: string): { state: unknown; updatedAt: number } | null {
  const r = db.prepare("SELECT state_json, state_updated FROM players WHERE pid = ?").get(pid) as { state_json: string | null; state_updated: number | null } | undefined;
  if (!r?.state_json) return null;
  return { state: JSON.parse(r.state_json), updatedAt: r.state_updated ?? 0 };
}

export function putState(pid: string, name: string, state: unknown, look?: unknown) {
  touchPlayer(pid, name);
  db.prepare("UPDATE players SET state_json = ?, state_updated = ?, profile_json = COALESCE(?, profile_json) WHERE pid = ?").run(JSON.stringify(state), Date.now(), look ? JSON.stringify(look) : null, pid);
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

/* ------------------------------------ tracks ------------------------------------ */

export type TrackRow = {
  id: string;
  title: string;
  artist: string;
  owner_pid: string;
  rights_holder: string;
  rights_statement: string;
  license: string;
  status: "pending" | "approved" | "rejected";
  mime: string | null;
  size: number | null;
  file: string | null;
  created_at: number;
  reviewed_at: number | null;
  review_note: string | null;
};

export function createTrack(t: { id: string; title: string; artist: string; ownerPid: string; rightsHolder: string; statement: string }) {
  db.prepare("INSERT INTO tracks (id, title, artist, owner_pid, rights_holder, rights_statement, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(t.id, t.title, t.artist, t.ownerPid, t.rightsHolder, t.statement, Date.now());
}
export const getTrack = (id: string) => db.prepare("SELECT * FROM tracks WHERE id = ?").get(id) as TrackRow | undefined;
export const listTracks = (status: string) => db.prepare("SELECT * FROM tracks WHERE status = ? ORDER BY created_at DESC").all(status) as TrackRow[];
export const tracksOf = (pid: string) => db.prepare("SELECT * FROM tracks WHERE owner_pid = ? ORDER BY created_at DESC").all(pid) as TrackRow[];
export const countRecentTracks = (pid: string, since: number) => (db.prepare("SELECT COUNT(*) AS n FROM tracks WHERE owner_pid = ? AND created_at > ?").get(pid, since) as { n: number }).n;
export function setTrackFile(id: string, file: string, mime: string, size: number) {
  db.prepare("UPDATE tracks SET file = ?, mime = ?, size = ?, status = 'pending' WHERE id = ?").run(file, mime, size, id);
}
export function reviewTrack(id: string, status: "approved" | "rejected", note: string) {
  db.prepare("UPDATE tracks SET status = ?, review_note = ?, reviewed_at = ? WHERE id = ?").run(status, note, Date.now(), id);
}
export const deleteTrackRow = (id: string) => db.prepare("DELETE FROM tracks WHERE id = ?").run(id);
