import type { Meta, StoryObj } from "@storybook/react";
import { AgentCapabilityBadges } from "../src/components/AgentCapabilityBadges";

const capabilities = [
  { label: "Web search" },
  { label: "Code execution" },
  { label: "File access" },
  { label: "Email", enabled: false },
  { label: "Calendar" },
  { label: "Payments", enabled: false },
];

const meta = {
  title: "Agent State/AgentCapabilityBadges",
  component: AgentCapabilityBadges,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    max: { control: "number" },
  },
  args: { capabilities },
} satisfies Meta<typeof AgentCapabilityBadges>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDisabled: Story = {
  args: {
    capabilities: [
      { label: "Web search" },
      { label: "Code execution" },
      { label: "File access", enabled: false },
    ],
  },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const WithOverflow: Story = {
  args: { max: 3 },
};

export const WithIcons: Story = {
  args: {
    capabilities: [
      { label: "Search", icon: <span aria-hidden="true">S</span> },
      { label: "Run", icon: <span aria-hidden="true">R</span> },
      {
        label: "Files",
        icon: <span aria-hidden="true">F</span>,
        enabled: false,
      },
    ],
  },
};
