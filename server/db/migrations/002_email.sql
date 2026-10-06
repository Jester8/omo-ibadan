-- Email sign-up (no password yet: the email identifies the account, it is not verified).
ALTER TABLE players ADD COLUMN email TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS players_email ON players(email) WHERE email IS NOT NULL;
