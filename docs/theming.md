# Theming

`ai-native-interfaces` supports light, dark, and system color schemes, plus custom token overrides — without per-component configuration and without breaking the public API.

## How it works

- **Class strategy.** Tailwind runs in `darkMode: "class"`. A `dark` class on an ancestor (usually `<html>`) switches every component to its dark treatment. Components ship paired utilities (`bg-white dark:bg-slate-900`), so one class toggles the whole tree.
- **Token variables.** `styles.css` defines neutral tokens as CSS variables (`--ani-surface`, `--ani-content`, `--ani-border`, …) for both schemes. They are expressed as space-separated RGB channels so they compose with Tailwind alpha (`bg-surface/80`). Semantic status hues (success, warning, error, info) come from `semanticStatus` and read clearly on both schemes.
- **Semantic utilities.** The Tailwind config maps those variables to optional utilities — `bg-surface`, `bg-surface-subtle`, `text-content`, `text-content-muted`, `border-line` — for your own layouts and for overrides.

## Managing the scheme

You can toggle the `dark` class yourself, or use the optional, dependency-free `ThemeProvider`.

```tsx
import { ThemeProvider, useTheme } from "ai-native-interfaces";

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? "Switch to light" : "Switch to dark"}
    </button>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      {/* your app */}
    </ThemeProvider>
  );
}
```

`ThemeProvider`:

- Resolves `system` from `prefers-color-scheme` and reacts to OS changes.
- Persists the choice to `localStorage` (key configurable via `storageKey`, disable with `enablePersistence={false}`).
- Toggles the `dark` class on `document.documentElement` (disable with `applyToDocument={false}` if you manage it elsewhere).
- Is SSR-safe: all `window`/`document`/storage access is guarded.

`useTheme()` returns `{ theme, resolvedTheme, setTheme, toggleTheme }` and must be used within a provider.

## Custom token overrides

Rebrand without forking components by overriding tokens. Pass `tokenOverrides` to `ThemeProvider` (applied as CSS variables on its wrapper) or set the variables in your own CSS.

```tsx
<ThemeProvider
  tokenOverrides={{
    "--ani-surface": "24 24 27", // zinc-900
    "--ani-content": "244 244 245", // zinc-100
    "--ani-border": "63 63 70", // zinc-700
  }}
>
  <App />
</ThemeProvider>
```

```css
/* or globally, in your own stylesheet */
:root {
  --ani-surface: 255 255 255;
}
.dark {
  --ani-surface: 24 24 27;
}
```

Any component or layout using the semantic utilities (`bg-surface`, `text-content`, `border-line`, …) picks up the override immediately.

## Consuming the styles

The library ships class strings; your app's Tailwind generates the CSS. Include the library in your Tailwind `content`, extend your theme with the token colors (or import `ai-native-interfaces/styles.css` variable definitions), and ensure `darkMode: "class"`. See the [architecture](architecture.md) doc for the full setup.

## Related

- [Production hardening](production-hardening.md)
- [Design tokens](../src/tokens/tokens.ts)
- [Accessibility guidelines](accessibility.md)
