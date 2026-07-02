import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryCard } from "./MemoryCard";

describe("MemoryCard", () => {
  it("renders the title, summary, source, and timestamp", () => {
    render(
      <MemoryCard
        title="Prefers dark mode"
        summary="Kept the dark theme."
        source="Settings change"
        timestamp="3 days ago"
      />,
    );

    expect(
      screen.getByRole("article", { name: "Prefers dark mode" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Kept the dark theme.")).toBeInTheDocument();
    expect(screen.getByText("Settings change")).toBeInTheDocument();
    expect(screen.getByText("3 days ago")).toBeInTheDocument();
  });

  it("renders confidence when provided", () => {
    render(<MemoryCard title="Memory" confidence="high" />);
    expect(screen.getByText("High confidence")).toBeInTheDocument();
  });

  it("shows a static pinned marker when pinned without a toggle", () => {
    render(<MemoryCard title="Memory" pinned />);
    expect(screen.getByText("Pinned")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /pin/i }),
    ).not.toBeInTheDocument();
  });

  it("renders an accessible pin toggle reflecting the pinned state", async () => {
    const user = userEvent.setup();
    const onTogglePin = vi.fn();
    const { rerender } = render(
      <MemoryCard title="Memory" onTogglePin={onTogglePin} />,
    );

    const toggle = screen.getByRole("button", { name: "Pin memory" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(onTogglePin).toHaveBeenCalledTimes(1);

    rerender(<MemoryCard title="Memory" pinned onTogglePin={onTogglePin} />);
    const active = screen.getByRole("button", { name: "Unpin memory" });
    expect(active).toHaveAttribute("aria-pressed", "true");
  });

  it("renders the title as a button when onSelect is provided", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MemoryCard title="Prefers dark mode" onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "Prefers dark mode" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <MemoryCard title="Memory" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
