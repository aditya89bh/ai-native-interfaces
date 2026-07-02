import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActionLog } from "./ActionLog";
import type { ActionLogEntry } from "./ActionLog";

const entries: ActionLogEntry[] = [
  {
    id: "1",
    action: "Sent email",
    actor: "Agent",
    timestamp: "10:02",
    outcome: "success",
  },
  {
    id: "2",
    action: "Called API",
    actor: "Tool",
    timestamp: "10:03",
    outcome: "failure",
    detail: "429 rate limited",
  },
];

describe("ActionLog", () => {
  it("renders an accessible ordered list of entries", () => {
    render(<ActionLog entries={entries} />);
    expect(
      screen.getByRole("list", { name: "Action log" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("preserves the supplied order", () => {
    render(<ActionLog entries={entries} />);
    const rendered = screen
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(rendered[0]).toContain("Sent email");
    expect(rendered[1]).toContain("Called API");
  });

  it("renders actor, timestamp, and detail", () => {
    render(<ActionLog entries={entries} />);
    expect(screen.getByText("Agent")).toBeInTheDocument();
    expect(screen.getByText("10:02")).toBeInTheDocument();
    expect(screen.getByText("429 rate limited")).toBeInTheDocument();
  });

  it("exposes each outcome to assistive tech", () => {
    render(<ActionLog entries={entries} />);
    expect(screen.getByText("Outcome: Success")).toBeInTheDocument();
    expect(screen.getByText("Outcome: Failure")).toBeInTheDocument();
  });

  it("defaults an unspecified outcome to info", () => {
    render(<ActionLog entries={[{ id: "1", action: "Noted something" }]} />);
    expect(screen.getByText("Outcome: Info")).toBeInTheDocument();
  });

  it("shows the empty message when there are no entries", () => {
    render(<ActionLog entries={[]} emptyMessage="Nothing happened yet." />);
    expect(screen.getByText("Nothing happened yet.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <ActionLog entries={entries} className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
