import type { CSSProperties, ReactNode } from "react";
import type { AgentState } from "../../tokens";
import { agentStateColors } from "../../tokens";
import { cn } from "../../utils/cn";

/**
 * Human-readable labels for each agent state. Consumers can override the
 * displayed text via the `label` prop.
 */
const defaultStateLabels: Record<AgentState, string> = {
  idle: "Idle",
  thinking: "Thinking",
  planning: "Planning",
  acting: "Acting",
  waiting: "Waiting",
  needsApproval: "Needs approval",
  blocked: "Blocked",
  failed: "Failed",
  completed: "Completed",
};

/**
 * States that represent ongoing work. These animate their status indicator
 * (a subtle pulse) to signal live activity, unless reduced motion is set.
 */
const activeStates: ReadonlySet<AgentState> = new Set<AgentState>([
  "thinking",
  "planning",
  "acting",
  "waiting",
]);

export type AgentStatusCardSize = "sm" | "md" | "lg";
export type AgentStatusCardVariant = "subtle" | "outline" | "solid";

const sizeStyles: Record<
  AgentStatusCardSize,
  { root: string; gap: string; dot: string; name: string; label: string }
> = {
  sm: {
    root: "p-3",
    gap: "gap-2.5",
    dot: "h-2 w-2",
    name: "text-xs",
    label: "text-[11px]",
  },
  md: {
    root: "p-4",
    gap: "gap-3",
    dot: "h-2.5 w-2.5",
    name: "text-sm",
    label: "text-xs",
  },
  lg: {
    root: "p-5",
    gap: "gap-3.5",
    dot: "h-3 w-3",
    name: "text-base",
    label: "text-sm",
  },
};

const variantStyles: Record<AgentStatusCardVariant, string> = {
  subtle: "border border-slate-200 bg-white shadow-elevation",
  outline: "border border-slate-300 bg-transparent",
  solid: "border border-slate-200 bg-slate-50",
};

interface StatusDotProps {
  color: string;
  size: string;
  animated: boolean;
}

function StatusDot({ color, size, animated }: StatusDotProps) {
  return (
    <span className={cn("relative mt-1 inline-flex shrink-0", size)}>
      {animated ? (
        <span
          aria-hidden="true"
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden"
          style={{ backgroundColor: color }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className={cn("relative inline-flex rounded-full", size)}
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

export interface AgentStatusCardProps {
  /** The current state of the agent, from the agent state taxonomy. */
  state: AgentState;
  /** Name of the agent, shown as the card title. */
  name?: string;
  /** Overrides the default, human-readable label for the state. */
  label?: string;
  /** Supporting detail about what the agent is doing. */
  description?: string;
  /** Visual size of the card. */
  size?: AgentStatusCardSize;
  /** Visual container treatment. */
  variant?: AgentStatusCardVariant;
  /** Whether active states animate their indicator. Respects reduced motion. */
  animated?: boolean;
  /** Custom leading element rendered in place of the default status dot. */
  icon?: ReactNode;
  /** A short timestamp, e.g. "2m ago", shown at the end of the title row. */
  timestamp?: ReactNode;
  /** Trailing content such as action buttons. */
  actions?: ReactNode;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AgentStatusCard
 *
 * A compact, self-contained summary of an agent's current state. It pairs a
 * color-coded status indicator with a human-readable label and optional
 * detail, timestamp, and actions.
 *
 * @example
 * ```tsx
 * <AgentStatusCard
 *   name="Research agent"
 *   state="acting"
 *   description="Searching sources and gathering results."
 *   timestamp="just now"
 * />
 * ```
 */
export function AgentStatusCard({
  state,
  name = "Agent",
  label,
  description,
  size = "md",
  variant = "subtle",
  animated = true,
  icon,
  timestamp,
  actions,
  className,
}: AgentStatusCardProps) {
  const stateLabel = label ?? defaultStateLabels[state];
  const color = agentStateColors[state];
  const styles = sizeStyles[size];
  const isAnimated = animated && activeStates.has(state);
  const labelStyle: CSSProperties = { color };

  return (
    <div
      className={cn(
        "flex items-start rounded-card text-slate-900",
        styles.root,
        styles.gap,
        variantStyles[variant],
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {icon ?? (
        <StatusDot color={color} size={styles.dot} animated={isAnimated} />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn("truncate font-semibold", styles.name)}>
            {name}
          </span>
          <span
            className={cn("shrink-0 font-medium", styles.label)}
            style={labelStyle}
          >
            {stateLabel}
          </span>
          {timestamp != null ? (
            <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-slate-400">
              {timestamp}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className={cn("mt-1 text-slate-600", styles.name)}>
            {description}
          </p>
        ) : null}
      </div>
      {actions != null ? (
        <div className="ml-1 flex shrink-0 items-center gap-1">{actions}</div>
      ) : null}
    </div>
  );
}
