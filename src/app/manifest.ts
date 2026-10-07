import type { MetadataRoute } from "next";

/** Lets the game be installed to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Omo'badan",
    short_name: "Omo'badan",
    description: "Live the life. A real-life simulation of Ibadan, the city of brown roofs.",
    id: "/play",
    start_url: "/play",
    scope: "/",
    orientation: "any",
    categories: ["games", "lifestyle", "entertainment"],
    lang: "en",
    display: "standalone",
    background_color: "#FBF5E4",
    theme_color: "#1E1B3A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [{ name: "Play", short_name: "Play", url: "/play", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] }],
  };
}
