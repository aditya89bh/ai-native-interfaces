# Release process

How maintainers cut a release of `ai-native-interfaces`. Releases are **tag-driven**: publishing to npm happens only when a GitHub Release is published (see [release engineering](docs/release-engineering.md)).

This project follows [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/). See [versioning](docs/versioning.md) for what constitutes a major/minor/patch change.

## Prerequisites (one-time)

- `NPM_TOKEN` repository secret (an npm automation token with publish rights to the package).
- `CHROMATIC_PROJECT_TOKEN` secret for visual regression (optional but recommended).
- Publish access to the npm package name.

## 1. Prepare the release branch

```bash
git checkout main && git pull
git checkout -b release/vX.Y.Z
```

## 2. Bump the version

```bash
npm version X.Y.Z --no-git-tag-version
```

This updates `package.json` (and the lockfile). Do not let npm create the tag yet — the tag is created from the GitHub Release.

## 3. Update the changelog

- Move entries from `## [Unreleased]` into a new `## [X.Y.Z] - YYYY-MM-DD` section in [CHANGELOG.md](CHANGELOG.md).
- Keep an empty `## [Unreleased]` heading at the top for future work.
- Group notes under Added / Changed / Fixed / Removed.

## 4. Verify locally

Run the full suite (the release workflow runs the same checks):

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm run build-storybook
npm pack --dry-run   # inspect the tarball contents
```

## 5. Open and merge the release PR

- Commit as `chore(release): vX.Y.Z`.
- Open a PR to `main`, ensure CI is green, and merge.

## 6. Create the GitHub Release

- Create a tag `vX.Y.Z` on the merge commit and publish a GitHub Release with the changelog section as the notes.

  ```bash
  git checkout main && git pull
  git tag vX.Y.Z
  git push origin vX.Y.Z
  ```

  Then create the Release from that tag in the GitHub UI (or `gh release create vX.Y.Z --notes-file ...`).

## 7. Publish (automated)

Publishing the GitHub Release triggers `.github/workflows/release.yml`, which re-runs verification, builds, and runs `npm publish --provenance --access public` using `NPM_TOKEN`. No manual `npm publish` is needed.

## 8. Post-release

- Confirm the package on npm and that the Storybook site (GitHub Pages) is up to date.
- Announce in Discussions if appropriate.
- Open a new `## [Unreleased]` cycle.

## Release checklist

See [docs/release-checklist.md](docs/release-checklist.md) for the copy-paste checklist to attach to each release PR.

## Rollback

If a published version has a serious defect, publish a new patch with the fix (preferred). Avoid unpublishing; use `npm deprecate` to warn on a broken version if necessary.
