-- Verified email accounts, emailed one-time codes, friends, blocks, direct messages and saved room chat.
ALTER TABLE players ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS auth_codes (
  email        TEXT PRIMARY KEY,
  code_hash    TEXT NOT NULL,
  expires_at   INTEGER NOT NULL,
  attempts     INTEGER NOT NULL DEFAULT 0,
  sent_at      INTEGER NOT NULL,
  sends_window INTEGER NOT NULL DEFAULT 1,
  window_start INTEGER NOT NULL
);

-- a < b always, so a pair has exactly one row
CREATE TABLE IF NOT EXISTS friendships (
  a          TEXT NOT NULL,
  b          TEXT NOT NULL,
  requester  TEXT NOT NULL,
  status     TEXT NOT NULL,            -- pending | accepted
  created_at INTEGER NOT NULL,
  PRIMARY KEY (a, b)
);
CREATE INDEX IF NOT EXISTS friendships_b ON friendships(b);

CREATE TABLE IF NOT EXISTS blocks (
  blocker TEXT NOT NULL,
  blocked TEXT NOT NULL,
  at      INTEGER NOT NULL,
  PRIMARY KEY (blocker, blocked)
);

CREATE TABLE IF NOT EXISTS dms (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  from_pid TEXT NOT NULL,
  to_pid   TEXT NOT NULL,
  text     TEXT NOT NULL,
  at       INTEGER NOT NULL,
  read_at  INTEGER
);
CREATE INDEX IF NOT EXISTS dms_pair ON dms(from_pid, to_pid, at);
CREATE INDEX IF NOT EXISTS dms_unread ON dms(to_pid, read_at);

CREATE TABLE IF NOT EXISTS room_messages (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  room      TEXT NOT NULL,
  from_pid  TEXT NOT NULL,
  from_name TEXT NOT NULL,
  text      TEXT NOT NULL,
  at        INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS room_messages_room ON room_messages(room, at);
