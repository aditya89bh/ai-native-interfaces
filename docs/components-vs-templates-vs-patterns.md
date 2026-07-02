# Components vs templates vs patterns

The library offers three levels of building block. They differ in scope, not quality — each is production-grade. Choosing the right level keeps your code simple and your UI consistent.

## The three levels

| Level         | Scope                     | Owns state?       | Example                                                           |
| ------------- | ------------------------- | ----------------- | ----------------------------------------------------------------- |
| **Component** | One question, one element | Minimal, local    | `ConfidenceIndicator`, `RiskBadge`, `ActionLog`, `ApprovalPanel`  |
| **Pattern**   | A small, recurring flow   | Minimal, local    | An approval flow pairing `DecisionSummary` + `ApprovalPanel`      |
| **Template**  | A whole product surface   | Only UI selection | `CustomerSupportAgentTemplate`, `WorkflowApprovalConsoleTemplate` |

All three are presentational: they render the data you pass and emit events. None call a backend, assume an agent framework, or manage application state. Templates may hold trivial view state (such as which list item is selected), the same way a component like `ApprovalPanel` holds its notes field.

## Components

A component answers a single question about an AI system: _how confident is it?_, _how risky is this?_, _what did it do?_ Reach for components when you are building a bespoke layout and want precise control. They are the vocabulary; everything else is composed from them.

Use a component when:

- You need one specific piece of information or one control.
- You are fitting AI affordances into an existing design.
- No higher-level piece matches your layout.

## Patterns

A pattern is a small, conventional combination of a few components that recurs across products — for example, showing a `DecisionSummary` above an `ApprovalPanel`, or an `EscalationBanner` above a `HumanHandoffCard`. Patterns are documented (see [interaction patterns](interaction-patterns.md) and each system's composition-patterns guide) rather than shipped as single components, so you keep full control of the markup while following a proven shape.

Use a pattern when:

- Two or three components frequently appear together.
- You want consistency without giving up layout control.
- A full template is more than you need.

## Templates

A template is a complete, opinionated product surface assembled from many components: a support console, a research view, a coding view, an operations monitor, an approval queue. Templates are the fastest way to stand up a realistic screen and a reference for how the pieces fit together.

Use a template when:

- You are prototyping or bootstrapping a new AI product surface.
- You want a working reference to learn or adapt.
- The template's shape is close to what you need — copy it, swap in your data, and trim.

Avoid a template when your layout diverges significantly; compose components (and patterns) directly instead. Because templates are built only from public components, there is never a capability you can reach through a template that you cannot reach by composing components yourself.

## How to choose

1. Start from the **surface** you need. If a template matches, begin there.
2. If you need a **recurring sub-arrangement**, apply a pattern.
3. For everything specific, drop to **components**.

You can mix levels freely: a custom page can embed a template section, apply a pattern in one panel, and use bare components elsewhere.

## Related

- [Product Templates](product-templates.md)
- [Reusable interaction patterns](interaction-patterns.md)
- [Architecture](architecture.md)
- [Component roadmap](component-roadmap.md)
