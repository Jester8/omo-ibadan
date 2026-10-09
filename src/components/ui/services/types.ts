import type { ServiceCtx } from "@/lib/services";

/** What every service panel body receives. The shell (ServicePanel.tsx) draws the modal frame, the header and the close button around it. */
export type ServiceBodyProps = { ctx: ServiceCtx };
