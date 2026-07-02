# Maintenance and component lifecycle

How components are added, evolved, and retired, and how the project is kept healthy over time. This is the process companion to [versioning](versioning.md) and [production hardening](production-hardening.md).

## Component lifecycle

Each component moves through predictable stages:

1. **Proposed.** Captured in the [component roadmap](component-roadmap.md) with a clear problem it solves and where it fits (component, pattern, or template — see [components vs templates vs patterns](components-vs-templates-vs-patterns.md)).
2. **Implemented.** Built to the quality bar below, in its own folder under `src/components/<Name>/` with a barrel `index.ts`.
3. **Documented & demonstrated.** TSDoc on the props and component, a Storybook story covering its states, and an entry in the [API reference](api-reference.md).
4. **Stable.** Part of the public API and covered by the [versioning](versioning.md) policy.
5. **Deprecated.** Marked with `@deprecated` pointing at the replacement; kept working for at least one minor release.
6. **Removed.** Deleted in a major release.

## Definition of done for a component

A component is not "done" until it has:

- A fully typed, presentational public API (data in, events out — no side effects).
- Semantic HTML, accessible names, keyboard support, and status conveyed by more than color.
- Dark-mode treatment and design-token usage.
- A Storybook story exercising its meaningful states.
- Unit tests for rendering, events, and edge/empty states.
- TSDoc with at least one `@example`.
- An entry in the API reference.

## Repository layout

```
src/
  components/<Name>/   component, barrel, tests
  templates/<Name>/    product templates
  theme/               ThemeProvider + useTheme
  tokens/              design tokens
  utils/               small internal helpers (cn)
stories/               Storybook stories and docs
examples/              integrated showcases
docs/                  architecture and guides
```

Anything not re-exported from an entry point (for example template mock data) is internal and may change freely.

## Quality gates

Every change must pass, and these run in the same order before a release:

| Gate            | Command                   | Purpose                      |
| --------------- | ------------------------- | ---------------------------- |
| Lint            | `npm run lint`            | Style and correctness rules. |
| Types           | `npm run typecheck`       | No type regressions.         |
| Tests           | `npm run test`            | Behavior and accessibility.  |
| Storybook build | `npm run build-storybook` | Stories and docs compile.    |
| Library build   | `npm run build`           | ESM + types + tree-shaking.  |

## Dependency policy

- **No runtime dependencies.** `react` and `react-dom` are peer dependencies; everything else is a dev dependency.
- New dependencies are added only when they earn their weight and do not compromise tree-shaking or bundle size.
- Dev tooling is upgraded periodically; upgrades that change output or behavior are validated against the quality gates above.

## Accessibility & performance as standing requirements

Accessibility and performance are not one-off tasks — they are re-checked whenever a component changes. See [accessibility](accessibility.md) and the performance section of [production hardening](production-hardening.md). The Storybook a11y addon and the Theme toolbar make both easy to verify per story.

## Contributing

See [CONTRIBUTING](../CONTRIBUTING.md) for branch, commit (Conventional Commits), and pull-request conventions.

## Related

- [Versioning and migration](versioning.md)
- [Production hardening](production-hardening.md)
- [Component roadmap](component-roadmap.md)
