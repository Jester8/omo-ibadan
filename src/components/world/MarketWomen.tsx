"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "@/components/avatar/Avatar";
import { AVATAR_SCALE } from "./Player";
import { womanLook } from "@/lib/look";
import { doorOf, PLACES } from "@/lib/places";
import { me } from "@/lib/playerState";

/** Market women set out their goods in front of the markets and stay by them all day. */
const MARKETS: { id: string; count: number }[] = [
  { id: "bodija-market", count: 9 },
  { id: "dugbe", count: 4 },
  { id: "sango-market", count: 4 },
];
const GOODS = ["#d63a3a", "#2f9e4b", "#e0a21f", "#7a3b1f", "#f2f2ea", "#c0392b"];
const BRELLA = ["#e0663a", "#2f9e6b", "#f2b632", "#4a90e2", "#d9568e", "#8a5adf"];

type Seller = { x: number; z: number; seed: string; goods: string; brella: string };

function Stall({ s }: { s: Seller }) {
  const motion = useRef({ speed: 0 });
  const look = useMemo(() => womanLook(s.seed), [s.seed]);
  return (
    <group position={[s.x, 0, s.z]}>
      {/* umbrella and table in front of her */}
      <mesh position={[0, 0.95, 0.15]}>
        <coneGeometry args={[0.55, 0.28, 10]} />
        <meshStandardMaterial color={s.brella} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.5, 0.15]}>
        <cylinderGeometry args={[0.012, 0.012, 0.9, 5]} />
        <meshStandardMaterial color="#6b7380" />
      </mesh>
      <mesh position={[0, 0.17, 0.62]} castShadow>
        <boxGeometry args={[0.9, 0.3, 0.42]} />
        <meshStandardMaterial color="#9a6b3f" roughness={0.9} />
      </mesh>
      {[-0.26, 0, 0.26].map((x, i) => (
        <mesh key={i} position={[x, 0.37, 0.62]}>
          <sphereGeometry args={[0.1, 8, 6]} />
          <meshStandardMaterial color={i === 1 ? s.goods : GOODS[(i * 2 + 1) % GOODS.length]} roughness={0.8} />
        </mesh>
      ))}
      <Avatar look={look} motion={motion} scale={AVATAR_SCALE} />
    </group>
  );
}

export default function MarketWomen() {
  const [near, setNear] = useState<string | null>(null);
  const sellers = useMemo(
    () =>
      MARKETS.flatMap((m) => {
        const p = PLACES.find((x) => x.id === m.id)!;
        const d = doorOf(p);
        const span = Math.min(p.size[0] + 1.2, m.count * 1.05);
        return Array.from({ length: m.count }, (_, i): Seller & { market: string } => ({
          market: m.id,
          x: p.pos[0] - span / 2 + (i + 0.5) * (span / m.count),
          z: d.z - 0.55 - (i % 2) * 0.55,
          seed: `${m.id}-seller-${i}`,
          goods: GOODS[(i * 3) % GOODS.length],
          brella: BRELLA[i % BRELLA.length],
        }));
      }),
    [],
  );

  // only mount the sellers of a market the player is close to
  useEffect(() => {
    const id = setInterval(() => {
      let best: string | null = null;
      let bd = 30;
      for (const m of MARKETS) {
        const p = PLACES.find((x) => x.id === m.id)!;
        const d = Math.hypot(p.pos[0] - me.x, p.pos[1] - me.z);
        if (d < bd) {
          bd = d;
          best = m.id;
        }
      }
      setNear(best);
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {sellers
        .filter((s) => s.market === near)
        .map((s) => (
          <Stall key={s.seed} s={s} />
        ))}
    </>
  );
}
