import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionTimeline } from "../src/components/ExecutionTimeline";
import type { ExecutionStep } from "../src/components/ExecutionTimeline";

const steps: ExecutionStep[] = [
  {
    id: "1",
    title: "Fetch source data",
    description: "Pulled 1,204 records from the export.",
    status: "completed",
    timestamp: "0:01",
  },
  {
    id: "2",
    title: "Transform records",
    description: "Normalizing fields and deduplicating.",
    status: "running",
    timestamp: "0:04",
  },
  {
    id: "3",
    title: "Validate schema",
    status: "pending",
  },
  {
    id: "4",
    title: "Upload to warehouse",
    status: "pending",
  },
];

const meta = {
  title: "Workflow & Execution/ExecutionTimeline",
  component: ExecutionTimeline,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { steps },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExecutionTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFailure: Story = {
  args: {
    steps: [
      { id: "1", title: "Fetch source data", status: "completed" },
      { id: "2", title: "Transform records", status: "failed" },
      { id: "3", title: "Validate schema", status: "skipped" },
      { id: "4", title: "Upload to warehouse", status: "skipped" },
    ],
  },
};

export const Empty: Story = {
  args: { steps: [] },
};
