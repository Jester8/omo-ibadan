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
Without the server the game still runs solo (NPC citizens, local save); with it you get other
players, chat, shared land, voice rooms and phone calls.

Useful URL flags: `/play?hour=21` fixes the game clock (0 to 24) for testing day/night; `/play?enter=home` (or a place id such as `amala-skye`, or `flat`) walks straight inside.

Env (optional): `NEXT_PUBLIC_WS_URL=wss://your-server` points the client at a deployed server.

## How it is organised

| Path | What |
|---|---|
| `src/lib/places.ts`, `plots.ts`, `titles.ts`, `quests.ts` | Content: 20 places, 23 land plots, the chieftaincy ladder, starter goals |
| `src/lib/moderation.ts` | Chat filter shared by client and server |
| `src/lib/furniture.ts`, `interiors.ts`, `layouts.ts` | Interior system: furniture catalogue, rooms, 24 layouts (places and homes) |
| `src/lib/interiorRuntime.ts` | Entering and leaving buildings, using furniture, generator power |
| `src/components/interior/` | Interior rendering: floors, cutaway walls, windows, furniture, residents |
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

See `docs/PLAN.md` for status and what is next.

## Backend
The server now lives in its own repo, [Jester8/ibadanserver-](https://github.com/Jester8/ibadanserver-): HTTP + WebSocket, Postgres (Supabase), LiveKit voice, deployed on Render. Point the game at it with `NEXT_PUBLIC_WS_URL` / `NEXT_PUBLIC_API_URL` (see `.env.example`).
