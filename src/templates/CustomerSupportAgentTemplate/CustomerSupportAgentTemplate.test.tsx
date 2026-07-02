import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerSupportAgentTemplate } from "./CustomerSupportAgentTemplate";
import {
  supportActions,
  supportAgent,
  supportAssignment,
  supportCustomer,
  supportDecision,
  supportEscalation,
} from "../mockData";

function renderTemplate(
  props: Partial<ComponentProps<typeof CustomerSupportAgentTemplate>> = {},
) {
  return render(
    <CustomerSupportAgentTemplate
      agent={supportAgent}
      customer={supportCustomer}
      assignment={supportAssignment}
      escalation={supportEscalation}
      resolution={supportDecision}
      actions={supportActions}
      {...props}
    />,
  );
}

describe("CustomerSupportAgentTemplate", () => {
  it("renders the labelled surface and its regions", () => {
    renderTemplate();
    expect(
      screen.getByRole("region", { name: "Customer support agent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Customer request")).toBeInTheDocument();
    expect(screen.getByText("Proposed resolution")).toBeInTheDocument();
    expect(screen.getByText("Action history")).toBeInTheDocument();
  });

  it("shows the agent, customer, and resolution details", () => {
    renderTemplate();
    expect(screen.getByText(supportAgent.name)).toBeInTheDocument();
    expect(screen.getByText(supportCustomer.name)).toBeInTheDocument();
    expect(
      screen.getByText(supportDecision.action as string),
    ).toBeInTheDocument();
  });

  it("renders the escalation banner when provided and hides it when null", () => {
    const { rerender } = renderTemplate();
    expect(
      screen.getByText(supportEscalation.message as string),
    ).toBeInTheDocument();

    rerender(
      <CustomerSupportAgentTemplate
        agent={supportAgent}
        resolution={supportDecision}
        actions={supportActions}
        escalation={null}
      />,
    );
    expect(
      screen.queryByText(supportEscalation.message as string),
    ).not.toBeInTheDocument();
  });

  it("forwards approval events", async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    const onReject = vi.fn();
    renderTemplate({ onApprove, onReject });

    await user.click(screen.getByRole("button", { name: /approve/i }));
    expect(onApprove).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: /reject/i }));
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it("renders the action log entries", () => {
    renderTemplate();
    expect(
      screen.getByText(supportActions[0]!.action as string),
    ).toBeInTheDocument();
  });
});
