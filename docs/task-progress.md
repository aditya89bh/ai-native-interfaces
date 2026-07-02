# Task progress visualization principles

Agents often work on multi-step tasks that take real time. Progress visualization is how the [visibility principle](principles.md#1-visibility) applies to work that unfolds over seconds or minutes. Its job is to answer, at a glance: what is happening, how far along is it, and is it healthy?

## What good progress communicates

- **Where we are.** The current step, and how it relates to the whole.
- **What is done.** Completed steps and their outcomes.
- **What is next.** Upcoming steps, when known.
- **Health.** Whether the task is progressing, waiting, blocked, or failed.

## Determinate vs. indeterminate

- **Determinate progress** (known steps or measurable completion) should show real proportion — a step count or percentage that reflects reality.
- **Indeterminate progress** (unknown duration) should still show _activity_ and, ideally, the current step's description. Never fake a progress bar for work whose length is unknown.

Never show progress that does not correspond to real work. A bar that jumps to 90% and stalls is worse than an honest activity indicator.

## Representing steps

- **Name steps in human terms.** "Searching sources" beats "Executing tool call 3."
- **Carry per-step state.** Each step maps to the [agent state taxonomy](agent-states.md) (pending, acting, completed, failed, blocked).
- **Show outcomes, not just completion.** A finished step should convey what it produced or decided when that matters.
- **Surface the active step prominently** while keeping the overall structure visible.

## Long-running and background tasks

- **Set expectations.** Indicate whether something will take seconds or longer.
- **Allow backgrounding.** Let users move on and be notified on completion (see [notification hierarchy](notifications.md)).
- **Keep control reachable.** Progress views must expose [pause and cancel](interruption-and-cancellation.md).
- **Handle failure mid-task.** Show which step failed, what completed before it, and the recovery options.

## Design guidance

- Lead with a compact summary; expand for the full step list ([progressive disclosure](principles.md#4-progressive-disclosure)).
- Keep motion subtle and honor `prefers-reduced-motion` (see [accessibility](accessibility.md)).
- Preserve completed-step history so users can review what happened after the fact.

## Anti-patterns

- Fake or non-linear progress bars.
- A single spinner standing in for a complex multi-step task.
- Progress that vanishes on completion, leaving no record of what was done.
- No way to pause, cancel, or inspect a long-running task.

## Related

- [Agent state taxonomy](agent-states.md)
- [Notification hierarchy](notifications.md)
- [Interruption and cancellation](interruption-and-cancellation.md)
