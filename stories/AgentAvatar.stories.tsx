import type { Meta, StoryObj } from "@storybook/react";
import { AgentAvatar } from "../src/components/AgentAvatar";
import type { AgentAvatarSize } from "../src/components/AgentAvatar";
import type { AgentState } from "../src/tokens";

const sizes: AgentAvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const states: AgentState[] = [
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
  title: "Agent State/AgentAvatar",
  component: AgentAvatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: sizes },
    shape: { control: "inline-radio", options: ["circle", "rounded"] },
    state: { control: "select", options: [undefined, ...states] },
  },
  args: { name: "Research agent" },
} satisfies Meta<typeof AgentAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const WithState: Story = {
  args: { state: "acting" },
};

export const Rounded: Story = {
  args: { shape: "rounded", state: "completed" },
};

export const FallbackOnBrokenImage: Story = {
  args: { src: "https://example.invalid/missing.png", state: "failed" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {sizes.map((size) => (
        <AgentAvatar key={size} {...args} size={size} state="acting" />
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {states.map((state) => (
        <AgentAvatar key={state} {...args} state={state} size="lg" />
      ))}
    </div>
  ),
};
