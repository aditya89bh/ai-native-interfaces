import type { Meta, StoryObj } from "@storybook/react";
import { EscalationBanner } from "../src/components/EscalationBanner";
import type { EscalationSeverity } from "../src/components/EscalationBanner";

const severities: EscalationSeverity[] = [
  "info",
  "warning",
  "urgent",
  "blocked",
];

const meta = {
  title: "Human Collaboration/EscalationBanner",
  component: EscalationBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    severity: "warning",
    children: "The agent has retried this step 3 times without success.",
  },
  argTypes: {
    severity: { control: "inline-radio", options: severities },
  },
} satisfies Meta<typeof EscalationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { severity: "info", children: "A human has joined the session." },
};
export const Warning: Story = {};
export const Urgent: Story = {
  args: {
    severity: "urgent",
    children: "Approval is required within 5 minutes to meet the SLA.",
  },
};
export const Blocked: Story = {
  args: {
    severity: "blocked",
    children: "The agent is blocked waiting for credentials.",
  },
};

export const Dismissible: Story = {
  args: { onDismiss: () => undefined },
};

export const AllSeverities: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {severities.map((severity) => (
        <EscalationBanner key={severity} {...args} severity={severity} />
      ))}
    </div>
  ),
};
