import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionGraph } from "../src/components/ExecutionGraph";
import type {
  ExecutionGraphEdge,
  ExecutionGraphNode,
} from "../src/components/ExecutionGraph";

const nodes: ExecutionGraphNode[] = [
  { id: "fetch", label: "Fetch data", status: "completed" },
  { id: "parse", label: "Parse", status: "completed" },
  { id: "validate", label: "Validate", status: "running" },
  { id: "enrich", label: "Enrich", status: "pending" },
  { id: "store", label: "Store", status: "pending" },
];

const edges: ExecutionGraphEdge[] = [
  { from: "fetch", to: "parse" },
  { from: "parse", to: "validate" },
  { from: "parse", to: "enrich" },
  { from: "validate", to: "store" },
  { from: "enrich", to: "store" },
];

const meta = {
  title: "Workflow & Execution/ExecutionGraph",
  component: ExecutionGraph,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { nodes, edges },
} satisfies Meta<typeof ExecutionGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Linear: Story = {
  args: {
    nodes: [
      { id: "a", label: "Plan", status: "completed" },
      { id: "b", label: "Execute", status: "running" },
      { id: "c", label: "Verify", status: "pending" },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
    ],
  },
};

export const WithFailure: Story = {
  args: {
    nodes: [
      { id: "a", label: "Build", status: "completed" },
      { id: "b", label: "Test", status: "failed" },
      { id: "c", label: "Deploy", status: "skipped" },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
    ],
  },
};

export const Empty: Story = {
  args: { nodes: [], edges: [] },
};
