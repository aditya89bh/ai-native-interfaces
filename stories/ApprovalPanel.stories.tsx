import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalPanel } from "../src/components/ApprovalPanel";

const noop = () => undefined;

const meta = {
  title: "Trust & Decision/ApprovalPanel",
  component: ApprovalPanel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    title: "Send report to stakeholders",
    description: "The agent wants to email the Q3 summary to 12 recipients.",
    onApprove: noop,
    onReject: noop,
  },
  argTypes: {
    pending: { control: "inline-radio", options: [null, "approve", "reject"] },
    allowNotes: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ApprovalPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEdit: Story = {
  args: { onEdit: noop },
};

export const WithNotes: Story = {
  args: { allowNotes: true, onEdit: noop },
};

export const Approving: Story = {
  args: { pending: "approve" },
};

export const Rejecting: Story = {
  args: { pending: "reject" },
};

export const Disabled: Story = {
  args: { disabled: true, onEdit: noop },
};
