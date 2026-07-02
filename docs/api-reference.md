# API reference

Every public export of `ai-native-interfaces`, grouped by system. All components are presentational: they render the props you supply and emit events; they never call a backend or agent framework.

Types are shipped alongside the bundle. Optional props are marked with `?`.

## Entry points

| Import                            | Contains                                                |
| --------------------------------- | ------------------------------------------------------- |
| `ai-native-interfaces`            | Everything below (components, templates, theme, tokens) |
| `ai-native-interfaces/components` | Components only                                         |
| `ai-native-interfaces/templates`  | Product templates only                                  |
| `ai-native-interfaces/theme`      | `ThemeProvider`, `useTheme`                             |
| `ai-native-interfaces/tokens`     | Design tokens and token types                           |
| `ai-native-interfaces/styles.css` | CSS variable definitions for the neutral tokens         |

---

## Agent state

### `AgentAvatar`

Visual identity for an agent: image when available, initials otherwise, with an optional status dot.

| Prop         | Type                                   | Description                                 |
| ------------ | -------------------------------------- | ------------------------------------------- |
| `name`       | `string` (required)                    | Used for initials and the accessible label. |
| `src?`       | `string`                               | Image URL; falls back to initials/icon.     |
| `size?`      | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | Visual size.                                |
| `shape?`     | `"circle" \| "rounded"`                | Avatar shape.                               |
| `state?`     | `AgentState`                           | Shown as a corner status dot.               |
| `icon?`      | `ReactNode`                            | Custom fallback content.                    |
| `className?` | `string`                               | Appended to the root element.               |

### `AgentStatusCard`

A self-contained summary of an agent's current state: status indicator, label, optional detail, timestamp, and actions.

| Prop           | Type                               | Description                                      |
| -------------- | ---------------------------------- | ------------------------------------------------ |
| `state`        | `AgentState` (required)            | Current state from the taxonomy.                 |
| `name?`        | `string`                           | Card title.                                      |
| `label?`       | `string`                           | Overrides the default state label.               |
| `description?` | `string`                           | Supporting detail.                               |
| `size?`        | `"sm" \| "md" \| "lg"`             | Visual size.                                     |
| `variant?`     | `"subtle" \| "outline" \| "solid"` | Container treatment.                             |
| `animated?`    | `boolean`                          | Animate active states (respects reduced motion). |
| `icon?`        | `ReactNode`                        | Custom leading element.                          |
| `timestamp?`   | `ReactNode`                        | Shown at the end of the title row.               |
| `actions?`     | `ReactNode`                        | Trailing content, e.g. buttons.                  |
| `onClick?`     | `() => void`                       | Makes the whole card an interactive button.      |
| `className?`   | `string`                           | Appended to the root element.                    |

### `AgentCapabilityBadges`

Renders an agent's capabilities as badges (`{ label, enabled? }`), with an overflow `+N` when they exceed `max`.

### `AgentHeartbeat`

Connection health: `online`, `offline`, `reconnecting`, `degraded`. Live region (`role="status"`, `aria-live="polite"`).

### `AgentPresence`

Availability: `active`, `idle`, `away`, `unavailable`.

**Shared types:** `AgentState` (`idle | thinking | planning | acting | waiting | needsApproval | blocked | failed | completed`).

---

## Trust & decision

### `ConfidenceIndicator`

| Prop         | Type                         | Description                                   |
| ------------ | ---------------------------- | --------------------------------------------- |
| `level`      | `ConfidenceLevel` (required) | `low \| medium \| high`.                      |
| `value?`     | `number`                     | Numeric 0–100, shown in the detailed variant. |
| `label?`     | `string`                     | Overrides the default label.                  |
| `showLabel?` | `boolean`                    | Whether to render the label.                  |
| `variant?`   | `"compact" \| "detailed"`    | Dot vs three-segment meter.                   |
| `size?`      | `"sm" \| "md"`               | Visual size.                                  |
| `className?` | `string`                     | Appended to the root element.                 |

### `RiskBadge`

Communicates `low | moderate | high | critical` risk. Props: `level`, `label?`, `showIcon?`, `variant?` (`soft \| solid \| outline`), `size?` (`sm \| md`), `className?`.

### `ApprovalPanel`

Approve / reject / edit controls with optional notes and loading states.

| Prop                      | Type                                 | Description                   |
| ------------------------- | ------------------------------------ | ----------------------------- |
| `onApprove`               | `(notes: string) => void` (required) | Approve handler.              |
| `onReject`                | `(notes: string) => void` (required) | Reject handler.               |
| `onEdit?`                 | `() => void`                         | Shows an "Edit" action.       |
| `title?` / `description?` | `ReactNode`                          | Panel copy.                   |
| `allowNotes?`             | `boolean`                            | Show the notes field.         |
| `pending?`                | `"approve" \| "reject" \| null`      | Which action is in progress.  |
| `className?`              | `string`                             | Appended to the root element. |

### `ExplanationCard`

Concise summary plus expandable evidence, assumptions, and limitations (native `<details>`). Props: `summary` (required), `evidence?`, `assumptions?`, `limitations?`, `title?`, `defaultOpen?`, `className?`.

### `DecisionSummary`

At-a-glance decision view; composes `ConfidenceIndicator` and `RiskBadge`. Props: `action` (required), `confidence?`, `confidenceValue?`, `risk?`, `timestamp?`, `reasoning?`, `approvalStatus?` (`pending | approved | rejected`), `title?`, `className?`.

**Shared types:** `ConfidenceLevel`, `RiskBadgeLevel`, `DecisionApprovalStatus`.

