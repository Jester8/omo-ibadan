import { climbTower, rt, walkToFurn } from "./interiorRuntime";
import type { ActionDef } from "./places";
import { PLACES } from "./places";
import { blockedReason, openService, type ServiceId } from "./services";
import { useGame } from "./store";

/** Why the player cannot do things at a place right now (custody), or null. The reasons are registered with `blockers` in services.ts. */
export const actionBlocked = blockedReason;

/**
 * THE way a place's action row is run, from the outside card (PlacePanel) and from the inside panel (InteriorPanel).
 * Both panels call this and nothing else, so the special cases live in one place.
 */
export function runPlaceAction(placeId: string, a: ActionDef): void {
  const s = useGame.getState();
  const why = actionBlocked();
  if (why) return void s.toast(why, "bad");
  if (a.svc) {
    const err = openService(a.svc, placeId);
    if (err) s.toast(err, "info");
    return;
  }
  if (placeId === "bowers" && a.id === "climb") return climbTower();
  if (placeId === "airport" && (a.id === "book" || a.id === "board")) return s.setSheet("flights");
  const err = s.runAction(a);
  if (err) s.toast(err, "bad");
}

/** Index of the first service desk in the room that serves `service` (any desk when omitted), or -1. */
export function deskIndex(service?: ServiceId): number {
  const l = rt.layout;
  if (!l) return -1;
  const place = rt.ref?.kind === "place" ? PLACES.find((p) => p.id === rt.ref!.id) : undefined;
  return l.items.findIndex((it) => it.kind === "servicedesk" && (!service || (it.service ?? place?.service) === service));
}

/** Walk to the desk; the panel opens on arrival (startUse). The side cards call this from their button. */
export function walkToDesk(service?: ServiceId): boolean {
  const i = deskIndex(service);
  return i >= 0 ? walkToFurn(i) : false;
}
