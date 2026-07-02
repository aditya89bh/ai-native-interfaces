import { useId } from "react";
import type { CSSProperties } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type ExecutionNodeStatus =
  "pending" | "running" | "completed" | "failed" | "skipped";

export interface ExecutionGraphNode {
  /** Stable unique identifier. */
  id: string;
  /** Node label. */
  label: string;
  /** Execution status of the node. */
  status?: ExecutionNodeStatus;
}

export interface ExecutionGraphEdge {
  /** Source node id. */
  from: string;
  /** Target node id. */
  to: string;
}

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

const NODE_WIDTH = 150;
const NODE_HEIGHT = 48;
const COL_SPACING = 210;
const ROW_SPACING = 74;

interface Positioned {
  col: number;
  row: number;
  x: number;
  y: number;
}

/**
 * Assigns each node a column (by longest dependency depth) and a row (its order
 * within that column). Unknown edge endpoints are ignored and cycles are
 * guarded against. Exported for testing.
 */
export function computeGraphLayout(
  nodes: ExecutionGraphNode[],
  edges: ExecutionGraphEdge[],
): { positions: Map<string, Positioned>; width: number; height: number } {
  const ids = new Set(nodes.map((node) => node.id));
  const parents = new Map<string, string[]>();
  for (const node of nodes) parents.set(node.id, []);
  for (const edge of edges) {
    if (ids.has(edge.from) && ids.has(edge.to)) {
      parents.get(edge.to)!.push(edge.from);
    }
  }

  const depthMemo = new Map<string, number>();
  const visiting = new Set<string>();
  const depthOf = (id: string): number => {
    if (depthMemo.has(id)) return depthMemo.get(id)!;
    if (visiting.has(id)) return 0; // cycle guard
    visiting.add(id);
    const incoming = parents.get(id) ?? [];
    const depth =
      incoming.length === 0
        ? 0
        : Math.max(...incoming.map((parent) => depthOf(parent) + 1));
    visiting.delete(id);
    depthMemo.set(id, depth);
    return depth;
  };

  const rowCursor = new Map<number, number>();
  const positions = new Map<string, Positioned>();
  let maxCol = 0;
  let maxRow = 0;

  for (const node of nodes) {
    const col = depthOf(node.id);
    const row = rowCursor.get(col) ?? 0;
    rowCursor.set(col, row + 1);
    maxCol = Math.max(maxCol, col);
    maxRow = Math.max(maxRow, row);
    positions.set(node.id, {
      col,
      row,
      x: col * COL_SPACING,
      y: row * ROW_SPACING,
    });
  }

  return {
    positions,
    width: maxCol * COL_SPACING + NODE_WIDTH,
    height: maxRow * ROW_SPACING + NODE_HEIGHT,
  };
}

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
      <p className={cn("text-sm text-slate-500", className)}>{emptyMessage}</p>
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
              <path d="M0 0 L10 5 L0 10 z" fill="#cbd5e1" />
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
                stroke="#cbd5e1"
                strokeWidth="1.5"
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
              className="absolute flex flex-col justify-center rounded-md border-l-4 border border-slate-200 bg-white px-3 shadow-elevation"
              style={nodeStyle}
            >
              <span className="truncate text-sm font-medium text-slate-800">
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
