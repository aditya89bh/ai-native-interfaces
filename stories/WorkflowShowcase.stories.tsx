import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowShowcase } from "../examples/WorkflowShowcase";

const meta = {
  title: "Workflow & Execution/Workflow Showcase",
  component: WorkflowShowcase,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorkflowShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
