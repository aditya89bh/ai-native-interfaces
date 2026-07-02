# Memory Interfaces system

The Memory Interfaces system is a set of presentational components for exposing an AI system's memory in a transparent, trustworthy way. They render the memory data an application supplies and emit events — they never store, retrieve, expire, or manage memory themselves. There is no backend and no memory engine here, only presentation.

They operationalize the [visibility](principles.md#1-visibility), [transparency](principles.md#2-transparency), and [trust](principles.md#6-trust) principles, and extend the [memory visualization principles](memory-visualization.md).

## Scope

The system answers the questions people ask about what an AI remembers:

- **What does it remember?** — `MemoryCard`.
- **When did it learn things?** — `MemoryTimeline`.
- **Where did a memory come from?** — `MemoryCitation`.
- **How did memory shape a decision?** — `MemoryInfluence`.
- **What is expiring or already forgotten?** — `ForgettingIndicator`.

## Components

| Component             | Represents                       | Primary inputs                                                   |
| --------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `MemoryCard`          | A single remembered item         | Title, summary, source, timestamp, confidence, pinned state.     |
| `MemoryTimeline`      | Memories in chronological order  | An ordered list of memory entries.                               |
| `MemoryCitation`      | Where a memory came from         | Source, optional link, excerpt, retrieval time, relevance score. |
| `MemoryInfluence`     | How memories affected a decision | A list of influences with weight and direction.                  |
| `ForgettingIndicator` | The lifecycle state of a memory  | `active` / `expiring-soon` / `forgotten` / `archived`.           |

## Design conventions

- **Presentational only.** No component connects to an API, storage, or retrieval system. They accept data and emit events (`onTogglePin`, `onSelect`).
- **Fully typed APIs.** Shared item shapes (`MemoryTimelineItem`, `MemoryInfluenceItem`) are exported so applications can type their data against them.
- **Honesty by construction.** Components display the source, confidence, and freshness they are given. They never infer or fabricate provenance — attribution is the application's responsibility.
- **Forgetting is first-class.** Memory is not only what is retained; the system makes expiry and forgetting visible rather than silently dropping data.
- **Never color alone.** Confidence, influence direction, and lifecycle state pair color with text or icons, and expose accessible names ([accessibility](accessibility.md)).
- **Design tokens.** Colors come from `confidenceColors`, `semanticStatus`, and `palette` in `src/tokens`.
- **Semantic HTML.** Timelines use ordered lists, citations use `<cite>` and `<blockquote>`, and lifecycle states use `role="status"`.

## Composition

The components are independent but designed to nest. A `MemoryCard` can host a `ForgettingIndicator` and a `MemoryCitation`; a `MemoryTimeline` arranges memories over time; a `MemoryInfluence` explains a decision by referencing the same memories. See [Memory composition patterns](memory-composition-patterns.md) and the showcase example (`examples/MemoryShowcase.tsx`).

## Related

- [Memory visualization principles](memory-visualization.md)
- [Confidence scale](confidence.md)
- [Design principles](principles.md)
