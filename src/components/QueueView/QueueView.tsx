import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type QueueItemStatus = "pending" | "running" | "completed" | "failed";

export interface QueueItem {
  /** Stable unique identifier. */
  id: string;
  /** Short label for the queued item. */
  label: string;
  /** Current status of the item. */
  status: QueueItemStatus;
  /** Optional secondary detail (e.g. an ETA or error). */
  detail?: ReactNode;
}

const statusOrder: QueueItemStatus[] = [
  "running",
  "pending",
  "completed",
  "failed",
];

const statusConfig: Record<QueueItemStatus, { color: string; label: string }> =
  {
    pending: { color: semanticStatus.neutral, label: "Pending" },
    running: { color: semanticStatus.info, label: "Running" },
    completed: { color: semanticStatus.success, label: "Completed" },
    failed: { color: semanticStatus.error, label: "Failed" },
  };

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface QueueViewProps {
  /** The queued items, in the order to display. */
  items: QueueItem[];
  /** Accessible label for the queue list. */
  label?: string;
  /** Whether to show a summary count row grouped by status. */
  showCounts?: boolean;
  /** Message shown when the queue is empty. */
  emptyMessage?: string;
  /** Whether the running items pulse (respects reduced motion). */
  animated?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * QueueView
 *
 * Displays a queue of work with per-item status: pending, running, completed,
 * or failed, plus an optional summary count. Presentational: it renders the
 * items you supply and never schedules or runs anything. Status is conveyed
 * with color plus text.
 *
 * @example
 * ```tsx
 * <QueueView
 *   items={[
 *     { id: "1", label: "Resize image", status: "running" },
 *     { id: "2", label: "Generate thumbnail", status: "pending" },
 *     { id: "3", label: "Optimize", status: "completed" },
 *   ]}
 * />
 * ```
 */
export function QueueView({
  items,
  label = "Queue",
  showCounts = true,
  emptyMessage = "The queue is empty.",
  animated = true,
  className,
}: QueueViewProps) {
  const counts = statusOrder
    .map((status) => ({
      status,
      count: items.filter((item) => item.status === status).length,
    }))
    .filter((entry) => entry.count > 0);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {showCounts && items.length > 0 ? (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          {counts.map(({ status, count }) => (
            <span key={status} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: statusConfig[status].color }}
              />
              {count} {statusConfig[status].label.toLowerCase()}
            </span>
          ))}
        </div>
      ) : null}

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {emptyMessage}
        </p>
      ) : (
        <ul
          aria-label={label}
          className="divide-y divide-slate-100 rounded-card border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900"
        >
          {items.map((item) => {
            const config = statusConfig[item.status];
            const badgeStyle: CSSProperties = {
              color: config.color,
              backgroundColor: hexToRgba(config.color, 0.12),
            };
            return (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 px-3 py-2"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      item.status === "running" &&
                        animated &&
                        "animate-pulse motion-reduce:animate-none",
                    )}
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-slate-800 dark:text-slate-100">
                      {item.label}
                    </span>
                    {item.detail != null ? (
                      <span className="block truncate text-xs text-slate-400 dark:text-slate-500">
                        {item.detail}
                      </span>
                    ) : null}
                  </span>
                </span>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={badgeStyle}
                >
                  {config.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
