import type { Meta, StoryObj } from "@storybook/react";
import { CodingAgentTemplate } from "../src/templates";
import {
  codingActions,
  codingAgent,
  codingCapabilities,
  codingChange,
  codingProgress,
  codingQueue,
  codingSteps,
} from "../src/templates/mockData";

const noop = () => undefined;

const meta = {
  title: "Product Templates/CodingAgentTemplate",
  component: CodingAgentTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    agent: codingAgent,
    capabilities: codingCapabilities,
    progress: codingProgress,
    steps: codingSteps,
    queue: codingQueue,
    change: codingChange,
    actions: codingActions,
    onApprove: noop,
    onReject: noop,
    onEdit: noop,
  },
} satisfies Meta<typeof CodingAgentTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutQueue: Story = {
  args: { queue: undefined },
};

export const Approving: Story = {
  args: { approvalPending: "approve" },
};
