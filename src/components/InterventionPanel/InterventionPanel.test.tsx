import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InterventionPanel } from "./InterventionPanel";

describe("InterventionPanel", () => {
  it("renders a labelled region and the provided controls", () => {
    render(
      <InterventionPanel
        onPause={vi.fn()}
        onOverride={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Intervene" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Override action" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancel task" }),
    ).toBeInTheDocument();
  });

  it("shows resume instead of pause when paused", () => {
    render(<InterventionPanel paused onPause={vi.fn()} onResume={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Resume" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Pause" }),
    ).not.toBeInTheDocument();
  });

  it("only renders controls whose handlers are provided", () => {
    render(<InterventionPanel onCancel={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Cancel task" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Pause" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Override action" }),
    ).not.toBeInTheDocument();
  });

  it("calls the matching handlers", async () => {
    const user = userEvent.setup();
    const onPause = vi.fn();
    const onCancel = vi.fn();
    render(<InterventionPanel onPause={onPause} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Pause" }));
    expect(onPause).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Cancel task" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("marks the panel busy and disables controls while pending", () => {
    render(
      <InterventionPanel
        onPause={vi.fn()}
        onCancel={vi.fn()}
        pending="cancel"
      />,
    );
    expect(screen.getByRole("region", { name: "Intervene" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("button", { name: /Cancel task/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Pause" })).toBeDisabled();
  });

  it("disables all controls when disabled", () => {
    render(<InterventionPanel disabled onPause={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Pause" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel task" })).toBeDisabled();
  });
});
