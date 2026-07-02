# Versioning and migration

`ai-native-interfaces` follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`). This document explains what each part means for this library, how changes are communicated, and how to upgrade safely.

The library is currently pre-1.0 (`0.x`). While `0.x`, minor versions may include breaking changes; they are always documented in the [changelog](../CHANGELOG.md) and below. From `1.0.0` onward, the policy below applies in full.

## What counts as a breaking change

A change is **major** if it can break a consumer who follows the documented public API:

- Removing or renaming an exported component, hook, type, or token.
- Removing a prop, or changing its type in an incompatible way.
- Changing a default value or default rendering in a way that alters behavior or layout meaningfully.
- Changing the accessibility contract of a component (roles, labels, keyboard behavior) in a breaking way.
- Removing or renaming a subpath export (`/components`, `/templates`, `/theme`, `/tokens`, `/styles.css`).

A change is **minor** if it is additive and backwards compatible:

- New components, templates, hooks, tokens, or props (with safe defaults).
- New optional variants or sizes.
- New documentation, stories, or examples.

A change is **patch** if it fixes a defect without changing the API:

- Bug fixes, accessibility fixes, performance improvements, and internal refactors that preserve behavior.

Visual-only refinements that do not change the API or intended behavior are treated as patch or minor and noted in the changelog.

## What is _not_ part of the public API

These may change in any release without a major bump:

- Exact class names and internal DOM structure (style with the documented props and tokens, not by targeting internal markup).
- Generated chunk file names in `dist/`.
- The contents of `examples/`, `stories/`, and `docs/`.
- Internal-only modules that are not re-exported from an entry point (for example template mock data).

## Deprecation policy

When something must be removed:

1. It is marked deprecated in a **minor** release with a `@deprecated` TSDoc tag pointing to the replacement.
2. It keeps working for at least one minor release.
3. It is removed in the next **major** release.

Deprecations are listed in the changelog under the release that introduces them.

## Upgrading

- Pin with a caret (`^`) to receive compatible updates: `"ai-native-interfaces": "^1.2.0"`.
- Read the [changelog](../CHANGELOG.md) before upgrading across a minor or major boundary.
- Run your type-checker after upgrading — the shipped types surface most incompatibilities at compile time.
- Because the package is side-effect free and tree-shakeable, upgrades do not change what you ship beyond the components you import.

## Migration notes

### Unreleased

- **Added** `ThemeProvider` and `useTheme` (`ai-native-interfaces/theme`). Fully additive — existing apps that toggle the `dark` class themselves need no changes.
- **Added** subpath exports: `/components`, `/templates`, `/theme`, `/tokens`, and `/styles.css`. The root import is unchanged.
- **Added** neutral token CSS variables and `bg-surface` / `text-content` / `border-line` utilities. Optional; existing utilities are unchanged.

No breaking changes.

## Related

- [Changelog](../CHANGELOG.md)
- [Maintenance and component lifecycle](maintenance.md)
- [Production hardening](production-hardening.md)
