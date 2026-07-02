import { useState } from "react";
import {
  ForgettingIndicator,
  MemoryCard,
  MemoryCitation,
  MemoryInfluence,
  MemoryTimeline,
} from "../src/components";
import type { MemoryTimelineItem } from "../src/components";
import type { MemoryInfluenceItem } from "../src/components";

const timeline: MemoryTimelineItem[] = [
  {
    id: "t1",
    title: "Prefers concise summaries",
    summary: "Asked for shorter answers twice this week.",
    source: "Conversation",
    timestamp: "3 days ago",
  },
  {
    id: "t2",
    title: "Works in Berlin (CET)",
    summary: "Mentioned the timezone when scheduling.",
    source: "Conversation",
    timestamp: "2 weeks ago",
  },
  {
    id: "t3",
    title: "Primary project: Atlas",
    summary: "Most questions reference the Atlas repository.",
    source: "Usage pattern",
    timestamp: "1 month ago",
  },
];

const influences: MemoryInfluenceItem[] = [
  {
    id: "i1",
    label: "Prefers concise summaries",
    weight: 0.82,
    direction: "supporting",
  },
  {
    id: "i2",
    label: "Primary project: Atlas",
    weight: 0.45,
    direction: "supporting",
  },
  {
    id: "i3",
    label: "Asked for detail last time",
    weight: 0.35,
    direction: "opposing",
  },
];

/**
 * MemoryShowcase
 *
 * An integrated example that composes every Memory Interfaces component:
 * a pinnable `MemoryCard` with its `ForgettingIndicator` and `MemoryCitation`,
 * a `MemoryTimeline` of what has been learned over time, and a
 * `MemoryInfluence` view of how those memories shaped a decision.
 *
 * The local state stands in for an application's data — the components remain
 * presentational and never store or retrieve memory.
 */
export function MemoryShowcase() {
  const [pinned, setPinned] = useState(true);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <section aria-labelledby="memory-heading" className="space-y-3">
        <h2
          id="memory-heading"
          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          What the assistant remembers
        </h2>

        <MemoryCard
          title="Prefers concise summaries"
          summary="The user has repeatedly asked for shorter, high-signal answers."
          source="Conversation"
          timestamp="3 days ago"
          confidence="high"
          confidenceValue={86}
          pinned={pinned}
          onTogglePin={() => setPinned((value) => !value)}
        />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <ForgettingIndicator status="active" />
          <ForgettingIndicator
            status="expiring-soon"
            detail="Expires in 5 days"
          />
        </div>

        <MemoryCitation
          index={1}
          source="conversation-2026-06-29"
          excerpt="Can you keep answers short from now on?"
          retrievedAt="just now"
          score={0.86}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="history-heading" className="space-y-3">
          <h3
            id="history-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Timeline
          </h3>
          <MemoryTimeline items={timeline} />
        </section>

        <MemoryInfluence
          decision="Reply with a 2-sentence summary"
          influences={influences}
        />
      </div>
    </div>
  );
}
