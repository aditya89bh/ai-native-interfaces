import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FeedbackCapture } from "./FeedbackCapture";

describe("FeedbackCapture", () => {
  it("renders the rating, category, and correction controls", () => {
    render(
      <FeedbackCapture
        categories={["Incorrect", "Other"]}
        onSubmit={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Share feedback" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("What should change?")).toBeInTheDocument();
  });

  it("submits the selected rating, category, and correction", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <FeedbackCapture
        categories={["Incorrect", "Other"]}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("radio", { name: "4 stars" }));
    await user.selectOptions(screen.getByLabelText("Category"), "Incorrect");
    await user.type(
      screen.getByLabelText("What should change?"),
      "Wrong total",
    );
    await user.click(screen.getByRole("button", { name: "Submit feedback" }));

    expect(onSubmit).toHaveBeenCalledWith({
      rating: 4,
      category: "Incorrect",
      correction: "Wrong total",
    });
  });

  it("submits nulls when nothing is chosen", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<FeedbackCapture categories={["Incorrect"]} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Submit feedback" }));
    expect(onSubmit).toHaveBeenCalledWith({
      rating: null,
      category: null,
      correction: "",
    });
  });

  it("hides the rating control when maxRating is 0", () => {
    render(<FeedbackCapture maxRating={0} onSubmit={vi.fn()} />);
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("hides the category control when no categories are given", () => {
    render(<FeedbackCapture onSubmit={vi.fn()} />);
    expect(screen.queryByLabelText("Category")).not.toBeInTheDocument();
  });

  it("shows a confirmation once submitted", () => {
    render(<FeedbackCapture submitted onSubmit={vi.fn()} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Thanks for your feedback.",
    );
    expect(
      screen.queryByRole("button", { name: "Submit feedback" }),
    ).not.toBeInTheDocument();
  });

  it("disables controls while submitting", () => {
    render(<FeedbackCapture submitting onSubmit={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Submit feedback" }),
    ).toBeDisabled();
  });
});
