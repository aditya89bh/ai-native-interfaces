import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AssignmentStatus } from "./AssignmentStatus";
import type { AssignmentState } from "./AssignmentStatus";

describe("AssignmentStatus", () => {
  it("renders the default label for each state", () => {
    const cases: Array<[AssignmentState, string]> = [
      ["unassigned", "Unassigned"],
      ["assigned", "Assigned"],
      ["in-review", "In review"],
      ["resolved", "Resolved"],
    ];

    for (const [status, expected] of cases) {
      const { unmount } = render(<AssignmentStatus status={status} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it("exposes a status role", () => {
    render(<AssignmentStatus status="assigned" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows the assignee when assigned", () => {
    render(<AssignmentStatus status="assigned" assignee="Dana Lee" />);
    expect(screen.getByText(/Dana Lee/)).toBeInTheDocument();
  });

  it("does not show an assignee when unassigned", () => {
    render(<AssignmentStatus status="unassigned" assignee="Dana Lee" />);
    expect(screen.queryByText(/Dana Lee/)).not.toBeInTheDocument();
  });

  it("supports a custom label", () => {
    render(<AssignmentStatus status="resolved" label="Done" />);
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("keeps an accessible label when text is hidden", () => {
    render(
      <AssignmentStatus
        status="assigned"
        assignee="Dana Lee"
        showLabel={false}
      />,
    );
    expect(
      screen.getByRole("status", { name: "Assigned: Dana Lee" }),
    ).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <AssignmentStatus status="assigned" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
