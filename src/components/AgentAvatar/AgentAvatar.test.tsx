import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AgentAvatar } from "./AgentAvatar";

describe("AgentAvatar", () => {
  it("renders initials from a two-word name", () => {
    render(<AgentAvatar name="Research Agent" />);
    expect(screen.getByText("RA")).toBeInTheDocument();
  });

  it("renders initials from a single-word name", () => {
    render(<AgentAvatar name="Ops" />);
    expect(screen.getByText("OP")).toBeInTheDocument();
  });

  it("exposes the name as an accessible image label when showing initials", () => {
    render(<AgentAvatar name="Research agent" />);
    expect(
      screen.getByRole("img", { name: "Research agent" }),
    ).toBeInTheDocument();
  });

  it("renders an image with alt text when src is provided", () => {
    render(<AgentAvatar name="Research agent" src="/agent.png" />);
    const img = screen.getByRole("img", { name: "Research agent" });
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/agent.png");
  });

  it("falls back to initials when the image fails to load", () => {
    render(<AgentAvatar name="Research Agent" src="/broken.png" />);
    const img = screen.getByRole("img", { name: "Research Agent" });
    fireEvent.error(img);
    expect(screen.getByText("RA")).toBeInTheDocument();
  });

  it("renders a status dot with a screen-reader label when state is set", () => {
    render(<AgentAvatar name="Research agent" state="needsApproval" />);
    expect(screen.getByText("Status: needs approval")).toBeInTheDocument();
  });

  it("renders no status text when state is omitted", () => {
    render(<AgentAvatar name="Research agent" />);
    expect(screen.queryByText(/Status:/)).not.toBeInTheDocument();
  });

  it("renders a custom fallback icon instead of initials", () => {
    render(<AgentAvatar name="Research agent" icon={<span>ICON</span>} />);
    expect(screen.getByText("ICON")).toBeInTheDocument();
    expect(screen.queryByText("RA")).not.toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <AgentAvatar name="Research agent" className="custom-class" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
