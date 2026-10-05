/** DOM overlay anchors: elements whose screen position tracks a 3D point (see LabelProjector). */
import type { Vector3 } from "three";

export type Anchor = {
  el: HTMLElement;
  /** write the world position into `out` */
  get: (out: Vector3) => void;
  /** hide when farther than this from the player (world units) */
  maxDist?: number;
  /** hide when the camera is zoomed out past this distance */
  maxCam?: number;
  /** hide when the camera is closer than this */
  minCam?: number;
};

export const anchors = new Map<string, Anchor>();
