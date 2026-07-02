import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackCapture } from "../src/components/FeedbackCapture";

const noop = () => undefined;

const meta = {
  title: "Human Collaboration/FeedbackCapture",
  component: FeedbackCapture,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    categories: ["Incorrect", "Incomplete", "Unsafe", "Other"],
    onSubmit: noop,
  },
  argTypes: {
    submitting: { control: "boolean" },
    submitted: { control: "boolean" },
    disabled: { control: "boolean" },
    maxRating: { control: { type: "number", min: 0, max: 10 } },
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeedbackCapture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCategory: Story = {
  args: { categories: [] },
};

export const Submitting: Story = {
  args: { submitting: true },
};

export const Submitted: Story = {
  args: { submitted: true },
};

export const RatingOnly: Story = {
  args: { categories: [], correctionLabel: "Optional note" },
};
