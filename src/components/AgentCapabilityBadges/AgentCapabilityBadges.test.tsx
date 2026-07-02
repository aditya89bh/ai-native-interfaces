import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentCapabilityBadges } from "./AgentCapabilityBadges";

describe("AgentCapabilityBadges", () => {
  it("renders each capability as a list item", () => {
    render(
      <AgentCapabilityBadges
        capabilities={[{ label: "Web search" }, { label: "Code execution" }]}
      />,
    );

    const list = screen.getByRole("list", { name: "Agent capabilities" });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Web search")).toBeInTheDocument();
    expect(screen.getByText("Code execution")).toBeInTheDocument();
  });

  it("marks disabled capabilities for assistive technology", () => {
    render(
      <AgentCapabilityBadges
        capabilities={[{ label: "File access", enabled: false }]}
      />,
    );

    expect(screen.getByText("(unavailable)")).toBeInTheDocument();
  });

  it("does not mark enabled capabilities as unavailable", () => {
    render(<AgentCapabilityBadges capabilities={[{ label: "Web search" }]} />);
    expect(screen.queryByText("(unavailable)")).not.toBeInTheDocument();
  });

  it("collapses capabilities beyond max into an overflow badge", () => {
    render(
      <AgentCapabilityBadges
        max={2}
        capabilities={[
          { label: "A" },
          { label: "B" },
          { label: "C" },
          { label: "D" },
        ]}
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
    expect(screen.getByLabelText("2 more capabilities")).toBeInTheDocument();
  });

  it("renders nothing when there are no capabilities", () => {
    const { container } = render(<AgentCapabilityBadges capabilities={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("supports a custom group label", () => {
    render(
      <AgentCapabilityBadges
        label="Tools"
        capabilities={[{ label: "Web search" }]}
      />,
    );
    expect(screen.getByRole("list", { name: "Tools" })).toBeInTheDocument();
  });
});
