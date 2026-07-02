# Agent state taxonomy

A shared vocabulary for the states an agent can be in. Consistent state naming is the foundation of the [visibility principle](principles.md#1-visibility): if every product invents its own states, users have to relearn each one.

These nine states are the canonical set used across the library. They are defined in code as `agentStateColors` (and the `AgentState` type) in `src/tokens`, and are rendered by components such as `AgentStatusCard`.

## The states

| State          | Key             | Meaning                                                                                  | Human action implied     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| Idle           | `idle`          | Ready, but not currently working on anything.                                            | Optional: assign a task. |
| Thinking       | `thinking`      | Interpreting input or reasoning; no actions taken yet.                                   | Wait.                    |
| Planning       | `planning`      | Decomposing the task into steps or selecting tools.                                      | Wait; optionally review. |
| Acting         | `acting`        | Executing steps and taking actions in the world.                                         | Monitor.                 |
| Waiting        | `waiting`       | Paused on an external dependency (a tool, API, or timer).                                | Wait.                    |
| Needs approval | `needsApproval` | Paused, requesting explicit human authorization to proceed.                              | Approve or reject.       |
| Blocked        | `blocked`       | Cannot proceed due to a missing input, permission, or error condition it cannot resolve. | Intervene or unblock.    |
| Failed         | `failed`        | The task ended unsuccessfully.                                                           | Retry, adjust, or abort. |
| Completed      | `completed`     | The task finished successfully.                                                          | Review the result.       |

## Distinctions that matter

Several states look similar but carry different meaning. Keeping them distinct is what makes the taxonomy useful.

- **Thinking vs. Planning.** Thinking is open-ended reasoning; planning is producing an explicit, reviewable plan. Separating them lets an interface offer plan review before execution.
- **Waiting vs. Needs approval vs. Blocked.** All three are paused states, but the required response differs. _Waiting_ needs nothing from the human. _Needs approval_ needs a decision. _Blocked_ needs an intervention to remove an obstacle.
- **Failed vs. Blocked.** _Blocked_ is potentially recoverable without restarting — supply the missing input and the agent can continue. _Failed_ is terminal for the current attempt.

## State transitions

States are not strictly linear. A typical successful run flows:

```
idle -> thinking -> planning -> acting -> completed
```

Common branches:

- `acting -> waiting -> acting` while a dependency resolves.
- `planning -> needsApproval -> acting` when a plan requires sign-off.
- `acting -> blocked -> acting` when a human removes an obstacle.
- any active state `-> failed` when the attempt cannot continue.

## Design guidance

- **Always show the current state.** Never collapse these into a single ambiguous "loading" indicator.
- **Use consistent color and language.** Map each state to its token color and canonical label; do not invent synonyms per screen.
- **Make paused states actionable.** `needsApproval` and `blocked` should surface the exact action required, not just the fact that the agent stopped.
- **Treat `failed` with recoverability in mind.** Pair it with a clear recovery path (retry, edit, or escalate) per the [recoverability principle](principles.md#5-recoverability).
- **Respect motion preferences.** Animated transitions between states must honor `prefers-reduced-motion`.

## Related

- [Approval interaction guidelines](approvals.md) for the `needsApproval` state.
- [Task progress visualization](task-progress.md) for multi-step `acting`.
- [Notification hierarchy](notifications.md) for how loudly to surface each state.
