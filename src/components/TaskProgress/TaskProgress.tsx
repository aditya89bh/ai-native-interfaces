import type { CSSProperties } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type TaskProgressStatus =
  "in-progress" | "indeterminate" | "completed" | "failed" | "paused";
export type TaskProgressSize = "sm" | "md";

const statusConfig: Record<
  TaskProgressStatus,
  { color: string; label: string }
> = {
  "in-progress": { color: semanticStatus.info, label: "In progress" },
  indeterminate: { color: semanticStatus.info, label: "Working" },
  completed: { color: semanticStatus.success, label: "Completed" },
  failed: { color: semanticStatus.error, label: "Failed" },
  paused: { color: semanticStatus.warning, label: "Paused" },
};

const sizeStyles: Record<TaskProgressSize, { track: string; text: string }> = {
  sm: { track: "h-1.5", text: "text-[11px]" },
  md: { track: "h-2.5", text: "text-xs" },
};

export interface TaskProgressProps {
  /** Completion percentage (0–100). Ignored when `status` is `indeterminate`. */
  value?: number;
  /** Execution status of the task. */
  status?: TaskProgressStatus;
  /** A label describing the task. */
  label?: string;
  /** Whether to show the numeric percentage (determinate states only). */
  showValue?: boolean;
  /** Visual size. */
  size?: TaskProgressSize;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * TaskProgress
 *
 * A progress bar for a single AI task. Supports determinate progress (a
 * percentage), an indeterminate "working" state, and terminal completed,
 * failed, and paused states. Uses `role="progressbar"` with appropriate ARIA
 * values, and conveys state with color plus text — never color alone.
 *
 * @example
 * ```tsx
 * <TaskProgress label="Indexing files" value={62} />
 * <TaskProgress label="Thinking" status="indeterminate" />
 * <TaskProgress label="Deploy" status="failed" value={40} />
 * ```
 */
export function TaskProgress({
  value,
  status = "in-progress",
  label,
  showValue = true,
  size = "md",
  className,
}: TaskProgressProps) {
  const config = statusConfig[status];
  const styles = sizeStyles[size];
  const isIndeterminate = status === "indeterminate";

  const clamped =
    typeof value === "number"
      ? Math.round(Math.min(Math.max(value, 0), 100))
      : undefined;

  // Completed implies 100%; failed/paused keep the last known value if given.
  const fillPercent =
    status === "completed" ? 100 : (clamped ?? (isIndeterminate ? 0 : 0));

  const accessibleLabel = label ? `${label}: ${config.label}` : config.label;

  const barStyle: CSSProperties = {
    backgroundColor: config.color,
    width: isIndeterminate ? "40%" : `${fillPercent}%`,
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {(label != null || showValue) && (
        <div
          className={cn(
            "flex items-center justify-between gap-2",
            styles.text,
            "text-slate-600",
          )}
        >
          {label != null ? (
            <span className="truncate font-medium">{label}</span>
          ) : (
            <span />
          )}
          <span className="shrink-0 tabular-nums text-slate-400">
            {isIndeterminate || clamped === undefined
              ? config.label
              : `${status === "completed" ? 100 : clamped}%`}
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={accessibleLabel}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : 100}
        aria-valuenow={
          isIndeterminate ? undefined : status === "completed" ? 100 : clamped
        }
        className={cn(
          "w-full overflow-hidden rounded-full bg-slate-100",
          styles.track,
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            isIndeterminate &&
              "animate-progress-indeterminate motion-reduce:animate-none",
          )}
          style={barStyle}
        />
      </div>
    </div>
  );
}
