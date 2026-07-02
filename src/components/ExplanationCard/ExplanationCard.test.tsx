import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExplanationCard } from "./ExplanationCard";

describe("ExplanationCard", () => {
  it("renders the concise summary and default title", () => {
    render(<ExplanationCard summary="Picked the express carrier." />);
    expect(screen.getByText("Picked the express carrier.")).toBeInTheDocument();
    expect(
      screen.getByRole("article", { name: "Why this decision" }),
    ).toBeInTheDocument();
  });

  it("renders only the sections that are provided", () => {
    render(
      <ExplanationCard
        summary="Summary."
        evidence="Some evidence."
        limitations="A limitation."
      />,
    );
    expect(screen.getByText("Supporting evidence")).toBeInTheDocument();
    expect(screen.getByText("Limitations")).toBeInTheDocument();
    expect(screen.queryByText("Assumptions")).not.toBeInTheDocument();
  });

  it("renders section content inside disclosure elements", () => {
    const { container } = render(
      <ExplanationCard summary="Summary." assumptions="An assumption." />,
    );
    expect(container.querySelector("details")).not.toBeNull();
    expect(screen.getByText("An assumption.")).toBeInTheDocument();
  });

  it("opens sections when defaultOpen is set", () => {
    const { container } = render(
      <ExplanationCard summary="Summary." evidence="Evidence." defaultOpen />,
    );
    const details = container.querySelector("details");
    expect(details).toHaveAttribute("open");
  });

  it("supports a custom title", () => {
    render(<ExplanationCard summary="Summary." title="Rationale" />);
    expect(
      screen.getByRole("article", { name: "Rationale" }),
    ).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <ExplanationCard summary="Summary." className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
