import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodingAgentTemplate } from "./CodingAgentTemplate";
import {
  codingActions,
  codingAgent,
  codingCapabilities,
  codingChange,
  codingProgress,
  codingQueue,
  codingSteps,
} from "../mockData";

function renderTemplate(
  props: Partial<ComponentProps<typeof CodingAgentTemplate>> = {},
) {
  return render(
    <CodingAgentTemplate
      agent={codingAgent}
      capabilities={codingCapabilities}
      progress={codingProgress}
      steps={codingSteps}
      queue={codingQueue}
      change={codingChange}
      actions={codingActions}
      {...props}
    />,
  );
}

describe("CodingAgentTemplate", () => {
  it("renders the labelled surface and its regions", () => {
    renderTemplate();
    expect(
      screen.getByRole("region", { name: "Coding agent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Queue")).toBeInTheDocument();
    expect(screen.getByText("Proposed change")).toBeInTheDocument();
    expect(screen.getByText("Command history")).toBeInTheDocument();
  });

  it("renders capabilities and progress", () => {
    renderTemplate();
    expect(screen.getByText("Read files")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("hides the queue when none is provided", () => {
    renderTemplate({ queue: undefined });
    expect(screen.queryByText("Queue")).not.toBeInTheDocument();
  });

  it("renders the proposed change", () => {
    renderTemplate();
    expect(screen.getByText(codingChange.action as string)).toBeInTheDocument();
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
});
