# Human Collaboration & Escalation system

The Human Collaboration & Escalation system is a set of presentational components for the moments an AI system needs a person: asking for help, escalating blocked work, assigning ownership, capturing feedback, requesting corrections, showing handoff status, and documenting intervention history. They render the collaboration data an application supplies and emit events — they never route, notify, assign, or persist anything. There is no backend, agent framework, or state library here, only presentation.

They operationalize the [human control](principles.md#3-human-control) and [recoverability](principles.md#5-recoverability) principles, and extend the [human handoff patterns](human-handoff.md) and [interruption and cancellation](interruption-and-cancellation.md) guidance.

## Scope

The system answers the questions that arise when a human and an agent share work:

- **The agent needs a person — why, and who?** — `HumanHandoffCard`.
- **How do I step in right now?** — `InterventionPanel`.
- **How do I tell it what was wrong?** — `FeedbackCapture`.
- **How loud is this situation?** — `EscalationBanner`.
- **Who owns this, and where is it?** — `AssignmentStatus`.

## Components

| Component           | Represents                            | Primary inputs                                                  |
| ------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `HumanHandoffCard`  | A request to hand work to a person    | Reason, priority, assigned human, status, timestamp.            |
| `InterventionPanel` | Controls to step into a running agent | Pause, resume, override, cancel — with loading/disabled states. |
| `FeedbackCapture`   | A way to correct or rate output       | Rating, category, correction text, submit state.                |
| `EscalationBanner`  | The severity of a situation           | `info` / `warning` / `urgent` / `blocked`.                      |
| `AssignmentStatus`  | Ownership and review state            | `unassigned` / `assigned` / `in-review` / `resolved`.           |

## Design conventions

- **Presentational only.** No component connects to an API, agent framework, SDK, or state library. They accept data and emit events (`onPause`, `onResume`, `onOverride`, `onCancel`, `onSubmit`).
- **Fully typed APIs.** Priority, severity, handoff, and assignment states use clearly named union types, exported for applications to reuse.
- **Human control is first-class.** Intervention controls (pause, cancel, override) are always reachable and clearly labeled; destructive actions are visually distinct.
- **Severity is honest.** Escalation severity is shown with color plus text and an icon — never color alone — so urgency is never ambiguous ([accessibility](accessibility.md)).
- **Keyboard and semantics.** Controls use native `button`, `textarea`, `select`, and `fieldset` elements so keyboard support and semantics come for free.
- **Design tokens.** Colors come from `semanticStatus` and `palette` in `src/tokens`.

## Composition

The components are independent but designed to nest. An `EscalationBanner` can head a `HumanHandoffCard`; an `InterventionPanel` and a `FeedbackCapture` can sit together in a review surface; an `AssignmentStatus` tracks the work as it moves between people. See [Human Collaboration composition patterns](human-collaboration-composition-patterns.md) and the showcase example (`examples/CollaborationShowcase.tsx`).

## Related

- [Human handoff patterns](human-handoff.md)
- [Interruption and cancellation](interruption-and-cancellation.md)
- [Design principles](principles.md)
- [Accessibility guidelines](accessibility.md)
