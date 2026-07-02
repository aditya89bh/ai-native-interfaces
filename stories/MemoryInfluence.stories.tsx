import type { Meta, StoryObj } from "@storybook/react";
import { MemoryInfluence } from "../src/components/MemoryInfluence";
import type { MemoryInfluenceItem } from "../src/components/MemoryInfluence";

const influences: MemoryInfluenceItem[] = [
  {
    id: "1",
    label: "Deadline is in 2 days",
    weight: 0.85,
    direction: "supporting",
  },
  {
    id: "2",
    label: "Budget is tight this quarter",
    weight: 0.5,
    direction: "opposing",
  },
  {
    id: "3",
    label: "Prefers reputable carriers",
    weight: 0.3,
    direction: "neutral",
  },
];

const meta = {
  title: "Memory/MemoryInfluence",
  component: MemoryInfluence,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    decision: "Recommend the express carrier",
    influences,
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MemoryInfluence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SupportingOnly: Story = {
  args: {
    influences: influences
      .filter((item) => item.direction === "supporting")
      .concat({
        id: "4",
        label: "Past shipments arrived early",
        weight: 0.6,
        direction: "supporting",
      }),
  },
};

export const WithoutDecision: Story = {
  args: { decision: undefined },
};

export const Empty: Story = {
  args: { influences: [] },
};
