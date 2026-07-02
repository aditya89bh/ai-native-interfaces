# Production hardening

This document describes the architecture decisions that take `ai-native-interfaces` from a feature-complete component set to a production-ready open-source library: theming, accessibility, performance, bundle size, and developer experience. It is a companion to the [architecture](architecture.md) overview and applies across every [component](component-roadmap.md) and [template](product-templates.md).

None of the hardening work changes the public component API. Everything here is additive and backwards compatible.

## Theming

The library supports light, dark, and system color schemes, plus custom token overrides, without per-component configuration.

- **Class strategy.** Tailwind runs in `darkMode: "class"`. A `dark` class on an ancestor (typically `<html>` or a wrapper) switches every component to its dark treatment. Components declare paired utilities (`bg-white dark:bg-slate-900`) so a single class toggles the whole tree.
- **Semantic neutrals.** Surfaces, text, and borders use a consistent neutral mapping (see [theming](theming.md)) so contrast is predictable in both schemes. Status hues (success, warning, error, info) come from `semanticStatus` tokens and read clearly on light and dark surfaces; where they back a surface, they are applied at low alpha so they adapt to the background.
- **`ThemeProvider` (opt-in).** A small, dependency-free `ThemeProvider` and `useTheme` hook manage the `light | dark | system` choice, persist it, react to the OS preference, and apply custom token overrides via CSS variables. It is entirely optional — apps that manage the `dark` class themselves need nothing from the library.
- **Token overrides.** Custom themes are expressed as token → value maps applied as CSS variables on a scope element, so a product can rebrand without forking component code.

See [theming](theming.md) for the full model and recipes.

## Accessibility

Accessibility is a standing requirement, re-audited in this phase (see [accessibility](accessibility.md)).

- Semantic HTML and landmarks; every interactive element is a native control or has an appropriate role.
- Status is never conveyed by color alone — always paired with text or an icon, in both color schemes.
- Keyboard operability across all interactive components, with visible focus rings that carry a dark-mode ring offset.
- Live regions (`role="status"` / `role="alert"`) for asynchronous state, chosen by urgency.
- Motion respects `prefers-reduced-motion`.

## Performance

- Components are presentational and cheap to render. Memoization (`React.memo`, `useCallback`, `useMemo`) is applied only where a component renders large lists or does non-trivial computation (for example graph layout), never reflexively.
- Pure layout computation is separated from rendering (e.g. `ExecutionGraph`'s layout module) so it can be memoized on its inputs.
- No global state, context is optional, and no component subscribes to anything it does not need.

## Bundle size and tree-shaking

- ESM-only output with `"sideEffects": false`, so unused components are dropped by any modern bundler.
- Named exports throughout; no default exports and no barrel side effects.
- `react` / `react-dom` are peer dependencies and external to the bundle. No runtime dependencies are added.
- Stylesheet (`styles.css`) is a Tailwind entry consumers opt into; importing a component never pulls in CSS as a side effect.

## Developer experience

- Full TypeScript types shipped alongside the ESM bundle.
- [API reference](api-reference.md) for every public export.
- Storybook stories with usage notes, do/don't guidance, and per-story accessibility notes.
- [Versioning and migration](versioning.md) and [maintenance](maintenance.md) policies so consumers can adopt with confidence.
- Visual regression configuration to catch unintended UI change.

## Related

- [Theming](theming.md)
- [API reference](api-reference.md)
- [Accessibility guidelines](accessibility.md)
- [Versioning and migration](versioning.md)
- [Maintenance and component lifecycle](maintenance.md)
- [Library comparison](comparison.md)
