# Interruption and cancellation patterns

If a user cannot stop an agent, they are not in control of it. Reliable interruption and cancellation are non-negotiable expressions of the [human control](principles.md#3-human-control) and [recoverability](principles.md#5-recoverability) principles.

## Definitions

- **Pause** — temporarily halt the agent with the intent to resume. State is preserved.
- **Interrupt** — stop the current activity to redirect or give new input, then continue.
- **Cancel** — abandon the current task. The agent stops and does not resume it.
- **Stop / emergency stop** — halt everything immediately, accepting a possibly inconsistent state.

## Baseline requirements

- **Always reachable.** A stop control must be available whenever the agent is active (`thinking`, `planning`, `acting`, `waiting`). It should not move or disappear.
- **Immediate acknowledgment.** The moment the user asks to stop, acknowledge it visibly, even if teardown takes a moment. Never leave the user wondering whether the click registered.
- **Fast.** Stopping should feel instant. Long-running teardown should show its own progress.

## Designing the controls

- **Distinguish pause from cancel.** They have very different consequences; do not hide both behind one ambiguous button.
- **Name the outcome.** "Stop and discard" reads more honestly than a bare "Stop" when work will be lost.
- **Show what will happen to in-flight work.** Will partial results be kept? Will side effects be rolled back? Say so before the user commits.
- **Confirm only when it matters.** Cancelling reversible work needs no confirmation; discarding significant unsaved work does.

## After stopping

- **Report the resulting state.** Move the agent to a clear state (`idle`, `blocked`, `failed`) and explain what completed, what was rolled back, and what was left partial.
- **Offer next steps.** Resume, retry, edit, or start over — whichever apply.
- **Handle side effects honestly.** If actions already took effect and cannot be undone, disclose them plainly and point to the [action log](component-roadmap.md).

## Interruption for redirection

Interruption is not only for stopping — it is also how users steer. Support giving new instructions mid-task without a full cancel where feasible, and make clear whether the new input augments or replaces the current goal.

## Anti-patterns

- A stop button that only takes effect after the current step finishes, with no indication of the delay.
- Cancellation that silently leaves side effects in place.
- Losing all context and results on cancel when a resumable pause was possible.
- Hiding the stop control during the very operations users most want to stop.

## Related

- [Agent state taxonomy](agent-states.md)
- [Human handoff patterns](human-handoff.md)
- [Action logs](component-roadmap.md)
