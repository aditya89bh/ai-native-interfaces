# Repository labels

A small, consistent label set keeps triage fast. Labels are grouped by purpose: **type**, **area**, **status**, and **priority**. Issue and PR templates apply the common ones automatically.

## Type

| Label           | Color     | Meaning                                    |
| --------------- | --------- | ------------------------------------------ |
| `bug`           | `#d73a4a` | Something isn't working as documented.     |
| `enhancement`   | `#a2eeef` | New feature, prop, variant, or capability. |
| `documentation` | `#0075ca` | Docs, README, Storybook, or API reference. |
| `refactor`      | `#c5def5` | Internal change with no behavior change.   |
| `test`          | `#bfd4f2` | Adding or improving tests.                 |
| `dependencies`  | `#0366d6` | Dependency updates (used by Dependabot).   |
| `ci`            | `#ededed` | Build, workflows, or release automation.   |

## Area

| Label                 | Meaning                            |
| --------------------- | ---------------------------------- |
| `area: agent-state`   | Agent state components.            |
| `area: trust`         | Trust & decision components.       |
| `area: memory`        | Memory components.                 |
| `area: workflow`      | Workflow & execution components.   |
| `area: collaboration` | Human collaboration & escalation.  |
| `area: templates`     | Product templates.                 |
| `area: theming`       | Theme provider, tokens, dark mode. |
| `area: build`         | Bundling, types, packaging.        |

## Status

| Label              | Color     | Meaning                                        |
| ------------------ | --------- | ---------------------------------------------- |
| `triage`           | `#fbca04` | Needs review and categorization.               |
| `needs repro`      | `#fef2c0` | Waiting on a minimal reproduction.             |
| `needs info`       | `#fef2c0` | Waiting on more information from the reporter. |
| `accepted`         | `#0e8a16` | Agreed to work on.                             |
| `blocked`          | `#b60205` | Blocked on another change or decision.         |
| `wontfix`          | `#ffffff` | Out of scope or intentionally not addressed.   |
| `duplicate`        | `#cfd3d7` | Already tracked elsewhere.                     |
| `good first issue` | `#7057ff` | Approachable for new contributors.             |
| `help wanted`      | `#008672` | Maintainers welcome help here.                 |

## Priority

| Label            | Color     | Meaning                           |
| ---------------- | --------- | --------------------------------- |
| `priority: high` | `#b60205` | Address soon; user-facing impact. |
| `priority: med`  | `#fbca04` | Normal priority.                  |
| `priority: low`  | `#0e8a16` | Nice to have.                     |

## Applying labels

Maintainers can create these labels once in **Settings → Labels**, or script them with the GitHub CLI, for example:

```bash
gh label create "area: theming" --color C5DEF5 --description "Theme provider, tokens, dark mode"
```

Keep the set small. Add a new label only when it changes how issues are triaged or found.
