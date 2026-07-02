# Release engineering

How `ai-native-interfaces` is built, verified, published, and maintained as a public open-source project. This is the operational companion to [production hardening](production-hardening.md), [versioning](versioning.md), and [maintenance](maintenance.md).

Nothing here changes the public API — it is process and automation.

## Principles

- **Everything green before merge.** Lint, types, tests, and both builds run in CI on every push and pull request.
- **Releases are tag-driven.** Publishing to npm happens only when a GitHub Release is published for a version tag, never on ordinary pushes.
- **Reproducible installs.** CI uses `npm ci` against the committed lockfile so builds are deterministic.
- **No secrets in the repo.** Tokens (`NPM_TOKEN`, `CHROMATIC_PROJECT_TOKEN`) live in repository secrets and are referenced by workflows only.
- **Least privilege.** Each workflow requests only the permissions it needs.

## Pipelines

| Workflow          | File                                      | Trigger                       | Purpose                                                |
| ----------------- | ----------------------------------------- | ----------------------------- | ------------------------------------------------------ |
| CI                | `.github/workflows/ci.yml`                | push to `main`, pull requests | Lint, typecheck, test, library build, Storybook build. |
| Docs              | `.github/workflows/docs.yml`              | push to `main`                | Build Storybook and deploy it to GitHub Pages.         |
| Release           | `.github/workflows/release.yml`           | GitHub Release published      | Verify, build, and publish the package to npm.         |
| Visual regression | `.github/workflows/visual-regression.yml` | push to `main`, pull requests | Chromatic snapshot diffing of every story.             |

## Continuous integration

CI is the gate for every change. It installs with `npm ci`, then runs, in order: `lint`, `typecheck`, `test`, `build`, and `build-storybook`. A change is not mergeable until CI is green.

## Documentation deployment

Storybook is the living documentation site. On every push to `main`, the docs workflow builds `storybook-static` and publishes it to GitHub Pages, so the latest components and usage guidance are always browsable.

## Publishing

Publishing is intentionally manual to trigger and automated to execute:

1. A maintainer follows the [release process](../RELEASE_PROCESS.md): bump the version, update the changelog, and open/merge the release PR.
2. A `vX.Y.Z` tag and a GitHub Release are created.
3. The release workflow runs the full verification suite, builds the package, and publishes to npm with provenance using `NPM_TOKEN`.

The package is published with `publishConfig.access = public` and only ships `dist/`, `README.md`, `LICENSE`, and `CHANGELOG.md` (see the `files` field).

## Dependencies and security

- **Dependabot** proposes weekly updates for npm dependencies and GitHub Actions.
- **Security reports** are handled per [SECURITY.md](../SECURITY.md).
- No runtime dependencies are added; `react` / `react-dom` remain peer dependencies.

## Community process

- Issues use structured templates (bug, feature, documentation).
- Pull requests use a checklist template and must pass CI.
- Conduct, support, and contribution expectations are documented in [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md), [SUPPORT.md](../SUPPORT.md), and [CONTRIBUTING.md](../CONTRIBUTING.md).

## Related

- [Release process](../RELEASE_PROCESS.md)
- [Versioning and migration](versioning.md)
- [Maintenance and component lifecycle](maintenance.md)
- [Production hardening](production-hardening.md)
