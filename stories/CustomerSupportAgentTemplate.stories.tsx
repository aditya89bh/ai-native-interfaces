import type { Meta, StoryObj } from "@storybook/react";
import { CustomerSupportAgentTemplate } from "../src/templates";
import {
  supportActions,
  supportAgent,
  supportAssignment,
  supportCustomer,
  supportDecision,
  supportEscalation,
} from "../src/templates/mockData";

const noop = () => undefined;

const meta = {
  title: "Product Templates/CustomerSupportAgentTemplate",
  component: CustomerSupportAgentTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    agent: supportAgent,
    customer: supportCustomer,
    assignment: supportAssignment,
    escalation: supportEscalation,
    resolution: supportDecision,
    actions: supportActions,
    onApprove: noop,
    onReject: noop,
    onEdit: noop,
  },
} satisfies Meta<typeof CustomerSupportAgentTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoEscalation: Story = {
  args: { escalation: null },
};

export const Approving: Story = {
  args: { approvalPending: "approve" },
};
