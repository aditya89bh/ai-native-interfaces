# Contributing to ai-native-interfaces

Thanks for your interest in contributing. Contributions of all kinds are welcome — new primitives, accessibility improvements, bug fixes, documentation, and feedback on the API design.

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Local development

> Requires Node.js 18+ (CI uses Node 20).

```bash
git clone https://github.com/aditya89bh/ai-native-interfaces.git
cd ai-native-interfaces
npm install
npm run storybook      # http://localhost:6006
```

Useful scripts:

| Script                    | What it does                             |
| ------------------------- | ---------------------------------------- |
| `npm run storybook`       | Run Storybook (primary dev environment). |
| `npm run test`            | Run the unit test suite once.            |
| `npm run test:watch`      | Run tests in watch mode.                 |
| `npm run lint`            | Lint with ESLint.                        |
| `npm run lint:fix`        | Lint and auto-fix.                       |
| `npm run format`          | Format with Prettier.                    |
| `npm run typecheck`       | Type-check with `tsc --noEmit`.          |
| `npm run build`           | Build the library to `dist/` with tsup.  |
| `npm run build-storybook` | Build the static Storybook site.         |

## Development workflow

1. Create a branch from `main` with a descriptive name, e.g. `feat/confidence-meter` or `fix/agent-status-a11y`.
2. Make your change with accompanying tests and a Storybook story where relevant.
3. Run the full local check suite before pushing:

   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```

4. Open a pull request against `main` using the PR template. CI must be green to merge.

## Testing

- Tests use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) in a jsdom environment.
- Co-locate tests with the component: `src/components/<Name>/<Name>.test.tsx`.
- Assert on accessible roles and text, not implementation details or class names.
- Cover rendering, event callbacks, and empty/edge states. Add a case for keyboard behavior when a component is interactive.
- Run a single file with `npx vitest run src/components/<Name>`.

## Accessibility

Accessibility is a baseline, not an add-on. Every interactive element must be a native control (or have a correct role), be keyboard operable with a visible focus ring, and convey status with more than color. Use the Storybook **Accessibility** tab and the light/dark **Theme** toolbar to verify.

## Adding a component

A new component should include:

- Implementation in `src/components/<Name>/` with a barrel `index.ts` wired into `src/components/index.ts`.
- A Storybook story exercising its meaningful states.
- Unit tests (rendering, events, edge cases).
- TSDoc with at least one `@example`, and an entry in the [API reference](docs/api-reference.md).
- Dark-mode treatment and design-token usage.

See [maintenance and component lifecycle](docs/maintenance.md) for the full "definition of done".

## Commit conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` a new component, token, or capability
- `fix:` a bug fix
- `docs:` documentation only
- `build:` build system, tooling, or dependency changes
- `ci:` CI/automation changes
- `chore:` maintenance that does not touch source behavior
- `test:` adding or updating tests
- `refactor:` code change that neither fixes a bug nor adds a feature

Keep commits small and focused: one logical change per commit.

## Design guidelines

Components should follow the [design principles](docs/principles.md): make the agent's behavior legible, favor reversibility, and keep humans in control. Components stay presentational — no backend, agent framework, or state library.

## Release process

Releases are performed by maintainers and are tag-driven. See [RELEASE_PROCESS.md](RELEASE_PROCESS.md) for the version bump, changelog, and publish steps.

## Reporting issues

Use the [issue templates](https://github.com/aditya89bh/ai-native-interfaces/issues/new/choose). For bugs, include a minimal reproduction and expected vs. actual behavior. For security reports, follow [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
