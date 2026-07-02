# Visual regression testing

Every component and template is exercised by a Storybook story. Visual regression testing renders those stories, snapshots them, and flags unintended pixel changes — the fastest way to catch styling regressions across themes and states.

This project is configured for [Chromatic](https://www.chromatic.com/), which runs Storybook in the cloud, stores baselines, and reviews diffs. It requires no runtime dependencies — the CI workflow invokes it directly.

## How it is wired

- **`chromatic.config.json`** — builds Storybook via `build-storybook`, only re-tests changed stories (`onlyChanged`), and does not fail the build on visual changes (`exitZeroOnChanges`); changes on `main` are auto-accepted as the new baseline.
- **`.github/workflows/visual-regression.yml`** — on every push to `main` and every pull request, checks out full history, installs dependencies, and publishes the Storybook build to Chromatic for diffing.

## One-time setup

1. Create a project at [chromatic.com](https://www.chromatic.com/) and link this repository.
2. Add the project token as a repository secret named `CHROMATIC_PROJECT_TOKEN` (Settings → Secrets and variables → Actions).

Once the secret is set, pull requests get a Chromatic check with a link to review any visual diffs.

## Running locally

```bash
CHROMATIC_PROJECT_TOKEN=<token> npm run chromatic
```

## Covering light and dark

The Storybook **Theme** toolbar toggles the `dark` class per story. To baseline both schemes, capture the two globals as [Chromatic modes](https://www.chromatic.com/docs/modes/) in `.storybook/preview` parameters, or add a light/dark story variant for components whose dark treatment is non-trivial.

## Alternatives

If you prefer fully local, service-free snapshots, the [`@storybook/test-runner`](https://storybook.js.org/docs/writing-tests/test-runner) with Playwright can snapshot stories in CI. It adds dev dependencies and a browser download, so it is intentionally not enabled by default here.

## Related

- [Storybook overview](../stories/Overview.mdx)
- [Maintenance and component lifecycle](maintenance.md)
