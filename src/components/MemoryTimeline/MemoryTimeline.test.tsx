import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryTimeline } from "./MemoryTimeline";
import type { MemoryTimelineItem } from "./MemoryTimeline";

const items: MemoryTimelineItem[] = [
  { id: "1", title: "Prefers dark mode", timestamp: "3 days ago" },
  { id: "2", title: "Works in Berlin", timestamp: "2 weeks ago" },
  { id: "3", title: "Primary project: Atlas", timestamp: "1 month ago" },
];

describe("MemoryTimeline", () => {
  it("renders an accessible ordered list of entries", () => {
    render(<MemoryTimeline items={items} />);
    const list = screen.getByRole("list", { name: "Memory timeline" });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("preserves the supplied order", () => {
    render(<MemoryTimeline items={items} />);
    const rendered = screen
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(rendered[0]).toContain("Prefers dark mode");
    expect(rendered[2]).toContain("Primary project: Atlas");
  });

  it("renders summary and source when provided", () => {
    render(
      <MemoryTimeline
        items={[
          {
            id: "1",
            title: "Prefers dark mode",
            summary: "Kept the dark theme.",
            source: "Settings",
          },
        ]}
      />,
    );
    expect(screen.getByText("Kept the dark theme.")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders custom content in place of the default body", () => {
    render(
      <MemoryTimeline
        items={[
          {
            id: "1",
            title: "Custom",
            content: <span>Custom body</span>,
          },
        ]}
      />,
    );
    expect(screen.getByText("Custom body")).toBeInTheDocument();
  });

  it("shows the empty message when there are no items", () => {
    render(
      <MemoryTimeline items={[]} emptyMessage="Nothing remembered yet." />,
    );
    expect(screen.getByText("Nothing remembered yet.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("supports a custom label and className", () => {
    const { container } = render(
      <MemoryTimeline items={items} label="History" className="custom-class" />,
    );
    expect(screen.getByRole("list", { name: "History" })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
