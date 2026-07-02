import { useState } from "react";
import type { ReactNode } from "react";
import type { AgentState } from "../../tokens";
import { agentStateColors, palette } from "../../tokens";
import { cn } from "../../utils/cn";

export type AgentAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AgentAvatarShape = "circle" | "rounded";

const stateLabels: Record<AgentState, string> = {
  idle: "idle",
  thinking: "thinking",
  planning: "planning",
  acting: "acting",
  waiting: "waiting",
  needsApproval: "needs approval",
  blocked: "blocked",
  failed: "failed",
  completed: "completed",
};

const sizeStyles: Record<
  AgentAvatarSize,
  { root: string; text: string; dot: string }
> = {
  xs: { root: "h-6 w-6", text: "text-[10px]", dot: "h-1.5 w-1.5" },
  sm: { root: "h-8 w-8", text: "text-xs", dot: "h-2 w-2" },
  md: { root: "h-10 w-10", text: "text-sm", dot: "h-2.5 w-2.5" },
  lg: { root: "h-12 w-12", text: "text-base", dot: "h-3 w-3" },
  xl: { root: "h-16 w-16", text: "text-lg", dot: "h-3.5 w-3.5" },
};

const backgroundOptions = [
  palette.brand[500],
  palette.brand[600],
  palette.neutral[500],
  palette.neutral[600],
  palette.neutral[700],
];

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function backgroundForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return backgroundOptions[hash % backgroundOptions.length]!;
}

export interface AgentAvatarProps {
  /** Name of the agent. Used for initials and the accessible label. */
  name: string;
  /** Optional image URL. Falls back to initials or icon if it fails to load. */
  src?: string;
  /** Visual size of the avatar. */
  size?: AgentAvatarSize;
  /** Shape of the avatar. */
  shape?: AgentAvatarShape;
  /** Optional agent state, shown as a status dot in the corner. */
  state?: AgentState;
  /** Custom fallback content rendered instead of initials. */
  icon?: ReactNode;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * AgentAvatar
 *
 * A visual identity for an agent: an image when available, initials otherwise,
 * with an optional status dot reflecting the agent's current state.
 *
 * @example
 * ```tsx
 * <AgentAvatar name="Research agent" state="acting" />
 * <AgentAvatar name="Ops agent" src="/ops.png" size="lg" />
 * ```
 */
export function AgentAvatar({
  name,
  src,
  size = "md",
  shape = "circle",
  state,
  icon,
  className,
}: AgentAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const styles = sizeStyles[size];
  const radius = shape === "circle" ? "rounded-full" : "rounded-lg";
  const showImage = Boolean(src) && !imageFailed;

  return (
    <span
      className={cn("relative inline-flex shrink-0", styles.root, className)}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className={cn("h-full w-full object-cover", radius)}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          role="img"
          aria-label={name}
          className={cn(
            "flex h-full w-full items-center justify-center font-semibold text-white",
            styles.text,
            radius,
          )}
          style={{ backgroundColor: backgroundForName(name) }}
        >
          {icon ?? <span aria-hidden="true">{initialsFromName(name)}</span>}
        </span>
      )}
      {state ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
              styles.dot,
            )}
            style={{ backgroundColor: agentStateColors[state] }}
          />
          <span className="sr-only">{`Status: ${stateLabels[state]}`}</span>
        </>
      ) : null}
    </span>
  );
}
