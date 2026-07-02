import type { ReactNode } from "react";
import type { AgentState, ConfidenceLevel } from "../../tokens";
import { cn } from "../../utils/cn";
import {
  ActionLog,
  AgentStatusCard,
  ApprovalPanel,
  AssignmentStatus,
  DecisionSummary,
  EscalationBanner,
} from "../../components";
import type {
  ActionLogEntry,
  ApprovalPending,
  AssignmentState,
  EscalationSeverity,
  RiskBadgeLevel,
} from "../../components";

export interface SupportAgentInfo {
  name: string;
  state: AgentState;
  description?: string;
  timestamp?: ReactNode;
}

export interface SupportResolution {
  action: ReactNode;
  confidence?: ConfidenceLevel;
  confidenceValue?: number;
  risk?: RiskBadgeLevel;
  reasoning?: ReactNode;
  timestamp?: ReactNode;
}

export interface CustomerSupportAgentTemplateProps {
  /** The agent handling the ticket. */
  agent: SupportAgentInfo;
  /** The customer and their request. */
  customer?: { name: string; requestSummary: ReactNode };
  /** Ownership/review state of the ticket. */
  assignment?: { status: AssignmentState; assignee?: string };
  /** An optional escalation banner. Pass null to hide it. */
  escalation?: { severity: EscalationSeverity; message: ReactNode } | null;
  /** The resolution the agent proposes. */
  resolution: SupportResolution;
  /** The actions taken on the ticket so far. */
  actions: ActionLogEntry[];
  /** Called when the human approves the resolution. */
  onApprove?: (notes: string) => void;
  /** Called when the human rejects the resolution. */
  onReject?: (notes: string) => void;
  /** Called when the human chooses to edit before approving. */
  onEdit?: () => void;
  /** Which approval action is in progress. */
  approvalPending?: ApprovalPending;
  /** Additional classes appended to the root element. */
  className?: string;
}

const noop = () => undefined;

/**
 * CustomerSupportAgentTemplate
 *
 * A complete support-agent surface: the agent's status and assignment, an
 * optional escalation, the customer's request, the proposed resolution with its
 * confidence and risk, an approval control, and the action history. It composes
 * library components and is fully presentational — it renders the data you pass
 * and forwards approval events.
 *
 * @example
 * ```tsx
 * <CustomerSupportAgentTemplate
 *   agent={{ name: "Support agent", state: "needsApproval" }}
 *   resolution={{ action: "Refund $128.40", confidence: "high", risk: "moderate" }}
 *   actions={actions}
 *   onApprove={(notes) => submit(notes)}
 *   onReject={(notes) => decline(notes)}
 * />
 * ```
 */
export function CustomerSupportAgentTemplate({
  agent,
  customer,
  assignment,
  escalation,
  resolution,
  actions,
  onApprove = noop,
  onReject = noop,
  onEdit,
  approvalPending = null,
  className,
}: CustomerSupportAgentTemplateProps) {
  return (
    <section
      aria-label="Customer support agent"
      className={cn("mx-auto max-w-4xl space-y-6 p-4 sm:p-6", className)}
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AgentStatusCard
          name={agent.name}
          state={agent.state}
          description={agent.description}
          timestamp={agent.timestamp}
          className="flex-1"
        />
        {assignment ? (
          <AssignmentStatus
            status={assignment.status}
            assignee={assignment.assignee}
          />
        ) : null}
      </header>

      {escalation ? (
        <EscalationBanner severity={escalation.severity}>
          {escalation.message}
        </EscalationBanner>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          {customer ? (
            <section
              aria-labelledby="support-request-heading"
              className="rounded-card border border-slate-200 bg-white p-4 shadow-elevation dark:border-slate-700 dark:bg-slate-900"
            >
              <h3
                id="support-request-heading"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Customer request
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {customer.name}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {customer.requestSummary}
              </p>
            </section>
          ) : null}

          <DecisionSummary
            title="Proposed resolution"
            action={resolution.action}
            confidence={resolution.confidence}
            confidenceValue={resolution.confidenceValue}
            risk={resolution.risk}
            reasoning={resolution.reasoning}
            timestamp={resolution.timestamp}
            approvalStatus="pending"
          />

          <ApprovalPanel
            title="Review resolution"
            description="Approve to send the resolution to the customer."
            allowNotes
            onApprove={onApprove}
            onReject={onReject}
            onEdit={onEdit}
            pending={approvalPending}
          />
        </div>

        <section
          aria-labelledby="support-log-heading"
          className="space-y-2 lg:col-span-2"
        >
          <h3
            id="support-log-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Action history
          </h3>
          <ActionLog entries={actions} />
        </section>
      </div>
    </section>
  );
}
