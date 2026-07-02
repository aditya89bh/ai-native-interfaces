import type { Meta, StoryObj } from "@storybook/react";
import { ActionLog } from "../src/components/ActionLog";
import type { ActionLogEntry } from "../src/components/ActionLog";

const entries: ActionLogEntry[] = [
  {
    id: "1",
    action: "Read repository files",
    actor: "Agent",
    timestamp: "10:02:11",
    outcome: "success",
  },
  {
    id: "2",
    action: "Ran test suite",
    actor: "Tool: vitest",
    timestamp: "10:02:40",
    outcome: "success",
    detail: "103 passed",
  },
  {
    id: "3",
    action: "Called deploy API",
    actor: "Tool: deploy",
    timestamp: "10:03:05",
    outcome: "failure",
    detail: "429 rate limited",
  },
  {
    id: "4",
    action: "Waiting for approval",
    actor: "Agent",
    timestamp: "10:03:06",
    outcome: "pending",
  },
];

const meta = {
  title: "Workflow & Execution/ActionLog",
  component: ActionLog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { entries },
  decorators: [
    (Story) => (
      <div className="w-[30rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessOnly: Story = {
  args: {
    entries: entries.filter((entry) => entry.outcome === "success"),
  },
};

export const Empty: Story = {
  args: { entries: [] },
};
