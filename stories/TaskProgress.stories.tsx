import type { Meta, StoryObj } from "@storybook/react";
import { TaskProgress } from "../src/components/TaskProgress";
import type { TaskProgressStatus } from "../src/components/TaskProgress";

const statuses: TaskProgressStatus[] = [
  "in-progress",
  "indeterminate",
  "completed",
  "failed",
  "paused",
];

const meta = {
  title: "Workflow & Execution/TaskProgress",
  component: TaskProgress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { label: "Indexing files", value: 62, status: "in-progress" },
  argTypes: {
    status: { control: "inline-radio", options: statuses },
    size: { control: "inline-radio", options: ["sm", "md"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showValue: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[26rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TaskProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};
export const Indeterminate: Story = {
  args: { status: "indeterminate", label: "Thinking" },
};
export const Completed: Story = { args: { status: "completed", value: 100 } };
export const Failed: Story = {
  args: { status: "failed", value: 40, label: "Deploy" },
};
export const Paused: Story = { args: { status: "paused", value: 55 } };

export const AllStates: Story = {
  render: (args) => (
    <div className="grid gap-4">
      {statuses.map((status) => (
        <TaskProgress key={status} {...args} status={status} label={status} />
      ))}
    </div>
  ),
};
