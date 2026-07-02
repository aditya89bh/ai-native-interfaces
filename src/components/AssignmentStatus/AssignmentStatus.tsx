import type { CSSProperties } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type AssignmentState =
  "unassigned" | "assigned" | "in-review" | "resolved";
export type AssignmentStatusSize = "sm" | "md";

const statusConfig: Record<
  AssignmentState,
  { color: string; label: string; hollow: boolean }
> = {
  unassigned: {
    color: semanticStatus.neutral,
    label: "Unassigned",
    hollow: true,
  },
  assigned: { color: semanticStatus.info, label: "Assigned", hollow: false },
  "in-review": {
    color: semanticStatus.warning,
    label: "In review",
    hollow: false,
  },
  resolved: { color: semanticStatus.success, label: "Resolved", hollow: false },
};

const sizeStyles: Record<
  AssignmentStatusSize,
  { pill: string; dot: string; text: string; gap: string }
> = {
  sm: {
    pill: "px-2 py-0.5",
    dot: "h-2 w-2",
    text: "text-[11px]",
    gap: "gap-1.5",
  },
  md: {
    pill: "px-2.5 py-1",
    dot: "h-2.5 w-2.5",
    text: "text-xs",
    gap: "gap-2",
  },
};

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface AssignmentStatusProps {
  /** The assignment/review state. */
  status: AssignmentState;
  /** The person the work is assigned to, shown when relevant. */
  assignee?: string;
  /** Overrides the default label. */
  label?: string;
  /** Whether to render the text label. */
  showLabel?: boolean;
  /** Visual size. */
  size?: AssignmentStatusSize;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AssignmentStatus
 *
 * A compact badge for the ownership and review state of a piece of work:
 * unassigned, assigned, in review, or resolved, with an optional assignee.
 * State is conveyed with color, dot style, and text. Presentational only.
 *
 * @example
 * ```tsx
 * <AssignmentStatus status="assigned" assignee="Dana Lee" />
 * <AssignmentStatus status="unassigned" />
 * ```
 */
export function AssignmentStatus({
  status,
  assignee,
  label,
  showLabel = true,
  size = "md",
  className,
}: AssignmentStatusProps) {
  const config = statusConfig[status];
  const styles = sizeStyles[size];
  const text = label ?? config.label;
  const showAssignee = assignee != null && status !== "unassigned";
  const accessibleLabel = showAssignee ? `${text}: ${assignee}` : text;

  const pillStyle: CSSProperties = {
    color: config.color,
    backgroundColor: hexToRgba(config.color, 0.12),
    borderColor: hexToRgba(config.color, 0.3),
  };

  return (
    <span
      role="status"
      aria-label={showLabel ? undefined : accessibleLabel}
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        styles.pill,
        styles.text,
        styles.gap,
        className,
      )}
      style={pillStyle}
    >
      <span
        aria-hidden="true"
        className={cn("shrink-0 rounded-full", styles.dot)}
        style={
          config.hollow
            ? { border: `1.5px solid ${config.color}` }
            : { backgroundColor: config.color }
        }
      />
      {showLabel ? (
        <span>
          {text}
          {showAssignee ? (
            <span className="font-normal opacity-80"> · {assignee}</span>
          ) : null}
        </span>
      ) : (
        <span className="sr-only">{accessibleLabel}</span>
      )}
    </span>
  );
}
