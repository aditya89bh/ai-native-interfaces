import type { Meta, StoryObj } from "@storybook/react";
import { AssignmentStatus } from "../src/components/AssignmentStatus";
import type { AssignmentState } from "../src/components/AssignmentStatus";

const states: AssignmentState[] = [
  "unassigned",
  "assigned",
  "in-review",
  "resolved",
];

const meta = {
  title: "Human Collaboration/AssignmentStatus",
  component: AssignmentStatus,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { status: "assigned", assignee: "Dana Lee" },
  argTypes: {
    status: { control: "inline-radio", options: states },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showLabel: { control: "boolean" },
  },
} satisfies Meta<typeof AssignmentStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unassigned: Story = { args: { status: "unassigned" } };
export const Assigned: Story = {};
export const InReview: Story = { args: { status: "in-review" } };
export const Resolved: Story = { args: { status: "resolved" } };

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {states.map((status) => (
        <AssignmentStatus key={status} {...args} status={status} />
      ))}
    </div>
  ),
};
