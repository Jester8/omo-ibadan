-- Artist-uploaded music. The artist keeps the copyright; the game only streams it with their permission.
CREATE TABLE IF NOT EXISTS tracks (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  artist           TEXT NOT NULL,
  owner_pid        TEXT NOT NULL,
  rights_holder    TEXT NOT NULL,
  rights_statement TEXT NOT NULL,
  license          TEXT NOT NULL DEFAULT 'artist-retains-copyright',
  status           TEXT NOT NULL DEFAULT 'pending',   -- pending | approved | rejected
  mime             TEXT,
  size             INTEGER,
  file             TEXT,
  created_at       INTEGER NOT NULL,
  reviewed_at      INTEGER,
  review_note      TEXT
);
CREATE INDEX IF NOT EXISTS tracks_status ON tracks(status);
CREATE INDEX IF NOT EXISTS tracks_owner ON tracks(owner_pid);
