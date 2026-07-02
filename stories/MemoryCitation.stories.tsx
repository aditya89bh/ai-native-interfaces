import type { Meta, StoryObj } from "@storybook/react";
import { MemoryCitation } from "../src/components/MemoryCitation";

const meta = {
  title: "Memory/MemoryCitation",
  component: MemoryCitation,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    index: 1,
    source: "onboarding-notes.md",
    excerpt: "The user prefers concise summaries over long explanations.",
    retrievedAt: "just now",
    score: 0.82,
  },
  argTypes: {
    score: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
  decorators: [
    (Story) => (
      <div className="w-[26rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MemoryCitation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLink: Story = {
  args: { href: "https://example.com/notes" },
};

export const WithoutScore: Story = {
  args: { score: undefined },
};

export const SourceOnly: Story = {
  args: {
    excerpt: undefined,
    retrievedAt: undefined,
    score: undefined,
    index: undefined,
  },
};
