# Omo'badan

A real-life simulation of Ibadan in the browser. Walk the city, work, eat, buy land and build a home,
and talk to real people with live voice.

**Stack:** Next.js 16 · Tailwind 4 · react-three-fiber · Motion · zustand · `ws` realtime server · WebRTC voice

## Run it

```bash
npm install
npm run dev:all        # web on :3000 + realtime server on :8787
```

Or in two terminals: `npm run dev` and `npm run server`.
Without the server the game still runs solo (local save, nobody else around); with it you get other
players, chat, shared land, voice rooms and phone calls. Only real players are ever shown in the world.

Useful URL flags: `/play?hour=21` fixes the game clock (0 to 24) for testing day/night; `/play?enter=home` (or a place id such as `amala-skye`, or `flat`) walks straight inside.

Env (optional): `NEXT_PUBLIC_WS_URL=wss://your-server` points the client at a deployed server.

## How it is organised

| Path | What |
|---|---|
| `src/lib/places.ts`, `plots.ts`, `titles.ts`, `quests.ts` | Content: 73 places (19 of them the civic pack in `placesCivic.ts`), 215 land plots, the chieftaincy ladder, starter goals |
| `src/lib/moderation.ts` | Chat filter shared by client and server |
| `src/lib/furniture.ts`, `interiors.ts`, `layouts.ts` | Interior system: furniture catalogue, rooms, 74 place layouts plus the homes |
| `src/lib/interiorRuntime.ts` | Entering and leaving buildings, using furniture, generator power |
| `src/components/interior/` | Interior rendering: floors, cutaway walls, windows, furniture |
| `src/lib/store.ts` | Game state (zustand, persisted to localStorage) |
| `src/lib/pathing.ts`, `movement.ts` | A* click-to-move around buildings |
| `src/lib/net.ts`, `voice.ts`, `protocol.ts` | Realtime client, WebRTC voice, message types |
| `src/components/avatar/` | Avatar model and the creator |
| `src/components/world/` | 3D scene: terrain, buildings, plots, lighting, people, DOM overlay labels |
| `src/components/ui/` | HUD, panels, chat, phone, profile |

## Credits

Avatar base bodies: Quaternius "Ultimate Modular Men/Women" packs (CC0), via Poly Pizza. They are
recoloured and extended in code with Nigerian outfits (senator kaftan, buba, babariga, isi agu, agbada, Ankara iro and gown, aso-oke),
gele, turban, hijab, fila, Hausa and Igbo caps and many hairstyles. See `public/models/avatars/CREDITS.txt`.

## Checks

Run these before shipping a change. Each exits non-zero on a real problem.

| Command | What it proves |
|---|---|
| `npm run check:places` | Every place is on free ground, doors are reachable and far enough apart, ids and hours are real |
| `npm run check:interiors` | Every room has a free spawn, every usable item is reachable, nothing overlaps |
| `npm run check:money` | The shared money tables match the catalogues; loans and land sales behave |
| `npm run check:custody` | Police, EFCC and prison data (stations, cells, door spacing) and the shared files match the server's copies |
| `npm run check:civic` | Quests, stat counters, civic prices, the Education ladder, donation and letter limits |
| `npm run check:health` | Illnesses, prices, queue times, triage and the health card |
| `npm run check:tower` | Bower's Tower is always open, its door is reachable, the telescope points at real places |

The files `protocol.ts`, `custodyRules.ts`, `socialRules.ts` and `moneyRules.ts` in `src/lib/` are shared with the server and must stay identical in both repos (`check:custody` compares them).

See `docs/PLAN.md` for status and what is next.

## Backend
The server now lives in its own repo, [Jester8/ibadanserver-](https://github.com/Jester8/ibadanserver-): HTTP + WebSocket, Postgres (Supabase), LiveKit voice, deployed on Render. Point the game at it with `NEXT_PUBLIC_WS_URL` / `NEXT_PUBLIC_API_URL` (see `.env.example`).
