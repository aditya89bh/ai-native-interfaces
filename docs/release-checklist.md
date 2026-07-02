# Release checklist

Copy this into each release pull request and tick every box before publishing. It complements the step-by-step [release process](../RELEASE_PROCESS.md).

## Pre-release

- [ ] `main` is green in CI.
- [ ] Version bumped in `package.json` (`npm version X.Y.Z --no-git-tag-version`).
- [ ] `CHANGELOG.md` updated: entries moved from `Unreleased` into `## [X.Y.Z] - YYYY-MM-DD`.
- [ ] Breaking changes (if any) documented in the changelog and migration notes.

## Quality gates (all pass locally and in CI)

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run build-storybook`
- [ ] `npm pack --dry-run` reviewed (only `dist/`, `README.md`, `LICENSE`, `CHANGELOG.md`).

## Package metadata

- [ ] `name`, `version`, `description` correct.
- [ ] `license` present and matches `LICENSE`.
- [ ] `keywords` relevant and non-misleading.
- [ ] `exports`, `main`, `module`, `types` resolve to built files.
- [ ] `files` limited to what should ship.
- [ ] `sideEffects` correct (CSS only).
- [ ] `peerDependencies` correct; no accidental runtime dependencies.
- [ ] `repository`, `homepage`, and `bugs` URLs correct.

## Documentation

- [ ] README badges, installation, and quick start accurate.
- [ ] Documentation index links resolve.
- [ ] API reference matches the current public API.

## Content integrity

- [ ] No AI attribution or `Co-authored-by` anywhere.
- [ ] No fabricated benchmarks, adoption claims, or contributors.

## Publish

- [ ] Release PR merged to `main`.
- [ ] Tag `vX.Y.Z` pushed.
- [ ] GitHub Release published from the tag (triggers npm publish).
- [ ] Package visible on npm; install smoke-tested.
- [ ] Storybook site (GitHub Pages) updated.

## Post-release

- [ ] New `## [Unreleased]` section opened in the changelog.
- [ ] Announcement posted (Discussions) if warranted.
