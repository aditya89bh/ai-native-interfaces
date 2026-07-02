# ai-native-interfaces

[![License: MIT](https://img.shields.io/badge/License-MIT-1e293b.svg)](LICENSE)
![React 18+](https://img.shields.io/badge/React-18%2B-0ea5e9.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8.svg)
![Storybook](https://img.shields.io/badge/Storybook-8-ff4785.svg)
![Tree-shakeable](https://img.shields.io/badge/bundle-tree--shakeable-10b981.svg)
[![Visual regression](https://github.com/aditya89bh/ai-native-interfaces/actions/workflows/visual-regression.yml/badge.svg)](.github/workflows/visual-regression.yml)

A reusable UI component library for **AI-native products** — the interface primitives that teams keep rebuilding whenever they ship an agent, assistant, or automated workflow.

![Layered architecture: design tokens support components, which compose into product templates, with theming across all layers.](docs/assets/architecture.svg)

Traditional design systems assume a human is the only actor. AI-native products introduce a second actor — the model or agent — that reasons, acts, and sometimes gets things wrong. That shift creates new interface needs: showing what an agent is doing, how confident it is, what it remembers, where the risk is, and when a human should step in.

`ai-native-interfaces` provides those primitives as composable React components.

> Status: early foundation. The API is unstable and will change before a `1.0` release. See the [component roadmap](docs/component-roadmap.md).

## What it covers

The library is organized around the recurring concerns of AI-native UX:

- **Approvals** — request, review, and confirm agent-proposed actions.
- **Confidence** — communicate how certain a model is about an output.
- **Agent state** — show whether an agent is idle, thinking, acting, waiting, or has failed.
- **Memory panels** — surface what the system remembers and let users inspect or edit it.
- **Task progress** — track multi-step agent tasks and their sub-steps.
- **Risk warnings** — flag potentially destructive or high-impact actions.
- **Action logs** — provide an auditable trail of what the agent did and why.
- **Human handoff** — hand control between the agent and a person cleanly.

## Who it is for

- **Product designers** designing agent and assistant experiences who need consistent, well-considered primitives.
- **Frontend teams** who want typed, accessible components instead of rebuilding agent UI from scratch.
- **AI product teams** shipping model-powered features that require trust, transparency, and control surfaces.
- **Agent builders** wiring up autonomous or semi-autonomous flows that need human-in-the-loop touchpoints.

## Vision

The goal is a shared vocabulary for AI-native interfaces — a set of primitives that make the model's behavior legible and keep humans in control. Concretely, the library aims to be:

- **Composable** — small primitives that combine into higher-level patterns.
- **Headless-friendly** — sensible styling out of the box, with tokens and class overrides for full control.
- **Accessible** — keyboard and screen-reader support treated as a baseline, not an add-on.
- **Trust-first** — defaults that favor transparency, reversibility, and human oversight.

The design principles behind these goals are documented in [docs/principles.md](docs/principles.md).

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Storybook](https://storybook.js.org/) for component development and documentation
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for tests

## Getting started

> Requires Node.js 18+.

```bash
# install dependencies
npm install

# run Storybook
npm run storybook

# type-check, lint, and test
npm run typecheck
npm run lint
npm run test
```

## Project structure

```
src/
  components/   # primitive AI-native components
  patterns/     # higher-level compositions of primitives
  tokens/       # design tokens (colors, spacing, radii, typography)
docs/           # principles, architecture, and roadmap
examples/       # usage examples
stories/        # Storybook stories
```

## Components

Components are grouped into systems — small, independent primitives that compose into higher-level flows.

### Agent State

Primitives for representing what an agent is and what it is doing right now: `AgentStatusCard`, `AgentAvatar`, `AgentCapabilityBadges`, `AgentHeartbeat`, and `AgentPresence`. See the [Agent State system](docs/agent-state-system.md).

### Trust & Decision

Primitives that help people understand, trust, approve, reject, or intervene in an AI decision. They are presentational: they render the data you supply and emit events, so they work across coding agents, research agents, copilots, robotics dashboards, customer support, and enterprise AI.

- **`ConfidenceIndicator`** — how certain the model is (low / medium / high, optional numeric value; compact and detailed variants).
- **`RiskBadge`** — the stakes of an action (low / moderate / high / critical).
- **`ApprovalPanel`** — approve, reject, or edit before approving, with optional notes and loading states.
- **`ExplanationCard`** — the reasoning behind a decision: summary plus expandable evidence, assumptions, and limitations.
- **`DecisionSummary`** — a decision at a glance: action, confidence, risk, timestamp, reasoning, and approval status.

```tsx
import {
  ConfidenceIndicator,
  RiskBadge,
  ApprovalPanel,
  ExplanationCard,
  DecisionSummary,
} from "ai-native-interfaces";

<DecisionSummary
  action="Refund the customer $42.00"
  confidence="high"
  risk="moderate"
  timestamp="2 minutes ago"
  reasoning="The order arrived damaged and is within the refund window."
  approvalStatus="pending"
/>;
```

See the [Trust & Decision system](docs/trust-and-decision-system.md), [composition patterns](docs/trust-composition-patterns.md), and the runnable example in `examples/TrustShowcase.tsx`.

### Memory Interfaces

Primitives that expose an AI system's memory transparently — what it remembers, why, where it came from, how it influences decisions, and what is being forgotten. They are presentational: no backend, no memory engine, only rendering the data you supply.

- **`MemoryCard`** — a single remembered item: title, summary, source, timestamp, confidence, and pinned state.
- **`MemoryTimeline`** — memories in chronological order along a rail.
- **`MemoryCitation`** — source attribution and retrieval metadata (excerpt, retrieval time, relevance score).
- **`MemoryInfluence`** — how retrieved memories supported or opposed a decision.
- **`ForgettingIndicator`** — a memory's lifecycle state: active, expiring soon, forgotten, or archived.

```tsx
import {
  MemoryCard,
  MemoryTimeline,
  MemoryCitation,
  MemoryInfluence,
  ForgettingIndicator,
} from "ai-native-interfaces";

<MemoryCard
  title="Prefers concise summaries"
  source="Conversation"
  timestamp="3 days ago"
  confidence="high"
  pinned
/>;
```

See the [Memory Interfaces system](docs/memory-interfaces-system.md), [composition patterns & transparency guidelines](docs/memory-composition-patterns.md), and the runnable example in `examples/MemoryShowcase.tsx`.

### Workflow & Execution

Primitives for visualizing how an AI task runs — progress, steps, queues, dependencies, and the actions taken. They are presentational: no backend, no agent framework, only rendering the data you supply.

- **`TaskProgress`** — progress of a single task: percentage, indeterminate, completed, failed, or paused.
- **`ExecutionTimeline`** — sequential execution steps with per-step status.
- **`QueueView`** — queued work with pending / running / completed / failed status and summary counts.
- **`ExecutionGraph`** — execution nodes and their dependencies, laid out by depth, with an accessible text description.
- **`ActionLog`** — a chronological, auditable record of actions with actor, timestamp, and outcome.

```tsx
import {
  TaskProgress,
  ExecutionTimeline,
  QueueView,
  ExecutionGraph,
  ActionLog,
} from "ai-native-interfaces";

<TaskProgress label="Indexing files" value={62} />;
```

See the [Workflow & Execution system](docs/workflow-execution-system.md), [composition patterns & execution transparency](docs/workflow-composition-patterns.md), and the runnable example in `examples/WorkflowShowcase.tsx`.

### Human Collaboration & Escalation

Primitives for the moments an AI system needs a person — asking for help, escalating, assigning ownership, intervening, and capturing feedback. They are presentational: no backend, no agent framework, no state management library, only rendering the data you supply and emitting events.

- **`HumanHandoffCard`** — a request to hand work to a person: reason, priority, assigned human, status, and timestamp.
- **`InterventionPanel`** — controls to step into a running agent: pause, resume, override, and cancel, with loading and disabled states.
- **`FeedbackCapture`** — structured human feedback: rating, category, correction text, and submit state.
- **`EscalationBanner`** — the severity of a situation: info, warning, urgent, or blocked, announced politely or assertively.
- **`AssignmentStatus`** — ownership and review state: unassigned, assigned, in review, or resolved, with an optional assignee.

```tsx
import {
  HumanHandoffCard,
  InterventionPanel,
  FeedbackCapture,
  EscalationBanner,
  AssignmentStatus,
} from "ai-native-interfaces";

<EscalationBanner severity="urgent">
  Decision needed within 5 minutes.
</EscalationBanner>;
```

See the [Human Collaboration & Escalation system](docs/human-collaboration-system.md), [composition patterns](docs/human-collaboration-composition-patterns.md), and the runnable example in `examples/CollaborationShowcase.tsx`.

### Product Templates

Complete, presentational AI product surfaces assembled from the components above. Each accepts typed, demo-ready data through props and emits events — no backend, no agent framework, no fabricated claims. They are a fast starting point: render one with mock data, then swap in your own.

- **`CustomerSupportAgentTemplate`** — a support agent proposing a ticket resolution, with escalation, approval, and action history.
- **`ResearchAgentTemplate`** — a research agent's progress, steps, sources, and synthesized finding.
- **`CodingAgentTemplate`** — a coding agent's capabilities, plan, queue, proposed change, and command history.
- **`OperationsAgentTemplate`** — robotics/industrial monitoring: health, an execution graph, a job queue, and intervention controls.
- **`WorkflowApprovalConsoleTemplate`** — a queue of decisions awaiting human approval, with a detail and approval pane.

```tsx
import { CustomerSupportAgentTemplate } from "ai-native-interfaces";

<CustomerSupportAgentTemplate
  agent={{ name: "Support agent", state: "needsApproval" }}
  resolution={{
    action: "Refund $128.40",
    confidence: "high",
    risk: "moderate",
  }}
  actions={actions}
  onApprove={(notes) => submit(notes)}
  onReject={(notes) => decline(notes)}
/>;
```

Templates are driven in Storybook by clearly fictional demo data from `src/templates/mockData.ts`, which is never shipped. See [Product Templates](docs/product-templates.md) and [Components vs templates vs patterns](docs/components-vs-templates-vs-patterns.md).

## Documentation

The design system foundation defines _how_ AI-native interfaces should behave. Start with the philosophy and principles, then use the guidelines and patterns when designing specific components.

**Foundations**

- [Philosophy](docs/philosophy.md) — the beliefs behind the library.
- [Design principles](docs/principles.md) — visibility, transparency, human control, progressive disclosure, recoverability, and trust.
- [Architecture](docs/architecture.md) — how the library is structured.
- [Component roadmap](docs/component-roadmap.md) — planned components.

**Behavior guidelines**

- [Agent state taxonomy](docs/agent-states.md)
- [Confidence scale](docs/confidence.md)
- [Uncertainty communication](docs/uncertainty.md)
- [Approval interaction guidelines](docs/approvals.md)
- [Interruption and cancellation](docs/interruption-and-cancellation.md)
- [Human handoff patterns](docs/human-handoff.md)
- [Memory visualization principles](docs/memory-visualization.md)
- [Task progress visualization](docs/task-progress.md)
- [Notification hierarchy](docs/notifications.md)
- [Accessibility guidelines](docs/accessibility.md)
- [Responsive behavior guidelines](docs/responsive.md)

**Component systems**

- [Agent State system](docs/agent-state-system.md)
- [Trust & Decision system](docs/trust-and-decision-system.md)
- [Trust component composition patterns](docs/trust-composition-patterns.md)
- [Memory Interfaces system](docs/memory-interfaces-system.md)
- [Memory composition patterns & transparency](docs/memory-composition-patterns.md)
- [Workflow & Execution system](docs/workflow-execution-system.md)
- [Workflow composition patterns & execution transparency](docs/workflow-composition-patterns.md)
- [Human Collaboration & Escalation system](docs/human-collaboration-system.md)
- [Human Collaboration composition patterns](docs/human-collaboration-composition-patterns.md)

**Product templates**

- [Product Templates](docs/product-templates.md)
- [Components vs templates vs patterns](docs/components-vs-templates-vs-patterns.md)

**Patterns and process**

- [Reusable interaction patterns](docs/interaction-patterns.md)
- [Design review checklist](docs/design-review-checklist.md)
- [Component naming conventions](docs/naming-conventions.md)

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE)
