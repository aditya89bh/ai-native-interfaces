import {
  ActionLog,
  ExecutionGraph,
  ExecutionTimeline,
  QueueView,
  TaskProgress,
} from "../src/components";
import type { ActionLogEntry } from "../src/components";
import type { ExecutionStep } from "../src/components";
import type { QueueItem } from "../src/components";
import type { ExecutionGraphEdge, ExecutionGraphNode } from "../src/components";

const steps: ExecutionStep[] = [
  {
    id: "1",
    title: "Fetch source data",
    status: "completed",
    timestamp: "0:01",
  },
  {
    id: "2",
    title: "Transform records",
    status: "completed",
    timestamp: "0:04",
  },
  { id: "3", title: "Validate schema", status: "running", timestamp: "0:06" },
  { id: "4", title: "Upload to warehouse", status: "pending" },
];

const queue: QueueItem[] = [
  { id: "q1", label: "Validate schema", status: "running" },
  { id: "q2", label: "Upload to warehouse", status: "pending" },
  { id: "q3", label: "Notify subscribers", status: "pending" },
];

const nodes: ExecutionGraphNode[] = [
  { id: "fetch", label: "Fetch", status: "completed" },
  { id: "transform", label: "Transform", status: "completed" },
  { id: "validate", label: "Validate", status: "running" },
  { id: "upload", label: "Upload", status: "pending" },
];

const edges: ExecutionGraphEdge[] = [
  { from: "fetch", to: "transform" },
  { from: "transform", to: "validate" },
  { from: "validate", to: "upload" },
];

const log: ActionLogEntry[] = [
  {
    id: "l1",
    action: "Fetched 1,204 records",
    actor: "Agent",
    timestamp: "10:02:11",
    outcome: "success",
  },
  {
    id: "l2",
    action: "Transformed and deduplicated",
    actor: "Tool: etl",
    timestamp: "10:02:40",
    outcome: "success",
    detail: "18 duplicates removed",
  },
  {
    id: "l3",
    action: "Validating schema",
    actor: "Agent",
    timestamp: "10:03:05",
    outcome: "pending",
  },
];

/**
 * WorkflowShowcase
 *
 * An integrated example that composes every Workflow & Execution component:
 * an overall `TaskProgress` header, an `ExecutionTimeline` and `QueueView` of
 * the work, an `ExecutionGraph` of dependencies, and an `ActionLog` of what
 * actually happened.
 *
 * The data here is static — the components remain presentational and never run
 * or schedule anything.
 */
export function WorkflowShowcase() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">
          Data pipeline run
        </h2>
        <TaskProgress label="Overall progress" value={62} />
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <section aria-labelledby="steps-heading" className="space-y-2">
          <h3
            id="steps-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Steps
          </h3>
          <ExecutionTimeline steps={steps} />
        </section>

        <section aria-labelledby="queue-heading" className="space-y-2">
          <h3
            id="queue-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Queue
          </h3>
          <QueueView items={queue} />
        </section>
      </div>

      <section aria-labelledby="graph-heading" className="space-y-2">
        <h3
          id="graph-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Dependencies
        </h3>
        <ExecutionGraph nodes={nodes} edges={edges} />
      </section>

      <section aria-labelledby="log-heading" className="space-y-2">
        <h3
          id="log-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Action log
        </h3>
        <ActionLog entries={log} />
      </section>
    </div>
  );
}
