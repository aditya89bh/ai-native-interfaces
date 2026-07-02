# Confidence scale

Models produce outputs with varying reliability. Communicating _how much_ to trust an output is a core part of [transparency](principles.md#2-transparency). This document defines a simple, consistent confidence scale and how to present it.

The library favors a coarse, honest scale over false precision. A specific percentage implies a rigor that most systems cannot back up; a three-level scale is easier to reason about and harder to misread.

## The scale

| Level  | Key      | Meaning                                                             | Typical presentation             |
| ------ | -------- | ------------------------------------------------------------------ | -------------------------------- |
| High   | `high`   | The system has strong grounds for this output.                     | Present normally; light emphasis. |
| Medium | `medium` | Plausible, but worth a glance before relying on it.                | Add a visible "verify" affordance. |
| Low    | `low`    | Weak grounds; likely to be wrong or incomplete.                    | Warn; encourage verification or alternatives. |

These map to the `confidenceColors` tokens (`low`, `medium`, `high`) in `src/tokens`.

## Choosing thresholds

The mapping from a raw model signal (a probability, a score, a heuristic) to one of these three levels is a **product decision**, not something the library imposes. Guidance:

- Define the thresholds explicitly and document them for your product.
- Calibrate against real outcomes where possible; an uncalibrated score is not confidence.
- Keep the thresholds stable so the same signal always yields the same level.

## Presentation guidance

- **Attach confidence to the claim, not the chrome.** Place the indicator next to the specific output it qualifies.
- **Escalate friction as confidence drops.** High confidence needs little; low confidence should invite verification and, where possible, offer alternatives.
- **Pair color with text or shape.** Color alone is not accessible; always include a label or icon (see [accessibility](accessibility.md)).
- **Do not average away nuance.** If a result combines several claims of differing confidence, prefer showing per-claim confidence over a single blended number.

## Honesty rules

- Never display a confidence value the system did not actually produce.
- Never inflate confidence to make the product feel more capable.
- If confidence is unknown, say so — an explicit "confidence unavailable" is more honest than a fabricated level. See [uncertainty communication](uncertainty.md).

## Related

- [Uncertainty communication](uncertainty.md) for the qualitative side of the same problem.
- [Risk warnings](component-roadmap.md) for when low confidence meets high stakes.
