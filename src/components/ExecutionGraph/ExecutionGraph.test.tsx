import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExecutionGraph } from "./ExecutionGraph";
import { computeGraphLayout } from "./layout";
import type { ExecutionGraphEdge, ExecutionGraphNode } from "./layout";

const nodes: ExecutionGraphNode[] = [
  { id: "a", label: "Fetch", status: "completed" },
  { id: "b", label: "Parse", status: "running" },
  { id: "c", label: "Store", status: "pending" },
];

const edges: ExecutionGraphEdge[] = [
  { from: "a", to: "b" },
  { from: "b", to: "c" },
];

describe("computeGraphLayout", () => {
  it("assigns columns by longest dependency depth", () => {
    const { positions } = computeGraphLayout(nodes, edges);
    expect(positions.get("a")?.col).toBe(0);
    expect(positions.get("b")?.col).toBe(1);
    expect(positions.get("c")?.col).toBe(2);
  });

  it("uses the longest path when a node has multiple ancestors", () => {
    const layout = computeGraphLayout(
      [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
        { id: "d", label: "D" },
      ],
      [
        { from: "a", to: "b" },
        { from: "a", to: "d" },
        { from: "b", to: "d" },
      ],
    );
    // d depends on a (depth 1) and b (depth 1 -> d depth 2); longest wins.
    expect(layout.positions.get("d")?.col).toBe(2);
  });

  it("ignores edges with unknown endpoints", () => {
    const { positions } = computeGraphLayout(
      [{ id: "a", label: "A" }],
      [{ from: "a", to: "ghost" }],
    );
    expect(positions.get("a")?.col).toBe(0);
    expect(positions.has("ghost")).toBe(false);
  });

  it("does not loop forever on a cycle", () => {
    const { positions } = computeGraphLayout(
      [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ],
      [
        { from: "a", to: "b" },
        { from: "b", to: "a" },
      ],
    );
    expect(positions.size).toBe(2);
  });
});

describe("ExecutionGraph", () => {
  it("renders a labelled group and each node", () => {
    render(<ExecutionGraph nodes={nodes} edges={edges} />);
    expect(
      screen.getByRole("group", { name: "Execution graph" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Fetch").length).toBeGreaterThan(0);
  });

  it("provides an accessible dependency description", () => {
    render(<ExecutionGraph nodes={nodes} edges={edges} />);
    expect(
      screen.getByText(/Parse \(Running\)\. Depends on: Fetch\./),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Fetch \(Completed\)\. No dependencies\./),
    ).toBeInTheDocument();
  });

  it("shows the empty message when there are no nodes", () => {
    render(
      <ExecutionGraph nodes={[]} edges={[]} emptyMessage="Nothing to run." />,
    );
    expect(screen.getByText("Nothing to run.")).toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <ExecutionGraph nodes={nodes} edges={edges} className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
