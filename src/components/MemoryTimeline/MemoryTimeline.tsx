import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MemoryTimelineItem {
  /** Stable unique identifier for the entry. */
  id: string;
  /** Short title of the memory. */
  title: string;
  /** Optional longer summary. */
  summary?: ReactNode;
  /** When the memory was created or recorded. */
  timestamp?: ReactNode;
  /** Where the memory came from. */
  source?: ReactNode;
  /** Custom content rendered in place of the default summary. */
  content?: ReactNode;
}

export interface MemoryTimelineProps {
  /** Memory entries, ordered from most to least recent (or as supplied). */
  items: MemoryTimelineItem[];
  /** Accessible label for the timeline list. */
  label?: string;
  /** Message shown when there are no entries. */
  emptyMessage?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * MemoryTimeline
 *
 * Displays memories in chronological order along a vertical rail. It is
 * presentational: it renders the ordered entries you supply and does not sort,
 * fetch, or paginate. Order is preserved as given.
 *
 * @example
 * ```tsx
 * <MemoryTimeline
 *   items={[
 *     { id: "1", title: "Prefers dark mode", timestamp: "3 days ago" },
 *     { id: "2", title: "Located in Berlin", timestamp: "2 weeks ago" },
 *   ]}
 * />
 * ```
 */
export function MemoryTimeline({
  items,
  label = "Memory timeline",
  emptyMessage = "No memories to show.",
  className,
}: MemoryTimelineProps) {
  if (items.length === 0) {
    return (
      <p className={cn("text-sm text-slate-500", className)}>{emptyMessage}</p>
    );
  }

  return (
    <ol aria-label={label} className={cn("relative space-y-4", className)}>
      {items.map((item, index) => (
        <li key={item.id} className="relative pl-6">
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-1.5 h-2 w-2 rounded-full bg-slate-400 ring-4 ring-white"
          />
          {index < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute bottom-[-1rem] left-[6px] top-4 w-px bg-slate-200"
            />
          ) : null}
          <div className="flex flex-col gap-0.5">
            {item.timestamp != null ? (
              <span className="text-xs text-slate-400">{item.timestamp}</span>
            ) : null}
            <span className="text-sm font-medium text-slate-900">
              {item.title}
            </span>
            {item.content ?? (
              <>
                {item.summary != null ? (
                  <span className="text-sm text-slate-600">{item.summary}</span>
                ) : null}
                {item.source != null ? (
                  <span className="text-xs text-slate-400">
                    <span>Source: </span>
                    {item.source}
                  </span>
                ) : null}
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
