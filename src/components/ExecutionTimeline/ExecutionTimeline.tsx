import type { ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type ExecutionStepStatus =
  "pending" | "running" | "completed" | "failed" | "skipped";

export interface ExecutionStep {
  /** Stable unique identifier. */
  id: string;
  /** Short title of the step. */
  title: string;
  /** Optional longer description. */
  description?: ReactNode;
  /** Execution status of the step. */
  status?: ExecutionStepStatus;
  /** When the step ran or was recorded. */
  timestamp?: ReactNode;
}

const statusConfig: Record<
  ExecutionStepStatus,
  { color: string; label: string; glyph: string; hollow: boolean }
> = {
  pending: {
    color: semanticStatus.neutral,
    label: "Pending",
    glyph: "",
    hollow: true,
  },
  running: {
    color: semanticStatus.info,
    label: "Running",
    glyph: "",
    hollow: false,
  },
  completed: {
    color: semanticStatus.success,
    label: "Completed",
    glyph: "✓",
    hollow: false,
  },
  failed: {
    color: semanticStatus.error,
    label: "Failed",
    glyph: "✕",
    hollow: false,
  },
  skipped: {
    color: semanticStatus.neutral,
    label: "Skipped",
    glyph: "–",
    hollow: true,
  },
};

export interface ExecutionTimelineProps {
  /** The execution steps, in order. */
  steps: ExecutionStep[];
  /** Accessible label for the timeline list. */
  label?: string;
  /** Message shown when there are no steps. */
  emptyMessage?: string;
  /** Whether the running step pulses (respects reduced motion). */
  animated?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ExecutionTimeline
 *
 * Displays sequential execution steps along a vertical rail, each with a status
 * marker (pending, running, completed, failed, skipped). Presentational: it
 * renders the ordered steps you supply and never executes anything. Status is
 * conveyed with color, a glyph, and text.
 *
 * @example
 * ```tsx
 * <ExecutionTimeline
 *   steps={[
 *     { id: "1", title: "Fetch data", status: "completed", timestamp: "0:01" },
 *     { id: "2", title: "Transform", status: "running", timestamp: "0:04" },
 *     { id: "3", title: "Upload", status: "pending" },
 *   ]}
 * />
 * ```
 */
export function ExecutionTimeline({
  steps,
  label = "Execution steps",
  emptyMessage = "No steps to show.",
  animated = true,
  className,
}: ExecutionTimelineProps) {
  if (steps.length === 0) {
    return (
      <p className={cn("text-sm text-slate-500", className)}>{emptyMessage}</p>
    );
  }

  return (
    <ol aria-label={label} className={cn("relative space-y-4", className)}>
      {steps.map((step, index) => {
        const status = step.status ?? "pending";
        const config = statusConfig[status];
        return (
          <li key={step.id} className="relative pl-7">
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute bottom-[-1rem] left-[9px] top-5 w-px bg-slate-200"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-bold text-white ring-4 ring-white",
                status === "running" &&
                  animated &&
                  "animate-pulse motion-reduce:animate-none",
              )}
              style={
                config.hollow
                  ? {
                      backgroundColor: "#fff",
                      border: `2px solid ${config.color}`,
                    }
                  : { backgroundColor: config.color }
              }
            >
              {config.glyph}
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-900">
                  {step.title}
                </span>
                {step.timestamp != null ? (
                  <span className="shrink-0 text-xs text-slate-400">
                    {step.timestamp}
                  </span>
                ) : null}
              </div>
              {step.description != null ? (
                <span className="text-sm text-slate-600">
                  {step.description}
                </span>
              ) : null}
              <span className="sr-only">Status: {config.label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
