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

/* ------------------------------------ accounts and one-time codes ------------------------------------ */

export type PlayerRow = { pid: string; name: string; email: string | null; email_verified: number; profile_json: string | null };
export const getPlayer = (pid: string) => db.prepare("SELECT pid, name, email, email_verified, profile_json FROM players WHERE pid = ?").get(pid) as PlayerRow | undefined;
export const getPlayerByEmail = (email: string) => db.prepare("SELECT pid, name, email, email_verified, profile_json FROM players WHERE email = ?").get(email) as PlayerRow | undefined;
export const hasEmail = (pid: string) => !!(db.prepare("SELECT email FROM players WHERE pid = ?").get(pid) as { email: string | null } | undefined)?.email;

export function createVerifiedPlayer(pid: string, name: string, email: string, look: unknown) {
  const now = Date.now();
  db.prepare("INSERT INTO players (pid, name, created_at, last_seen, email, email_verified, profile_json) VALUES (?, ?, ?, ?, ?, 1, ?)").run(pid, name, now, now, email, look ? JSON.stringify(look) : null);
}

export type CodeRow = { email: string; code_hash: string; expires_at: number; attempts: number; sent_at: number; sends_window: number; window_start: number };
export const getCode = (email: string) => db.prepare("SELECT * FROM auth_codes WHERE email = ?").get(email) as CodeRow | undefined;
export function saveCode(email: string, hash: string, expiresAt: number, now: number) {
  const prev = getCode(email);
  const fresh = !prev || now - prev.window_start > 3600_000;
  db.prepare(
    `INSERT INTO auth_codes (email, code_hash, expires_at, attempts, sent_at, sends_window, window_start) VALUES (?, ?, ?, 0, ?, 1, ?)
     ON CONFLICT(email) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0, sent_at = excluded.sent_at,
       sends_window = CASE WHEN ? THEN 1 ELSE sends_window + 1 END, window_start = CASE WHEN ? THEN excluded.window_start ELSE window_start END`,
  ).run(email, hash, expiresAt, now, now, fresh ? 1 : 0, fresh ? 1 : 0);
}
export const bumpAttempts = (email: string) => db.prepare("UPDATE auth_codes SET attempts = attempts + 1 WHERE email = ?").run(email);
export const deleteCode = (email: string) => db.prepare("DELETE FROM auth_codes WHERE email = ?").run(email);

/* ------------------------------------ friends and blocks ------------------------------------ */

const pair = (x: string, y: string): [string, string] => (x < y ? [x, y] : [y, x]);
export type FriendRow = { a: string; b: string; requester: string; status: "pending" | "accepted"; created_at: number };

export function getFriendship(x: string, y: string) {
  const [a, b] = pair(x, y);
  return db.prepare("SELECT * FROM friendships WHERE a = ? AND b = ?").get(a, b) as FriendRow | undefined;
}
export const friendshipsOf = (pid: string) => db.prepare("SELECT * FROM friendships WHERE a = ? OR b = ?").all(pid, pid) as FriendRow[];
export function requestFriend(from: string, to: string) {
  const [a, b] = pair(from, to);
  db.prepare("INSERT INTO friendships (a, b, requester, status, created_at) VALUES (?, ?, ?, 'pending', ?)").run(a, b, from, Date.now());
}
export function acceptFriend(x: string, y: string) {
  const [a, b] = pair(x, y);
  db.prepare("UPDATE friendships SET status = 'accepted' WHERE a = ? AND b = ?").run(a, b);
}
export function removeFriendship(x: string, y: string) {
  const [a, b] = pair(x, y);
  db.prepare("DELETE FROM friendships WHERE a = ? AND b = ?").run(a, b);
}
export const countFriends = (pid: string) => (db.prepare("SELECT COUNT(*) AS n FROM friendships WHERE (a = ? OR b = ?) AND status = 'accepted'").get(pid, pid) as { n: number }).n;

export const blockedEither = (x: string, y: string) => !!db.prepare("SELECT 1 FROM blocks WHERE (blocker = ? AND blocked = ?) OR (blocker = ? AND blocked = ?)").get(x, y, y, x);
export const blocksOf = (pid: string) => (db.prepare("SELECT blocked FROM blocks WHERE blocker = ?").all(pid) as { blocked: string }[]).map((r) => r.blocked);
export function addBlock(blocker: string, blocked: string) {
  db.prepare("INSERT OR IGNORE INTO blocks (blocker, blocked, at) VALUES (?, ?, ?)").run(blocker, blocked, Date.now());
}
export const removeBlock = (blocker: string, blocked: string) => db.prepare("DELETE FROM blocks WHERE blocker = ? AND blocked = ?").run(blocker, blocked);

/* ------------------------------------ messages ------------------------------------ */

export type DmRow = { id: number; from_pid: string; to_pid: string; text: string; at: number; read_at: number | null };
export function addDm(from: string, to: string, text: string, at: number) {
  const r = db.prepare("INSERT INTO dms (from_pid, to_pid, text, at) VALUES (?, ?, ?, ?)").run(from, to, text, at);
  return Number(r.lastInsertRowid);
}
export const dmThread = (x: string, y: string, before: number, limit = 50) =>
  (db.prepare("SELECT * FROM dms WHERE ((from_pid = ? AND to_pid = ?) OR (from_pid = ? AND to_pid = ?)) AND id < ? ORDER BY id DESC LIMIT ?").all(x, y, y, x, before, limit) as DmRow[]).reverse();
export const markRead = (me: string, other: string) => db.prepare("UPDATE dms SET read_at = ? WHERE to_pid = ? AND from_pid = ? AND read_at IS NULL").run(Date.now(), me, other);
export function dmThreads(pid: string) {
  return db
    .prepare(
      `SELECT other, MAX(id) AS last_id, SUM(CASE WHEN to_pid = ? AND read_at IS NULL THEN 1 ELSE 0 END) AS unread FROM (
         SELECT id, CASE WHEN from_pid = ? THEN to_pid ELSE from_pid END AS other, to_pid, read_at FROM dms WHERE from_pid = ? OR to_pid = ?
       ) GROUP BY other ORDER BY last_id DESC LIMIT 100`,
    )
    .all(pid, pid, pid, pid) as { other: string; last_id: number; unread: number }[];
}
export const getDm = (id: number) => db.prepare("SELECT * FROM dms WHERE id = ?").get(id) as DmRow | undefined;

export function addRoomMessage(room: string, pid: string, name: string, text: string, at: number) {
  db.prepare("INSERT INTO room_messages (room, from_pid, from_name, text, at) VALUES (?, ?, ?, ?, ?)").run(room, pid, name, text, at);
  // keep the table small: drop anything older than a day
  if (Math.random() < 0.02) db.prepare("DELETE FROM room_messages WHERE at < ?").run(at - 24 * 3600_000);
}
export const roomHistory = (room: string, limit = 30) =>
  (db.prepare("SELECT from_pid, from_name, text, at FROM room_messages WHERE room = ? ORDER BY id DESC LIMIT ?").all(room, limit) as { from_pid: string; from_name: string; text: string; at: number }[]).reverse();
