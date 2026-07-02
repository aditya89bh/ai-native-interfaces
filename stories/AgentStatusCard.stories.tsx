import type { Meta, StoryObj } from "@storybook/react";
import { AgentStatusCard } from "../src/components/AgentStatusCard";
import type { AgentState } from "../src/tokens";

const allStates: AgentState[] = [
  "idle",
  "thinking",
  "planning",
  "acting",
  "waiting",
  "needsApproval",
  "blocked",
  "failed",
  "completed",
];

const meta = {
  title: "Agent State/AgentStatusCard",
  component: AgentStatusCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: { control: "select", options: allStates },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: {
      control: "inline-radio",
      options: ["subtle", "outline", "solid"],
    },
    animated: { control: "boolean" },
  },
  args: {
    name: "Research agent",
    state: "acting",
    description: "Searching sources and gathering results.",
  },
} satisfies Meta<typeof AgentStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Idle: Story = {
  args: { state: "idle", description: "Waiting for a task." },
};

export const Thinking: Story = {
  args: { state: "thinking", description: "Interpreting the request." },
};

export const Planning: Story = {
  args: { state: "planning", description: "Breaking the task into steps." },
};

export const NeedsApproval: Story = {
  args: {
    state: "needsApproval",
    description: "Requesting your approval to continue.",
  },
};

export const Blocked: Story = {
  args: { state: "blocked", description: "Missing a required permission." },
};

export const Failed: Story = {
  args: { state: "failed", description: "Could not complete the task." },
};

export const Completed: Story = {
  args: { state: "completed", description: "Finished and returned a summary." },
};

export const WithTimestamp: Story = {
  args: { state: "completed", timestamp: "2m ago" },
};

export const Interactive: Story = {
  args: {
    state: "needsApproval",
    description: "Click to review the pending action.",
    onClick: () => undefined,
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div className="grid w-[22rem] gap-3">
      {allStates.map((state) => (
        <AgentStatusCard key={state} {...args} state={state} />
      ))}
    </div>
  ),
  args: { description: undefined },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid w-[22rem] gap-3">
      <AgentStatusCard {...args} size="sm" />
      <AgentStatusCard {...args} size="md" />
      <AgentStatusCard {...args} size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="grid w-[22rem] gap-3 bg-slate-100 p-4">
      <AgentStatusCard {...args} variant="subtle" />
      <AgentStatusCard {...args} variant="outline" />
      <AgentStatusCard {...args} variant="solid" />
    </div>
  ),
};
