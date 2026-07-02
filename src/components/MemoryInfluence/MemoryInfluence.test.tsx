import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryInfluence } from "./MemoryInfluence";
import type { MemoryInfluenceItem } from "./MemoryInfluence";

const influences: MemoryInfluenceItem[] = [
  { id: "1", label: "Deadline soon", weight: 0.8, direction: "supporting" },
  { id: "2", label: "Budget tight", weight: 0.5, direction: "opposing" },
];

describe("MemoryInfluence", () => {
  it("renders the labelled section and each influence", () => {
    render(<MemoryInfluence influences={influences} />);
    expect(
      screen.getByRole("region", { name: "Memory influence" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Deadline soon")).toBeInTheDocument();
    expect(screen.getByText("Budget tight")).toBeInTheDocument();
  });

  it("renders the decision heading when provided", () => {
    render(<MemoryInfluence influences={influences} decision="Pick express" />);
    expect(screen.getByText("Pick express")).toBeInTheDocument();
  });

  it("renders weights as rounded percentages", () => {
    render(
      <MemoryInfluence influences={[{ id: "1", label: "A", weight: 0.826 }]} />,
    );
    expect(screen.getByText("83%")).toBeInTheDocument();
  });

  it("describes direction in the accessible bar label", () => {
    render(<MemoryInfluence influences={influences} />);
    expect(
      screen.getByRole("img", {
        name: "Deadline soon: supporting, 80% influence",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Budget tight: opposing, 50% influence",
      }),
    ).toBeInTheDocument();
  });

  it("defaults direction to supporting", () => {
    render(
      <MemoryInfluence influences={[{ id: "1", label: "A", weight: 0.4 }]} />,
    );
    expect(
      screen.getByRole("img", { name: "A: supporting, 40% influence" }),
    ).toBeInTheDocument();
  });

  it("shows the empty message when there are no influences", () => {
    render(
      <MemoryInfluence
        influences={[]}
        emptyMessage="Nothing influenced this."
      />,
    );
    expect(screen.getByText("Nothing influenced this.")).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <MemoryInfluence influences={influences} className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
