import type { CSSProperties, ReactNode } from "react";
import type { ConfidenceLevel } from "../../tokens";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";
import { ConfidenceIndicator } from "../ConfidenceIndicator";
import { RiskBadge } from "../RiskBadge";
import type { RiskBadgeLevel } from "../RiskBadge";

export type DecisionApprovalStatus = "pending" | "approved" | "rejected";

const approvalConfig: Record<
  DecisionApprovalStatus,
  { label: string; color: string }
> = {
  pending: { label: "Pending approval", color: semanticStatus.warning },
  approved: { label: "Approved", color: semanticStatus.success },
  rejected: { label: "Rejected", color: semanticStatus.error },
};

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface FieldProps {
  label: string;
  children: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="text-sm text-slate-700">{children}</dd>
    </div>
  );
}

export interface DecisionSummaryProps {
  /** The action the agent selected or proposes to take. */
  action: ReactNode;
  /** The confidence level in the decision. */
  confidence?: ConfidenceLevel;
  /** Optional numeric confidence (0–100). */
  confidenceValue?: number;
  /** The risk level of the action. */
  risk?: RiskBadgeLevel;
  /** When the decision was made. */
  timestamp?: ReactNode;
  /** A short reasoning summary. */
  reasoning?: ReactNode;
  /** The current approval status of the decision. */
  approvalStatus?: DecisionApprovalStatus;
  /** Card title. */
  title?: string;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * DecisionSummary
 *
 * A compact, at-a-glance view of an AI decision: the selected action, its
 * confidence and risk, when it was made, a short reasoning summary, and the
 * current approval status. It composes `ConfidenceIndicator` and `RiskBadge`.
 *
 * @example
 * ```tsx
 * <DecisionSummary
 *   action="Refund the customer $42.00"
 *   confidence="high"
 *   risk="moderate"
 *   timestamp="2 minutes ago"
 *   reasoning="Order arrived damaged and is within the refund window."
 *   approvalStatus="pending"
 * />
 * ```
 */
export function DecisionSummary({
  action,
  confidence,
  confidenceValue,
  risk,
  timestamp,
  reasoning,
  approvalStatus,
  title = "Decision",
  className,
}: DecisionSummaryProps) {
  const status = approvalStatus ? approvalConfig[approvalStatus] : null;
  const statusStyle: CSSProperties | undefined = status
    ? {
        color: status.color,
        backgroundColor: hexToRgba(status.color, 0.12),
        borderColor: hexToRgba(status.color, 0.3),
      }
    : undefined;

  const hasMeta = confidence != null || risk != null || timestamp != null;

  return (
    <article
      aria-label={title}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h3>
        {status ? (
          <span
            className="inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium"
            style={statusStyle}
          >
            {status.label}
          </span>
        ) : null}
      </div>

      <p className="mt-1.5 text-sm font-medium text-slate-900">{action}</p>

      {hasMeta ? (
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {confidence != null ? (
            <Field label="Confidence">
              <ConfidenceIndicator
                level={confidence}
                value={confidenceValue}
                size="sm"
              />
            </Field>
          ) : null}
          {risk != null ? (
            <Field label="Risk">
              <RiskBadge level={risk} size="sm" />
            </Field>
          ) : null}
          {timestamp != null ? (
            <Field label="Time">
              <span className="text-slate-500">{timestamp}</span>
            </Field>
          ) : null}
        </dl>
      ) : null}

      {reasoning != null ? (
        <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600">
          {reasoning}
        </p>
      ) : null}
    </article>
  );
}
