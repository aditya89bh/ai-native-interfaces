import type { CSSProperties } from "react";
import { riskColors } from "../../tokens";
import { cn } from "../../utils/cn";

export type RiskBadgeLevel = "low" | "moderate" | "high" | "critical";
export type RiskBadgeVariant = "soft" | "solid" | "outline";
export type RiskBadgeSize = "sm" | "md";

/**
 * Maps the badge's public levels to the risk color tokens. `moderate` maps to
 * the token scale's `medium` step.
 */
const levelColor: Record<RiskBadgeLevel, string> = {
  low: riskColors.low,
  moderate: riskColors.medium,
  high: riskColors.high,
  critical: riskColors.critical,
};

const defaultLabels: Record<RiskBadgeLevel, string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  high: "High risk",
  critical: "Critical risk",
};

const sizeStyles: Record<RiskBadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
};

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface RiskBadgeProps {
  /** The severity of the risk. */
  level: RiskBadgeLevel;
  /** Overrides the default label. */
  label?: string;
  /** Visual treatment of the badge. */
  variant?: RiskBadgeVariant;
  /** Visual size. */
  size?: RiskBadgeSize;
  /** Whether to render the leading severity glyph. */
  showIcon?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * RiskBadge
 *
 * A compact label for the stakes of an action: low, moderate, high, or
 * critical. Severity is conveyed through both color and the text label, so it
 * is never dependent on color alone.
 *
 * @example
 * ```tsx
 * <RiskBadge level="low" />
 * <RiskBadge level="critical" variant="solid" />
 * ```
 */
export function RiskBadge({
  level,
  label,
  variant = "soft",
  size = "md",
  showIcon = true,
  className,
}: RiskBadgeProps) {
  const color = levelColor[level];
  const text = label ?? defaultLabels[level];

  let style: CSSProperties;
  if (variant === "solid") {
    style = { backgroundColor: color, color: "#ffffff", borderColor: color };
  } else if (variant === "outline") {
    style = { color, borderColor: color, backgroundColor: "transparent" };
  } else {
    style = {
      color,
      borderColor: hexToRgba(color, 0.3),
      backgroundColor: hexToRgba(color, 0.12),
    };
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        sizeStyles[size],
        className,
      )}
      style={style}
    >
      {showIcon ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3 w-3 shrink-0"
          fill="currentColor"
        >
          <path d="M8 1.5 1 14h14L8 1.5Zm0 4.25c.41 0 .75.34.75.75v3a.75.75 0 0 1-1.5 0v-3c0-.41.34-.75.75-.75Zm0 6.75a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
        </svg>
      ) : null}
      <span>{text}</span>
    </span>
  );
}
