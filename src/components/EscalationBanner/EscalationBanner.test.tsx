import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EscalationBanner } from "./EscalationBanner";

describe("EscalationBanner", () => {
  it("renders the message and default heading from severity", () => {
    render(
      <EscalationBanner severity="warning">Something odd.</EscalationBanner>,
    );
    expect(screen.getByText("Something odd.")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("uses a polite status role for info and warning", () => {
    const { rerender } = render(
      <EscalationBanner severity="info">Message</EscalationBanner>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(<EscalationBanner severity="warning">Message</EscalationBanner>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses an assertive alert role for urgent and blocked", () => {
    const { rerender } = render(
      <EscalationBanner severity="urgent">Message</EscalationBanner>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(<EscalationBanner severity="blocked">Message</EscalationBanner>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("supports a custom title", () => {
    render(
      <EscalationBanner severity="blocked" title="Needs credentials">
        Message
      </EscalationBanner>,
    );
    expect(screen.getByText("Needs credentials")).toBeInTheDocument();
  });

  it("renders a dismiss button only when onDismiss is provided", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const { rerender } = render(
      <EscalationBanner severity="info">Message</EscalationBanner>,
    );
    expect(
      screen.queryByRole("button", { name: "Dismiss" }),
    ).not.toBeInTheDocument();

    rerender(
      <EscalationBanner severity="info" onDismiss={onDismiss}>
        Message
      </EscalationBanner>,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders action content", () => {
    render(
      <EscalationBanner severity="urgent" action={<button>Review</button>}>
        Message
      </EscalationBanner>,
    );
    expect(screen.getByRole("button", { name: "Review" })).toBeInTheDocument();
  });

  it("forwards a custom className", () => {
    const { container } = render(
      <EscalationBanner severity="info" className="custom-class">
        Message
      </EscalationBanner>,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});
