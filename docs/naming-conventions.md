# Component naming conventions

Consistent names make a component library learnable. If a developer can guess the name of a component and its props, the library is doing its job. These conventions apply across `components/`, `patterns/`, and `tokens/`.

## Guiding ideas

- **Name for the concept, not the implementation.** `ConfidenceMeter`, not `ColoredBar`.
- **Prefer domain language.** Use the vocabulary from the [agent state taxonomy](agent-states.md), [confidence scale](confidence.md), and principles docs.
- **Be predictable over clever.** Boring, guessable names beat memorable ones.

## Components

- **PascalCase** for component names: `AgentStatusCard`, `ApprovalRequest`.
- **Singular** unless the component inherently represents a collection: `ActionLog` (the log) vs. `ActionLogEntry` (one entry).
- **Suffix by role** so intent is obvious:
  - `...Card` — a self-contained summary surface.
  - `...Panel` — a larger, often side-anchored container.
  - `...Badge` — a compact inline status indicator.
  - `...Meter` / `...Bar` — a quantitative indicator.
  - `...Banner` — a prominent, full-width message.
  - `...Request` — a prompt asking the user to decide.
  - `...Controls` — a grouped set of actions.
- **Group multi-part components** under a shared prefix: `TaskProgress`, `TaskStep`.

## Files and folders

- One component per folder: `src/components/AgentStatusCard/`.
- Implementation file matches the component: `AgentStatusCard.tsx`.
- Co-locate `index.ts` (barrel), `*.test.tsx`, and stories with the component.
- Story files use `<Component>.stories.tsx`; tests use `<Component>.test.tsx`.

## Props

- **camelCase** prop names: `state`, `confidenceLevel`, `onApprove`.
- **Event handlers** are `on<Event>`: `onApprove`, `onReject`, `onCancel`, `onHandoff`.
- **Booleans** read as positive statements: `isLoading`, `disabled`, `showReasoning` — avoid negatives like `notEditable`.
- **Enumerated props** use the canonical vocabulary and are typed as unions (for example `AgentState`, `ConfidenceLevel`, `RiskLevel`).
- **`className`** is accepted for style overrides; a single style-escape hatch, consistently named.

## Types and tokens

- **Types/interfaces** in PascalCase; a component's props type is `<Component>Props`.
- **Token groups** are camelCase objects (`agentStateColors`, `semanticStatus`); keys use the domain vocabulary.
- **State/level keys** match their documented taxonomy exactly (`needsApproval`, not `awaitingApproval`).

## Consistency with documentation

Names in code must match the terms used in the docs. If the taxonomy says `blocked`, the code, props, labels, and stories say `blocked` too. Divergence between docs and code is treated as a bug (see the [design review checklist](design-review-checklist.md)).

## Related

- [Architecture](architecture.md)
- [Contributing guide](../CONTRIBUTING.md)
- [Component roadmap](component-roadmap.md)
