# Workflow composition patterns & execution transparency

The [Workflow & Execution components](workflow-execution-system.md) are independent primitives. Composed well, they let a person see a task's overall progress, its steps, its queue, its dependencies, and the actions it took — enough to trust and, when needed, intervene. This document covers the recurring composition patterns and the transparency guidelines that should govern them.

All components are presentational. In every pattern, the application owns the data and the side effects; the components render and emit events.

## Execution transparency guidelines

1. **Show overall and detailed progress together.** A single `TaskProgress` answers "how far along?"; an `ExecutionTimeline` answers "doing what?". Provide both for anything non-trivial.
2. **Never hide failure.** Surface `failed` states prominently in timelines, queues, graphs, and logs. A stalled or failed step should be visible without expanding anything.
3. **Make dependencies legible.** When order matters, an `ExecutionGraph` shows why a step is waiting. Pair it with the accessible dependency description it renders.
4. **Keep an auditable record.** An `ActionLog` should record what was done, by whom (agent, tool, user), when, and with what outcome — so a run can be reconstructed after the fact.
5. **Preserve order and honesty.** Timelines, queues, and logs render entries as supplied. Do not reorder to look tidier; the real sequence is the trustworthy one.
6. **Never rely on color alone.** Progress, step status, queue status, and outcomes all pair color with text or icons ([accessibility](accessibility.md)).
7. **Distinguish indeterminate from stalled.** Use `TaskProgress` `indeterminate` for "working, unknown duration" and a determinate value when real progress is known. Do not fake progress.

## Pattern: the run header

Lead with a summary, then the detail:

```tsx
<TaskProgress label="Overall progress" value={62} />
<ExecutionTimeline steps={steps} />
```

The header gives an at-a-glance status; the timeline explains it.

## Pattern: queue plus timeline

A `QueueView` shows what is waiting and in flight; an `ExecutionTimeline` shows what has already run. Together they cover future and past work. Drive both from the same status vocabulary (`pending`, `running`, `completed`, `failed`) so an item's status is consistent as it moves from queue to timeline.

## Pattern: graph plus log

An `ExecutionGraph` explains the shape of the work (dependencies); an `ActionLog` explains what actually happened within it. Use the graph to answer "why is this blocked?" and the log to answer "what did it do?". Keep node ids stable so a log entry can reference the same step shown in the graph.

## Pattern: progress driven by steps

Derive the header `TaskProgress` value from step completion in your application (for example, completed steps ÷ total steps), and switch it to `failed` or `paused` when the timeline enters those states. Keep a single source of truth so the header and the steps never disagree.

## Pattern: responsive layout

These components adapt to their container:

- Put `ExecutionTimeline` and `QueueView` side by side on wide screens and stacked on narrow ones.
- Wrap `ExecutionGraph` in a horizontally scrollable region (it does this by default) so large graphs remain usable on small screens.

## Related

- [Workflow & Execution system](workflow-execution-system.md)
- [Task progress visualization](task-progress.md)
- [Accessibility guidelines](accessibility.md)
- [Design principles](principles.md)
