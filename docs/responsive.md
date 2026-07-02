# Responsive behavior guidelines

AI-native components appear in many contexts: a full-page assistant, a narrow sidebar, a chat bubble, an embedded widget, or a mobile screen. Responsive behavior ensures the same component stays legible and controllable across all of them without sacrificing the [visibility](principles.md#1-visibility) and [human control](principles.md#3-human-control) principles.

## Contexts to design for

- **Full width** — dashboards and dedicated assistant views.
- **Sidebar / panel** — a constrained column beside primary content.
- **Inline / embedded** — a component dropped into an existing product surface.
- **Compact / mobile** — small viewports and touch input.

Components should adapt to their _container_, not just the viewport. A component in a narrow panel on a wide screen has the same constraints as one on a phone.

## Principles

- **Preserve critical information first.** State, the current action, and safety controls (stop, approve, reject) must survive down to the smallest size. Detail is what gets progressively hidden — never the controls.
- **Prioritize, then collapse.** As space shrinks, move secondary detail behind [progressive disclosure](principles.md#4-progressive-disclosure) rather than shrinking everything uniformly.
- **Keep actions reachable.** On touch and small screens, primary actions belong within easy reach and meet minimum touch-target sizes.
- **Reflow, don't truncate meaning.** Long reasoning, logs, or step lists should scroll or collapse, not silently cut off information the user needs.

## Guidance by element

- **Agent state** must remain visible at every size; degrade from label-plus-detail to a labeled indicator, but never to nothing.
- **Approvals** keep the action summary and the approve/reject controls visible; move rationale and preview into expandable detail on small screens.
- **Progress** collapses from a full step list to a compact "step N of M" with the active step, expandable on demand.
- **Notifications** adapt placement (for example, top-anchored on mobile) while preserving severity and dismissal.

## Touch and input

- Meet minimum touch-target sizes for all controls.
- Do not rely on hover to reveal essential information or actions; hover-only affordances fail on touch.
- Ensure focus order remains logical after any responsive reflow.

## Anti-patterns

- Hiding stop, cancel, or approval controls at small sizes.
- Horizontal overflow that buries content off-screen.
- Fixed-width components that break their container.
- Hover-dependent disclosure of critical information.

## Related

- [Design principles: Progressive disclosure](principles.md#4-progressive-disclosure)
- [Accessibility guidelines](accessibility.md)
- [Notification hierarchy](notifications.md)
