# Uncertainty communication

[Confidence](confidence.md) quantifies how much to trust an output. Uncertainty communication is the qualitative counterpart: how the interface _talks about_ what it does not know. Done well, it builds trust; done poorly, it either erodes trust (overconfidence) or paralyzes the user (vagueness).

## Principles

- **Be specific about what is uncertain.** "I'm not sure about the date" is more useful than "I might be wrong about some of this."
- **Locate the uncertainty.** Attach it to the exact claim, field, or step it applies to, not to the whole response.
- **Offer a path forward.** Pair uncertainty with an action: verify, view sources, try an alternative, or ask a clarifying question.
- **Prefer plain language.** Hedge words are fine when they are honest and specific; avoid jargon and avoid false precision.

## Ways to express uncertainty

Choose the lightest form that conveys the truth:

1. **Qualified language.** "This looks like X, but the source is ambiguous."
2. **Visible confidence level.** A `low` / `medium` / `high` indicator on the claim.
3. **Ranges and alternatives.** Show a range or a short list of candidates rather than a single fragile answer.
4. **Explicit unknowns.** State directly that a value is unknown or could not be determined.
5. **Requests for clarification.** When ambiguity blocks a good answer, ask rather than guess.

## Anti-patterns

- **Confidence theater.** Presenting every output in the same authoritative tone regardless of actual certainty.
- **Blanket disclaimers.** A single "results may be inaccurate" banner that applies to everything and therefore informs nothing.
- **Weasel vagueness.** Hedging so broadly that the user cannot tell what is reliable and what is not.
- **Hiding uncertainty to look capable.** Suppressing doubt is a short-term gain and a long-term trust loss.

## Uncertainty and stakes

Calibrate how prominently you surface uncertainty to the consequences of being wrong:

- **Low stakes:** a subtle qualifier is enough.
- **Medium stakes:** show confidence and a verify affordance.
- **High stakes:** require verification or explicit acknowledgment before the user acts on the output.

## Related

- [Confidence scale](confidence.md)
- [Approval interaction guidelines](approvals.md)
- [Design principles: Transparency](principles.md#2-transparency)
