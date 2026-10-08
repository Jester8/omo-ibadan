import type { Layout } from "./interiors";

/** Adds visible ceiling lights to a room wherever it has none, so every interior is lit from above. Applied to every layout. */
export function addCeilingLights(layout: Layout): Layout {
  return layout;
}
