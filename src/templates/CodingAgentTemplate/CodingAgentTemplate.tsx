import type { ReactNode } from "react";
import type { AgentState, ConfidenceLevel } from "../../tokens";
import { cn } from "../../utils/cn";
import {
  ActionLog,
  AgentCapabilityBadges,
  AgentStatusCard,
  ApprovalPanel,
  DecisionSummary,
  ExecutionTimeline,
  QueueView,
  TaskProgress,
} from "../../components";
import type {
  ActionLogEntry,
  AgentCapability,
  ApprovalPending,
  ExecutionStep,
  QueueItem,
  RiskBadgeLevel,
} from "../../components";

export interface CodingAgentInfo {
  name: string;
  state: AgentState;
  description?: string;
  timestamp?: ReactNode;
}

export interface CodingChange {
  action: ReactNode;
  confidence?: ConfidenceLevel;
  confidenceValue?: number;
  risk?: RiskBadgeLevel;
  reasoning?: ReactNode;
  timestamp?: ReactNode;
}

export interface CodingAgentTemplateProps {
  /** The coding agent. */
  agent: CodingAgentInfo;
  /** The agent's available tools/capabilities. */
  capabilities?: AgentCapability[];
  /** Overall completion percentage (0–100). */
  progress?: number;
  /** The plan steps, in order. */
  steps: ExecutionStep[];
  /** The work queue. */
  queue?: QueueItem[];
  /** The change the agent proposes. */
  change: CodingChange;
  /** The commands and edits performed so far. */
  actions: ActionLogEntry[];
  /** Called when the human approves the change. */
  onApprove?: (notes: string) => void;
  /** Called when the human rejects the change. */
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
 * CodingAgentTemplate
 *
 * A complete coding-agent surface: the agent's status and capabilities, overall
 * progress, the plan steps and work queue, the proposed change with its
 * confidence and risk, an approval control, and the command/edit history. It
 * composes library components and is fully presentational.
 *
 * @example
 * ```tsx
 * <CodingAgentTemplate
 *   agent={{ name: "Coding agent", state: "acting" }}
 *   steps={steps}
 *   change={{ action: "Add POST /api/refunds", confidence: "high", risk: "low" }}
 *   actions={actions}
 *   onApprove={(notes) => merge(notes)}
 *   onReject={(notes) => reject(notes)}
 * />
 * ```
 */
export function CodingAgentTemplate({
  agent,
  capabilities,
  progress,
  steps,
  queue,
  change,
  actions,
  onApprove = noop,
  onReject = noop,
  onEdit,
  approvalPending = null,
  className,
}: CodingAgentTemplateProps) {
  return (
    <section
      aria-label="Coding agent"
      className={cn("mx-auto max-w-4xl space-y-6 p-4 sm:p-6", className)}
    >
      <header className="space-y-3">
        <AgentStatusCard
          name={agent.name}
          state={agent.state}
          description={agent.description}
          timestamp={agent.timestamp}
        />
        {capabilities && capabilities.length > 0 ? (
          <AgentCapabilityBadges
            capabilities={capabilities}
            label={`${agent.name} capabilities`}
          />
        ) : null}
        {progress !== undefined ? (
          <TaskProgress label="Overall progress" value={progress} />
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="coding-plan-heading" className="space-y-2">
          <h3
            id="coding-plan-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Plan
          </h3>
          <ExecutionTimeline steps={steps} />
        </section>

        {queue && queue.length > 0 ? (
          <section aria-labelledby="coding-queue-heading" className="space-y-2">
            <h3
              id="coding-queue-heading"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Queue
            </h3>
            <QueueView items={queue} />
          </section>
        ) : null}
      </div>

      <DecisionSummary
        title="Proposed change"
        action={change.action}
        confidence={change.confidence}
        confidenceValue={change.confidenceValue}
        risk={change.risk}
        reasoning={change.reasoning}
        timestamp={change.timestamp}
        approvalStatus="pending"
      />

      <ApprovalPanel
        title="Review change"
        description="Approve to apply the change and open a pull request."
        allowNotes
        onApprove={onApprove}
        onReject={onReject}
        onEdit={onEdit}
        pending={approvalPending}
      />

      <section aria-labelledby="coding-log-heading" className="space-y-2">
        <h3
          id="coding-log-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >
          Command history
        </h3>
        <ActionLog entries={actions} />
      </section>
    </section>
  );
}
