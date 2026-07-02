import type { Meta, StoryObj } from "@storybook/react";
import { ResearchAgentTemplate } from "../src/templates";
import {
  researchAgent,
  researchFinding,
  researchProgress,
  researchSources,
  researchSteps,
} from "../src/templates/mockData";

const meta = {
  title: "Product Templates/ResearchAgentTemplate",
  component: ResearchAgentTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    agent: researchAgent,
    progress: researchProgress,
    steps: researchSteps,
    sources: researchSources,
    finding: researchFinding,
  },
} satisfies Meta<typeof ResearchAgentTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoProgressBar: Story = {
  args: { progress: undefined },
};
