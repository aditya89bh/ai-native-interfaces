import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgentStatusCard } from "./AgentStatusCard";
import type { AgentState } from "../../tokens";

describe("AgentStatusCard", () => {
  it("renders the agent name and default state label", () => {
    render(<AgentStatusCard name="Research agent" state="thinking" />);

    expect(screen.getByText("Research agent")).toBeInTheDocument();
    expect(screen.getByText("Thinking")).toBeInTheDocument();
  });

  it("renders a human-readable label for every taxonomy state", () => {
    const cases: Array<[AgentState, string]> = [
      ["idle", "Idle"],
      ["thinking", "Thinking"],
      ["planning", "Planning"],
      ["acting", "Acting"],
      ["waiting", "Waiting"],
      ["needsApproval", "Needs approval"],
      ["blocked", "Blocked"],
      ["failed", "Failed"],
      ["completed", "Completed"],
    ];

    for (const [state, expected] of cases) {
      const { unmount } = render(<AgentStatusCard state={state} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it("exposes a polite status role when not interactive", () => {
    render(<AgentStatusCard name="Research agent" state="acting" />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("renders the description when provided", () => {
    render(
      <AgentStatusCard
        name="Research agent"
        state="waiting"
        description="Waiting on an external response."
      />,
    );

    expect(
      screen.getByText("Waiting on an external response."),
    ).toBeInTheDocument();
  });

  it("prefers a custom label over the default", () => {
    render(
      <AgentStatusCard
        name="Research agent"
        state="idle"
        label="Standing by"
      />,
    );

    expect(screen.getByText("Standing by")).toBeInTheDocument();
    expect(screen.queryByText("Idle")).not.toBeInTheDocument();
  });

  it("renders a timestamp and trailing actions", () => {
    render(
      <AgentStatusCard
        state="completed"
        timestamp="2m ago"
        actions={<button type="button">Retry</button>}
      />,
    );

    expect(screen.getByText("2m ago")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("uses a custom icon in place of the status dot", () => {
    render(
      <AgentStatusCard
        state="idle"
        icon={<span data-testid="custom-icon">*</span>}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("animates active states and not resting states", () => {
    const { container, rerender } = render(<AgentStatusCard state="acting" />);
    expect(container.querySelector(".animate-ping")).not.toBeNull();

    rerender(<AgentStatusCard state="idle" />);
    expect(container.querySelector(".animate-ping")).toBeNull();
  });

  it("does not animate when animated is false", () => {
    const { container } = render(
      <AgentStatusCard state="acting" animated={false} />,
    );
    expect(container.querySelector(".animate-ping")).toBeNull();
  });

  it("renders as a button and fires onClick when interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <AgentStatusCard name="Research agent" state="idle" onClick={onClick} />,
    );

    const button = screen.getByRole("button", {
      name: "Research agent: Idle",
    });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is keyboard operable when interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <AgentStatusCard name="Research agent" state="idle" onClick={onClick} />,
    );

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("is not a button when non-interactive", () => {
    render(<AgentStatusCard state="idle" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards a custom className to the root element", () => {
    const { container } = render(
      <AgentStatusCard state="idle" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
