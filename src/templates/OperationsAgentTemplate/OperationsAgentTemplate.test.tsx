import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OperationsAgentTemplate } from "./OperationsAgentTemplate";
import {
  opsActions,
  opsAgent,
  opsEdges,
  opsEscalation,
  opsNodes,
  opsQueue,
} from "../mockData";

function renderTemplate(
  props: Partial<ComponentProps<typeof OperationsAgentTemplate>> = {},
) {
  return render(
    <OperationsAgentTemplate
      agent={opsAgent}
      heartbeat="degraded"
      presence="active"
      escalation={opsEscalation}
      nodes={opsNodes}
      edges={opsEdges}
      queue={opsQueue}
      actions={opsActions}
      paused
      {...props}
    />,
  );
}

describe("OperationsAgentTemplate", () => {
  it("renders the labelled surface and its regions", () => {
    renderTemplate();
    expect(
      screen.getByRole("region", { name: "Operations agent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pipeline")).toBeInTheDocument();
    expect(screen.getByText("Job queue")).toBeInTheDocument();
    expect(screen.getByText("Controls")).toBeInTheDocument();
    expect(screen.getByText("Action log")).toBeInTheDocument();
  });

  it("renders heartbeat and presence indicators", () => {
    renderTemplate();
    expect(screen.getByText("Degraded")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders the escalation banner and hides it when null", () => {
    const { rerender } = renderTemplate();
    expect(
      screen.getByText(opsEscalation.message as string),
    ).toBeInTheDocument();

    rerender(
      <OperationsAgentTemplate
        agent={opsAgent}
        nodes={opsNodes}
        edges={opsEdges}
        actions={opsActions}
        escalation={null}
      />,
    );
    expect(
      screen.queryByText(opsEscalation.message as string),
    ).not.toBeInTheDocument();
  });

  it("shows resume when paused and forwards intervention events", async () => {
    const user = userEvent.setup();
    const onResume = vi.fn();
    const onCancel = vi.fn();
    renderTemplate({ onResume, onCancel });

    await user.click(screen.getByRole("button", { name: "Resume" }));
    expect(onResume).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Cancel task" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("renders the action log entries", () => {
    renderTemplate();
    expect(
      screen.getByText(opsActions[0]!.action as string),
    ).toBeInTheDocument();
  });
});
