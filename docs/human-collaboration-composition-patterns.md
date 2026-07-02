# Human Collaboration composition patterns

The [Human Collaboration & Escalation components](human-collaboration-system.md) are independent primitives for the moments an AI system needs a person. Composed well, they let someone notice a situation, understand it, take ownership, step in, and leave feedback — the full arc of an intervention. This document covers the recurring composition patterns and the guidelines that should govern them.

All components are presentational. In every pattern, the application owns the data and the side effects; the components render and emit events.

## Collaboration guidelines

1. **Make severity honest.** Match `EscalationBanner` severity to real urgency. Reserve `urgent` and `blocked` (which announce assertively) for situations that genuinely cannot wait; overuse trains people to ignore them.
2. **Say why a human is needed.** A handoff without a reason is noise. `HumanHandoffCard` should always carry a concrete `reason` and, when it matters, a `priority`.
3. **Keep control reachable.** Intervention controls (pause, cancel, override) should be present whenever an agent is acting on the user's behalf, not buried behind a menu ([human control](principles.md#3-human-control)).
4. **Make destructive actions distinct.** Cancel is styled apart from pause and resume. Confirm before irreversible actions in the surrounding application.
5. **Close the loop with feedback.** After a correction or override, offer `FeedbackCapture` so the intervention becomes a signal, not just a fix.
6. **Track ownership explicitly.** `AssignmentStatus` should move through `unassigned → assigned → in-review → resolved` as the work changes hands, so no request silently stalls.
7. **Never rely on color alone.** Priority, severity, and assignment state all pair color with text or an icon ([accessibility](accessibility.md)).

## Pattern: the escalation surface

Lead with the alarm, then the detail, then the controls:

```tsx
<EscalationBanner severity="urgent">Decision needed within 5 minutes.</EscalationBanner>
<HumanHandoffCard reason="Refund exceeds the agent's limit." priority="high" status="pending" />
<InterventionPanel paused onResume={resume} onOverride={override} onCancel={cancel} />
```

The banner draws attention, the card explains the situation, and the panel offers the response.

## Pattern: handoff plus assignment

A `HumanHandoffCard` describes _what_ needs a person; an `AssignmentStatus` tracks _who_ has it and _where_ it is. Drive both from the same status vocabulary in your application so a handoff marked `resolved` and its assignment marked `resolved` never disagree. Place `AssignmentStatus` in a header or list row for scannability, and the fuller `HumanHandoffCard` in the detail view.

## Pattern: intervene, then capture feedback

Pair `InterventionPanel` with `FeedbackCapture`. When a human overrides or cancels, prompt them for a rating, category, and correction so the reason for the intervention is recorded. Feed the submitted `FeedbackValue` into your own store or an `ActionLog` for an auditable trail.

## Pattern: escalation inside another component

An `EscalationBanner` composes into other surfaces to draw attention where the problem is:

- Above an `AgentStatusCard` when the agent is blocked.
- Inside a `DecisionSummary` when a decision needs review before it is approved.
- Heading a `HumanHandoffCard` to emphasize a high-priority handoff.

## Pattern: responsive layout

These components adapt to their container:

- Let `EscalationBanner` and `HumanHandoffCard` span the full width; they reflow their content and actions.
- Put `InterventionPanel` and `FeedbackCapture` side by side on wide screens and stacked on narrow ones.
- Keep `AssignmentStatus` compact so it fits in table rows and headers; use `size="sm"` in dense lists.

## Related

- [Human Collaboration & Escalation system](human-collaboration-system.md)
- [Human handoff patterns](human-handoff.md)
- [Interruption and cancellation](interruption-and-cancellation.md)
- [Accessibility guidelines](accessibility.md)
- [Design principles](principles.md)
