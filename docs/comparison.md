# How it compares

`ai-native-interfaces` is a **domain** library: it provides the AI-specific interface vocabulary — agent state, confidence, risk, approvals, memory, execution, and human handoff — that general-purpose UI kits deliberately leave out. It is designed to sit **on top of** a general UI library, not replace one.

This page is about fit, not ranking. shadcn/ui, Radix UI, Material UI, and Chakra UI are excellent at what they do; the point below is where each shines and how this library complements it.

## At a glance

| Library                  | Layer                        | Provides                                                  | Styling                  |
| ------------------------ | ---------------------------- | --------------------------------------------------------- | ------------------------ |
| **ai-native-interfaces** | Domain (AI product surfaces) | Agent state, confidence, risk, approvals, memory, handoff | Tailwind + design tokens |
| **shadcn/ui**            | App primitives (copy-in)     | Buttons, dialogs, inputs, tables, etc.                    | Tailwind, code you own   |
| **Radix UI**             | Unstyled behavior primitives | Accessible dialog, menu, popover, etc.                    | Bring your own           |
| **Material UI (MUI)**    | Full design system           | Comprehensive components + theming (Material Design)      | Emotion / MUI system     |
| **Chakra UI**            | Styled primitives + system   | Accessible components with a style-props API              | Emotion / style props    |

## Complementary use cases

### With shadcn/ui

shadcn/ui gives you owned, Tailwind-styled primitives (Button, Dialog, Input). This library gives you the AI-specific pieces that live inside those primitives — put an `ApprovalPanel` or `DecisionSummary` inside a shadcn Dialog, or a `ConfidenceIndicator` in a shadcn Card. Both use Tailwind, so tokens and dark mode line up.

### With Radix UI

Radix provides unstyled, accessible behavior (focus management, dismissal, positioning). Use Radix for the interaction shell — a popover, a dropdown, a dialog — and drop this library's presentational components inside it. The two are orthogonal: Radix owns behavior, this library owns the AI content.

### With Material UI

If your app is built on MUI, keep MUI for layout, navigation, and forms, and use this library for the AI-native surfaces MUI doesn't model (agent state, memory transparency, handoff). Because components here are presentational and Tailwind-based, scope Tailwind's preflight so it does not fight MUI's baseline, or render these components in clearly delimited regions.

### With Chakra UI

Chakra's accessible primitives and style-props cover general UI; this library covers the AI vocabulary on top. Use Chakra for the app frame and this library for the trust, decision, and execution views.

## When this library is (and isn't) the right tool

**Reach for it when** you are building an AI or agentic product and need consistent, accessible ways to show confidence, risk, approvals, agent state, memory, or human handoff — without designing them from scratch.

**Reach for a general kit instead when** you need foundational primitives (buttons, modals, tables, form controls) or a complete visual design system. Bring one of those, then add this library for the AI-specific layer.

## Design choices that make it composable

- **Presentational only.** No backend, agent framework, or state library — it drops into any stack.
- **Tailwind + tokens.** Aligns with Tailwind-based kits; themeable via the `dark` class and token overrides.
- **Tree-shakeable, no runtime deps.** You ship only what you import; nothing conflicts at runtime.
- **Accessible by default.** Semantic HTML, keyboard support, and status conveyed by more than color.

## Related

- [Architecture](architecture.md)
- [Theming](theming.md)
- [Production hardening](production-hardening.md)
