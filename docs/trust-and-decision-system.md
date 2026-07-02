# Trust & Decision system

The Trust & Decision system is a set of presentational components that help people understand, trust, approve, reject, or intervene in an AI decision. They are generic building blocks — usable across coding agents, research agents, copilots, robotics dashboards, customer support, and enterprise AI — because they render the data an application supplies and emit events, nothing more.

They operationalize the [transparency](principles.md#2-transparency), [human control](principles.md#3-human-control), and [trust](principles.md#6-trust) principles.

## Scope

The system answers the questions a person asks before acting on an AI decision:

- **How sure is it?** — `ConfidenceIndicator` ([confidence scale](confidence.md)).
- **How dangerous is it?** — `RiskBadge`.
- **Can I approve, reject, or edit it?** — `ApprovalPanel` ([approval guidelines](approvals.md)).
- **Why did it decide this?** — `ExplanationCard` ([uncertainty](uncertainty.md)).
- **What is the decision, at a glance?** — `DecisionSummary`.

## Components

| Component             | Represents                          | Primary inputs                                                   |
| --------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `ConfidenceIndicator` | How certain the model is            | `low` / `medium` / `high`, optional numeric value.               |
| `RiskBadge`           | The stakes of an action             | `low` / `moderate` / `high` / `critical`.                        |
| `ApprovalPanel`       | The approve / reject / edit control | Callbacks, optional notes, loading state.                        |
| `ExplanationCard`     | The reasoning behind a decision     | Summary plus evidence, assumptions, and limitations.             |
| `DecisionSummary`     | A decision at a glance              | Action, confidence, risk, timestamp, reasoning, approval status. |

## Design conventions

All components in this system share conventions so they compose predictably:

- **Presentational only.** No component talks to a backend, AI SDK, or agent framework. They accept data and emit events (`onApprove`, `onReject`, `onEdit`).
- **Fully typed APIs.** Levels use shared or clearly named union types; every prop is documented with TSDoc.
- **Honesty by construction.** Components render the confidence, risk, and reasoning they are given. They never fabricate or infer these values — that is the application's responsibility.
- **Never color alone.** Confidence, risk, and status pair color with a text label or icon, and expose accessible names ([accessibility](accessibility.md)).
- **Design tokens.** Colors come from `confidenceColors`, `riskColors`, and `semanticStatus` in `src/tokens`.
- **Keyboard and semantics.** Interactive controls use native elements (`button`, `textarea`, `details`) so keyboard support and semantics come for free.
- **Responsive.** Components adapt to their container; content wraps or collapses rather than overflowing.

## Composition

The components are independent but designed to nest. A `DecisionSummary` embeds a `ConfidenceIndicator` and a `RiskBadge`; an approval flow pairs an `ExplanationCard` and a `DecisionSummary` inside an `ApprovalPanel`. See [Trust component composition patterns](trust-composition-patterns.md) and the showcase example (`examples/TrustShowcase.tsx`).

## Related

- [Confidence scale](confidence.md)
- [Approval interaction guidelines](approvals.md)
- [Uncertainty communication](uncertainty.md)
- [Design principles](principles.md)
