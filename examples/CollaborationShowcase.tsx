import {
  AssignmentStatus,
  EscalationBanner,
  FeedbackCapture,
  HumanHandoffCard,
  InterventionPanel,
} from "../src/components";

/**
 * CollaborationShowcase
 *
 * An integrated example that composes every Human Collaboration & Escalation
 * component: an `EscalationBanner` raising the alarm, a `HumanHandoffCard`
 * describing why a person is needed, an `AssignmentStatus` tracking ownership,
 * an `InterventionPanel` of controls, and a `FeedbackCapture` for corrections.
 *
 * The data and handlers here are static — the components remain presentational
 * and never intervene, assign, or submit anything themselves.
 */
export function CollaborationShowcase() {
  const noop = () => undefined;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Refund request review
        </h2>
        <AssignmentStatus status="assigned" assignee="Dana Lee" />
      </header>

      <EscalationBanner severity="urgent" onDismiss={noop}>
        The agent needs a decision within 5 minutes to meet the SLA.
      </EscalationBanner>

      <HumanHandoffCard
        reason="The refund of $1,240 exceeds the agent's approval limit of $500."
        priority="high"
        assignee="Dana Lee"
        status="in-progress"
        timestamp="2 minutes ago"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <InterventionPanel
          description="Step in while the agent is paused."
          paused
          onResume={noop}
          onOverride={noop}
          onCancel={noop}
        />

        <FeedbackCapture
          description="Tell the agent what to do differently."
          categories={["Incorrect amount", "Policy violation", "Other"]}
          onSubmit={noop}
        />
      </div>
    </div>
  );
}
