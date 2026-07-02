import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConfidenceIndicator } from "./ConfidenceIndicator";
import type { ConfidenceLevel } from "../../tokens";

describe("ConfidenceIndicator", () => {
  it("renders the default label for each level", () => {
    const cases: Array<[ConfidenceLevel, string]> = [
      ["low", "Low confidence"],
      ["medium", "Medium confidence"],
      ["high", "High confidence"],
    ];

    for (const [level, expected] of cases) {
      const { unmount } = render(<ConfidenceIndicator level={level} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it("exposes a meter role with value when a numeric value is provided", () => {
    render(<ConfidenceIndicator level="medium" value={62} />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuenow", "62");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders the percentage in the detailed variant", () => {
    render(<ConfidenceIndicator level="medium" value={62} />);
    expect(screen.getByText("62%")).toBeInTheDocument();
  });

  it("rounds the numeric value", () => {
    render(<ConfidenceIndicator level="high" value={87.6} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "88");
  });

  it("falls back to an image role without a numeric value", () => {
    render(<ConfidenceIndicator level="high" />);
    expect(
      screen.getByRole("img", { name: "High confidence" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("meter")).not.toBeInTheDocument();
  });

  it("supports a custom label", () => {
    render(<ConfidenceIndicator level="low" label="Uncertain" />);
    expect(screen.getByText("Uncertain")).toBeInTheDocument();
  });

  it("keeps an accessible label when the text is hidden", () => {
    render(<ConfidenceIndicator level="high" showLabel={false} />);
    expect(
      screen.getByRole("img", { name: "High confidence" }),
    ).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <ConfidenceIndicator level="high" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
