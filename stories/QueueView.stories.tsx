import type { Meta, StoryObj } from "@storybook/react";
import { QueueView } from "../src/components/QueueView";
import type { QueueItem } from "../src/components/QueueView";

const items: QueueItem[] = [
  {
    id: "1",
    label: "Resize hero image",
    status: "running",
    detail: "~3s left",
  },
  { id: "2", label: "Generate thumbnails", status: "pending" },
  { id: "3", label: "Compress assets", status: "pending" },
  { id: "4", label: "Extract palette", status: "completed" },
  { id: "5", label: "Upload to CDN", status: "failed", detail: "Timed out" },
];

const meta = {
  title: "Workflow & Execution/QueueView",
  component: QueueView,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { items },
  argTypes: {
    showCounts: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QueueView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCounts: Story = {
  args: { showCounts: false },
};

export const Empty: Story = {
  args: { items: [] },
};
