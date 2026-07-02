# Approval interaction guidelines

Approvals are how the [human control](principles.md#3-human-control) principle becomes concrete. An approval is a deliberate pause where the agent asks a person to authorize an action before it happens. Good approvals protect the user; bad ones become noise that trains people to click "approve" without thinking.

## When to require approval

Require an explicit approval when an action is:

- **Irreversible or hard to undo** (deleting data, sending a message, spending money).
- **High-impact** (affecting other people, production systems, or money).
- **Low-confidence and consequential** (the model is unsure and the stakes are real).
- **Outside previously granted scope** (the agent wants to do something it was not asked to do).

Do **not** require approval for routine, reversible, low-impact actions. Over-gating is the fastest way to make approvals meaningless.

## Anatomy of a good approval

An approval request should let the user make an informed decision in seconds. Include:

1. **What** the agent wants to do, in plain language.
2. **Why** it wants to do it (the reasoning or triggering goal).
3. **Impact** — what will change, and whether it can be undone.
4. **Confidence** in the proposed action, where relevant.
5. **Clear choices** — at minimum approve and reject, ideally also edit or ask for changes.

## Interaction guidance

- **Default to the safe choice.** Never pre-select or auto-confirm a consequential action.
- **Make rejection first-class.** Rejecting should be as easy as approving, and should let the user say why.
- **Support "approve with edits."** Often the user agrees with the intent but wants to adjust the specifics.
- **Preview before commit.** Show the concrete result of the action, not just a description of it.
- **Preserve context.** Keep the surrounding information visible so the user is not approving blind.
- **Record the decision.** Log who approved what and when for the [action log](component-roadmap.md).

## Batching and scope

- **Batch related low-risk actions** into a single approval with an expandable list, rather than many separate prompts.
- **Never batch across risk levels.** A high-risk action must not be bundled into an approval dominated by trivial ones.
- **Offer scoped, revocable trust.** "Allow this for the next hour" or "always allow for this project" can reduce fatigue — but must be visible and easy to revoke.

## Anti-patterns

- Approval fatigue from prompting on every trivial action.
- Vague prompts ("Allow this action?") with no description of consequences.
- Dark patterns that make approval easy and rejection hard.
- Timeouts that auto-approve when the user does not respond.

## Related

- [Agent state taxonomy: Needs approval](agent-states.md)
- [Interruption and cancellation](interruption-and-cancellation.md)
- [Design principles: Human control](principles.md#3-human-control)
