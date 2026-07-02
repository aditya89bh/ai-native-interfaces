# Human handoff patterns

Handoff is the transfer of control between the agent and a human — in either direction. Clean handoffs are what make shared control feel like collaboration rather than a struggle over the wheel. This is a direct application of [human control](principles.md#3-human-control).

## Directions of handoff

- **Agent to human.** The agent stops and asks a person to take over — because it needs approval, is blocked, hit a low-confidence decision, or reached the limit of its authority.
- **Human to agent.** A person delegates a task or resumes automation after intervening.

Both directions must be explicit. Control should never transfer silently.

## When an agent should hand off

- It reaches an action that requires [approval](approvals.md).
- It becomes `blocked` and cannot self-resolve.
- Confidence drops below the threshold for a consequential decision.
- The task exceeds its granted scope or capabilities.
- A policy or safety rule requires a human in the loop.

## Anatomy of a good handoff

1. **Clear trigger.** State _why_ control is being handed over.
2. **Context transfer.** Summarize what has happened, what is pending, and what decision is needed — enough for the receiver to act without reconstructing everything.
3. **Explicit ownership.** Make it unambiguous who is in control _now_.
4. **A path back.** Define how control returns once the human is done.

## Design guidance

- **Preserve state across the boundary.** The human should inherit the agent's progress, not start from scratch.
- **Make current ownership visible at all times.** Ambiguity about who is driving is dangerous.
- **Right-size the context.** Lead with a summary and use [progressive disclosure](principles.md#4-progressive-disclosure) for the full detail.
- **Support graceful return.** When the human hands back, confirm the updated goal and state before the agent resumes.
- **Account for time.** If a handoff may sit unattended, show how long it has waited and what happens if no one responds (it should wait or fail safe — never auto-proceed on a consequential action).

## Anti-patterns

- Silent handoffs where control changes with no signal.
- Dumping raw logs on the human instead of a usable summary.
- Losing progress at the boundary, forcing a restart.
- Auto-resuming automation after intervention without confirming the new intent.

## Related

- [Approval interaction guidelines](approvals.md)
- [Interruption and cancellation](interruption-and-cancellation.md)
- [Agent state taxonomy](agent-states.md)
