import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryCitation } from "./MemoryCitation";

describe("MemoryCitation", () => {
  it("renders the source and an accessible figure label", () => {
    render(<MemoryCitation source="notes.md" />);
    expect(
      screen.getByRole("figure", { name: "Citation: notes.md" }),
    ).toBeInTheDocument();
    expect(screen.getByText("notes.md")).toBeInTheDocument();
  });

  it("renders a link when href is provided", () => {
    render(<MemoryCitation source="notes.md" href="https://example.com" />);
    const link = screen.getByRole("link", { name: "notes.md" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders the excerpt as a blockquote", () => {
    const { container } = render(
      <MemoryCitation source="notes.md" excerpt="A quoted line." />,
    );
    expect(container.querySelector("blockquote")).not.toBeNull();
    expect(screen.getByText("A quoted line.")).toBeInTheDocument();
  });

  it("renders the score as a rounded percentage", () => {
    render(<MemoryCitation source="notes.md" score={0.826} />);
    expect(screen.getByText("83% relevant")).toBeInTheDocument();
  });

  it("clamps the score to the 0–1 range", () => {
    render(<MemoryCitation source="notes.md" score={1.5} />);
    expect(screen.getByText("100% relevant")).toBeInTheDocument();
  });

  it("renders the retrieval time and citation index", () => {
    render(<MemoryCitation source="notes.md" index={3} retrievedAt="2m ago" />);
    expect(screen.getByText("[3]")).toBeInTheDocument();
    expect(screen.getByText(/Retrieved/)).toBeInTheDocument();
  });

  it("omits the score when not provided", () => {
    render(<MemoryCitation source="notes.md" />);
    expect(screen.queryByText(/relevant/)).not.toBeInTheDocument();
  });
});
