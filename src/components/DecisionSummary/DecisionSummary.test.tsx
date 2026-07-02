import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DecisionSummary } from "./DecisionSummary";

describe("DecisionSummary", () => {
  it("renders the action and default title", () => {
    render(<DecisionSummary action="Refund $42.00" />);
    expect(screen.getByText("Refund $42.00")).toBeInTheDocument();
    expect(
      screen.getByRole("article", { name: "Decision" }),
    ).toBeInTheDocument();
  });

  it("renders confidence and risk when provided", () => {
    render(
      <DecisionSummary action="Refund" confidence="high" risk="moderate" />,
    );
    expect(screen.getByText("High confidence")).toBeInTheDocument();
    expect(screen.getByText("Moderate risk")).toBeInTheDocument();
  });

  it("renders the timestamp and reasoning", () => {
    render(
      <DecisionSummary
        action="Refund"
        timestamp="2 minutes ago"
        reasoning="Within the refund window."
      />,
    );
    expect(screen.getByText("2 minutes ago")).toBeInTheDocument();
    expect(screen.getByText("Within the refund window.")).toBeInTheDocument();
  });

  it("shows the approval status label", () => {
    const { rerender } = render(
      <DecisionSummary action="Refund" approvalStatus="approved" />,
    );
    expect(screen.getByText("Approved")).toBeInTheDocument();

    rerender(<DecisionSummary action="Refund" approvalStatus="rejected" />);
    expect(screen.getByText("Rejected")).toBeInTheDocument();

    rerender(<DecisionSummary action="Refund" approvalStatus="pending" />);
    expect(screen.getByText("Pending approval")).toBeInTheDocument();
  });

  it("omits the metadata list when no metadata is provided", () => {
    const { container } = render(<DecisionSummary action="Refund" />);
    expect(container.querySelector("dl")).toBeNull();
  });

  it("supports a custom title and className", () => {
    const { container } = render(
      <DecisionSummary
        action="Refund"
        title="Proposed action"
        className="custom-class"
      />,
    );
    expect(
      screen.getByRole("article", { name: "Proposed action" }),
    ).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
