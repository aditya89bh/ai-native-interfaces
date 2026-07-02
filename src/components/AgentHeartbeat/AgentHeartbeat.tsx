import type { CSSProperties, ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type HeartbeatStatus =
  "online" | "offline" | "reconnecting" | "degraded";
export type AgentHeartbeatSize = "sm" | "md";

const statusConfig: Record<
  HeartbeatStatus,
  { color: string; label: string; pulse: boolean; hollow: boolean }
> = {
  online: {
    color: semanticStatus.success,
    label: "Online",
    pulse: true,
    hollow: false,
  },
  reconnecting: {
    color: semanticStatus.info,
    label: "Reconnecting…",
    pulse: true,
    hollow: false,
  },
  degraded: {
    color: semanticStatus.warning,
    label: "Degraded",
    pulse: false,
    hollow: false,
  },
  offline: {
    color: semanticStatus.neutral,
    label: "Offline",
    pulse: false,
    hollow: true,
  },
};

const sizeStyles: Record<
  AgentHeartbeatSize,
  { text: string; dot: string; gap: string }
> = {
  sm: { text: "text-[11px]", dot: "h-2 w-2", gap: "gap-1.5" },
  md: { text: "text-xs", dot: "h-2.5 w-2.5", gap: "gap-2" },
};

export interface AgentHeartbeatProps {
  /** Connection health of the agent. */
  status: HeartbeatStatus;
  /** Overrides the default status label. */
  label?: string;
  /** Whether to render the text label. When false, only the indicator shows. */
  showLabel?: boolean;
  /** Supplementary detail such as "last seen 5m ago". */
  detail?: ReactNode;
  /** Visual size. */
  size?: AgentHeartbeatSize;
  /** Whether live statuses animate. Respects reduced motion. */
  animated?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AgentHeartbeat
 *
 * A connection-health indicator for an agent. It communicates whether the
 * agent is online, offline, reconnecting, or degraded, using both color and
 * text and announcing changes politely to assistive technology.
 *
 * @example
 * ```tsx
 * <AgentHeartbeat status="online" />
 * <AgentHeartbeat status="offline" detail="last seen 5m ago" />
 * ```
 */
export function AgentHeartbeat({
  status,
  label,
  showLabel = true,
  detail,
  size = "md",
  animated = true,
  className,
}: AgentHeartbeatProps) {
  const config = statusConfig[status];
  const styles = sizeStyles[size];
  const text = label ?? config.label;
  const pulse = animated && config.pulse;
  const dotStyle: CSSProperties = config.hollow
    ? { borderColor: config.color }
    : { backgroundColor: config.color };

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center text-slate-600 dark:text-slate-300",
        styles.gap,
        styles.text,
        className,
      )}
    >
      <span className={cn("relative inline-flex shrink-0", styles.dot)}>
        {pulse ? (
          <span
            aria-hidden="true"
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden"
            style={{ backgroundColor: config.color }}
          />
        ) : null}
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-flex h-full w-full rounded-full",
            config.hollow && "border-2 bg-transparent",
          )}
          style={dotStyle}
        />
      </span>
      {showLabel ? (
        <span className="font-medium">{text}</span>
      ) : (
        <span className="sr-only">{text}</span>
      )}
      {detail != null ? (
        <span className="text-slate-400 dark:text-slate-500">{detail}</span>
      ) : null}
    </span>
  );
}
