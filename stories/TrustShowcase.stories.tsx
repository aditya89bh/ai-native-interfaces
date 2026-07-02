import type { Meta, StoryObj } from "@storybook/react";
import { TrustShowcase } from "../examples/TrustShowcase";

const meta = {
  title: "Trust & Decision/Trust Showcase",
  component: TrustShowcase,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TrustShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
