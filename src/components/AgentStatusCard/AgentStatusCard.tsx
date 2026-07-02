import type { AgentState } from "../../tokens";
import { agentStateColors } from "../../tokens";

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

export interface AgentStatusCardProps {
  /** The current state of the agent. */
  state: AgentState;
  /** Optional name of the agent, shown as the card title. */
  name?: string;
  /** Overrides the default state label. */
  label?: string;
  /** Optional supporting detail about what the agent is doing. */
  description?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AgentStatusCard
 *
 * A compact summary of an agent's current state. This is an early placeholder
 * component: its API and styling will evolve as the library matures.
 */
export function AgentStatusCard({
  state,
  name = "Agent",
  label,
  description,
  className,
}: AgentStatusCardProps) {
  const stateLabel = label ?? defaultStateLabels[state];
  const dotColor = agentStateColors[state];

  return (
    <div
      className={[
        "flex items-start gap-3 rounded-card border border-slate-200 bg-white p-4 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-sm font-semibold text-slate-900">
            {name}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {stateLabel}
          </span>
        </div>
        {description ? (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
