import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RiskBadge } from "./RiskBadge";
import type { RiskBadgeLevel } from "./RiskBadge";

describe("RiskBadge", () => {
  it("renders the default label for each level", () => {
    const cases: Array<[RiskBadgeLevel, string]> = [
      ["low", "Low risk"],
      ["moderate", "Moderate risk"],
      ["high", "High risk"],
      ["critical", "Critical risk"],
    ];

    for (const [level, expected] of cases) {
      const { unmount } = render(<RiskBadge level={level} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it("conveys severity through text, not color alone", () => {
    render(<RiskBadge level="critical" />);
    // The level word is present as readable text.
    expect(screen.getByText("Critical risk")).toBeInTheDocument();
  });

  it("supports a custom label", () => {
    render(<RiskBadge level="high" label="Destructive action" />);
    expect(screen.getByText("Destructive action")).toBeInTheDocument();
  });

  it("renders a decorative icon by default and hides it from a11y", () => {
    const { container } = render(<RiskBadge level="high" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("omits the icon when showIcon is false", () => {
    const { container } = render(<RiskBadge level="high" showIcon={false} />);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <RiskBadge level="low" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
