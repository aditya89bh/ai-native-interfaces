# Component roadmap

This roadmap describes the intended scope of the library. It is a plan, not a guarantee — priorities and APIs will change as the foundation matures. Statuses reflect the current state of the repository.

Legend: `planned` · `in progress` · `available`

## Foundation

| Item | Status | Notes |
| --- | --- | --- |
| Project scaffolding (React + TS + Tailwind + Storybook) | in progress | Established in Phase 1. |
| Design tokens | in progress | Initial color, spacing, radii, and typography scales. |
| `AgentStatusCard` (placeholder) | in progress | First component; API will evolve. |

## Agent state

| Component | Status | Purpose |
| --- | --- | --- |
| `AgentStatusCard` | in progress | Compact summary of an agent's current state. |
| `AgentStateBadge` | planned | Inline indicator for idle / thinking / acting / waiting / error. |
| `AgentActivityTimeline` | planned | Chronological view of agent activity. |

## Confidence

| Component | Status | Purpose |
| --- | --- | --- |
| `ConfidenceMeter` | planned | Visualize a model's confidence in an output. |
| `ConfidenceBadge` | planned | Compact low / medium / high label. |

## Approvals

| Component | Status | Purpose |
| --- | --- | --- |
| `ApprovalRequest` | planned | Present an agent-proposed action for review. |
| `ApprovalControls` | planned | Approve / reject / edit controls with reasons. |

## Risk

| Component | Status | Purpose |
| --- | --- | --- |
| `RiskWarning` | planned | Flag destructive or high-impact actions. |
| `RiskBadge` | planned | Compact low / medium / high / critical label. |

## Memory

| Component | Status | Purpose |
| --- | --- | --- |
| `MemoryPanel` | planned | Show what the system remembers. |
| `MemoryItem` | planned | Inspect and edit a single remembered fact. |

## Task progress

| Component | Status | Purpose |
| --- | --- | --- |
| `TaskProgress` | planned | Track a multi-step agent task. |
| `TaskStep` | planned | A single step with its status. |

## Action logs

| Component | Status | Purpose |
| --- | --- | --- |
| `ActionLog` | planned | Auditable trail of agent actions. |
| `ActionLogEntry` | planned | A single logged action with context. |

## Human handoff

| Component | Status | Purpose |
| --- | --- | --- |
| `HandoffBanner` | planned | Signal that a human should take over. |
| `HandoffControls` | planned | Pause, resume, or transfer control. |

## Patterns

Higher-level compositions built from the primitives above, for example an end-to-end approval flow that combines a risk warning, confidence indicator, and human handoff. These are added once their underlying primitives are available.
