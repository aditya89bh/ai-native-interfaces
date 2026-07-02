import { useState } from "react";
import {
  ApprovalPanel,
  DecisionSummary,
  ExplanationCard,
} from "../src/components";
import type { DecisionApprovalStatus } from "../src/components";

/**
 * TrustShowcase
 *
 * An integrated example that composes every Trust & Decision component into a
 * single review flow: a decision at a glance (`DecisionSummary`, which embeds
 * `ConfidenceIndicator` and `RiskBadge`), the reasoning behind it
 * (`ExplanationCard`), and the human control to act on it (`ApprovalPanel`).
 *
 * The local state here stands in for an application's data — the components
 * themselves remain presentational and never perform the action.
 */
export function TrustShowcase() {
  const [status, setStatus] = useState<DecisionApprovalStatus>("pending");
  const [pending, setPending] = useState<"approve" | "reject" | null>(null);

  const resolve = (
    next: DecisionApprovalStatus,
    action: "approve" | "reject",
  ) => {
    setPending(action);
    // Simulate an async side effect owned by the application.
    window.setTimeout(() => {
      setStatus(next);
      setPending(null);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <DecisionSummary
        action="Refund the customer $42.00"
        confidence="high"
        confidenceValue={86}
        risk="moderate"
        timestamp="2 minutes ago"
        reasoning="The order arrived damaged and is within the 30-day refund window."
        approvalStatus={status}
      />

      <ExplanationCard
        summary="A refund is the lowest-friction resolution that satisfies the policy."
        evidence={
          <ul className="list-disc pl-4">
            <li>Photos confirm the item is damaged.</li>
            <li>The order shipped 6 days ago.</li>
            <li>The customer has no prior refunds this year.</li>
          </ul>
        }
        assumptions="The damage occurred in transit, not from misuse."
        limitations="The photos were not independently verified."
      />

      {status === "pending" ? (
        <ApprovalPanel
          title="Approve this refund?"
          description="Approving will issue the refund to the original payment method."
          allowNotes
          pending={pending}
          onApprove={() => resolve("approved", "approve")}
          onReject={() => resolve("rejected", "reject")}
          onEdit={() => undefined}
        />
      ) : (
        <p className="rounded-card border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          Decision {status}. Reset by reloading the example.
        </p>
      )}
    </div>
  );
}
