# AgentStatusCard

A compact, self-contained summary of an agent's current state. It pairs a color-coded status indicator with a human-readable label and optional detail, timestamp, and actions. It is the primary surface for the [visibility principle](../principles.md#1-visibility) and is backed by the [agent state taxonomy](../agent-states.md).

## Import

```tsx
import { AgentStatusCard } from "ai-native-interfaces";
```

## Usage

```tsx
<AgentStatusCard
  name="Research agent"
  state="acting"
  description="Searching sources and gathering results."
  timestamp="just now"
/>
```

## Props

| Prop          | Type                               | Default    | Description                                                               |
| ------------- | ---------------------------------- | ---------- | ------------------------------------------------------------------------- |
| `state`       | `AgentState`                       | —          | **Required.** The current state, from the [taxonomy](../agent-states.md). |
| `name`        | `string`                           | `"Agent"`  | Name of the agent, shown as the title.                                    |
| `label`       | `string`                           | state name | Overrides the default human-readable label for the state.                 |
| `description` | `string`                           | —          | Supporting detail about what the agent is doing.                          |
| `size`        | `"sm" \| "md" \| "lg"`             | `"md"`     | Visual size of the card.                                                  |
| `variant`     | `"subtle" \| "outline" \| "solid"` | `"subtle"` | Visual container treatment.                                               |
| `animated`    | `boolean`                          | `true`     | Whether active states animate their indicator. Respects reduced motion.   |
| `icon`        | `ReactNode`                        | —          | Custom leading element rendered in place of the default status dot.       |
| `timestamp`   | `ReactNode`                        | —          | A short timestamp (for example `"2m ago"`) shown at the end of the title. |
| `actions`     | `ReactNode`                        | —          | Trailing content such as action buttons.                                  |
| `className`   | `string`                           | —          | Additional classes appended to the root element.                          |

### `AgentState`

The `state` prop accepts one of the nine taxonomy values: `idle`, `thinking`, `planning`, `acting`, `waiting`, `needsApproval`, `blocked`, `failed`, `completed`. See the [agent state taxonomy](../agent-states.md) for meanings.

## States

Each state maps to a token color from `agentStateColors`. The four active states — `thinking`, `planning`, `acting`, `waiting` — animate their indicator with a subtle pulse when `animated` is `true`.

## Sizes and variants

- **Sizes** (`sm`, `md`, `lg`) scale padding, indicator size, and typography for compact toolbars through comfortable panels.
- **Variants** control the container: `subtle` (bordered white surface with elevation), `outline` (transparent with a border), and `solid` (tinted surface).

## Accessibility

- The card exposes `role="status"` with `aria-live="polite"`, so state changes are announced to assistive technology without interrupting the user.
- Status is conveyed by both color and the text label — never color alone.
- When `animated`, the pulse is disabled under `prefers-reduced-motion`.

## Related

- [Agent state taxonomy](../agent-states.md)
- [Agent State system](../agent-state-system.md)
- [Accessibility guidelines](../accessibility.md)
