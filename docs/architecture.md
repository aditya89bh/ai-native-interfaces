# Architecture

This document explains how `ai-native-interfaces` is organized and the technical decisions behind it. It is a living document and will grow as the library does.

## Goals

- Ship small, composable, typed React primitives for AI-native UX.
- Keep components presentational and predictable: they render the data they are given and emit events; they do not fetch data or hold application state.
- Provide sensible default styling while allowing full visual customization.

## Layers

The source is organized into three layers, from lowest to highest level:

```
tokens  ->  components  ->  patterns
```

- **`src/tokens/`** — the visual foundation: colors, spacing, radii, and typography. Tokens are plain, typed values and the single source of truth for styling. They mirror the semantic scales in `tailwind.config.js`.
- **`src/components/`** — primitive, single-purpose components (for example an agent status card or a confidence meter). Each is self-contained and depends only on tokens.
- **`src/patterns/`** — higher-level compositions that combine multiple primitives into a complete interaction (for example an approval flow). Patterns depend on components, not the other way around.

Dependencies only ever point downward. A component may use tokens; a pattern may use components and tokens; nothing depends on patterns internally.

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

- The library is authored in TypeScript and bundled for distribution to `dist/` (configured in later phases).
- Output is ES modules with generated type declarations. `react` and `react-dom` are peer dependencies so the consuming app owns a single React instance.
- The package is side-effect free (`"sideEffects": false`) to enable tree-shaking.

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
