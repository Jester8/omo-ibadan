import { join } from "node:path";

const list = (v: string | undefined, fallback: string) => (v ?? fallback).split(",").map((s) => s.trim()).filter(Boolean);

/** All runtime configuration comes from the environment (see .env.example). */
export const config = {
  port: Number(process.env.PORT ?? 8787),
  dbPath: process.env.DB_PATH ?? join(__dirname, "data", "omo.sqlite"),
  /** signs player tokens; MUST be set to a long random string in production */
  authSecret: process.env.AUTH_SECRET ?? "dev-secret-change-me",
  /** when true the websocket refuses players without a valid token */
  requireAuth: process.env.REQUIRE_AUTH === "1",
  origins: list(process.env.ALLOWED_ORIGINS, "http://localhost:3000,http://localhost:3100"),
  production: process.env.NODE_ENV === "production",
};

if (config.production && config.authSecret === "dev-secret-change-me") {
  throw new Error("AUTH_SECRET must be set in production");
}
