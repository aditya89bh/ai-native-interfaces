# Accessibility guidelines for AI products

Accessibility is a baseline requirement in this library, not an enhancement. This document covers general expectations and the accessibility concerns that are _specific_ to AI-native interfaces — the ones a conventional accessibility checklist misses.

The baseline: follow [WCAG 2.1](https://www.w3.org/TR/WCAG21/) AA. Everything below assumes that as a floor.

## General baseline

- **Keyboard operable.** Every interaction works without a mouse, in a logical order, with visible focus.
- **Sufficient contrast.** Text and meaningful UI meet AA contrast ratios.
- **Semantic markup.** Real headings, lists, buttons, and landmarks — not `div` soup.
- **Labels and names.** Every control has an accessible name; icons that carry meaning have text alternatives.
- **Respect user preferences.** Honor `prefers-reduced-motion` and `prefers-color-scheme`.

## AI-specific concerns

### Announce changing state

AI interfaces update themselves as the agent works. Screen-reader users must be told without losing their place.

- Use polite live regions (`aria-live="polite"`, `role="status"`) for state and progress updates.
- Reserve assertive announcements (`aria-live="assertive"`, `role="alert"`) for warnings and failures.
- Throttle updates. A rapidly changing agent state should not flood the user with announcements — announce meaningful transitions, not every tick.

### Do not encode meaning in color alone

Confidence, risk, and agent state are often color-coded. Color must never be the only signal.

- Pair every color with a text label, icon, or shape.
- Ensure status colors meet contrast requirements against their background.

### Make streaming output accessible

Token-by-token or incrementally rendered output is disorienting for assistive tech.

- Announce completion of a coherent chunk rather than every fragment.
- Provide a stable, fully rendered version once output settles.

### Keep uncertainty and confidence perceivable

The [confidence](confidence.md) and [uncertainty](uncertainty.md) signals are meaningless if a user cannot perceive them. Expose them as text, not only as a colored bar.

### Time and control

- Do not impose time limits on [approvals](approvals.md) or handoffs that could disadvantage users who need more time.
- Ensure [stop and cancel](interruption-and-cancellation.md) controls are keyboard reachable and clearly labeled at all times.

## Testing

- Navigate every flow with the keyboard only.
- Exercise flows with a screen reader, focusing on how state changes and streaming output are announced.
- Verify contrast for all status colors.
- Test with reduced-motion enabled.

## Related

- [Notification hierarchy](notifications.md)
- [Confidence scale](confidence.md)
- [Design principles: Visibility](principles.md#1-visibility)
