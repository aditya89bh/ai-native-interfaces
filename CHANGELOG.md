# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-07-03

First stable release. `ai-native-interfaces` provides a complete, presentational, accessible component set for AI-native products — agent state, trust & decision, memory, workflow & execution, and human collaboration — plus product templates, theming, and a full release/CI pipeline.

### Added

- Repository foundation: React + TypeScript project structure, with Tailwind CSS, Storybook, ESLint, Prettier, Vitest, and tsup.
- Design system foundation: expanded design tokens (color, status, confidence, risk, spacing, radius, typography, elevation, animation) and the AI-native design principles, agent-state taxonomy, and behavior guidelines.
- Agent state components: `AgentStatusCard`, `AgentAvatar`, `AgentCapabilityBadges`, `AgentHeartbeat`, `AgentPresence`.
- Trust & decision components: `ConfidenceIndicator`, `RiskBadge`, `ApprovalPanel`, `ExplanationCard`, `DecisionSummary`.
- Memory components: `MemoryCard`, `MemoryTimeline`, `MemoryCitation`, `MemoryInfluence`, `ForgettingIndicator`.
- Workflow & execution components: `TaskProgress`, `ExecutionTimeline`, `QueueView`, `ExecutionGraph`, `ActionLog`.
- Human collaboration components: `HumanHandoffCard`, `InterventionPanel`, `FeedbackCapture`, `EscalationBanner`, `AssignmentStatus`.
- Product templates: `CustomerSupportAgentTemplate`, `ResearchAgentTemplate`, `CodingAgentTemplate`, `OperationsAgentTemplate`, `WorkflowApprovalConsoleTemplate`.
- Theming: complete dark-mode support, an optional `ThemeProvider` / `useTheme` for `light | dark | system`, and neutral token CSS variables with `bg-surface` / `text-content` / `border-line` utilities for custom overrides.
- Subpath exports (`/components`, `/templates`, `/theme`, `/tokens`, `/styles.css`) with code splitting for fine-grained tree-shaking.
- Documentation: API reference, theming, versioning & migration, maintenance & component lifecycle, library comparison, and production hardening guides.
- Storybook light/dark theme toolbar, global autodocs, and a usage overview; Chromatic visual-regression configuration.
- Test coverage across all components, templates, and the theme provider (206 unit tests).
- Release engineering: CI (lint, typecheck, test, library build, Storybook build), GitHub Pages Storybook deployment, and a tag-driven npm publish workflow with provenance.
- Community health files: issue templates, pull request template, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `FUNDING.md` (placeholder), Dependabot configuration, and label documentation.
- Release documentation: `RELEASE_PROCESS.md`, release checklist, release engineering guide, and a repository architecture overview diagram.

### Changed

- Memoized the `ExecutionGraph` layout and wrapped the component in `React.memo`.
- Standardized focus-ring offsets across interactive controls for dark mode.
- `sideEffects` marks only stylesheets, keeping JavaScript fully tree-shakeable.

### Fixed

- Hid the decorative rating icon in `FeedbackCapture` from assistive technology.

[Unreleased]: https://github.com/aditya89bh/ai-native-interfaces/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/aditya89bh/ai-native-interfaces/releases/tag/v1.0.0
