import type { Meta, StoryObj } from "@storybook/react";
import { AgentStatusCard } from "../src/components/AgentStatusCard";

const meta = {
  title: "Agent State/AgentStatusCard",
  component: AgentStatusCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: {
      control: "select",
      options: [
        "idle",
        "thinking",
        "planning",
        "acting",
        "waiting",
        "needsApproval",
        "blocked",
        "failed",
        "completed",
      ],
    },
  },
} satisfies Meta<typeof AgentStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    name: "Research agent",
    state: "idle",
    description: "Waiting for a task.",
  },
};

export const Thinking: Story = {
  args: {
    name: "Research agent",
    state: "thinking",
    description: "Interpreting the request.",
  },
};

export const Planning: Story = {
  args: {
    name: "Research agent",
    state: "planning",
    description: "Breaking the task into steps.",
  },
};

export const Acting: Story = {
  args: {
    name: "Research agent",
    state: "acting",
    description: "Searching sources and gathering results.",
  },
};

export const Waiting: Story = {
  args: {
    name: "Research agent",
    state: "waiting",
    description: "Waiting on an external response.",
  },
};

export const NeedsApproval: Story = {
  args: {
    name: "Research agent",
    state: "needsApproval",
    description: "Requesting your approval to continue.",
  },
};

export const Blocked: Story = {
  args: {
    name: "Research agent",
    state: "blocked",
    description: "Missing a required permission.",
  },
};

export const Failed: Story = {
  args: {
    name: "Research agent",
    state: "failed",
    description: "Could not complete the task.",
  },
};

export const Completed: Story = {
  args: {
    name: "Research agent",
    state: "completed",
    description: "Finished and returned a summary.",
  },
};
