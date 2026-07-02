# Architecture

This document explains how `ai-native-interfaces` is organized and the technical decisions behind it. It is a living document and will grow as the library does.

![Repository overview: source layers are developed with Storybook and tests, bundled by tsup into dist, published to npm and GitHub Pages, and gated by CI/CD workflows.](assets/repository-overview.svg)

## Goals

- Ship small, composable, typed React primitives for AI-native UX.
- Keep components presentational and predictable: they render the data they are given and emit events; they do not fetch data or hold application state.
- Provide sensible default styling while allowing full visual customization.

## Layers

The source is organized into layers, from lowest to highest level:

```
tokens  ->  components  ->  templates
                theme (cross-cutting)
```

- **`src/tokens/`** — the visual foundation: colors, spacing, radii, typography, elevation, and animation. Tokens are plain, typed values and the single source of truth for styling. They mirror the semantic scales in `tailwind.config.js`.
- **`src/components/`** — primitive, single-purpose components (for example an agent status card or a confidence meter). Each is self-contained and depends only on tokens.
- **`src/templates/`** — complete product surfaces composed from components (for example a customer-support or workflow-approval console). Templates depend on components, not the other way around. See [product templates](product-templates.md).
- **`src/theme/`** — the optional, cross-cutting `ThemeProvider` and `useTheme` for light/dark/system and token overrides. See [theming](theming.md).
- **`src/patterns/`** — reserved for higher-level compositions that pair a few components into a recurring flow.

Dependencies only ever point downward. A component may use tokens; a template may use components and tokens; nothing depends on templates internally.

## Component conventions

- Components are function components written in TypeScript with explicit, exported prop types.
- Props are the only input; callbacks (`onApprove`, `onHandoff`, etc.) are the only output. Components are controlled where state matters.
- Styling uses Tailwind utility classes derived from tokens. A `className` prop is accepted for overrides.
- Components are presentational: no data fetching, no global state, no side effects beyond invoking the callbacks they are given.
- Accessibility is built in: semantic elements, ARIA where needed, keyboard support, and respect for reduced-motion.

## Styling strategy

Tailwind CSS provides the utility layer. Semantic scales (agent state, confidence, risk) are declared in `tailwind.config.js` and mirrored as typed values in `src/tokens/`. Consumers can:

1. Use the default styles as-is.
2. Override individual elements via the `className` prop.
3. Re-map the semantic color scales in their own Tailwind config.

## Build and distribution

- The library is authored in TypeScript and bundled for distribution to `dist/` with tsup.
- Output is ES modules with generated type declarations and subpath entry points (`/components`, `/templates`, `/theme`, `/tokens`, `/styles.css`). `react` and `react-dom` are peer dependencies so the consuming app owns a single React instance.
- JavaScript is side-effect free (`"sideEffects": ["**/*.css"]`) to enable tree-shaking, while the opt-in stylesheet is preserved when explicitly imported.
- See [release engineering](release-engineering.md) for the CI/CD and publishing pipeline.

## Tooling

- **Storybook** is the primary development and documentation environment for components.
- **Vitest** and **Testing Library** provide unit and interaction tests in a jsdom environment.
- **ESLint** and **Prettier** enforce code quality and consistent formatting.
- **TypeScript** in strict mode guards the public API.

## Testing strategy

- Every component ships with tests covering rendering and its key behaviors.
- Tests assert on accessible roles and text rather than implementation details.
- Stories double as living documentation and manual test cases.

## Non-goals

- The library does not talk to any model, API, or backend.
- It does not manage application or agent state.
- It does not generate, infer, or fabricate data such as confidence values — it only renders what the product supplies.
