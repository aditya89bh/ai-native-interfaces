import type { ReactNode } from "react";
import type { AgentState, ConfidenceLevel } from "../../tokens";
import { cn } from "../../utils/cn";
import {
  AgentStatusCard,
  ConfidenceIndicator,
  ExecutionTimeline,
  ExplanationCard,
  MemoryCitation,
  TaskProgress,
} from "../../components";
import type { ExecutionStep } from "../../components";

export interface ResearchAgentInfo {
  name: string;
  state: AgentState;
  description?: string;
  timestamp?: ReactNode;
}

export interface ResearchSourceItem {
  source: string;
  href?: string;
  excerpt?: ReactNode;
  retrievedAt?: ReactNode;
  score?: number;
}

export interface ResearchFinding {
  summary: ReactNode;
  evidence?: ReactNode;
  assumptions?: ReactNode;
  limitations?: ReactNode;
  confidence?: ConfidenceLevel;
  confidenceValue?: number;
}

export interface ResearchAgentTemplateProps {
  /** The research agent. */
  agent: ResearchAgentInfo;
  /** Overall completion percentage (0–100). */
  progress?: number;
  /** The research steps, in order. */
  steps: ExecutionStep[];
  /** The sources gathered, shown as citations. */
  sources: ResearchSourceItem[];
  /** The synthesized finding and its supporting detail. */
  finding: ResearchFinding;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ResearchAgentTemplate
 *
 * A complete research-agent surface: the agent's status, overall progress, the
 * research steps, the sources it gathered (as citations), and the synthesized
 * finding with its confidence, evidence, assumptions, and limitations. It
 * composes library components and is fully presentational.
 *
 * @example
 * ```tsx
 * <ResearchAgentTemplate
 *   agent={{ name: "Research agent", state: "acting" }}
 *   progress={72}
 *   steps={steps}
 *   sources={sources}
 *   finding={{ summary: "…", confidence: "medium" }}
 * />
 * ```
 */
export function ResearchAgentTemplate({
  agent,
  progress,
  steps,
  sources,
  finding,
  className,
}: ResearchAgentTemplateProps) {
  return (
    <section
      aria-label="Research agent"
      className={cn("mx-auto max-w-4xl space-y-6 p-4 sm:p-6", className)}
    >
      <header className="space-y-4">
        <AgentStatusCard
          name={agent.name}
          state={agent.state}
          description={agent.description}
          timestamp={agent.timestamp}
        />
        {progress !== undefined ? (
          <TaskProgress label="Overall progress" value={progress} />
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="research-steps-heading" className="space-y-2">
          <h3
            id="research-steps-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Steps
          </h3>
          <ExecutionTimeline steps={steps} />
        </section>

        <section
          aria-labelledby="research-sources-heading"
          className="space-y-2"
        >
          <h3
            id="research-sources-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Sources
          </h3>
          <ol className="space-y-2">
            {sources.map((item, index) => (
              <li key={`${item.source}-${index}`}>
                <MemoryCitation
                  index={index + 1}
                  source={item.source}
                  href={item.href}
                  excerpt={item.excerpt}
                  retrievedAt={item.retrievedAt}
                  score={item.score}
                />
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="research-finding-heading" className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3
            id="research-finding-heading"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Finding
          </h3>
          {finding.confidence ? (
            <ConfidenceIndicator
              level={finding.confidence}
              value={finding.confidenceValue}
            />
          ) : null}
        </div>
        <ExplanationCard
          title="Synthesis"
          summary={finding.summary}
          evidence={finding.evidence}
          assumptions={finding.assumptions}
          limitations={finding.limitations}
        />
      </section>
    </section>
  );
}
