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
  {
    id: "3",
    title: "Validate schema",
    status: "completed",
    timestamp: "0:06",
  },
  {
    id: "4",
    title: "Enrich with geo data",
    status: "running",
    timestamp: "0:09",
  },
  {
    id: "5",
    title: "Enrich with account tier",
    status: "completed",
    timestamp: "0:08",
  },
  {
    id: "6",
    title: "Aggregate metrics",
    status: "pending",
  },
  {
    id: "7",
    title: "Publish to warehouse",
    status: "pending",
  },
];

const queue: QueueItem[] = [
  { id: "q1", label: "Enrich with geo data", status: "running" },
  { id: "q2", label: "Enrich with account tier", status: "completed" },
  { id: "q3", label: "Reverse-geocode fallback", status: "failed" },
  { id: "q4", label: "Aggregate metrics", status: "pending" },
  { id: "q5", label: "Publish to warehouse", status: "pending" },
  { id: "q6", label: "Notify subscribers", status: "pending" },
];

const nodes: ExecutionGraphNode[] = [
  { id: "fetch", label: "Fetch", status: "completed" },
  { id: "transform", label: "Transform", status: "completed" },
  { id: "validate", label: "Validate", status: "completed" },
  { id: "geo", label: "Enrich: geo", status: "running" },
  { id: "tier", label: "Enrich: tier", status: "completed" },
  { id: "aggregate", label: "Aggregate", status: "pending" },
  { id: "publish", label: "Publish", status: "pending" },
];

const edges: ExecutionGraphEdge[] = [
  { from: "fetch", to: "transform" },
  { from: "transform", to: "validate" },
  { from: "validate", to: "geo" },
  { from: "validate", to: "tier" },
  { from: "geo", to: "aggregate" },
  { from: "tier", to: "aggregate" },
  { from: "aggregate", to: "publish" },
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
    action: "Validated schema against v3 contract",
    actor: "Agent",
    timestamp: "10:03:05",
    outcome: "success",
  },
  {
    id: "l4",
    action: "Reverse-geocode fallback failed",
    actor: "Tool: geo",
    timestamp: "10:03:22",
    outcome: "failure",
    detail: "Provider timed out after 5s; retrying with cache",
  },
  {
    id: "l5",
    action: "Enriched 1,186 records from cache",
    actor: "Tool: geo",
    timestamp: "10:03:29",
    outcome: "info",
    detail: "18 records deferred to next run",
  },
  {
    id: "l6",
    action: "Enriching remaining records with geo data",
    actor: "Agent",
    timestamp: "10:03:31",
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
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Data pipeline run
        </h2>
        <TaskProgress label="Overall progress" value={62} />
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <section aria-labelledby="steps-heading" className="space-y-2">
          <h3
            id="steps-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Steps
          </h3>
          <ExecutionTimeline steps={steps} />
        </section>

        <section aria-labelledby="queue-heading" className="space-y-2">
          <h3
            id="queue-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Queue
          </h3>
          <QueueView items={queue} />
        </section>
      </div>

      <section aria-labelledby="graph-heading" className="space-y-2">
        <h3
          id="graph-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >
          Dependencies
        </h3>
        <ExecutionGraph nodes={nodes} edges={edges} />
      </section>

      <section aria-labelledby="log-heading" className="space-y-2">
        <h3
          id="log-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >
          Action log
        </h3>
        <ActionLog entries={log} />
      </section>
    </div>
  );
}
