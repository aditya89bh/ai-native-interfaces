import type { Meta, StoryObj } from "@storybook/react";
import { AgentHeartbeat } from "../src/components/AgentHeartbeat";
import type { HeartbeatStatus } from "../src/components/AgentHeartbeat";

const statuses: HeartbeatStatus[] = [
  "online",
  "reconnecting",
  "degraded",
  "offline",
];

const meta = {
  title: "Agent State/AgentHeartbeat",
  component: AgentHeartbeat,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    status: { control: "inline-radio", options: statuses },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showLabel: { control: "boolean" },
    animated: { control: "boolean" },
  },
  args: { status: "online" },
} satisfies Meta<typeof AgentHeartbeat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {};

export const Reconnecting: Story = { args: { status: "reconnecting" } };

export const Degraded: Story = { args: { status: "degraded" } };

export const Offline: Story = {
  args: { status: "offline", detail: "last seen 5m ago" },
};

export const IndicatorOnly: Story = {
  args: { showLabel: false },
};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {statuses.map((status) => (
        <AgentHeartbeat key={status} {...args} status={status} />
      ))}
    </div>
  ),
};
