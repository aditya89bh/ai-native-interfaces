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

export interface PositionedNode {
  col: number;
  row: number;
  x: number;
  y: number;
}

export const NODE_WIDTH = 150;
export const NODE_HEIGHT = 48;
export const COL_SPACING = 210;
export const ROW_SPACING = 74;

/**
 * Assigns each node a column (by longest dependency depth) and a row (its order
 * within that column). Unknown edge endpoints are ignored and cycles are
 * guarded against.
 */
export function computeGraphLayout(
  nodes: ExecutionGraphNode[],
  edges: ExecutionGraphEdge[],
): { positions: Map<string, PositionedNode>; width: number; height: number } {
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
  const positions = new Map<string, PositionedNode>();
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
