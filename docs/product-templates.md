# Product Templates

Product Templates are complete, reusable AI product surfaces assembled from the library's [components](../src/components). Where a component answers one question ("how confident is it?") and a pattern connects a few of them, a template lays out a whole screen for a specific kind of AI product: a support agent, a research agent, a coding agent, an operations/robotics monitor, and a workflow approval console.

Templates are presentational, exactly like the components they compose. They accept typed, demo-ready data through props and emit events; they make no backend calls, assume no agent framework, and hold no application state beyond what their child components manage. They exist to show how the pieces fit into a real layout and to give teams a running starting point.

## Templates

| Template                          | Product surface                                     | Composes (selected)                                                                                                                           |
| --------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `CustomerSupportAgentTemplate`    | A support agent proposing a resolution to a ticket  | `AgentStatusCard`, `AssignmentStatus`, `EscalationBanner`, `DecisionSummary`, `ApprovalPanel`, `ActionLog`                                    |
| `ResearchAgentTemplate`           | A research agent gathering sources and synthesizing | `AgentStatusCard`, `TaskProgress`, `ExecutionTimeline`, `MemoryCitation`, `ExplanationCard`, `ConfidenceIndicator`                            |
| `CodingAgentTemplate`             | A coding agent planning and proposing a change      | `AgentStatusCard`, `AgentCapabilityBadges`, `TaskProgress`, `ExecutionTimeline`, `QueueView`, `DecisionSummary`, `ApprovalPanel`, `ActionLog` |
| `OperationsAgentTemplate`         | Robotics/industrial execution monitoring            | `AgentStatusCard`, `AgentHeartbeat`, `AgentPresence`, `EscalationBanner`, `ExecutionGraph`, `QueueView`, `InterventionPanel`, `ActionLog`     |
| `WorkflowApprovalConsoleTemplate` | A queue of decisions awaiting human approval        | `DecisionSummary`, `RiskBadge`, `AssignmentStatus`, `ApprovalPanel`, `HumanHandoffCard`                                                       |

## Design conventions

- **Presentational only.** Templates render the data you supply and forward events (`onApprove`, `onPause`, `onSelect`). They never fetch, persist, or act.
- **Typed, data-in props.** Each template exports a props interface (for example `CustomerSupportAgentTemplateProps`) plus the shapes of the data it expects, so applications can type their own data against it.
- **Mock data, honestly labeled.** The examples and stories are driven by clearly fictional demo data from `src/templates/mockData.ts`. Nothing here implies real usage, customers, or benchmarks.
- **Composition over configuration.** Templates lean on the components' existing props rather than re-implementing behavior. Anything a component can already do, the template exposes by passing data through.
- **Responsive.** Templates use fluid, wrapping layouts (single column on narrow screens, multi-column on wide ones) and never assume a fixed width.
- **Accessible.** Templates use landmark and heading structure (`<section>`, `<header>`, headings tied to regions) so the composed surface is navigable, and inherit each component's built-in accessibility.

## When to use a template

- **Prototyping** a new AI product surface and wanting a realistic starting layout.
- **Learning** how the components are intended to compose.
- **Extracting** a section: copy a template, replace the mock data with your own, and remove what you do not need.

For anything more bespoke, drop down to [components](component-roadmap.md) and [patterns](interaction-patterns.md). See [Components vs templates vs patterns](components-vs-templates-vs-patterns.md) for how to choose.

## Related

- [Components vs templates vs patterns](components-vs-templates-vs-patterns.md)
- [Architecture](architecture.md)
- [Design principles](principles.md)
- [Accessibility guidelines](accessibility.md)
