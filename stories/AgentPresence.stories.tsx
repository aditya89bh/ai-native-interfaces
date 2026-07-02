import type { Meta, StoryObj } from "@storybook/react";
import { AgentPresence } from "../src/components/AgentPresence";
import type { PresenceStatus } from "../src/components/AgentPresence";

const statuses: PresenceStatus[] = ["active", "idle", "away", "unavailable"];

const meta = {
  title: "Agent State/AgentPresence",
  component: AgentPresence,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    presence: { control: "inline-radio", options: statuses },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    showLabel: { control: "boolean" },
  },
  args: { presence: "active" },
} satisfies Meta<typeof AgentPresence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Idle: Story = { args: { presence: "idle" } };

export const Away: Story = { args: { presence: "away" } };

export const Unavailable: Story = { args: { presence: "unavailable" } };

export const DotOnly: Story = { args: { showLabel: false } };

export const AllStatuses: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {statuses.map((presence) => (
        <AgentPresence key={presence} {...args} presence={presence} />
      ))}
    </div>
  ),
};
