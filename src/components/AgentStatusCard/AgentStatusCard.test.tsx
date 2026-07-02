import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentStatusCard } from "./AgentStatusCard";

describe("AgentStatusCard", () => {
  it("renders the agent name and default state label", () => {
    render(<AgentStatusCard name="Research agent" state="thinking" />);

    expect(screen.getByText("Research agent")).toBeInTheDocument();
    expect(screen.getByText("Thinking")).toBeInTheDocument();
  });

  it("exposes a polite status role for assistive technology", () => {
    render(<AgentStatusCard name="Research agent" state="acting" />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("renders the description when provided", () => {
    render(
      <AgentStatusCard
        name="Research agent"
        state="waiting"
        description="Needs your approval to continue."
      />,
    );

    expect(
      screen.getByText("Needs your approval to continue."),
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
  });
});
