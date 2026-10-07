import type { ActionDef } from "@/lib/places";

export type Dish = "jollof" | "amala" | "pounded" | "suya" | "moimoi" | "akara" | "chicken" | "pie" | "burger" | "rice" | "soup" | "ofada";

/** Which dish a menu item is, from its id or label. null for anything that is not food. */
export function dishFor(a: Pick<ActionDef, "id" | "label">): Dish | null {
  const t = `${a.id} ${a.label}`.toLowerCase();
  if (/ofada/.test(t)) return "ofada";
  if (/jollof|refuel/.test(t)) return "jollof";
  if (/fried rice|\brice\b/.test(t)) return "rice";
  if (/amala|gbegiri|combo/.test(t)) return "amala";
  if (/pounded|iyan|egusi|efo/.test(t)) return "pounded";
  if (/suya/.test(t)) return "suya";
  if (/moin|moi-moi|moimoi/.test(t)) return "moimoi";
  if (/akara|pap\b/.test(t)) return "akara";
  if (/wing|chicken(?! burger)/.test(t)) return "chicken";
  if (/pie/.test(t)) return "pie";
  if (/burger/.test(t)) return "burger";
  if (/soup/.test(t)) return "soup";
  return null;
}

const Plate = () => (
  <>
    <ellipse cx="32" cy="55" rx="22" ry="4" fill="#000" opacity="0.1" />
    <circle cx="32" cy="34" r="26" fill="#fff" stroke="#e7e5e4" strokeWidth="1.5" />
    <circle cx="32" cy="34" r="20" fill="none" stroke="#f1efec" strokeWidth="1" />
  </>
);

const Plantain = ({ x, y }: { x: number; y: number }) => (
  <g>
    <ellipse cx={x} cy={y} rx="5" ry="3.2" fill="#f2c230" />
    <ellipse cx={x} cy={y} rx="3" ry="1.7" fill="#7a4a12" opacity="0.55" />
  </g>
);

