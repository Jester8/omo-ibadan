"use client";

import type { BankItem } from "@/lib/bank";
import type { ReportBody } from "@/lib/custodyRules";
import type { CaseReason } from "@/lib/protocol";

/** STUB written by the lead (Phase 0); owned by the JU (justice UI) agent from Phase 1. Keep every export name and props (WorldClient, Floating, Sheets, PhoneOS, PlayerPanel, ChatDock, BankApp, FriendsTabs import them). */
export const CustodyBanner = () => null;
export const ArrestOverlay = () => null;
export const BailAsks = () => null;
export const CustodyDetails = () => null;
export const PoliceApp = () => null;
export const HeldFriends = () => null;
export const CasesList = (_props: { compact?: boolean }) => null; // eslint-disable-line @typescript-eslint/no-unused-vars
export const ReportPicker = (_props: { accused: string; defaultReason?: CaseReason; via?: ReportBody["via"]; name?: string; onDone: () => void }) => null; // eslint-disable-line @typescript-eslint/no-unused-vars
/** "Report to EFCC" on an outgoing bank row. Renders nothing unless the row qualifies. */
export const EfccReportButton = (_props: { item: BankItem }) => null; // eslint-disable-line @typescript-eslint/no-unused-vars
