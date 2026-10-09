/**
 * Build-time switches for the features that need the live server. Demo mode (NEXT_PUBLIC_REQUIRE_BACKEND unset) never reaches the server anyway.
 * The server has its own master switch (CUSTODY=1); a client built with NEXT_PUBLIC_CUSTODY=0 hides the police, EFCC and custody screens whatever the server says.
 */
export const FEATURES = {
  /** police reports, EFCC cases, custody, bail. Default on; the client still asks the server (GET /api/custody/me) before showing anything. */
  custody: process.env.NEXT_PUBLIC_CUSTODY !== "0",
  /** poke and hit. Default on; the client still asks the server (GET /api/social/flags) before showing anything. */
  pokes: process.env.NEXT_PUBLIC_POKES !== "0",
  /** bank loans. Default on. Without a server they work on this device alone. */
  loans: process.env.NEXT_PUBLIC_LOANS !== "0",
  /** selling land back to the city. Default on. Without a server it works on this device alone. */
  sales: process.env.NEXT_PUBLIC_SALES !== "0",
};