const Drumstick = ({ x, y, r = 0 }: { x: number; y: number; r?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <ellipse cx="0" cy="0" rx="7" ry="5" fill="#b8642a" />
    <ellipse cx="-1.5" cy="-1.5" rx="3.5" ry="2" fill="#d98a45" opacity="0.8" />
    <rect x="5" y="-1.4" width="8" height="2.8" rx="1.4" fill="#f5efe1" />
    <circle cx="13" cy="-1.4" r="1.7" fill="#f5efe1" />
    <circle cx="13" cy="1.4" r="1.7" fill="#f5efe1" />
  </g>
);

function Art({ dish }: { dish: Dish }) {
  switch (dish) {
    case "jollof":
      return (
        <>
          <Plate />
          <ellipse cx="27" cy="33" rx="13" ry="10" fill="#e2582b" />
          {[[22, 30], [27, 27], [31, 32], [24, 36], [30, 37], [34, 28]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.1" fill="#f59e0b" />
          ))}
          <Plantain x={44} y={26} />
          <Plantain x={46} y={34} />
          <Drumstick x={36} y={46} r={-20} />
        </>
      );
    case "rice":
      return (
        <>
          <Plate />
          <ellipse cx="29" cy="33" rx="14" ry="10" fill="#e8c35a" />
          {[[24, 31, "#4f9a4d"], [30, 28, "#e2582b"], [33, 34, "#4f9a4d"], [25, 37, "#e2582b"], [36, 30, "#4f9a4d"]].map(([x, y, c], i) => (
            <circle key={i} cx={x as number} cy={y as number} r="1.4" fill={c as string} />
          ))}
          <Plantain x={46} y={30} />
          <Plantain x={44} y={38} />
        </>
      );
    case "ofada":
      return (
        <>
          <Plate />
          <ellipse cx="25" cy="34" rx="12" ry="9" fill="#cdbb8c" />
          <path d="M33 26c10-2 16 6 12 14-5 6-14 4-16-2-1-5 0-9 4-12z" fill="#b8321f" />
          <circle cx="40" cy="33" r="3" fill="#7a1d12" />
          <ellipse cx="38" cy="44" rx="5" ry="3" fill="#f5efe1" />
          <ellipse cx="38" cy="44" rx="2.4" ry="1.6" fill="#f2c230" />
        </>
      );
    case "amala":
      return (
        <>
          <Plate />
          <circle cx="32" cy="34" r="14" fill="#4f9a4d" />
          <circle cx="32" cy="34" r="11" fill="#6dbb55" />
          <circle cx="32" cy="33" r="8" fill="#5a3a25" />
          <ellipse cx="29" cy="30" rx="3" ry="2" fill="#7b523a" />
          <path d="M20 40q4-3 8 0" stroke="#c1272d" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="44" cy="42" r="2.2" fill="#b8642a" />
        </>
      );
    case "pounded":
      return (
        <>
          <Plate />
          <circle cx="24" cy="32" r="10" fill="#f5efe1" />
          <ellipse cx="21" cy="29" rx="4" ry="2.4" fill="#fff" opacity="0.7" />
          <path d="M33 24c10-3 16 4 13 13-3 8-14 8-16 1-1-6-1-11 3-14z" fill="#b8b04a" />
          {[[37, 30], [41, 34], [36, 37], [43, 28]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="#c1272d" />
          ))}
        </>
      );
    case "suya":
      return (
        <>
          <Plate />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`rotate(${-35 + i * 8} 32 34)`}>
              <rect x="10" y={26 + i * 5} width="44" height="1.8" rx="0.9" fill="#d9b88f" />
              {[0, 1, 2, 3].map((j) => (
                <rect key={j} x={18 + j * 8} y={24.2 + i * 5} width="6" height="5.4" rx="1.6" fill="#8a4a22" />
              ))}
            </g>
          ))}
          <circle cx="48" cy="46" r="4" fill="none" stroke="#e8a0c0" strokeWidth="2" />
          <circle cx="16" cy="46" r="4" fill="#d63a3a" />
        </>
      );
    case "moimoi":
      return (
        <>
          <Plate />
          <path d="M14 38c0-12 8-18 18-18s18 6 18 18z" fill="#e9a35a" />
          <ellipse cx="32" cy="38" rx="18" ry="3" fill="#c9833c" />
          <ellipse cx="34" cy="30" rx="6" ry="4.5" fill="#fff" />
          <ellipse cx="34" cy="30" rx="2.8" ry="2.2" fill="#f2c230" />
        </>
      );
    case "akara":
      return (
        <>
          <Plate />
          {[[24, 30], [36, 28], [29, 40], [41, 39]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7.5" fill="#b9682d" />
              <circle cx={x - 2} cy={y - 2.5} r="2.6" fill="#d98a45" opacity="0.85" />
            </g>
          ))}
        </>
      );
    case "chicken":
      return (
        <>
          <Plate />
          <Drumstick x={26} y={30} r={-30} />
          <Drumstick x={34} y={43} r={-8} />
          <circle cx="46" cy="28" r="3" fill="#d63a3a" />
        </>
      );
    case "pie":
      return (
        <>
          <Plate />
          <path d="M12 40c0-14 9-20 20-20s20 6 20 20z" fill="#d89a42" />
          <path d="M12 40c0-14 9-20 20-20" fill="none" stroke="#f0c070" strokeWidth="2" />
          <path d="M13 40h38" stroke="#b9792a" strokeWidth="3" strokeDasharray="3 2" />
          <ellipse cx="38" cy="30" rx="4" ry="2.4" fill="#8a4a22" />
        </>
      );
    case "burger":
      return (
        <>
          <Plate />
          <path d="M14 30c0-10 8-14 18-14s18 4 18 14z" fill="#d9903f" />
          {[24, 30, 36, 42].map((x) => (
            <circle key={x} cx={x} cy="22" r="1" fill="#f5e6c8" />
          ))}
          <path d="M13 32q4 3 8 0t8 0 8 0 8 0 5 0" stroke="#5ab04a" strokeWidth="3.2" fill="none" />
          <rect x="14" y="34" width="36" height="5" rx="2.5" fill="#5a3a25" />
          <rect x="14" y="40" width="36" height="3" rx="1.5" fill="#f2c230" />
          <path d="M14 44h36c0 5-6 7-18 7s-18-2-18-7z" fill="#d9903f" />
        </>
      );
    case "soup":
      return (
        <>
          <ellipse cx="32" cy="55" rx="22" ry="4" fill="#000" opacity="0.1" />
          <path d="M8 30h48c0 14-9 24-24 24S8 44 8 30z" fill="#f5efe1" stroke="#e7e5e4" strokeWidth="1.5" />
          <ellipse cx="32" cy="30" rx="24" ry="6" fill="#c8541e" />
          {[[22, 30], [32, 31], [41, 29]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="4" ry="2.3" fill="#8a3a1a" />
          ))}
          <path d="M26 22c0-4 3-4 3-8m6 8c0-4 3-4 3-8" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        </>
      );
  }
}

/** A small illustrated picture of a Nigerian dish. */
export default function FoodArt({ dish, className = "size-14" }: { dish: Dish; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={dish}>
      <Art dish={dish} />
    </svg>
  );
}
