import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExecutionTimeline } from "./ExecutionTimeline";
import type { ExecutionStep } from "./ExecutionTimeline";

const steps: ExecutionStep[] = [
  { id: "1", title: "Fetch data", status: "completed", timestamp: "0:01" },
  { id: "2", title: "Transform", status: "running", timestamp: "0:04" },
  { id: "3", title: "Upload", status: "pending" },
];

describe("ExecutionTimeline", () => {
  it("renders an accessible ordered list of steps", () => {
    render(<ExecutionTimeline steps={steps} />);
    expect(
      screen.getByRole("list", { name: "Execution steps" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("preserves the supplied order", () => {
    render(<ExecutionTimeline steps={steps} />);
    const rendered = screen
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(rendered[0]).toContain("Fetch data");
    expect(rendered[2]).toContain("Upload");
  });

  it("exposes each step's status to assistive tech", () => {
    render(<ExecutionTimeline steps={steps} />);
    expect(screen.getByText("Status: Completed")).toBeInTheDocument();
    expect(screen.getByText("Status: Running")).toBeInTheDocument();
    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
  });

  it("defaults an unspecified status to pending", () => {
    render(<ExecutionTimeline steps={[{ id: "1", title: "Step" }]} />);
    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
  });

  it("renders descriptions and timestamps when provided", () => {
    render(
      <ExecutionTimeline
        steps={[
          {
            id: "1",
            title: "Transform",
            description: "Normalizing fields.",
            timestamp: "0:04",
          },
        ]}
      />,
    );
    expect(screen.getByText("Normalizing fields.")).toBeInTheDocument();
    expect(screen.getByText("0:04")).toBeInTheDocument();
  });

  it("shows the empty message when there are no steps", () => {
    render(<ExecutionTimeline steps={[]} emptyMessage="Nothing running." />);
    expect(screen.getByText("Nothing running.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("supports a custom label and className", () => {
    const { container } = render(
      <ExecutionTimeline steps={steps} label="Run" className="custom-class" />,
    );
    expect(screen.getByRole("list", { name: "Run" })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
