import type { ComponentType } from "react";
import type { ServiceId } from "@/lib/services";
import DonateService from "./DonateService";
import HospitalDesk from "./HospitalDesk";
import IncidentService from "./IncidentService";
import PostService from "./PostService";
import PrisonDesk from "./PrisonDesk";
import StationCounter from "./StationCounter";
import type { ServiceBodyProps } from "./types";

/**
 * Which body fills the ServicePanel for each service. FINAL (written by the lead): each body file has exactly one owner.
 * StationCounter serves both "police" and "efcc" (it reads ctx.id).
 */
export const SERVICE_BODIES: Record<ServiceId, ComponentType<ServiceBodyProps>> = {
  police: StationCounter,
  efcc: StationCounter,
  bail: PrisonDesk,
  hospital: HospitalDesk,
  post: PostService,
  donate: DonateService,
  incident: IncidentService,
};
