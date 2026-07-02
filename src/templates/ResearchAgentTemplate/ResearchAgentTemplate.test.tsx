import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResearchAgentTemplate } from "./ResearchAgentTemplate";
import {
  researchAgent,
  researchFinding,
  researchProgress,
  researchSources,
  researchSteps,
} from "../mockData";

function renderTemplate(progress: number | undefined = researchProgress) {
  return render(
    <ResearchAgentTemplate
      agent={researchAgent}
      progress={progress}
      steps={researchSteps}
      sources={researchSources}
      finding={researchFinding}
    />,
  );
}

describe("ResearchAgentTemplate", () => {
  it("renders the labelled surface and its regions", () => {
    renderTemplate();
    expect(
      screen.getByRole("region", { name: "Research agent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Steps")).toBeInTheDocument();
    expect(screen.getByText("Sources")).toBeInTheDocument();
    expect(screen.getByText("Finding")).toBeInTheDocument();
  });

  it("renders the overall progress bar and hides it without a value", () => {
    const { rerender } = renderTemplate();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    rerender(
      <ResearchAgentTemplate
        agent={researchAgent}
        steps={researchSteps}
        sources={researchSources}
        finding={researchFinding}
      />,
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("renders each source as a citation", () => {
    renderTemplate();
    for (const item of researchSources) {
      expect(screen.getByText(item.source)).toBeInTheDocument();
    }
  });

  it("renders the synthesized finding summary", () => {
    renderTemplate();
    expect(
      screen.getByText(researchFinding.summary as string),
    ).toBeInTheDocument();
  });

  it("renders the confidence indicator for the finding", () => {
    renderTemplate();
    expect(screen.getByText("Medium confidence")).toBeInTheDocument();
  });
});
