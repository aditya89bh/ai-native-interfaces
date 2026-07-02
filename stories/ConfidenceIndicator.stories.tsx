import type { Meta, StoryObj } from "@storybook/react";
import { ConfidenceIndicator } from "../src/components/ConfidenceIndicator";
import type { ConfidenceLevel } from "../src/tokens";

const levels: ConfidenceLevel[] = ["low", "medium", "high"];

const meta = {
  title: "Trust & Decision/ConfidenceIndicator",
  component: ConfidenceIndicator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    level: { control: "inline-radio", options: levels },
    variant: { control: "inline-radio", options: ["compact", "detailed"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showLabel: { control: "boolean" },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: { level: "high" },
} satisfies Meta<typeof ConfidenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {};

export const Medium: Story = { args: { level: "medium" } };

export const Low: Story = { args: { level: "low" } };

export const WithValue: Story = {
  args: { level: "medium", value: 62 },
};

export const Compact: Story = {
  args: { level: "high", variant: "compact" },
};

export const AllLevels: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {levels.map((level) => (
        <ConfidenceIndicator key={level} {...args} level={level} />
      ))}
    </div>
  ),
};
