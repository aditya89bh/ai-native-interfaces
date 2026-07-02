import type { ReactNode } from "react";
import type { AgentState } from "../../tokens";
import { cn } from "../../utils/cn";
import {
  ActionLog,
  AgentHeartbeat,
  AgentPresence,
  AgentStatusCard,
  EscalationBanner,
  ExecutionGraph,
  InterventionPanel,
  QueueView,
} from "../../components";
import type {
  ActionLogEntry,
  EscalationSeverity,
  ExecutionGraphEdge,
  ExecutionGraphNode,
  HeartbeatStatus,
  InterventionAction,
  PresenceStatus,
  QueueItem,
} from "../../components";

export interface OperationsAgentInfo {
  name: string;
  state: AgentState;
  description?: string;
  timestamp?: ReactNode;
}

export interface OperationsAgentTemplateProps {
  /** The operations/robotics controller. */
  agent: OperationsAgentInfo;
  /** Connection health of the controller. */
  heartbeat?: HeartbeatStatus;
  /** Availability of the controller. */
  presence?: PresenceStatus;
  /** An optional escalation banner. Pass null to hide it. */
  escalation?: { severity: EscalationSeverity; message: ReactNode } | null;
  /** The execution nodes of the pipeline. */
  nodes: ExecutionGraphNode[];
  /** Directed dependency edges between nodes. */
  edges: ExecutionGraphEdge[];
  /** The job queue. */
  queue?: QueueItem[];
  /** The recorded actions across stations. */
  actions: ActionLogEntry[];
  /** Whether the controller is currently paused. */
  paused?: boolean;
  /** Called to pause the controller. */
  onPause?: () => void;
  /** Called to resume the controller. */
  onResume?: () => void;
  /** Called to override the current action. */
  onOverride?: () => void;
  /** Called to cancel the current job. */
  onCancel?: () => void;
  /** Which intervention action is in progress. */
  interventionPending?: InterventionAction | null;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * OperationsAgentTemplate
 *
 * A complete operations/robotics monitoring surface: the controller's status,
 * connection health, and availability; an optional escalation; the execution
 * pipeline as a dependency graph; the job queue; human intervention controls;
 * and the cross-station action log. It composes library components and is fully
 * presentational.
 *
 * @example
 * ```tsx
 * <OperationsAgentTemplate
 *   agent={{ name: "Line 3 controller", state: "blocked" }}
 *   heartbeat="degraded"
 *   nodes={nodes}
 *   edges={edges}
 *   actions={actions}
 *   paused
 *   onResume={() => resume()}
 *   onCancel={() => cancel()}
 * />
 * ```
 */
export function OperationsAgentTemplate({
  agent,
  heartbeat,
  presence,
  escalation,
  nodes,
  edges,
  queue,
  actions,
  paused = false,
  onPause,
  onResume,
  onOverride,
  onCancel,
  interventionPending = null,
  className,
}: OperationsAgentTemplateProps) {
  return (
    <section
      aria-label="Operations agent"
      className={cn("mx-auto max-w-5xl space-y-6 p-4 sm:p-6", className)}
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AgentStatusCard
          name={agent.name}
          state={agent.state}
          description={agent.description}
          timestamp={agent.timestamp}
          className="flex-1"
        />
        {heartbeat || presence ? (
          <div className="flex flex-col gap-2 rounded-card border border-slate-200 bg-white p-3 shadow-elevation dark:border-slate-700 dark:bg-slate-900">
            {heartbeat ? <AgentHeartbeat status={heartbeat} /> : null}
            {presence ? <AgentPresence presence={presence} /> : null}
          </div>
        ) : null}
      </header>

      {escalation ? (
        <EscalationBanner severity={escalation.severity}>
          {escalation.message}
        </EscalationBanner>
      ) : null}

      <section aria-labelledby="ops-pipeline-heading" className="space-y-2">
        <h3
          id="ops-pipeline-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >
          Pipeline
        </h3>
        <ExecutionGraph
          nodes={nodes}
          edges={edges}
          label="Execution pipeline"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {queue && queue.length > 0 ? (
          <section aria-labelledby="ops-queue-heading" className="space-y-2">
            <h3
              id="ops-queue-heading"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Job queue
            </h3>
            <QueueView items={queue} />
          </section>
        ) : null}

        <InterventionPanel
          title="Controls"
          description="Step in to pause, override, or stop the line."
          paused={paused}
          onPause={onPause}
          onResume={onResume}
          onOverride={onOverride}
          onCancel={onCancel}
          pending={interventionPending}
        />
      </div>

      <section aria-labelledby="ops-log-heading" className="space-y-2">
        <h3
          id="ops-log-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >
          Action log
        </h3>
        <ActionLog entries={actions} />
      </section>
    </section>
  );
}
