# Trust component composition patterns

The [Trust & Decision components](trust-and-decision-system.md) are independent primitives. Their value compounds when composed: a person can see how sure the agent is, how risky the action is, why it decided, and what they can do about it — in one coherent flow. This document describes the patterns that recur when composing them.

All components remain presentational. In every pattern below, the application owns the data and the side effects; the components render and emit events.

## The review flow

The canonical composition pairs a summary, an explanation, and a control:

1. `DecisionSummary` — the decision at a glance (action, confidence, risk, status).
2. `ExplanationCard` — the reasoning, with evidence, assumptions, and limitations behind progressive disclosure.
3. `ApprovalPanel` — the human control to approve, reject, or edit.

```tsx
<DecisionSummary
  action="Refund the customer $42.00"
  confidence="high"
  risk="moderate"
  approvalStatus={status}
/>
<ExplanationCard summary="A refund is the lowest-friction resolution." />
<ApprovalPanel
  title="Approve this refund?"
  onApprove={approve}
  onReject={reject}
  onEdit={openEditor}
/>
```

See `examples/TrustShowcase.tsx` for a working version.

## Inline confidence and risk

`DecisionSummary` embeds `ConfidenceIndicator` and `RiskBadge`, but they also stand alone. Use them inline wherever a single value needs context:

- A `ConfidenceIndicator` next to a generated field or suggestion.
- A `RiskBadge` next to a destructive action in a list or menu.

Keep the scale consistent across a product: the same confidence thresholds and the same risk levels everywhere ([confidence scale](confidence.md)).

## Risk-gated approvals

Let risk drive how much friction an approval carries:

- **Low / moderate risk** — a plain `ApprovalPanel`, or auto-approval with an undo.
- **High risk** — require the user to read an `ExplanationCard` and add notes (`allowNotes`).
- **Critical risk** — surface the `RiskBadge` prominently and consider a typed confirmation in the surrounding UI before enabling the approve button.

The components expose the state (`pending`, `disabled`) to build these gates; the policy lives in your application.

## Confidence-gated disclosure

Use confidence to decide how much explanation to show by default:

- **High confidence** — collapse the `ExplanationCard` sections (`defaultOpen={false}`).
- **Low or medium confidence** — expand them (`defaultOpen`) so assumptions and limitations are visible before the user acts.

This applies [progressive disclosure](principles.md#4-progressive-disclosure): certainty earns brevity, uncertainty earns detail.

## Status-driven layout

Drive the surrounding UI from `DecisionApprovalStatus`:

- `pending` — show the `ApprovalPanel`.
- `approved` / `rejected` — replace the panel with a result, and reflect the outcome in the `DecisionSummary` via `approvalStatus`.

Keeping a single source of truth for status prevents the summary and the control from disagreeing.

## Loading and optimistic states

`ApprovalPanel` accepts a `pending` value (`"approve" | "reject" | null`) so the acting button can show progress while the application performs the side effect. Pair it with the summary's `approvalStatus` once the effect resolves. Avoid changing `DecisionSummary` to the final status until the action actually succeeds.

## Accessibility when composing

- Give each composed region a clear heading or `aria-label` so the structure is navigable.
- Do not nest interactive controls inside other interactive controls.
- Keep confidence, risk, and status legible without color — every Trust component already pairs color with text.

See [accessibility guidelines](accessibility.md) for the full checklist.

## Related

- [Trust & Decision system](trust-and-decision-system.md)
- [Approval interaction guidelines](approvals.md)
- [Confidence scale](confidence.md)
- [Design principles](principles.md)
