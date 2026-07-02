# Design principles

These principles guide every component in `ai-native-interfaces`. They exist because AI-native products introduce a non-human actor into the interface, and that actor can be uncertain, wrong, or acting on the user's behalf. The interface's job is to keep that behavior legible and keep the human in control.

## 1. Make the agent legible

Users should always be able to answer: _What is the agent doing? Why? What will happen next?_ Components surface state, intent, and reasoning rather than hiding them behind a spinner. Ambiguity is a design bug.

## 2. Communicate uncertainty honestly

Models are probabilistic. Confidence should be shown, not implied, and never fabricated. When certainty is low, the interface should say so and make it easy to verify or override. We never present a guess as a fact.

## 3. Favor reversibility

Prefer designs where actions can be previewed, undone, or confirmed before they take effect. Destructive or high-impact actions get proportionally stronger friction — clear risk warnings and explicit approval.

## 4. Keep humans in control

Automation should feel like delegation, not loss of control. Every autonomous flow needs a clear handoff point where a person can pause, intervene, or take over. The human is the final authority.

## 5. Build for trust through transparency

Trust is earned by showing your work. Action logs, memory panels, and audit trails let users understand and verify what happened. Nothing important should be invisible or unrecoverable.

## 6. Accessible by default

Keyboard navigation, screen-reader support, sufficient contrast, and respect for reduced-motion preferences are baseline requirements, not enhancements. An interface that excludes people is not finished.

## 7. Composable over monolithic

Small, focused primitives that combine into patterns beat large, opinionated widgets. Teams should be able to adopt one component without buying into everything else.

## 8. Styleable, not locked in

Sensible defaults out of the box, with design tokens and class overrides for teams that need to match their own brand. The library should adapt to products, not force products to adapt to it.

## 9. Calm, not alarming

Surface information at a level of urgency that matches its actual importance. Reserve strong signals — color, motion, interruption — for moments that genuinely warrant them, so they retain their meaning.

## 10. Honest by construction

The library never invents data, metrics, or confidence values. Components render what they are given. It is the product's responsibility to supply truthful inputs, and the library's responsibility not to distort them.
