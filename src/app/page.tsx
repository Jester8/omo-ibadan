import { redirect } from "next/navigation";

/** No landing page: go straight into the game. */
export default function Home() {
  redirect("/play");
}
