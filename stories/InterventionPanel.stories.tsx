import type { Meta, StoryObj } from "@storybook/react";
import { InterventionPanel } from "../src/components/InterventionPanel";

const noop = () => undefined;

const meta = {
  title: "Human Collaboration/InterventionPanel",
  component: InterventionPanel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    description: "Step in while the agent is running.",
    onPause: noop,
    onResume: noop,
    onOverride: noop,
    onCancel: noop,
  },
  argTypes: {
    paused: { control: "boolean" },
    pending: {
      control: "inline-radio",
      options: [null, "pause", "resume", "override", "cancel"],
    },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[30rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InterventionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = {};

export const Paused: Story = {
  args: { paused: true },
};

export const Cancelling: Story = {
  args: { pending: "cancel" },
};

export const CancelOnly: Story = {
  args: { onPause: undefined, onResume: undefined, onOverride: undefined },
};

export const Disabled: Story = {
  args: { disabled: true },
};
