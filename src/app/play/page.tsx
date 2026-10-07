import type { Metadata } from "next";
import WorldClient from "@/components/world/WorldClient";

export const metadata: Metadata = { title: "Play · Omo'badan" };

export default function PlayPage() {
  return <WorldClient />;
}
