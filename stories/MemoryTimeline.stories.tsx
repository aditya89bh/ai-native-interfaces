import type { Meta, StoryObj } from "@storybook/react";
import { MemoryTimeline } from "../src/components/MemoryTimeline";
import type { MemoryTimelineItem } from "../src/components/MemoryTimeline";

const items: MemoryTimelineItem[] = [
  {
    id: "1",
    title: "Prefers dark mode",
    summary: "Switched to the dark theme and asked to keep it.",
    source: "Settings change",
    timestamp: "3 days ago",
  },
  {
    id: "2",
    title: "Works in Berlin",
    summary: "Mentioned the CET timezone for scheduling.",
    source: "Conversation",
    timestamp: "2 weeks ago",
  },
  {
    id: "3",
    title: "Primary project: Atlas",
    summary: "Most questions reference the Atlas repository.",
    source: "Usage pattern",
    timestamp: "1 month ago",
  },
];

const meta = {
  title: "Memory/MemoryTimeline",
  component: MemoryTimeline,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { items },
  decorators: [
    (Story) => (
      <div className="w-[26rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MemoryTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitlesOnly: Story = {
  args: {
    items: items.map(({ id, title, timestamp }) => ({ id, title, timestamp })),
  },
};

export const Empty: Story = {
  args: { items: [] },
};
