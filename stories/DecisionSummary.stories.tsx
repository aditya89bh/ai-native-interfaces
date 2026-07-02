import type { Meta, StoryObj } from "@storybook/react";
import { DecisionSummary } from "../src/components/DecisionSummary";

const meta = {
  title: "Trust & Decision/DecisionSummary",
  component: DecisionSummary,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    action: "Refund the customer $42.00",
    confidence: "high",
    risk: "moderate",
    timestamp: "2 minutes ago",
    reasoning:
      "The order arrived damaged and is within the 30-day refund window.",
    approvalStatus: "pending",
  },
  argTypes: {
    confidence: { control: "inline-radio", options: ["low", "medium", "high"] },
    risk: {
      control: "inline-radio",
      options: ["low", "moderate", "high", "critical"],
    },
    approvalStatus: {
      control: "inline-radio",
      options: ["pending", "approved", "rejected"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[30rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DecisionSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {};

export const Approved: Story = {
  args: { approvalStatus: "approved" },
};

export const Rejected: Story = {
  args: { approvalStatus: "rejected", risk: "high" },
};

export const Minimal: Story = {
  args: {
    action: "Archive 12 resolved tickets",
    confidence: undefined,
    risk: "low",
    timestamp: undefined,
    reasoning: undefined,
    approvalStatus: undefined,
  },
};

export const CriticalDecision: Story = {
  args: {
    action: "Delete the production database backup",
    confidence: "low",
    confidenceValue: 34,
    risk: "critical",
    approvalStatus: "pending",
    reasoning: "Storage is over quota; this backup is the oldest.",
  },
};
