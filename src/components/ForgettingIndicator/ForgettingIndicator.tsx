import type { ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type ForgettingStatus =
  "active" | "expiring-soon" | "forgotten" | "archived";
export type ForgettingIndicatorSize = "sm" | "md";

const statusConfig: Record<
  ForgettingStatus,
  { color: string; label: string; hollow: boolean; muted: boolean }
> = {
  active: {
    color: semanticStatus.success,
    label: "Active",
    hollow: false,
    muted: false,
  },
  "expiring-soon": {
    color: semanticStatus.warning,
    label: "Expiring soon",
    hollow: false,
    muted: false,
  },
  forgotten: {
    color: semanticStatus.neutral,
    label: "Forgotten",
    hollow: true,
    muted: true,
  },
  archived: {
    color: semanticStatus.info,
    label: "Archived",
    hollow: true,
    muted: false,
  },
};

const sizeStyles: Record<
  ForgettingIndicatorSize,
  { dot: string; text: string; gap: string }
> = {
  sm: { dot: "h-2 w-2", text: "text-[11px]", gap: "gap-1.5" },
  md: { dot: "h-2.5 w-2.5", text: "text-xs", gap: "gap-2" },
};

export interface ForgettingIndicatorProps {
  /** The lifecycle state of the memory. */
  status: ForgettingStatus;
  /** Overrides the default label. */
  label?: string;
  /** Extra detail, e.g. "Expires in 3 days". */
  detail?: ReactNode;
  /** Whether to render the text label. */
  showLabel?: boolean;
  /** Visual size. */
  size?: ForgettingIndicatorSize;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ForgettingIndicator
 *
 * Communicates where a memory sits in its lifecycle: active, expiring soon,
 * forgotten, or archived. Making forgetting visible is a core part of a
 * trustworthy memory interface. State is conveyed with color, dot style, and
 * text — never color alone. Presentational only.
 *
 * @example
 * ```tsx
 * <ForgettingIndicator status="expiring-soon" detail="Expires in 3 days" />
 * <ForgettingIndicator status="forgotten" />
 * ```
 */
export function ForgettingIndicator({
  status,
  label,
  detail,
  showLabel = true,
  size = "md",
  className,
}: ForgettingIndicatorProps) {
  const config = statusConfig[status];
  const styles = sizeStyles[size];
  const text = label ?? config.label;
  const accessibleLabel =
    detail != null && typeof detail === "string" ? `${text}. ${detail}` : text;

  return (
    <span
      role="status"
      aria-label={showLabel ? undefined : accessibleLabel}
      className={cn(
        "inline-flex items-center",
        styles.gap,
        styles.text,
        config.muted
          ? "text-slate-400 dark:text-slate-500"
          : "text-slate-600 dark:text-slate-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("inline-flex shrink-0 rounded-full", styles.dot)}
        style={
          config.hollow
            ? { border: `1.5px solid ${config.color}` }
            : { backgroundColor: config.color }
        }
      />
      {showLabel ? (
        <span className="inline-flex items-center gap-1">
          <span className={cn("font-medium", config.muted && "line-through")}>
            {text}
          </span>
          {detail != null ? (
            <span className="text-slate-400 dark:text-slate-500">
              · {detail}
            </span>
          ) : null}
        </span>
      ) : (
        <span className="sr-only">{accessibleLabel}</span>
      )}
    </span>
  );
}
