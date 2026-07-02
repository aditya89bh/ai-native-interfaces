import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type AgentCapabilityBadgesSize = "sm" | "md";

export interface AgentCapability {
  /** Stable identifier. Falls back to `label` for the React key if omitted. */
  id?: string;
  /** Human-readable capability name, for example "Web search". */
  label: string;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional longer description, surfaced as a native tooltip. */
  description?: string;
  /** Whether the capability is currently available. Defaults to true. */
  enabled?: boolean;
}

const sizeStyles: Record<
  AgentCapabilityBadgesSize,
  { badge: string; gap: string; icon: string }
> = {
  sm: {
    badge: "px-2 py-0.5 text-[11px]",
    gap: "gap-1",
    icon: "h-3 w-3",
  },
  md: {
    badge: "px-2.5 py-1 text-xs",
    gap: "gap-1.5",
    icon: "h-3.5 w-3.5",
  },
};

export interface AgentCapabilityBadgesProps {
  /** The capabilities to display. */
  capabilities: AgentCapability[];
  /** Visual size of the badges. */
  size?: AgentCapabilityBadgesSize;
  /** Maximum badges to show before collapsing the rest into a "+N" badge. */
  max?: number;
  /** Accessible label for the badge group. */
  label?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AgentCapabilityBadges
 *
 * A compact, accessible list of an agent's capabilities or tools. Disabled
 * capabilities are visually muted and marked for assistive technology, and a
 * long list can collapse into a "+N" overflow badge.
 *
 * @example
 * ```tsx
 * <AgentCapabilityBadges
 *   capabilities={[
 *     { label: "Web search" },
 *     { label: "Code execution" },
 *     { label: "File access", enabled: false },
 *   ]}
 *   max={4}
 * />
 * ```
 */
export function AgentCapabilityBadges({
  capabilities,
  size = "md",
  max,
  label = "Agent capabilities",
  className,
}: AgentCapabilityBadgesProps) {
  const styles = sizeStyles[size];
  const visible =
    typeof max === "number" ? capabilities.slice(0, max) : capabilities;
  const hiddenCount = capabilities.length - visible.length;

  if (capabilities.length === 0) return null;

  return (
    <ul
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {visible.map((capability) => {
        const enabled = capability.enabled ?? true;
        return (
          <li key={capability.id ?? capability.label}>
            <span
              title={capability.description}
              className={cn(
                "inline-flex items-center rounded-full border font-medium",
                styles.badge,
                styles.gap,
                enabled
                  ? "border-slate-200 bg-slate-50 text-slate-700"
                  : "border-dashed border-slate-200 bg-transparent text-slate-400",
              )}
            >
              {capability.icon ? (
                <span
                  aria-hidden="true"
                  className={cn("shrink-0", styles.icon)}
                >
                  {capability.icon}
                </span>
              ) : null}
              <span>{capability.label}</span>
              {!enabled ? (
                <span className="sr-only"> (unavailable)</span>
              ) : null}
            </span>
          </li>
        );
      })}
      {hiddenCount > 0 ? (
        <li>
          <span
            className={cn(
              "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 font-medium text-slate-500",
              styles.badge,
            )}
            aria-label={`${hiddenCount} more capabilities`}
          >
            {`+${hiddenCount}`}
          </span>
        </li>
      ) : null}
    </ul>
  );
}
