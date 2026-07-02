# Notification hierarchy

AI-native products generate a lot of things worth saying: state changes, results, approvals, warnings, failures. Without a hierarchy, everything competes for attention and the truly important gets lost. A clear notification hierarchy is how the [calm-not-alarming tenet](philosophy.md#design-tenets) and [progressive disclosure](principles.md#4-progressive-disclosure) are enforced.

The core rule: **match the loudness of a signal to the true consequence of ignoring it.**

## Levels

From quietest to loudest:

| Level        | Use for                                                        | Interrupts user? | Persists? |
| ------------ | ------------------------------------------------------------- | ---------------- | --------- |
| Ambient      | Ongoing state (agent is `thinking`, `acting`).                | No               | While true |
| Informational | Something completed successfully; low-stakes updates.        | No               | Briefly   |
| Notice       | Something worth knowing that may need eventual action.        | No               | Until seen |
| Action needed | The agent is blocked or needs [approval](approvals.md).      | Gently           | Until resolved |
| Warning      | A risky or consequential situation is imminent.               | Yes              | Until acknowledged |
| Critical     | Failure or harm requiring immediate attention.                | Yes              | Until resolved |

## Choosing a level

Ask two questions:

1. **What is the cost of the user missing this?** Trivial → ambient/informational. Serious → warning/critical.
2. **Does it require the user to act?** If yes, it belongs at "action needed" or higher and must state the action.

If a signal neither has a real cost when missed nor requires action, it probably should not be a notification at all.

## Design guidance

- **Reserve interruption for the top levels.** Only warnings and critical messages should block or demand attention. Overusing interruption destroys its meaning.
- **Make every actionable notification state its action.** "Approval needed" without a way to approve is a dead end.
- **Deduplicate and group.** Collapse repeated or related signals; do not emit a burst of individual toasts.
- **Let work go to the background.** Long tasks should notify on completion rather than holding the user hostage.
- **Give an audit trail.** Transient notifications should also be recoverable in a history or [action log](component-roadmap.md), so nothing important is lost when a toast disappears.
- **Do not rely on color alone.** Pair severity with an icon and text label (see [accessibility](accessibility.md)).

## Anti-patterns

- Treating every state change as a toast.
- Critical styling (red, blocking) for routine information, which numbs users to real emergencies.
- Notifications that cannot be dismissed or reviewed later.
- Silent failures — the one case where _more_ prominence is almost always warranted.

## Related

- [Agent state taxonomy](agent-states.md)
- [Task progress visualization](task-progress.md)
- [Accessibility guidelines](accessibility.md)
