import type { Meta, StoryObj } from "@storybook/react";
import { AgentStateShowcase } from "../examples/AgentStateShowcase";

const meta = {
  title: "Agent State/Showcase",
  component: AgentStateShowcase,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AgentStateShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
