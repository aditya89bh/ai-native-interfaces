import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentHeartbeat } from "./AgentHeartbeat";

describe("AgentHeartbeat", () => {
  it("renders the default label for each status", () => {
    const cases: Array<
      ["online" | "offline" | "reconnecting" | "degraded", string]
    > = [
      ["online", "Online"],
      ["reconnecting", "Reconnecting…"],
      ["degraded", "Degraded"],
      ["offline", "Offline"],
    ];

    for (const [status, expected] of cases) {
      const { unmount } = render(<AgentHeartbeat status={status} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it("exposes a polite status role", () => {
    render(<AgentHeartbeat status="online" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("supports a custom label", () => {
    render(<AgentHeartbeat status="online" label="Connected" />);
    expect(screen.getByText("Connected")).toBeInTheDocument();
  });

  it("keeps the label available to screen readers when visually hidden", () => {
    render(<AgentHeartbeat status="online" showLabel={false} />);
    const label = screen.getByText("Online");
    expect(label).toHaveClass("sr-only");
  });

  it("renders supplementary detail", () => {
    render(<AgentHeartbeat status="offline" detail="last seen 5m ago" />);
    expect(screen.getByText("last seen 5m ago")).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <AgentHeartbeat status="online" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
