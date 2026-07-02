# AI-native interface philosophy

This document describes the beliefs that shape `ai-native-interfaces`. It is the "why" behind the components and guidelines in this repository. Everything else in the design system should trace back to the ideas here.

## The core shift

Conventional interfaces assume a single actor: the human. The person clicks, the system responds deterministically, and the result is predictable. Design systems built for that world optimize for clarity, efficiency, and consistency.

AI-native products break that assumption. They introduce a second actor — a model or agent — that reasons, decides, and acts, sometimes autonomously and sometimes incorrectly. The interface is no longer just a control surface for the human; it is also a window into the behavior of a non-deterministic collaborator.

That shift creates interface problems that traditional design systems were never meant to solve:

- The system now has **intent and state** that the user cannot infer from a static screen.
- Outputs are **probabilistic**, not guaranteed, so certainty must be communicated rather than assumed.
- The system can take **consequential actions**, so oversight and reversibility become first-class concerns.
- The user and the agent **share control**, so the interface must make handoffs explicit.

`ai-native-interfaces` exists to give teams a shared, well-considered vocabulary for these problems.

## What "AI-native" means here

An interface is AI-native when it is designed around the realities of working with a probabilistic, semi-autonomous system rather than bolting AI onto a conventional UI. In practice that means:

- The agent's **state** is visible, not hidden behind an ambiguous spinner.
- The agent's **confidence and uncertainty** are expressed honestly.
- **Consequential actions** are previewable, approvable, and reversible.
- The **human stays in control** and can interrupt, redirect, or take over at any point.
- The system's **memory and reasoning** are inspectable, not opaque.

## Design tenets

These tenets summarize the philosophy and inform every downstream decision:

1. **The interface serves the human, not the model.** Automation is delegation, not replacement. The person remains the authority.
2. **Legibility over magic.** A system that explains itself earns more trust than one that appears effortless but inscrutable.
3. **Honesty over confidence theater.** Never dress a guess up as a fact. Show uncertainty plainly.
4. **Reversibility over speed.** Prefer flows that can be previewed and undone, especially for high-impact actions.
5. **Calm over noise.** Match the urgency of a signal to its true importance so that strong signals keep their meaning.
6. **Composition over monoliths.** Small, honest primitives combine into trustworthy experiences.

## What this philosophy is not

- It is not anti-automation. The goal is to make automation trustworthy, not to slow it down for its own sake.
- It is not a mandate for maximum information density. Transparency is achieved through progressive disclosure, not by overwhelming the user.
- It is not a fixed rulebook. It is a set of defaults and defaults exist to be overridden with intent.

## How to use this document

When designing or reviewing an AI-native interface, ask whether it upholds the tenets above. If a design hides the agent's state, overstates its certainty, or removes the human's ability to intervene, it is working against this philosophy — regardless of how polished it looks.

## Related reading

- [Design principles](principles.md) — the six principles that operationalize this philosophy.
- [Architecture](architecture.md) — how the library is structured to support these ideas.
- [Design review checklist](design-review-checklist.md) — a practical way to hold designs to this standard.
