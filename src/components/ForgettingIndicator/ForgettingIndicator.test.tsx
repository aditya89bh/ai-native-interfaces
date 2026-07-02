import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ForgettingIndicator } from "./ForgettingIndicator";
import type { ForgettingStatus } from "./ForgettingIndicator";

describe("ForgettingIndicator", () => {
  it("renders the default label for each status", () => {
    const cases: Array<[ForgettingStatus, string]> = [
      ["active", "Active"],
      ["expiring-soon", "Expiring soon"],
      ["forgotten", "Forgotten"],
      ["archived", "Archived"],
    ];

    for (const [status, expected] of cases) {
      const { unmount } = render(<ForgettingIndicator status={status} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it("exposes a status role", () => {
    render(<ForgettingIndicator status="active" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders detail text alongside the label", () => {
    render(
      <ForgettingIndicator status="expiring-soon" detail="Expires in 3 days" />,
    );
    expect(screen.getByText(/Expires in 3 days/)).toBeInTheDocument();
  });

  it("supports a custom label", () => {
    render(<ForgettingIndicator status="active" label="Live" />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("keeps an accessible label when the text is hidden", () => {
    render(
      <ForgettingIndicator
        status="expiring-soon"
        detail="Expires in 3 days"
        showLabel={false}
      />,
    );
    expect(
      screen.getByRole("status", { name: "Expiring soon. Expires in 3 days" }),
    ).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <ForgettingIndicator status="forgotten" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
