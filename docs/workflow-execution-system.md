# Workflow & Execution system

The Workflow & Execution system is a set of presentational components for visualizing how an AI task runs: what is in progress, what is done, what is queued, how steps depend on each other, and what actions were taken. They render the execution data an application supplies and emit events — they never run, schedule, or orchestrate anything. There is no backend and no agent framework here, only presentation.

They operationalize the [visibility](principles.md#1-visibility) and [transparency](principles.md#2-transparency) principles, and extend the [task progress visualization](task-progress.md) guidance.

## Scope

The system answers the questions people ask while a task executes:

- **How far along is it?** — `TaskProgress`.
- **What happened, step by step?** — `ExecutionTimeline`.
- **What is waiting to run?** — `QueueView`.
- **How do the steps depend on each other?** — `ExecutionGraph`.
- **What exactly did it do?** — `ActionLog`.

## Components

| Component           | Represents                        | Primary inputs                                                   |
| ------------------- | --------------------------------- | ---------------------------------------------------------------- |
| `TaskProgress`      | Progress of a single task         | Percentage or indeterminate; completed / failed / paused states. |
| `ExecutionTimeline` | Sequential execution steps        | An ordered list of steps with per-step status.                   |
| `QueueView`         | Work waiting and in flight        | Items with `pending` / `running` / `completed` / `failed`.       |
| `ExecutionGraph`    | Steps and their dependencies      | Nodes and directed edges (a DAG).                                |
| `ActionLog`         | A chronological record of actions | Entries with actor, timestamp, and outcome.                      |

## Design conventions

- **Presentational only.** No component connects to an API, agent framework, SDK, or state library. They accept data and emit events (`onSelect`).
- **Fully typed APIs.** Item and node shapes (`ExecutionStep`, `QueueItem`, `ExecutionGraphNode`, `ExecutionGraphEdge`, `ActionLogEntry`) are exported so applications can type their data against them.
- **Shared status vocabulary.** Execution status uses a consistent set (`pending`, `running`, `completed`, `failed`, plus `paused`/`skipped` where relevant), colored from `semanticStatus`.
- **Never color alone.** Status is conveyed with color plus an icon or text, and exposes accessible names ([accessibility](accessibility.md)).
- **Order is preserved.** Timelines, queues, and logs render entries in the order supplied; components do not sort or paginate.
- **Semantic HTML.** Progress uses `role="progressbar"`, sequences use ordered lists, and the graph provides a text description alongside its visual layout.
- **Design tokens.** Colors come from `semanticStatus` and `palette` in `src/tokens`.

## Composition

The components are independent but designed to nest. A header `TaskProgress` can summarize an `ExecutionTimeline`; a `QueueView` can feed an `ExecutionGraph`; an `ActionLog` records what each step actually did. See [Workflow composition patterns](workflow-composition-patterns.md) and the showcase example (`examples/WorkflowShowcase.tsx`).

## Related

- [Task progress visualization](task-progress.md)
- [Design principles](principles.md)
- [Accessibility guidelines](accessibility.md)
