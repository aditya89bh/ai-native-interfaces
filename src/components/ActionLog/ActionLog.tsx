import type { ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type ActionOutcome = "success" | "failure" | "pending" | "info";

export interface ActionLogEntry {
  /** Stable unique identifier. */
  id: string;
  /** What happened. */
  action: ReactNode;
  /** Who or what performed the action (agent, tool, user). */
  actor?: ReactNode;
  /** When the action occurred. */
  timestamp?: ReactNode;
  /** The outcome of the action. */
  outcome?: ActionOutcome;
  /** Optional additional detail. */
  detail?: ReactNode;
}

const outcomeConfig: Record<ActionOutcome, { color: string; label: string }> = {
  success: { color: semanticStatus.success, label: "Success" },
  failure: { color: semanticStatus.error, label: "Failure" },
  pending: { color: semanticStatus.warning, label: "Pending" },
  info: { color: semanticStatus.info, label: "Info" },
};

export interface ActionLogProps {
  /** The log entries, in the order to display. */
  entries: ActionLogEntry[];
  /** Accessible label for the log. */
  label?: string;
  /** Message shown when there are no entries. */
  emptyMessage?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ActionLog
 *
 * A chronological, auditable record of actions, each with an actor, timestamp,
 * and outcome. Presentational: it renders the entries you supply in order and
 * never performs or fetches anything. Outcome is conveyed with color plus text.
 *
 * @example
 * ```tsx
 * <ActionLog
 *   entries={[
 *     { id: "1", action: "Sent email", actor: "Agent", timestamp: "10:02", outcome: "success" },
 *     { id: "2", action: "Called API", actor: "Tool", timestamp: "10:03", outcome: "failure", detail: "429 rate limited" },
 *   ]}
 * />
 * ```
 */
export function ActionLog({
  entries,
  label = "Action log",
  emptyMessage = "No actions recorded.",
  className,
}: ActionLogProps) {
  if (entries.length === 0) {
    return (
      <p className={cn("text-sm text-slate-500", className)}>{emptyMessage}</p>
    );
  }

  return (
    <ol
      aria-label={label}
      className={cn(
        "divide-y divide-slate-100 rounded-card border border-slate-200 bg-white",
        className,
      )}
    >
      {entries.map((entry) => {
        const outcome = entry.outcome ?? "info";
        const config = outcomeConfig[outcome];
        return (
          <li key={entry.id} className="flex gap-2.5 px-3 py-2">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="text-sm text-slate-800">{entry.action}</span>
                {entry.timestamp != null ? (
                  <span className="shrink-0 text-xs tabular-nums text-slate-400">
                    {entry.timestamp}
                  </span>
                ) : null}
              </div>
              {entry.actor != null || entry.detail != null ? (
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                  {entry.actor != null ? (
                    <span className="font-medium text-slate-600">
                      {entry.actor}
                    </span>
                  ) : null}
                  {entry.detail != null ? <span>{entry.detail}</span> : null}
                </div>
              ) : null}
              <span className="sr-only">Outcome: {config.label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
