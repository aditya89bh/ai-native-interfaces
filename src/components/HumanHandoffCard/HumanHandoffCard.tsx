import type { CSSProperties, ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type HandoffPriority = "low" | "medium" | "high" | "urgent";
export type HandoffStatus = "pending" | "accepted" | "in-progress" | "resolved";

const priorityConfig: Record<
  HandoffPriority,
  { color: string; label: string }
> = {
  low: { color: semanticStatus.neutral, label: "Low" },
  medium: { color: semanticStatus.info, label: "Medium" },
  high: { color: semanticStatus.warning, label: "High" },
  urgent: { color: semanticStatus.error, label: "Urgent" },
};

const statusConfig: Record<HandoffStatus, { color: string; label: string }> = {
  pending: { color: semanticStatus.warning, label: "Pending" },
  accepted: { color: semanticStatus.info, label: "Accepted" },
  "in-progress": { color: semanticStatus.info, label: "In progress" },
  resolved: { color: semanticStatus.success, label: "Resolved" },
};

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export interface HumanHandoffCardProps {
  /** Why the work is being handed to a person. */
  reason: ReactNode;
  /** Priority of the handoff. */
  priority?: HandoffPriority;
  /** Name of the human the work is assigned to. */
  assignee?: string;
  /** Current status of the handoff. */
  status?: HandoffStatus;
  /** When the handoff was created or last updated. */
  timestamp?: ReactNode;
  /** Card title. */
  title?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * HumanHandoffCard
 *
 * Represents a request to hand work from an agent to a person: the reason,
 * priority, assigned human, status, and time. Presentational only — it renders
 * the handoff you supply and never routes or assigns anything.
 *
 * @example
 * ```tsx
 * <HumanHandoffCard
 *   reason="The refund exceeds the agent's approval limit."
 *   priority="high"
 *   assignee="Dana Lee"
 *   status="pending"
 *   timestamp="2 minutes ago"
 * />
 * ```
 */
export function HumanHandoffCard({
  reason,
  priority,
  assignee,
  status,
  timestamp,
  title = "Handoff to a human",
  className,
}: HumanHandoffCardProps) {
  const priorityStyles = priority ? priorityConfig[priority] : null;
  const statusStyles = status ? statusConfig[status] : null;

  const priorityBadgeStyle: CSSProperties | undefined = priorityStyles
    ? {
        color: priorityStyles.color,
        backgroundColor: hexToRgba(priorityStyles.color, 0.12),
        borderColor: hexToRgba(priorityStyles.color, 0.3),
      }
    : undefined;

  return (
    <article
      aria-label={title}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {priorityStyles ? (
          <span
            className="inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium"
            style={priorityBadgeStyle}
          >
            {priorityStyles.label} priority
          </span>
        ) : null}
      </div>

      <p className="mt-1.5 text-sm text-slate-600">{reason}</p>

      {assignee != null || statusStyles != null || timestamp != null ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
          {assignee != null ? (
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600"
              >
                {initials(assignee)}
              </span>
              <span className="text-slate-700">{assignee}</span>
            </span>
          ) : null}
          {statusStyles ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: statusStyles.color }}
              />
              {statusStyles.label}
            </span>
          ) : null}
          {timestamp != null ? (
            <span className="ml-auto text-slate-400">{timestamp}</span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
