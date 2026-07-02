import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApprovalPanel } from "./ApprovalPanel";

describe("ApprovalPanel", () => {
  it("renders the title, description, and controls", () => {
    render(
      <ApprovalPanel
        title="Send report"
        description="Email the summary."
        onApprove={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("region", { name: "Send report" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Email the summary.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject" })).toBeInTheDocument();
  });

  it("calls onApprove and onReject", async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    const onReject = vi.fn();
    render(<ApprovalPanel onApprove={onApprove} onReject={onReject} />);

    await user.click(screen.getByRole("button", { name: "Approve" }));
    expect(onApprove).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Reject" }));
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it("shows an edit action only when onEdit is provided", () => {
    const { rerender } = render(
      <ApprovalPanel onApprove={vi.fn()} onReject={vi.fn()} />,
    );
    expect(
      screen.queryByRole("button", { name: "Edit" }),
    ).not.toBeInTheDocument();

    rerender(
      <ApprovalPanel onApprove={vi.fn()} onReject={vi.fn()} onEdit={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("passes notes to the callbacks when notes are enabled", async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    render(
      <ApprovalPanel allowNotes onApprove={onApprove} onReject={vi.fn()} />,
    );

    await user.type(screen.getByLabelText("Notes"), "Looks good");
    await user.click(screen.getByRole("button", { name: "Approve" }));
    expect(onApprove).toHaveBeenCalledWith("Looks good");
  });

  it("marks the panel busy and disables controls while pending", () => {
    render(
      <ApprovalPanel
        title="Send report"
        pending="approve"
        onApprove={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    expect(screen.getByRole("region", { name: "Send report" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("button", { name: /Approve/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Reject" })).toBeDisabled();
  });

  it("disables all controls when disabled", () => {
    render(
      <ApprovalPanel
        disabled
        onApprove={vi.fn()}
        onReject={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Approve" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Reject" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Edit" })).toBeDisabled();
  });
});