---

## Memory

### `MemoryCard`

Props: `title` (required), `summary?`, `source?`, `timestamp?`, `confidence?`, `confidenceValue?`, `pinned?`, `onTogglePin?`, `onSelect?`, `className?`.

### `MemoryTimeline`

Chronological memories along a rail. Props: `items: MemoryTimelineItem[]` (required), `label?`, `emptyMessage?`, `className?`. `MemoryTimelineItem = { id, title, summary?, timestamp?, source?, content? }`.

### `MemoryCitation`

Source attribution and retrieval metadata. Props: `source` (required), `href?`, `excerpt?`, `retrievedAt?`, `score?` (0–1), `index?`, `className?`.

### `MemoryInfluence`

How memories affected a decision. Props: `influences: MemoryInfluenceItem[]` (required), `decision?`, `label?`, `emptyMessage?`, `className?`. `MemoryInfluenceItem = { id, label, weight (0–1), direction? }` where direction is `supporting | opposing | neutral`.

### `ForgettingIndicator`

Lifecycle: `active | expiring-soon | forgotten | archived`. Props: `status` (required), `label?`, `detail?`, `showLabel?`, `size?`, `className?`.

---

## Workflow & execution

### `TaskProgress`

`role="progressbar"` with full ARIA. Props: `value?` (0–100), `status?` (`in-progress | indeterminate | completed | failed | paused`), `label?`, `showValue?`, `size?`, `className?`.

### `ExecutionTimeline`

Sequential steps. Props: `steps: ExecutionStep[]` (required), plus `label?`, `className?`. `ExecutionStep` carries an `id`, `label`, and `status` (`pending | running | completed | failed | skipped`).

### `QueueView`

Work items grouped by status. Props: `items: QueueItem[]` (required), plus `label?`, `emptyMessage?`, `className?`. `QueueItem` status is `pending | running | completed | failed`.

### `ExecutionGraph`

Dependency graph with a hidden text description for assistive tech. Memoized (`React.memo`). Props: `nodes: ExecutionGraphNode[]`, `edges: ExecutionGraphEdge[]` (required), `label?`, `emptyMessage?`, `className?`.

### `ActionLog`

Chronological actions with actor, timestamp, and outcome. Props: `entries: ActionLogEntry[]` (required), `label?`, `emptyMessage?`, `className?`. `ActionOutcome` is `success | failure | pending | info`.

---

## Human collaboration & escalation

### `HumanHandoffCard`

A request for human intervention. Props include `reason` (required), `priority?` (`HandoffPriority`), `assignee?`, `status?` (`HandoffStatus`), `timestamp?`, `title?`, `className?`.

### `InterventionPanel`

Pause / resume / override / cancel controls. Handlers (`onPause`, `onResume`, `onOverride`, `onCancel`) are optional; controls render only when their handler is present. Supports `paused`, `pending` (an `InterventionAction`), and `disabled`.

### `FeedbackCapture`

Rating, category, and correction. Props: `onSubmit: (feedback: FeedbackValue) => void` (required); `FeedbackValue = { rating: number | null, category: string | null, correction: string }`. Also `maxRating?`, `categories?`, various labels, `submitting?`, `submitted?`, `disabled?`, `className?`.

### `EscalationBanner`

Severity banner: `info | warning | urgent | blocked`. Uses `role="alert"` for urgent/blocked, `role="status"` otherwise. Props: `severity` (required), `children` message, `title?`, `action?`, `onDismiss?`, `className?`.

### `AssignmentStatus`

Ownership/review state: `unassigned | assigned | in-review | resolved`. Props: `status` (required), `assignee?`, `label?`, `showLabel?`, `size?`, `className?`.

---

## Product templates

Full product surfaces composed from the components above. See [Product templates](product-templates.md).

| Template                          | Props type                             |
| --------------------------------- | -------------------------------------- |
| `CustomerSupportAgentTemplate`    | `CustomerSupportAgentTemplateProps`    |
| `ResearchAgentTemplate`           | `ResearchAgentTemplateProps`           |
| `CodingAgentTemplate`             | `CodingAgentTemplateProps`             |
| `OperationsAgentTemplate`         | `OperationsAgentTemplateProps`         |
| `WorkflowApprovalConsoleTemplate` | `WorkflowApprovalConsoleTemplateProps` |

Each template is presentational, forwards approval/intervention events, and (for the console) manages only which item is selected.

---

## Theme

See [Theming](theming.md).

- **`ThemeProvider`** — `{ children, defaultTheme?, storageKey?, enablePersistence?, applyToDocument?, tokenOverrides?, className? }`. Manages `light | dark | system`, reacts to the OS preference, persists the choice, and toggles the `dark` class.
- **`useTheme()`** — returns `{ theme, resolvedTheme, setTheme, toggleTheme }`. Must be used within a `ThemeProvider`.
- **Types** — `Theme`, `ResolvedTheme`, `ThemeContextValue`, `ThemeProviderProps`.

---

## Tokens

See [`src/tokens/tokens.ts`](../src/tokens/tokens.ts).

**Values:** `tokens`, `agentStateColors`, `confidenceColors`, `riskColors`, `palette`, `semanticStatus`, `spacing`, `radii`, `typography`, `elevation`, `animation`.

**Types:** `AgentState`, `ConfidenceLevel`, `RiskLevel`, `SemanticStatus`, `Palette`, `Elevation`, `Tokens`.

---

## Related

- [Production hardening](production-hardening.md)
- [Component roadmap](component-roadmap.md)
- [Components vs templates vs patterns](components-vs-templates-vs-patterns.md)
