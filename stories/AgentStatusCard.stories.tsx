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
      options: ["idle", "thinking", "acting", "waiting", "success", "error"],
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
    description: "Analyzing the request and planning next steps.",
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
    description: "Needs your approval to continue.",
  },
};

export const Success: Story = {
  args: {
    name: "Research agent",
    state: "success",
    description: "Finished and returned a summary.",
  },
};

export const Error: Story = {
  args: {
    name: "Research agent",
    state: "error",
    description: "Could not complete the task.",
  },
};
