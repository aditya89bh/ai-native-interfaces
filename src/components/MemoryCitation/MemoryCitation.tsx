import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MemoryCitationProps {
  /** The name of the source the memory was drawn from. */
  source: string;
  /** Optional link to the source. */
  href?: string;
  /** A short excerpt or quote from the source. */
  excerpt?: ReactNode;
  /** When the memory was retrieved. */
  retrievedAt?: ReactNode;
  /**
   * Relevance/similarity score for the retrieval, as a fraction between 0 and
   * 1. Rendered as a percentage.
   */
  score?: number;
  /** Optional citation number, rendered as a leading `[n]` marker. */
  index?: number;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * MemoryCitation
 *
 * Attributes a memory to its source and shows retrieval metadata (when it was
 * retrieved and how relevant it was). Presentational only — it renders the
 * attribution you supply and never performs retrieval.
 *
 * @example
 * ```tsx
 * <MemoryCitation
 *   index={1}
 *   source="onboarding-notes.md"
 *   href="https://example.com/notes"
 *   excerpt="The user prefers concise summaries."
 *   retrievedAt="just now"
 *   score={0.82}
 * />
 * ```
 */
export function MemoryCitation({
  source,
  href,
  excerpt,
  retrievedAt,
  score,
  index,
  className,
}: MemoryCitationProps) {
  const hasScore = typeof score === "number";
  const percent = hasScore
    ? Math.round(Math.min(Math.max(score, 0), 1) * 100)
    : null;

  return (
    <figure
      aria-label={`Citation: ${source}`}
      className={cn(
        "rounded-md border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        {typeof index === "number" ? (
          <span className="font-mono text-slate-400 dark:text-slate-500">
            [{index}]
          </span>
        ) : null}
        <cite className="font-medium not-italic text-slate-700 dark:text-slate-200">
          {href ? (
            <a
              href={href}
              className="rounded underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              {source}
            </a>
          ) : (
            source
          )}
        </cite>
        {retrievedAt != null ? (
          <span className="text-slate-400 dark:text-slate-500">
            <span aria-hidden="true">· </span>
            Retrieved {retrievedAt}
          </span>
        ) : null}
        {percent != null ? (
          <span className="ml-auto inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200">
            {percent}% relevant
          </span>
        ) : null}
      </div>

      {excerpt != null ? (
        <blockquote className="mt-2 border-l-2 border-slate-300 pl-2 text-slate-600 dark:border-slate-600 dark:text-slate-300">
          {excerpt}
        </blockquote>
      ) : null}
    </figure>
  );
}
