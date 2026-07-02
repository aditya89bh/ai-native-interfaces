import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkflowApprovalConsoleTemplate } from "./WorkflowApprovalConsoleTemplate";
import { approvalHandoff, approvalItems } from "../mockData";

function renderTemplate(
  props: Partial<ComponentProps<typeof WorkflowApprovalConsoleTemplate>> = {},
) {
  return render(
    <WorkflowApprovalConsoleTemplate
      items={approvalItems}
      handoff={approvalHandoff}
      {...props}
    />,
  );
}

describe("WorkflowApprovalConsoleTemplate", () => {
  it("renders the console with a list of pending decisions", () => {
    renderTemplate();
    expect(
      screen.getByRole("region", { name: "Approval queue" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Decisions awaiting approval" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${approvalItems.length} pending`),
    ).toBeInTheDocument();
  });

  it("selects the first item by default and shows it in the detail pane", () => {
    renderTemplate();
    // First item's action appears in both the list button and the detail summary.
    expect(
      screen.getAllByText(approvalItems[0]!.decision.action as string).length,
    ).toBeGreaterThanOrEqual(2);
  });

  it("changes the detail pane when another item is selected", async () => {
    const user = userEvent.setup();
    renderTemplate();
    await user.click(
      screen.getByRole("button", { name: /Grant temporary admin access/ }),
    );
    expect(
      screen.getAllByText(approvalItems[1]!.decision.action as string).length,
    ).toBeGreaterThanOrEqual(2);
  });

  it("forwards approve/reject with the selected item id", async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    const onReject = vi.fn();
    renderTemplate({ onApprove, onReject });

    await user.click(screen.getByRole("button", { name: /^Approve$/i }));
    expect(onApprove).toHaveBeenCalledWith(approvalItems[0]!.id, "");

    await user.click(screen.getByRole("button", { name: /^Reject$/i }));
    expect(onReject).toHaveBeenCalledWith(approvalItems[0]!.id, "");
  });

  it("renders the handoff when provided and hides it when null", () => {
    const { rerender } = renderTemplate();
    expect(
      screen.getByText(approvalHandoff.reason as string),
    ).toBeInTheDocument();

    rerender(
      <WorkflowApprovalConsoleTemplate items={approvalItems} handoff={null} />,
    );
    expect(
      screen.queryByText(approvalHandoff.reason as string),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when there are no items", () => {
    renderTemplate({ items: [] });
    expect(
      screen.getByText("Nothing is awaiting approval."),
    ).toBeInTheDocument();
  });
});
