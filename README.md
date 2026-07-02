# ai-native-interfaces

A reusable UI component library for **AI-native products** — the interface primitives that teams keep rebuilding whenever they ship an agent, assistant, or automated workflow.

Traditional design systems assume a human is the only actor. AI-native products introduce a second actor — the model or agent — that reasons, acts, and sometimes gets things wrong. That shift creates new interface needs: showing what an agent is doing, how confident it is, what it remembers, where the risk is, and when a human should step in.

`ai-native-interfaces` provides those primitives as composable React components.

> Status: early foundation. The API is unstable and will change before a `1.0` release. See the [component roadmap](docs/component-roadmap.md).

## What it covers

The library is organized around the recurring concerns of AI-native UX:

- **Approvals** — request, review, and confirm agent-proposed actions.
- **Confidence** — communicate how certain a model is about an output.
- **Agent state** — show whether an agent is idle, thinking, acting, waiting, or has failed.
- **Memory panels** — surface what the system remembers and let users inspect or edit it.
- **Task progress** — track multi-step agent tasks and their sub-steps.
- **Risk warnings** — flag potentially destructive or high-impact actions.
- **Action logs** — provide an auditable trail of what the agent did and why.
- **Human handoff** — hand control between the agent and a person cleanly.

## Who it is for

- **Product designers** designing agent and assistant experiences who need consistent, well-considered primitives.
- **Frontend teams** who want typed, accessible components instead of rebuilding agent UI from scratch.
- **AI product teams** shipping model-powered features that require trust, transparency, and control surfaces.
- **Agent builders** wiring up autonomous or semi-autonomous flows that need human-in-the-loop touchpoints.

## Vision

The goal is a shared vocabulary for AI-native interfaces — a set of primitives that make the model's behavior legible and keep humans in control. Concretely, the library aims to be:

- **Composable** — small primitives that combine into higher-level patterns.
- **Headless-friendly** — sensible styling out of the box, with tokens and class overrides for full control.
- **Accessible** — keyboard and screen-reader support treated as a baseline, not an add-on.
- **Trust-first** — defaults that favor transparency, reversibility, and human oversight.

The design principles behind these goals are documented in [docs/principles.md](docs/principles.md).

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Storybook](https://storybook.js.org/) for component development and documentation
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for tests

## Getting started

> Requires Node.js 18+.

```bash
# install dependencies
npm install

# run Storybook
npm run storybook

# type-check, lint, and test
npm run typecheck
npm run lint
npm run test
```

## Project structure

```
src/
  components/   # primitive AI-native components
  patterns/     # higher-level compositions of primitives
  tokens/       # design tokens (colors, spacing, radii, typography)
docs/           # principles, architecture, and roadmap
examples/       # usage examples
stories/        # Storybook stories
```

## Documentation

The design system foundation defines _how_ AI-native interfaces should behave. Start with the philosophy and principles, then use the guidelines and patterns when designing specific components.

**Foundations**

- [Philosophy](docs/philosophy.md) — the beliefs behind the library.
- [Design principles](docs/principles.md) — visibility, transparency, human control, progressive disclosure, recoverability, and trust.
- [Architecture](docs/architecture.md) — how the library is structured.
- [Component roadmap](docs/component-roadmap.md) — planned components.

**Behavior guidelines**

- [Agent state taxonomy](docs/agent-states.md)
- [Confidence scale](docs/confidence.md)
- [Uncertainty communication](docs/uncertainty.md)
- [Approval interaction guidelines](docs/approvals.md)
- [Interruption and cancellation](docs/interruption-and-cancellation.md)
- [Human handoff patterns](docs/human-handoff.md)
- [Memory visualization principles](docs/memory-visualization.md)
- [Task progress visualization](docs/task-progress.md)
- [Notification hierarchy](docs/notifications.md)
- [Accessibility guidelines](docs/accessibility.md)
- [Responsive behavior guidelines](docs/responsive.md)

**Patterns and process**

- [Reusable interaction patterns](docs/interaction-patterns.md)
- [Design review checklist](docs/design-review-checklist.md)
- [Component naming conventions](docs/naming-conventions.md)

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE)
