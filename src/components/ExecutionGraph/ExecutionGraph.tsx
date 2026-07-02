import { useId } from "react";
import type { CSSProperties } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";
import { NODE_HEIGHT, NODE_WIDTH, computeGraphLayout } from "./layout";
import type {
  ExecutionGraphEdge,
  ExecutionGraphNode,
  ExecutionNodeStatus,
} from "./layout";

const statusConfig: Record<
  ExecutionNodeStatus,
  { color: string; label: string }
> = {
  pending: { color: semanticStatus.neutral, label: "Pending" },
  running: { color: semanticStatus.info, label: "Running" },
  completed: { color: semanticStatus.success, label: "Completed" },
  failed: { color: semanticStatus.error, label: "Failed" },
  skipped: { color: semanticStatus.neutral, label: "Skipped" },
};

export interface ExecutionGraphProps {
  /** The execution nodes. */
  nodes: ExecutionGraphNode[];
  /** Directed dependency edges (`from` runs before `to`). */
  edges: ExecutionGraphEdge[];
  /** Accessible label for the graph. */
  label?: string;
  /** Message shown when there are no nodes. */
  emptyMessage?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ExecutionGraph
 *
 * Visualizes execution nodes and their dependencies as a left-to-right directed
 * graph, laying nodes out by dependency depth. Alongside the visual layout it
 * renders a hidden text description of each node and its dependencies, so the
 * structure is available to assistive technology. Presentational only.
 *
 * @example
 * ```tsx
 * <ExecutionGraph
 *   nodes={[
 *     { id: "a", label: "Fetch", status: "completed" },
 *     { id: "b", label: "Parse", status: "running" },
 *     { id: "c", label: "Store", status: "pending" },
 *   ]}
 *   edges={[
 *     { from: "a", to: "b" },
 *     { from: "b", to: "c" },
 *   ]}
 * />
 * ```
 */
export function ExecutionGraph({
  nodes,
  edges,
  label = "Execution graph",
  emptyMessage = "No nodes to show.",
  className,
}: ExecutionGraphProps) {
  const markerId = useId();

  if (nodes.length === 0) {
    return (
      <p
        className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      >
        {emptyMessage}
      </p>
    );
  }

  const { positions, width, height } = computeGraphLayout(nodes, edges);
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const parentsById = new Map<string, string[]>();
  for (const node of nodes) parentsById.set(node.id, []);
  for (const edge of edges) {
    if (nodeById.has(edge.from) && nodeById.has(edge.to)) {
      parentsById.get(edge.to)!.push(edge.from);
    }
  }

  const visibleEdges = edges.filter(
    (edge) => positions.has(edge.from) && positions.has(edge.to),
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("overflow-x-auto", className)}
    >
      {/* Accessible text description of the graph structure. */}
      <ul className="sr-only">
        {nodes.map((node) => {
          const status = node.status ?? "pending";
          const deps = parentsById.get(node.id) ?? [];
          const depLabels = deps
            .map((id) => nodeById.get(id)?.label)
            .filter(Boolean)
            .join(", ");
          return (
            <li key={node.id}>
              {node.label} ({statusConfig[status].label}).
              {depLabels ? ` Depends on: ${depLabels}.` : " No dependencies."}
            </li>
          );
        })}
      </ul>

      <div
        aria-hidden="true"
        className="relative"
        style={{ width, height, minWidth: width }}
      >
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          width={width}
          height={height}
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M0 0 L10 5 L0 10 z"
                className="fill-slate-300 dark:fill-slate-600"
              />
            </marker>
          </defs>
          {visibleEdges.map((edge, index) => {
            const from = positions.get(edge.from)!;
            const to = positions.get(edge.to)!;
            const x1 = from.x + NODE_WIDTH;
            const y1 = from.y + NODE_HEIGHT / 2;
            const x2 = to.x;
            const y2 = to.y + NODE_HEIGHT / 2;
            const midX = (x1 + x2) / 2;
            return (
              <path
                key={`${edge.from}-${edge.to}-${index}`}
                d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                fill="none"
                strokeWidth="1.5"
                className="stroke-slate-300 dark:stroke-slate-600"
                markerEnd={`url(#${markerId})`}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const pos = positions.get(node.id)!;
          const status = node.status ?? "pending";
          const config = statusConfig[status];
          const nodeStyle: CSSProperties = {
            left: pos.x,
            top: pos.y,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            borderColor: config.color,
          };
          return (
            <div
              key={node.id}
              className="absolute flex flex-col justify-center rounded-md border-l-4 border border-slate-200 bg-white px-3 shadow-elevation dark:border-slate-700 dark:bg-slate-900"
              style={nodeStyle}
            >
              <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                {node.label}
              </span>
              <span
                className="text-[11px] font-medium"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
