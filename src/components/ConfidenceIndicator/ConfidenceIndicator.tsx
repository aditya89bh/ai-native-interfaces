import type { CSSProperties } from "react";
import type { ConfidenceLevel } from "../../tokens";
import { confidenceColors } from "../../tokens";
import { cn } from "../../utils/cn";

export type ConfidenceIndicatorVariant = "compact" | "detailed";
export type ConfidenceIndicatorSize = "sm" | "md";

const defaultLabels: Record<ConfidenceLevel, string> = {
  low: "Low confidence",
  medium: "Medium confidence",
  high: "High confidence",
};

/** Number of filled segments per level, out of three. */
const filledSegments: Record<ConfidenceLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

const sizeStyles: Record<
  ConfidenceIndicatorSize,
  { text: string; segment: string; dot: string; gap: string }
> = {
  sm: {
    text: "text-[11px]",
    segment: "h-1 w-4",
    dot: "h-2 w-2",
    gap: "gap-1.5",
  },
  md: {
    text: "text-xs",
    segment: "h-1.5 w-5",
    dot: "h-2.5 w-2.5",
    gap: "gap-2",
  },
};

export interface ConfidenceIndicatorProps {
  /** The qualitative confidence level. */
  level: ConfidenceLevel;
  /** Optional numeric confidence (0–100). Shown in the detailed variant. */
  value?: number;
  /** Overrides the default label. */
  label?: string;
  /** Whether to render the text label. */
  showLabel?: boolean;
  /** `detailed` renders a three-segment meter; `compact` renders a dot. */
  variant?: ConfidenceIndicatorVariant;
  /** Visual size. */
  size?: ConfidenceIndicatorSize;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ConfidenceIndicator
 *
 * Communicates how certain a model is about an output, using a coarse
 * low/medium/high scale (optionally with a numeric value). Confidence is
 * conveyed through both color and text — never color alone.
 *
 * @example
 * ```tsx
 * <ConfidenceIndicator level="high" />
 * <ConfidenceIndicator level="medium" value={62} variant="detailed" />
 * <ConfidenceIndicator level="low" variant="compact" />
 * ```
 */
export function ConfidenceIndicator({
  level,
  value,
  label,
  showLabel = true,
  variant = "detailed",
  size = "md",
  className,
}: ConfidenceIndicatorProps) {
  const styles = sizeStyles[size];
  const color = confidenceColors[level];
  const text = label ?? defaultLabels[level];
  const hasValue = typeof value === "number";
  const accessibleLabel = hasValue ? `${text} (${Math.round(value)}%)` : text;

  const ariaProps = hasValue
    ? {
        role: "meter" as const,
        "aria-valuenow": Math.round(value),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": accessibleLabel,
      }
    : { role: "img" as const, "aria-label": accessibleLabel };

  return (
    <span
      {...ariaProps}
      className={cn(
        "inline-flex items-center text-slate-600 dark:text-slate-300",
        styles.gap,
        styles.text,
        className,
      )}
    >
      {variant === "compact" ? (
        <span
          aria-hidden="true"
          className={cn("inline-flex shrink-0 rounded-full", styles.dot)}
          style={{ backgroundColor: color }}
        />
      ) : (
        <span aria-hidden="true" className="inline-flex items-center gap-0.5">
          {[0, 1, 2].map((index) => {
            const filled = index < filledSegments[level];
            const segmentStyle: CSSProperties = filled
              ? { backgroundColor: color }
              : {};
            return (
              <span
                key={index}
                className={cn(
                  "rounded-full",
                  styles.segment,
                  !filled && "bg-slate-200 dark:bg-slate-700",
                )}
                style={segmentStyle}
              />
            );
          })}
        </span>
      )}
      {showLabel ? (
        <span className="font-medium">{text}</span>
      ) : (
        <span className="sr-only">{accessibleLabel}</span>
      )}
      {variant === "detailed" && hasValue ? (
        <span className="tabular-nums text-slate-400 dark:text-slate-500">{`${Math.round(value)}%`}</span>
      ) : null}
    </span>
  );
}
