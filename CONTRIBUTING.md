# Contributing to ai-native-interfaces

Thanks for your interest in contributing. This project is in an early foundation stage, so the most valuable contributions right now are new primitives, improvements to accessibility, and feedback on the API design.

## Code of conduct

Be respectful and constructive. Assume good intent, keep discussions focused on the work, and help make this a welcoming project for newcomers.

## Getting set up

> Requires Node.js 18+.

```bash
git clone https://github.com/aditya89bh/ai-native-interfaces.git
cd ai-native-interfaces
npm install
npm run storybook
```

## Development workflow

1. Create a branch from `main` using a descriptive name, e.g. `feat/confidence-meter` or `fix/agent-status-a11y`.
2. Make your change with accompanying tests and a Storybook story where relevant.
3. Run the full check suite locally before pushing:

   ```bash
   npm run typecheck
   npm run lint
   npm run test
   ```

4. Open a pull request against `main` describing what changed and why.

## Commit conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` a new component, token, or capability
- `fix:` a bug fix
- `docs:` documentation only
- `build:` build system, tooling, or dependency changes
- `chore:` maintenance that does not touch source behavior
- `test:` adding or updating tests
- `refactor:` code change that neither fixes a bug nor adds a feature

Keep commits small and focused: one logical change per commit.

## Adding a component

A new component should generally include:

- The component implementation in `src/components/<Name>/`.
- A barrel export wired into `src/components/index.ts`.
- A Storybook story in `stories/` or alongside the component.
- Unit tests covering rendering and key behavior.
- Accessible markup: semantic elements, labels, and keyboard support.

## Design guidelines

Components should follow the [design principles](docs/principles.md). In short: make the agent's behavior legible, favor reversibility, and keep humans in control.

## Reporting issues

Open an issue describing the problem or proposal. For bugs, include reproduction steps and the expected versus actual behavior.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
