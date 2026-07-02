import type { Meta, StoryObj } from "@storybook/react";
import { MemoryShowcase } from "../examples/MemoryShowcase";

const meta = {
  title: "Memory/Memory Showcase",
  component: MemoryShowcase,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MemoryShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
