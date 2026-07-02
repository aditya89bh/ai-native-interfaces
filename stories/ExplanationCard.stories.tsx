import type { Meta, StoryObj } from "@storybook/react";
import { ExplanationCard } from "../src/components/ExplanationCard";

const meta = {
  title: "Trust & Decision/ExplanationCard",
  component: ExplanationCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    summary:
      "Chose the express carrier so the package arrives before the deadline.",
  },
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExplanationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SummaryOnly: Story = {};

export const FullDetail: Story = {
  args: {
    evidence: (
      <ul className="list-disc pl-4">
        <li>The stated deadline is in 2 days.</li>
        <li>Standard shipping estimates 4–5 days.</li>
      </ul>
    ),
    assumptions: "The destination is a staffed business address.",
    limitations: "Live traffic and weather delays were not modeled.",
  },
};

export const Expanded: Story = {
  args: {
    ...FullDetail.args,
    defaultOpen: true,
  },
};
