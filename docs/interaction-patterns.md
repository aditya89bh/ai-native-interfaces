# Reusable interaction patterns

Patterns compose the individual principles and primitives into complete, repeatable interactions. Where [principles](principles.md) describe _what_ to uphold and guidelines describe _how_ per concern, patterns describe proven _shapes_ that combine several concerns into one flow.

These patterns are design-level (not yet code). They will inform the `patterns/` layer described in the [architecture](architecture.md).

## Preview → Approve → Execute

The default shape for any consequential action.

- **Shape.** The agent proposes an action and shows a concrete preview of its effect → the human approves, edits, or rejects → the action executes → the result and any side effects are logged.
- **Uses.** [Approvals](approvals.md), [confidence](confidence.md), [recoverability](principles.md#5-recoverability), action logging.
- **Why.** Turns an irreversible action into a reviewable, recoverable one.

## Propose plan → Review → Run

For multi-step tasks worth reviewing before execution.

- **Shape.** The agent enters `planning`, produces an explicit plan → the human reviews and optionally edits steps → the agent executes with visible [task progress](task-progress.md).
- **Uses.** [Agent states](agent-states.md) (planning/acting), progress visualization, interruption.
- **Why.** Catches bad plans before they cause work, and sets accurate expectations.

## Act with running oversight

For lower-risk autonomous work that should still be observable.

- **Shape.** The agent acts continuously while surfacing state and progress → the human monitors and can [interrupt or cancel](interruption-and-cancellation.md) at any time → notable events are logged.
- **Uses.** Visibility, notifications, interruption.
- **Why.** Enables autonomy without surrendering control.

## Escalate on uncertainty

For handling low-confidence or out-of-scope situations.

- **Shape.** When [confidence](confidence.md) drops or scope is exceeded, the agent moves to `needsApproval` or `blocked` and [hands off](human-handoff.md) with context → the human decides → control returns.
- **Uses.** Confidence, uncertainty, handoff.
- **Why.** Fails safe toward human judgment instead of guessing.

## Recover from failure

For when something goes wrong mid-task.

- **Shape.** A step fails → the agent moves to `failed`, reports which step failed and what completed → the human is offered retry, edit, or abort, with side effects disclosed.
- **Uses.** Recoverability, task progress, action logs.
- **Why.** Makes failure a recoverable event rather than a dead end.

## Inspect and correct memory

For keeping remembered context trustworthy.

- **Shape.** The user opens a [memory](memory-visualization.md) view → inspects what is remembered and its source → edits or removes items → the change and its effect are confirmed.
- **Uses.** Memory visualization, transparency, recoverability.
- **Why.** Keeps the system's context accurate and under user control.

## Composing patterns

Real flows combine these. A high-stakes autonomous task might use _Propose plan → Review → Run_, fall back to _Escalate on uncertainty_ mid-run, and end in _Recover from failure_ if a step fails. The patterns are building blocks, not mutually exclusive choices.

## Related

- [Design principles](principles.md)
- [Architecture](architecture.md)
- [Component roadmap](component-roadmap.md)
