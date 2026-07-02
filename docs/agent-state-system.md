# Agent State system

The Agent State system is a set of small, composable components for representing an AI agent's current state. It is deliberately **not** a dashboard. It is a toolkit that any application can compose into its own layouts, applying the [visibility principle](principles.md#1-visibility) consistently.

## Scope

The system answers a family of related questions about an agent:

- **What is it doing right now?** — `AgentStatusCard` (backed by the [agent state taxonomy](agent-states.md)).
- **Who or what is it?** — `AgentAvatar`.
- **What can it do?** — `AgentCapabilityBadges`.
- **Is its connection healthy?** — `AgentHeartbeat`.
- **Is it available to interact with?** — `AgentPresence`.

Each is independent and useful on its own; together they cover the common facets of "agent state" without prescribing a layout.

## Components

| Component               | Represents                            | Primary states / inputs                           |
| ----------------------- | ------------------------------------- | ------------------------------------------------- |
| `AgentStatusCard`       | Current activity of the agent         | The nine [agent states](agent-states.md).         |
| `AgentAvatar`           | Visual identity, optional status ring | Name/image, optional `state`.                     |
| `AgentCapabilityBadges` | Capabilities or tools available       | A list of capabilities, each enabled or disabled. |
| `AgentHeartbeat`        | Connection health                     | `online`, `offline`, `reconnecting`, `degraded`.  |
| `AgentPresence`         | Availability                          | `active`, `idle`, `away`, `unavailable`.          |

## Distinctions

These concepts are easy to conflate but mean different things:

- **State vs. presence.** _State_ (`AgentStatusCard`) is what the agent is doing with a task. _Presence_ (`AgentPresence`) is whether it is available to be engaged at all. An agent can be `active` (present) but `idle` (no task).
- **Presence vs. heartbeat.** _Presence_ is an intentional availability signal. _Heartbeat_ is a technical connection-health signal. A degraded connection is a heartbeat concern, not a presence one.
- **Status vs. capabilities.** _Status_ changes moment to moment; _capabilities_ describe the agent's stable abilities.

Keeping these separate lets applications combine exactly the signals they need without overloading a single indicator.

## Design conventions

All components in this system share conventions so they compose predictably:

- **Fully typed APIs.** State and level props use the shared union types from `src/tokens` (for example `AgentState`).
- **Design tokens.** Colors come from the token system ([agent state colors](../src/tokens/tokens.ts), semantic status). Status colors are applied as values so they stay correct across all nine states.
- **Color is never the only signal.** Every status pairs color with text or an icon, and exposes a screen-reader label ([accessibility](accessibility.md)).
- **Sizes.** Components expose a `size` scale so they fit compact and comfortable layouts alike.
- **Responsive.** Components adapt to their container; text truncates or wraps rather than overflowing.
- **Live updates.** Status components use polite live regions so assistive tech is informed of changes without being flooded.
- **Reduced motion.** Any animation (pulse, spin) is disabled under `prefers-reduced-motion`.

## Composition

Because each component is independent, applications compose them freely — for example an avatar with a presence dot beside a status card, or a heartbeat indicator in a toolbar. See the Agent State Showcase example (`examples/AgentStateShowcase.tsx`) for an integrated composition.

## Naming

Component and prop names follow the [naming conventions](naming-conventions.md). State keys match the taxonomy exactly (`needsApproval`, `blocked`, `completed`).

## Related

- [Agent state taxonomy](agent-states.md)
- [Design principles](principles.md)
- [Component roadmap](component-roadmap.md)
