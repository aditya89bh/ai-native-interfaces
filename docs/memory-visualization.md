# Memory visualization principles

Many AI products remember things — preferences, facts, past interactions, retrieved context. When memory is invisible, it feels like the system is either forgetful or quietly surveilling the user. Making memory legible and editable is a key part of [transparency](principles.md#2-transparency) and [human control](principles.md#3-human-control).

## What "memory" covers

- **Explicit memory** the user asked the system to remember.
- **Inferred memory** the system derived from behavior.
- **Session context** currently in scope for the task at hand.
- **Retrieved context** pulled from external sources to inform an output.

Distinguishing these matters: users judge inferred memory far more critically than memory they explicitly created.

## Principles

- **Visible.** Users can see what the system remembers about them, on demand.
- **Attributable.** Each memory shows where it came from — stated by the user, inferred, or retrieved — and ideally when.
- **Editable.** Users can correct or remove memories. Memory the user cannot change is memory the user cannot trust.
- **Scoped.** Show what is in scope _now_ versus long-term storage, so users understand what is influencing the current output.
- **Consequential.** Where possible, connect a memory to the outputs it affected, so its influence is legible.

## Design guidance

- **Summarize, then expand.** Lead with a readable overview of what is remembered; let users drill into individual items ([progressive disclosure](principles.md#4-progressive-disclosure)).
- **Group by type and recency.** Separate explicit from inferred memory; surface recent or frequently used items first.
- **Make edits safe.** Deleting a memory should be reversible or confirmed, and its effect explained ("future answers won't use this").
- **Represent absence honestly.** An empty state should clearly say the system remembers nothing, rather than looking broken.
- **Respect privacy.** Treat memory as sensitive; be careful about exposing it on shared or public screens.

## Anti-patterns

- Memory that influences outputs but is never shown to the user.
- Inferred claims presented as fact with no way to correct them.
- All-or-nothing controls (wipe everything or nothing) with no granularity.
- Silent accumulation of inferred memory the user never agreed to.

## Related

- [Design principles: Transparency](principles.md#2-transparency)
- [Action logs](component-roadmap.md)
- [Component roadmap: Memory](component-roadmap.md)
