import type { Meta, StoryObj } from "@storybook/react";
import { ForgettingIndicator } from "../src/components/ForgettingIndicator";
import type { ForgettingStatus } from "../src/components/ForgettingIndicator";

const statuses: ForgettingStatus[] = [
  "active",
  "expiring-soon",
  "forgotten",
  "archived",
];

const meta = {
  title: "Memory/ForgettingIndicator",
  component: ForgettingIndicator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    status: { control: "inline-radio", options: statuses },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showLabel: { control: "boolean" },
  },
  args: { status: "active" },
} satisfies Meta<typeof ForgettingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};
export const ExpiringSoon: Story = {
  args: { status: "expiring-soon", detail: "Expires in 3 days" },
};
export const Forgotten: Story = { args: { status: "forgotten" } };
export const Archived: Story = { args: { status: "archived" } };

export const AllStatuses: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {statuses.map((status) => (
        <ForgettingIndicator key={status} {...args} status={status} />
      ))}
    </div>
  ),
};
