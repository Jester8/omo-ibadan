# Omo Ibadan: status and plan

## Built
- **Foundation:** landing page, 3D city (20 places, 16 districts), day/night cycle, NEPA outages, traffic
- **Avatar:** real rigged human models (Quaternius, CC0) with idle / walk / run animation. Creator with live 3D preview: 7 Nigerian skin tones, masculine/feminine body types, build, and a large wardrobe.
  - Everyday outfits: T-shirt, hoodie, dress, office suit, Super Eagles jersey, hi-vis worker, overalls, singlet and shorts
  - Nigerian outfits: senator kaftan, buba and sokoto, babariga (Hausa gown), isi agu, agbada, Ankara iro and buba, aso-oke with ipele, Ankara gown
  - Hair and headwear: natural, bald, afro, afro puffs, braids, cornrows, locs, twists, bun, gele, turban, hijab; plus glasses, sunglasses, cap, fila, Hausa cap, Igbo red cap
- **Life loop:** hunger/energy/fun/social, 50+ actions with costs, pay, reputation, title gates
- **Movement:** click-to-move (A*), WASD, keke speed boost, drag-rotate and zoom camera
- **Land:** 23 plots across 9 neighbourhoods; buy, build bungalow to duplex to mansion, collect rent, home actions
- **Multiplayer:** presence, per-venue chat with speech bubbles, shared land (server persisted), online count
- **Voice:** WebRTC mesh voice rooms per venue / house, plus 1:1 phone calls with ring/answer/hang-up
- **Progression:** reputation and a chieftaincy-inspired title ladder
- **Goals:** 10 starter goals (explore, earn, eat, chat, culture trail, voice, land, home, call, landlord) with cash and rep rewards, a "next goal" chip in the HUD
- **Consequences:** low needs trigger warnings; under 15 energy you walk slower; while you are away needs drift down (gently, capped at 20 min) and a welcome-back note reports rent waiting
- **Getting around:** minimap (click to walk, rotates with the camera) and keke rides (₦300, fast) from any place panel
- **Safety basics:** chat filter (profanity, slurs, links), per-player mute, report button (logged to `server/reports.log`)

## Not verified yet
- **Audio itself.** Signalling, ringing and room joins are tested; microphone capture was blocked in the preview browser, so test two real devices on https.

## Before a public launch
1. **Server-authoritative economy.** Money, needs and reputation are client-side today (anyone can edit localStorage). Move them to the server with accounts (Supabase/Postgres).
2. **Accounts.** Phone/OTP or Google login; today identity is a random id in the browser.
3. **TURN server** for voice behind strict NATs (only STUN is configured). Use a managed TURN or LiveKit.
4. **Hosting.** Web on Vercel; `server/` on a long-running host (Fly.io, Railway) behind wss.
5. **Moderation, next level.** Extend `src/lib/moderation.ts` with Yoruba/Pidgin terms from a native speaker, add admin tools to review `reports.log`, and rate-limit / shadow-ban repeat offenders.
6. **Verify the title ladder** with someone local; the order here is simplified for gameplay.
7. **Art pass.** Buildings are procedural; swap in CC0/purchased glTF models for landmarks (Cocoa House, Mapo Hall).

## Ideas next
Governor election, billboards/ads revenue, furniture and interiors, jobs with skills, events (match day, festivals), pets, daily quests, sound and music, avatar visual polish after a hands-on review.
