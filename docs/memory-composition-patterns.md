# Memory composition patterns & transparency

The [Memory Interfaces components](memory-interfaces-system.md) are independent primitives. Composed well, they let a person see what an AI remembers, why, where it came from, how it is being used, and what is being forgotten. This document covers the composition patterns that recur and the transparency guidelines that should govern them.

All components are presentational. In every pattern, the application owns the data and the side effects; the components render and emit events.

## Transparency guidelines

A trustworthy memory interface follows a few rules regardless of layout:

1. **Show provenance, always.** Every remembered item should be traceable to a source. Pair a `MemoryCard` with a `MemoryCitation` rather than presenting memories as facts from nowhere.
2. **Make forgetting visible.** Do not silently drop memories. Use `ForgettingIndicator` to show `expiring-soon`, `forgotten`, and `archived` states so people are not surprised by what the system no longer knows.
3. **Attribute influence honestly.** When memory shapes a decision, show it with `MemoryInfluence` — including memories that _opposed_ the outcome, not only those that supported it.
4. **Expose confidence.** Memories are inferences, not certainties. Carry a confidence level on `MemoryCard` so low-confidence memories are not mistaken for facts.
5. **Prefer recall over recognition.** A `MemoryTimeline` lets people scan what was learned and when, instead of having to guess what the system might know.
6. **Never rely on color alone.** Confidence, influence direction, and lifecycle state all pair color with text or icons ([accessibility](accessibility.md)).

## Pattern: the memory detail

Compose a single memory with its provenance and lifecycle:

```tsx
<MemoryCard
  title="Prefers concise summaries"
  source="Conversation"
  confidence="high"
  pinned
/>
<ForgettingIndicator status="expiring-soon" detail="Expires in 5 days" />
<MemoryCitation source="conversation-2026-06-29" excerpt="Keep answers short." score={0.86} />
```

Use this in a memory inspector or a "what I know about you" panel.

## Pattern: the memory history

`MemoryTimeline` arranges memories chronologically. Drive each entry's `content` slot with a `MemoryCard` when you want rich rows, or use the built-in title/summary/source fields for compact ones. Keep the order meaningful and stated (most recent first is the common default).

## Pattern: decision provenance

Explain a decision by tying it back to memory:

```tsx
<MemoryInfluence
  decision="Reply with a 2-sentence summary"
  influences={[
    {
      id: "1",
      label: "Prefers concise summaries",
      weight: 0.82,
      direction: "supporting",
    },
    {
      id: "2",
      label: "Asked for detail last time",
      weight: 0.35,
      direction: "opposing",
    },
  ]}
/>
```

Pair this with the Trust & Decision [`DecisionSummary`](trust-and-decision-system.md) so the _what_ (the decision) and the _why_ (the memories behind it) sit together.

## Pattern: lifecycle-driven emphasis

Let a memory's lifecycle state drive its prominence:

- `active` — normal styling.
- `expiring-soon` — surface a `ForgettingIndicator` with a concrete `detail` ("Expires in 3 days") and offer a way to pin (`MemoryCard.onTogglePin`).
- `forgotten` — show it muted, in a separate "recently forgotten" area, so people can see what was dropped.
- `archived` — keep it retrievable but out of the main view.

## Editing and control

These components are presentational, but they emit the events an editor needs:

- `MemoryCard.onTogglePin` — pin or unpin.
- `MemoryCard.onSelect` — open a detail or edit view.

Wire these to your own storage. Keep a single source of truth for pinned/lifecycle state so the card, the indicator, and the timeline never disagree.

## Related

- [Memory Interfaces system](memory-interfaces-system.md)
- [Memory visualization principles](memory-visualization.md)
- [Trust & Decision system](trust-and-decision-system.md)
- [Design principles](principles.md)
