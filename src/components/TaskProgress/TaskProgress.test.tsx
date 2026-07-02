import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskProgress } from "./TaskProgress";

describe("TaskProgress", () => {
  it("exposes a progressbar with the current value", () => {
    render(<TaskProgress label="Indexing" value={62} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "62");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-label", "Indexing: In progress");
  });

  it("clamps and rounds the value", () => {
    render(<TaskProgress value={120} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<TaskProgress status="indeterminate" label="Working" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("aria-label", "Working: Working");
  });

  it("reports 100% when completed", () => {
    render(<TaskProgress status="completed" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("shows the failed state label", () => {
    render(<TaskProgress status="failed" value={40} label="Deploy" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Deploy: Failed",
    );
  });

  it("renders the numeric percentage text for determinate progress", () => {
    render(<TaskProgress label="Indexing" value={62} />);
    expect(screen.getByText("62%")).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <TaskProgress value={10} className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
