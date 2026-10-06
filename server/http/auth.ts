import { createHmac, timingSafeEqual } from "node:crypto";
import { config } from "../config";

const sign = (pid: string) => createHmac("sha256", config.authSecret).update(pid).digest("base64url");

/** A token is `pid.signature`. Guests get one on first visit; swap this for real accounts later. */
export const issueToken = (pid: string) => `${pid}.${sign(pid)}`;

/** Returns the player id if the token is genuine. */
export function verifyToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i < 1) return null;
  const pid = token.slice(0, i);
  const sig = Buffer.from(token.slice(i + 1));
  const want = Buffer.from(sign(pid));
  return sig.length === want.length && timingSafeEqual(sig, want) ? pid : null;
}
