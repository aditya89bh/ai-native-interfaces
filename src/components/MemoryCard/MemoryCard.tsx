import type { ReactNode } from "react";
import type { ConfidenceLevel } from "../../tokens";
import { cn } from "../../utils/cn";
import { ConfidenceIndicator } from "../ConfidenceIndicator";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
    >
      <path d="M9.5 1.5a1 1 0 0 0-1 1v3.2L5.7 8.2c-.5.4-.8 1-.8 1.6h6.2c0-.6-.3-1.2-.8-1.6L7.5 5.7V2.5a1 1 0 0 0-1-1h3ZM7 10.5h2v4l-1 1-1-1v-4Z" />
    </svg>
  );
}

export interface MemoryCardProps {
  /** Short title describing the memory. */
  title: string;
  /** A longer summary of what is remembered. */
  summary?: ReactNode;
  /** Where the memory came from (a document, conversation, etc.). */
  source?: ReactNode;
  /** When the memory was created or last updated. */
  timestamp?: ReactNode;
  /** How confident the system is in this memory. */
  confidence?: ConfidenceLevel;
  /** Optional numeric confidence (0–100). */
  confidenceValue?: number;
  /** Whether the memory is pinned (kept regardless of expiry). */
  pinned?: boolean;
  /** When provided, the pin becomes an interactive toggle. */
  onTogglePin?: () => void;
  /** When provided, the title becomes a button that selects the memory. */
  onSelect?: () => void;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * MemoryCard
 *
 * Presents a single remembered item: its title, summary, source, timestamp,
 * confidence, and pinned state. It is presentational — it renders the memory
 * you supply and emits `onTogglePin` / `onSelect` events, without storing or
 * retrieving anything.
 *
 * @example
 * ```tsx
 * <MemoryCard
 *   title="Prefers dark mode"
 *   summary="The user switched to the dark theme and asked to keep it."
 *   source="Settings change"
 *   timestamp="3 days ago"
 *   confidence="high"
 *   pinned
 * />
 * ```
 */
export function MemoryCard({
  title,
  summary,
  source,
  timestamp,
  confidence,
  confidenceValue,
  pinned = false,
  onTogglePin,
  onSelect,
  className,
}: MemoryCardProps) {
  return (
    <article
      aria-label={title}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation dark:border-slate-700 dark:bg-slate-900",
        pinned &&
          "border-slate-300 ring-1 ring-slate-200 dark:border-slate-600 dark:ring-slate-700",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        {onSelect ? (
          <button
            type="button"
            onClick={onSelect}
            className="rounded text-left text-sm font-semibold text-slate-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:text-slate-100"
          >
            {title}
          </button>
        ) : (
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
        )}

        {onTogglePin ? (
          <button
            type="button"
            onClick={onTogglePin}
            aria-pressed={pinned}
            aria-label={pinned ? "Unpin memory" : "Pin memory"}
            className={cn(
              "shrink-0 rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500",
              pinned
                ? "text-slate-700 dark:text-slate-200"
                : "text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400",
            )}
          >
            <PinIcon className="h-4 w-4" />
          </button>
        ) : pinned ? (
          <span className="shrink-0 p-1 text-slate-700 dark:text-slate-200">
            <PinIcon className="h-4 w-4" />
            <span className="sr-only">Pinned</span>
          </span>
        ) : null}
      </div>

      {summary != null ? (
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
          {summary}
        </p>
      ) : null}

      {source != null || timestamp != null || confidence != null ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
          {source != null ? (
            <span>
              <span className="text-slate-400 dark:text-slate-500">
                Source:{" "}
              </span>
              {source}
            </span>
          ) : null}
          {timestamp != null ? <span>{timestamp}</span> : null}
          {confidence != null ? (
            <ConfidenceIndicator
              level={confidence}
              value={confidenceValue}
              size="sm"
            />
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
