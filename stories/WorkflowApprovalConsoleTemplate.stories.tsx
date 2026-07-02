import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowApprovalConsoleTemplate } from "../src/templates";
import { approvalHandoff, approvalItems } from "../src/templates/mockData";

const noop = () => undefined;

const meta = {
  title: "Product Templates/WorkflowApprovalConsoleTemplate",
  component: WorkflowApprovalConsoleTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    items: approvalItems,
    handoff: approvalHandoff,
    onApprove: noop,
    onReject: noop,
  },
} satisfies Meta<typeof WorkflowApprovalConsoleTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHandoff: Story = {
  args: { handoff: null },
};

export const Empty: Story = {
  args: { items: [], handoff: null },
};
