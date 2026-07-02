# Design principles

Six principles operationalize the [AI-native interface philosophy](philosophy.md). Every component and guideline in this repository should uphold them. Each principle below includes what it means, why it matters, how to apply it, and common anti-patterns to avoid.

Order matters only loosely, but the principles reinforce one another: visibility enables transparency, transparency enables trust, and human control depends on all three.

## 1. Visibility

**What it means.** The state of the system is always observable. Users can see what the agent is doing right now — idle, thinking, acting, waiting, or failed — without guessing.

**Why it matters.** A non-deterministic system that gives no feedback feels broken or frozen. Visibility replaces anxiety with situational awareness and is the precondition for every other principle.

**How to apply it.**

- Represent agent state explicitly with a defined [state taxonomy](agent-states.md), not a generic spinner.
- Show progress for anything that takes more than a moment.
- Make the current step of a multi-step task identifiable at a glance.

**Avoid.**

- Ambiguous loading states that could mean "working," "stuck," or "done."
- Hiding activity that has real consequences for the user.

## 2. Transparency

**What it means.** The system reveals not just _what_ it is doing but _why_ — its reasoning, its inputs, its confidence, and the actions it has taken.

**Why it matters.** Users cannot evaluate or correct a decision they cannot inspect. Transparency turns a black box into a collaborator whose work can be checked.

**How to apply it.**

- Surface the reasoning or sources behind a consequential output when the user asks for them.
- Communicate [confidence](confidence.md) and [uncertainty](uncertainty.md) honestly.
- Keep an inspectable record of actions the agent has taken.

**Avoid.**

- Presenting outputs as authoritative when they are uncertain.
- Burying the "why" so deep that no one finds it.

## 3. Human control

**What it means.** The human is the final authority. They can approve, reject, pause, redirect, interrupt, or take over at any time.

**Why it matters.** Delegation only works when it can be revoked. Without a reliable way to intervene, automation becomes something that happens _to_ the user rather than _for_ them.

**How to apply it.**

- Gate consequential or irreversible actions behind explicit [approval](approvals.md).
- Provide clear [interruption and cancellation](interruption-and-cancellation.md) controls.
- Make [human handoff](human-handoff.md) explicit and bidirectional.

**Avoid.**

- Autonomous actions with no off switch.
- Approvals that are so frequent or vague they become reflexive clicks.

## 4. Progressive disclosure

**What it means.** Show the right amount of information at the right time. Start with a clear summary and let users drill into detail on demand.

**Why it matters.** Transparency and simplicity appear to conflict; progressive disclosure resolves the tension. It keeps the default view calm while making full detail available to those who need it.

**How to apply it.**

- Lead with a concise, human-readable summary of state or results.
- Offer expandable detail: reasoning, logs, raw data, and alternatives.
- Reserve interruptions for information that genuinely requires immediate attention (see [notification hierarchy](notifications.md)).

**Avoid.**

- Dumping raw model output or full logs into the primary view.
- Hiding critical information behind so many layers that it is effectively invisible.

## 5. Recoverability

**What it means.** Users can undo, reverse, or safely recover from the agent's actions and their own. Mistakes are expected and designed for.

**Why it matters.** Because the agent is fallible and acts on the user's behalf, the cost of a wrong action must be low. Recoverability is what makes it safe to let an agent act at all.

**How to apply it.**

- Prefer preview-then-confirm over immediate execution for impactful actions.
- Offer undo where technically possible; where it is not, warn clearly and require confirmation (see [risk warnings](component-roadmap.md)).
- Keep an action history that supports review and, where feasible, rollback.

**Avoid.**

- Irreversible actions triggered without confirmation.
- "Are you sure?" dialogs that carry no real information about consequences.

## 6. Trust

**What it means.** Trust is the outcome of the other five principles working together. A trustworthy interface is honest, legible, controllable, and forgiving — consistently, over time.

**Why it matters.** Trust is the currency of AI products. It is slow to earn and fast to lose. A single instance of hidden state, overstated confidence, or an unrecoverable mistake can undo months of goodwill.

**How to apply it.**

- Be honest by construction: never fabricate data, confidence, or outcomes.
- Be consistent: the same signal should always mean the same thing.
- Be humble: acknowledge limits, errors, and uncertainty openly.

**Avoid.**

- Optimizing for the appearance of competence over actual reliability.
- Inconsistent behavior that forces users to relearn the system.

## Applying the principles

These principles are defaults, not dogma. When they conflict, favor the one that best preserves the human's understanding and control. The [design review checklist](design-review-checklist.md) turns these principles into concrete questions you can ask of any AI-native interface.
