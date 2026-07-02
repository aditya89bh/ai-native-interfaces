import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueueView } from "./QueueView";
import type { QueueItem } from "./QueueView";

const items: QueueItem[] = [
  { id: "1", label: "Resize image", status: "running" },
  { id: "2", label: "Generate thumbnail", status: "pending" },
  { id: "3", label: "Optimize", status: "completed" },
  { id: "4", label: "Upload", status: "failed" },
];

describe("QueueView", () => {
  it("renders an accessible list with each queued item", () => {
    render(<QueueView items={items} />);
    expect(screen.getByRole("list", { name: "Queue" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("Resize image")).toBeInTheDocument();
  });

  it("renders a status badge for each item", () => {
    render(<QueueView items={items} showCounts={false} />);
    expect(screen.getByText("Running")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });

  it("shows a summary count by status when enabled", () => {
    render(
      <QueueView
        items={[
          { id: "1", label: "A", status: "running" },
          { id: "2", label: "B", status: "running" },
          { id: "3", label: "C", status: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("2 running")).toBeInTheDocument();
    expect(screen.getByText("1 pending")).toBeInTheDocument();
  });

  it("hides the summary counts when showCounts is false", () => {
    render(<QueueView items={items} showCounts={false} />);
    expect(screen.queryByText(/^\d+ /)).not.toBeInTheDocument();
  });

  it("renders item detail when provided", () => {
    render(
      <QueueView
        items={[
          { id: "1", label: "Upload", status: "failed", detail: "Timed out" },
        ]}
      />,
    );
    expect(screen.getByText("Timed out")).toBeInTheDocument();
  });

  it("shows the empty message when the queue is empty", () => {
    render(<QueueView items={[]} emptyMessage="Nothing queued." />);
    expect(screen.getByText("Nothing queued.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <QueueView items={items} className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
