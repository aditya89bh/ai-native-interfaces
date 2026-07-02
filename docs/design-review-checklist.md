# Design review checklist for AI interfaces

A practical checklist for reviewing an AI-native interface against this design system. Use it during design critique and before shipping. It turns the [principles](principles.md) into concrete, answerable questions.

Not every item applies to every surface. Treat unanswered "no" responses as findings to justify or fix, not automatic blockers.

## Visibility

- [ ] Is the agent's current state always visible using the [state taxonomy](agent-states.md)?
- [ ] Is there clear feedback for anything that takes more than a moment?
- [ ] For multi-step work, can the user tell which step is active?
- [ ] Are ambiguous, catch-all spinners avoided?

## Transparency

- [ ] Can the user see _why_ the agent did or proposed something?
- [ ] Is [confidence](confidence.md) shown where it affects trust, and only when real?
- [ ] Is [uncertainty](uncertainty.md) expressed honestly rather than hidden?
- [ ] Is there an inspectable record of actions taken?

## Human control

- [ ] Are consequential or irreversible actions gated behind [approval](approvals.md)?
- [ ] Can the user [pause, interrupt, or cancel](interruption-and-cancellation.md) at any time?
- [ ] Is a stop control reachable whenever the agent is active?
- [ ] Are [handoffs](human-handoff.md) explicit in both directions, with visible ownership?

## Progressive disclosure

- [ ] Does the default view lead with a clear summary?
- [ ] Is full detail (reasoning, logs, data) available on demand rather than dumped up front?
- [ ] Is interruption reserved for information that truly needs it ([notifications](notifications.md))?

## Recoverability

- [ ] Are impactful actions previewable before they execute?
- [ ] Is undo available where feasible, and are irreversible actions clearly flagged?
- [ ] On failure, is there a clear recovery path (retry, edit, escalate)?
- [ ] Are side effects disclosed when work is stopped or fails?

## Trust and honesty

- [ ] Does the interface avoid fabricating data, confidence, or outcomes?
- [ ] Does the same signal always mean the same thing across the product?
- [ ] Are limits and errors acknowledged openly?

## Accessibility

- [ ] Is every flow fully keyboard operable with visible focus?
- [ ] Is meaning conveyed by more than color alone?
- [ ] Are state changes and streaming output announced appropriately to assistive tech?
- [ ] Are motion and color-scheme preferences respected?

(See [accessibility guidelines](accessibility.md) for the full set.)

## Responsiveness

- [ ] Do state and safety controls survive down to the smallest supported size?
- [ ] Does secondary detail collapse gracefully rather than truncating meaning?
- [ ] Are actions reachable and appropriately sized for touch?

(See [responsive behavior guidelines](responsive.md).)

## Consistency

- [ ] Are state names, confidence levels, and colors used per the shared vocabulary?
- [ ] Do component and prop names follow the [naming conventions](naming-conventions.md)?

## Related

- [Design principles](principles.md)
- [Reusable interaction patterns](interaction-patterns.md)
