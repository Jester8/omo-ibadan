-- The avatar look, so a player can log in on another device and look the same.
ALTER TABLE players ADD COLUMN profile_json TEXT;
