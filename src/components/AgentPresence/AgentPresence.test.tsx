import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentPresence } from "./AgentPresence";
import type { PresenceStatus } from "./AgentPresence";

describe("AgentPresence", () => {
  it("renders the default label for each presence", () => {
    const cases: Array<[PresenceStatus, string]> = [
      ["active", "Active"],
      ["idle", "Idle"],
      ["away", "Away"],
      ["unavailable", "Unavailable"],
    ];

    for (const [presence, expected] of cases) {
      const { unmount } = render(<AgentPresence presence={presence} />);
      expect(screen.getByRole("img", { name: expected })).toBeInTheDocument();
      unmount();
    }
  });

  it("supports a custom label", () => {
    render(<AgentPresence presence="active" label="Available" />);
    expect(screen.getByRole("img", { name: "Available" })).toBeInTheDocument();
  });

  it("keeps an accessible label even when the text is hidden", () => {
    render(<AgentPresence presence="away" showLabel={false} />);
    expect(screen.getByRole("img", { name: "Away" })).toBeInTheDocument();
    expect(screen.queryByText("Away")).not.toBeInTheDocument();
  });

  it("renders the visible label text when showLabel is true", () => {
    render(<AgentPresence presence="active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <AgentPresence presence="active" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
