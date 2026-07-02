import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface SectionProps {
  title: string;
  defaultOpen: boolean;
  children: ReactNode;
}

function Section({ title, defaultOpen, children }: SectionProps) {
  return (
    <details
      open={defaultOpen}
      className="group border-t border-slate-100 pt-2 first:border-t-0 first:pt-0"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-sm font-medium text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="text-slate-400 transition-transform group-open:rotate-90 motion-reduce:transition-none"
        >
          ›
        </span>
      </summary>
      <div className="pb-1 pt-1 text-sm text-slate-600">{children}</div>
    </details>
  );
}

export interface ExplanationCardProps {
  /** The concise, always-visible explanation. */
  summary: ReactNode;
  /** Supporting evidence for the decision. */
  evidence?: ReactNode;
  /** Assumptions the decision relies on. */
  assumptions?: ReactNode;
  /** Known limitations or caveats. */
  limitations?: ReactNode;
  /** Card title. */
  title?: string;
  /** Whether the expandable sections start open. */
  defaultOpen?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ExplanationCard
 *
 * Presents the reasoning behind an AI decision: a concise summary that is
 * always visible, plus optional expandable sections for supporting evidence,
 * assumptions, and limitations. Sections use native `<details>` elements, so
 * they are keyboard operable and accessible by default.
 *
 * @example
 * ```tsx
 * <ExplanationCard
 *   summary="Chose the express carrier to meet the deadline."
 *   evidence={<ul><li>Deadline is in 2 days.</li></ul>}
 *   assumptions="The address is a business address."
 *   limitations="Live traffic was not considered."
 * />
 * ```
 */
export function ExplanationCard({
  summary,
  evidence,
  assumptions,
  limitations,
  title = "Why this decision",
  defaultOpen = false,
  className,
}: ExplanationCardProps) {
  return (
    <article
      aria-label={title}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation",
        className,
      )}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-slate-800">{summary}</p>

      {evidence != null || assumptions != null || limitations != null ? (
        <div className="mt-3 space-y-2">
          {evidence != null ? (
            <Section title="Supporting evidence" defaultOpen={defaultOpen}>
              {evidence}
            </Section>
          ) : null}
          {assumptions != null ? (
            <Section title="Assumptions" defaultOpen={defaultOpen}>
              {assumptions}
            </Section>
          ) : null}
          {limitations != null ? (
            <Section title="Limitations" defaultOpen={defaultOpen}>
              {limitations}
            </Section>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
