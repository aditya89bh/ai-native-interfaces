import type { ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type MemoryInfluenceDirection = "supporting" | "opposing" | "neutral";

export interface MemoryInfluenceItem {
  /** Stable unique identifier. */
  id: string;
  /** The memory's label. */
  label: string;
  /** Influence magnitude as a fraction between 0 and 1. */
  weight: number;
  /** Whether the memory pushed toward, against, or was neutral to the decision. */
  direction?: MemoryInfluenceDirection;
}

const directionConfig: Record<
  MemoryInfluenceDirection,
  { color: string; glyph: string; word: string }
> = {
  supporting: { color: semanticStatus.success, glyph: "▲", word: "supporting" },
  opposing: { color: semanticStatus.error, glyph: "▼", word: "opposing" },
  neutral: { color: semanticStatus.neutral, glyph: "◆", word: "neutral" },
};

export interface MemoryInfluenceProps {
  /** The memories that influenced the decision, with weight and direction. */
  influences: MemoryInfluenceItem[];
  /** The decision these memories influenced, shown as a heading. */
  decision?: ReactNode;
  /** Accessible label for the influence list. */
  label?: string;
  /** Message shown when there are no influences. */
  emptyMessage?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * MemoryInfluence
 *
 * Visualizes how retrieved memories affected a decision: each memory is shown
 * with its influence weight and whether it supported, opposed, or was neutral
 * to the outcome. Direction is conveyed with color, a glyph, and text — never
 * color alone. Presentational only.
 *
 * @example
 * ```tsx
 * <MemoryInfluence
 *   decision="Recommend the express carrier"
 *   influences={[
 *     { id: "1", label: "Deadline is in 2 days", weight: 0.8, direction: "supporting" },
 *     { id: "2", label: "Budget is tight", weight: 0.5, direction: "opposing" },
 *   ]}
 * />
 * ```
 */
export function MemoryInfluence({
  influences,
  decision,
  label = "Memory influence",
  emptyMessage = "No memories influenced this decision.",
  className,
}: MemoryInfluenceProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation",
        className,
      )}
    >
      {decision != null ? (
        <p className="mb-3 text-sm text-slate-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Influenced by memory
          </span>
          <br />
          <span className="font-medium text-slate-900">{decision}</span>
        </p>
      ) : null}

      {influences.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ul className="space-y-2.5">
          {influences.map((item) => {
            const direction = item.direction ?? "supporting";
            const config = directionConfig[direction];
            const percent = Math.round(
              Math.min(Math.max(item.weight, 0), 1) * 100,
            );
            return (
              <li key={item.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-1.5 text-slate-700">
                    <span aria-hidden="true" style={{ color: config.color }}>
                      {config.glyph}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="shrink-0 tabular-nums text-xs text-slate-500">
                    {percent}%
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                  role="img"
                  aria-label={`${item.label}: ${config.word}, ${percent}% influence`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: config.color,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
