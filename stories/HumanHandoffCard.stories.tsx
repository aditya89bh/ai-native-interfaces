import type { Meta, StoryObj } from "@storybook/react";
import { HumanHandoffCard } from "../src/components/HumanHandoffCard";

const meta = {
  title: "Human Collaboration/HumanHandoffCard",
  component: HumanHandoffCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    reason: "The refund exceeds the agent's approval limit.",
    priority: "high",
    assignee: "Dana Lee",
    status: "pending",
    timestamp: "2 minutes ago",
  },
  argTypes: {
    priority: {
      control: "inline-radio",
      options: [undefined, "low", "medium", "high", "urgent"],
    },
    status: {
      control: "inline-radio",
      options: [undefined, "pending", "accepted", "in-progress", "resolved"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HumanHandoffCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Urgent: Story = {
  args: { priority: "urgent", status: "pending" },
};

export const Resolved: Story = {
  args: { priority: "medium", status: "resolved", timestamp: "1 hour ago" },
};

export const ReasonOnly: Story = {
  args: {
    priority: undefined,
    assignee: undefined,
    status: undefined,
    timestamp: undefined,
  },
};
