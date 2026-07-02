import type { Meta, StoryObj } from "@storybook/react";
import { RiskBadge } from "../src/components/RiskBadge";
import type { RiskBadgeLevel } from "../src/components/RiskBadge";

const levels: RiskBadgeLevel[] = ["low", "moderate", "high", "critical"];

const meta = {
  title: "Trust & Decision/RiskBadge",
  component: RiskBadge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    level: { control: "inline-radio", options: levels },
    variant: { control: "inline-radio", options: ["soft", "solid", "outline"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showIcon: { control: "boolean" },
  },
  args: { level: "high" },
} satisfies Meta<typeof RiskBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Low: Story = { args: { level: "low" } };
export const Moderate: Story = { args: { level: "moderate" } };
export const High: Story = { args: { level: "high" } };
export const Critical: Story = { args: { level: "critical" } };

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <RiskBadge {...args} variant="soft" />
      <RiskBadge {...args} variant="solid" />
      <RiskBadge {...args} variant="outline" />
    </div>
  ),
};

export const AllLevels: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {levels.map((level) => (
        <RiskBadge key={level} {...args} level={level} />
      ))}
    </div>
  ),
};
