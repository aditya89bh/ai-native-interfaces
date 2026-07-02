import type { Meta, StoryObj } from "@storybook/react";
import { OperationsAgentTemplate } from "../src/templates";
import {
  opsActions,
  opsAgent,
  opsEdges,
  opsEscalation,
  opsNodes,
  opsQueue,
} from "../src/templates/mockData";

const noop = () => undefined;

const meta = {
  title: "Product Templates/OperationsAgentTemplate",
  component: OperationsAgentTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    agent: opsAgent,
    heartbeat: "degraded",
    presence: "active",
    escalation: opsEscalation,
    nodes: opsNodes,
    edges: opsEdges,
    queue: opsQueue,
    actions: opsActions,
    paused: true,
    onResume: noop,
    onOverride: noop,
    onCancel: noop,
  },
} satisfies Meta<typeof OperationsAgentTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Running: Story = {
  args: {
    paused: false,
    escalation: null,
    onPause: noop,
    onResume: undefined,
  },
};
