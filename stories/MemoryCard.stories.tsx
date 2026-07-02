import type { Meta, StoryObj } from "@storybook/react";
import { MemoryCard } from "../src/components/MemoryCard";

const noop = () => undefined;

const meta = {
  title: "Memory/MemoryCard",
  component: MemoryCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    title: "Prefers dark mode",
    summary: "The user switched to the dark theme and asked to keep it.",
    source: "Settings change",
    timestamp: "3 days ago",
    confidence: "high",
  },
  argTypes: {
    confidence: {
      control: "inline-radio",
      options: [undefined, "low", "medium", "high"],
    },
    pinned: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[26rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MemoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pinned: Story = {
  args: { pinned: true },
};

export const InteractivePin: Story = {
  args: { onTogglePin: noop },
};

export const Selectable: Story = {
  args: { onSelect: noop, onTogglePin: noop },
};

export const TitleOnly: Story = {
  args: {
    summary: undefined,
    source: undefined,
    timestamp: undefined,
    confidence: undefined,
  },
};
