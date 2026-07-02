import { useState } from "react";
import type { ReactNode } from "react";
import type { ConfidenceLevel } from "../../tokens";
import { cn } from "../../utils/cn";
import {
  ApprovalPanel,
  AssignmentStatus,
  DecisionSummary,
  HumanHandoffCard,
  RiskBadge,
} from "../../components";
import type {
  ApprovalPending,
  AssignmentState,
  HandoffPriority,
  HandoffStatus,
  RiskBadgeLevel,
} from "../../components";

export interface ConsoleDecision {
  action: ReactNode;
  confidence?: ConfidenceLevel;
  confidenceValue?: number;
  risk?: RiskBadgeLevel;
  reasoning?: ReactNode;
  timestamp?: ReactNode;
}

export interface WorkflowApprovalItem {
  /** Stable unique identifier. */
  id: string;
  /** The decision awaiting approval. */
  decision: ConsoleDecision;
  /** Ownership/review state of the item. */
  assignment?: { status: AssignmentState; assignee?: string };
  /** Priority of the item. */
  priority?: HandoffPriority;
}

export interface WorkflowApprovalConsoleTemplateProps {
  /** Console title. */
  title?: string;
  /** The decisions awaiting approval. */
  items: WorkflowApprovalItem[];
  /** An optional handoff shown alongside the selected item. Pass null to hide. */
  handoff?: {
    reason: ReactNode;
    priority?: HandoffPriority;
    assignee?: string;
    status?: HandoffStatus;
    timestamp?: ReactNode;
  } | null;
  /** The initially selected item id. Defaults to the first item. */
  defaultSelectedId?: string;
  /** Called when an item is approved, with its id and the notes. */
  onApprove?: (id: string, notes: string) => void;
  /** Called when an item is rejected, with its id and the notes. */
  onReject?: (id: string, notes: string) => void;
  /** Which approval action is in progress for the selected item. */
  approvalPending?: ApprovalPending;
  /** Message shown when there are no items. */
  emptyMessage?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

const priorityLabels: Record<HandoffPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const noop = () => undefined;

/**
 * WorkflowApprovalConsoleTemplate
 *
 * A console for a queue of decisions awaiting human approval: a selectable list
 * of decisions (each with its risk, assignment, and priority) and a detail pane
 * showing the selected decision, an approval control, and an optional handoff.
 * It composes library components and is fully presentational — it manages only
 * which item is selected and forwards approval events.
 *
 * @example
 * ```tsx
 * <WorkflowApprovalConsoleTemplate
 *   items={items}
 *   onApprove={(id, notes) => approve(id, notes)}
 *   onReject={(id, notes) => reject(id, notes)}
 * />
 * ```
 */
export function WorkflowApprovalConsoleTemplate({
  title = "Approval queue",
  items,
  handoff,
  defaultSelectedId,
  onApprove = noop,
  onReject = noop,
  approvalPending = null,
  emptyMessage = "Nothing is awaiting approval.",
  className,
}: WorkflowApprovalConsoleTemplateProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultSelectedId ?? items[0]?.id,
  );

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  if (items.length === 0) {
    return (
      <section
        aria-label={title}
        className={cn("mx-auto max-w-5xl p-4 sm:p-6", className)}
      >
        <p className="rounded-card border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          {emptyMessage}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label={title}
      className={cn("mx-auto max-w-5xl space-y-4 p-4 sm:p-6", className)}
    >
      <header className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <span className="text-sm text-slate-500">{items.length} pending</span>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <ul
          aria-label="Decisions awaiting approval"
          className="space-y-2 lg:col-span-2"
        >
          {items.map((item) => {
            const isSelected = selected?.id === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-current={isSelected ? "true" : undefined}
                  className={cn(
                    "w-full rounded-card border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500",
                    isSelected
                      ? "border-slate-400 bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50",
                  )}
                >
                  <span className="block text-sm font-medium text-slate-900">
                    {item.decision.action}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-2">
                    {item.decision.risk ? (
                      <RiskBadge level={item.decision.risk} size="sm" />
                    ) : null}
                    {item.assignment ? (
                      <AssignmentStatus
                        status={item.assignment.status}
                        assignee={item.assignment.assignee}
                        size="sm"
                      />
                    ) : null}
                    {item.priority ? (
                      <span className="text-[11px] font-medium text-slate-500">
                        {priorityLabels[item.priority]} priority
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="space-y-4 lg:col-span-3">
          {selected ? (
            <>
              <DecisionSummary
                title="Decision"
                action={selected.decision.action}
                confidence={selected.decision.confidence}
                confidenceValue={selected.decision.confidenceValue}
                risk={selected.decision.risk}
                reasoning={selected.decision.reasoning}
                timestamp={selected.decision.timestamp}
                approvalStatus="pending"
              />

              {handoff ? (
                <HumanHandoffCard
                  reason={handoff.reason}
                  priority={handoff.priority}
                  assignee={handoff.assignee}
                  status={handoff.status}
                  timestamp={handoff.timestamp}
                />
              ) : null}

              <ApprovalPanel
                title="Review decision"
                allowNotes
                onApprove={(notes) => onApprove(selected.id, notes)}
                onReject={(notes) => onReject(selected.id, notes)}
                pending={approvalPending}
              />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
