import type { CSSProperties } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type PresenceStatus = "active" | "idle" | "away" | "unavailable";
export type AgentPresenceSize = "sm" | "md" | "lg";

const presenceConfig: Record<
  PresenceStatus,
  { color: string; label: string; hollow: boolean }
> = {
  active: { color: semanticStatus.success, label: "Active", hollow: false },
  idle: { color: semanticStatus.warning, label: "Idle", hollow: false },
  away: { color: semanticStatus.neutral, label: "Away", hollow: false },
  unavailable: {
    color: semanticStatus.neutral,
    label: "Unavailable",
    hollow: true,
  },
};

const sizeStyles: Record<
  AgentPresenceSize,
  { text: string; dot: string; gap: string }
> = {
  sm: { text: "text-[11px]", dot: "h-2 w-2", gap: "gap-1.5" },
  md: { text: "text-xs", dot: "h-2.5 w-2.5", gap: "gap-2" },
  lg: { text: "text-sm", dot: "h-3 w-3", gap: "gap-2" },
};

export interface AgentPresenceProps {
  /** Availability of the agent. */
  presence: PresenceStatus;
  /** Overrides the default presence label. */
  label?: string;
  /** Whether to render the text label. When false, only the dot shows. */
  showLabel?: boolean;
  /** Visual size. */
  size?: AgentPresenceSize;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AgentPresence
 *
 * An availability indicator for an agent: active, idle, away, or unavailable.
 * Availability is conveyed through both color and text (or a screen-reader
 * label), never color alone.
 *
 * @example
 * ```tsx
 * <AgentPresence presence="active" />
 * <AgentPresence presence="unavailable" showLabel={false} />
 * ```
 */
export function AgentPresence({
  presence,
  label,
  showLabel = true,
  size = "md",
  className,
}: AgentPresenceProps) {
  const config = presenceConfig[presence];
  const styles = sizeStyles[size];
  const text = label ?? config.label;
  const dotStyle: CSSProperties = config.hollow
    ? { borderColor: config.color }
    : { backgroundColor: config.color };

  return (
    <span
      role="img"
      aria-label={text}
      className={cn(
        "inline-flex items-center text-slate-600",
        styles.gap,
        styles.text,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 rounded-full",
          styles.dot,
          config.hollow && "border-2 bg-transparent",
        )}
        style={dotStyle}
      />
      {showLabel ? (
        <span aria-hidden="true" className="font-medium">
          {text}
        </span>
      ) : null}
    </span>
  );
}
