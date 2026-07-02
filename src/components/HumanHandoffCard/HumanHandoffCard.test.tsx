import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HumanHandoffCard } from "./HumanHandoffCard";

describe("HumanHandoffCard", () => {
  it("renders the reason and default title", () => {
    render(<HumanHandoffCard reason="Needs a manager's approval." />);
    expect(
      screen.getByRole("article", { name: "Handoff to a human" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Needs a manager's approval.")).toBeInTheDocument();
  });

  it("renders the priority badge", () => {
    render(<HumanHandoffCard reason="Reason" priority="urgent" />);
    expect(screen.getByText("Urgent priority")).toBeInTheDocument();
  });

  it("renders the status label", () => {
    render(<HumanHandoffCard reason="Reason" status="in-progress" />);
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("renders the assignee name and initials", () => {
    render(<HumanHandoffCard reason="Reason" assignee="Dana Lee" />);
    expect(screen.getByText("Dana Lee")).toBeInTheDocument();
    expect(screen.getByText("DL")).toBeInTheDocument();
  });

  it("renders the timestamp", () => {
    render(<HumanHandoffCard reason="Reason" timestamp="2 minutes ago" />);
    expect(screen.getByText("2 minutes ago")).toBeInTheDocument();
  });

  it("omits the footer when no metadata is provided", () => {
    render(<HumanHandoffCard reason="Reason" />);
    expect(screen.queryByText(/ago/)).not.toBeInTheDocument();
  });

  it("supports a custom title and className", () => {
    const { container } = render(
      <HumanHandoffCard
        reason="Reason"
        title="Escalation"
        className="custom-class"
      />,
    );
    expect(
      screen.getByRole("article", { name: "Escalation" }),
    ).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
