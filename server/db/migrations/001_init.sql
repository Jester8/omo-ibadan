-- Players: identity plus a JSON snapshot of their game state (cloud save).
CREATE TABLE IF NOT EXISTS players (
  pid           TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  created_at    INTEGER NOT NULL,
  last_seen     INTEGER NOT NULL,
  state_json    TEXT,
  state_updated INTEGER
);

-- Land and houses; ownership is authoritative here.
CREATE TABLE IF NOT EXISTS plots (
  plot_id      TEXT PRIMARY KEY,
  owner_pid    TEXT NOT NULL,
  owner_name   TEXT NOT NULL,
  tier         INTEGER NOT NULL DEFAULT 0,
  collected_at INTEGER NOT NULL,
  decor_json   TEXT
);
CREATE INDEX IF NOT EXISTS plots_owner ON plots(owner_pid);

-- Player reports for moderation review.
CREATE TABLE IF NOT EXISTS reports (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  at       INTEGER NOT NULL,
  reporter TEXT NOT NULL,
  target   TEXT NOT NULL,
  reason   TEXT NOT NULL
);

-- Governor election results.
CREATE TABLE IF NOT EXISTS elections (
  term        INTEGER PRIMARY KEY,
  winner_pid  TEXT,
  winner_name TEXT,
  slogan      TEXT,
  votes       INTEGER NOT NULL DEFAULT 0,
  ended_at    INTEGER NOT NULL
);
