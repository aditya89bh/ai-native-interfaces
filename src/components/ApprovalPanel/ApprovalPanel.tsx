import { useId, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type ApprovalPending = "approve" | "reject" | null;

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 animate-spin"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface ApprovalPanelProps {
  /** Short title describing what is being approved. */
  title?: string;
  /** Supporting description shown under the title. */
  description?: ReactNode;
  /** Preview content of the action awaiting approval. */
  children?: ReactNode;
  /** Whether to show a notes field whose value is passed to the callbacks. */
  allowNotes?: boolean;
  /** Label for the notes field. */
  notesLabel?: string;
  /** Placeholder for the notes field. */
  notesPlaceholder?: string;
  /** Called when the user approves, with the current notes. */
  onApprove: (notes: string) => void;
  /** Called when the user rejects, with the current notes. */
  onReject: (notes: string) => void;
  /** Called when the user chooses to edit before approving. */
  onEdit?: () => void;
  /** Label for the approve button. */
  approveLabel?: string;
  /** Label for the reject button. */
  rejectLabel?: string;
  /** Label for the edit button. */
  editLabel?: string;
  /** Which action is in progress; disables controls and shows a spinner. */
  pending?: ApprovalPending;
  /** Disables all controls. */
  disabled?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * ApprovalPanel
 *
 * A control for reviewing an agent-proposed action: approve, reject, or edit
 * before approving, with optional notes and per-action loading states. It is
 * fully presentational — it emits events and never performs the action itself.
 *
 * @example
 * ```tsx
 * <ApprovalPanel
 *   title="Send report to stakeholders"
 *   description="The agent wants to email the Q3 summary."
 *   allowNotes
 *   onApprove={(notes) => save(notes)}
 *   onReject={(notes) => discard(notes)}
 *   onEdit={() => openEditor()}
 * />
 * ```
 */
export function ApprovalPanel({
  title,
  description,
  children,
  allowNotes = false,
  notesLabel = "Notes",
  notesPlaceholder = "Add an optional note…",
  onApprove,
  onReject,
  onEdit,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  editLabel = "Edit",
  pending = null,
  disabled = false,
  className,
}: ApprovalPanelProps) {
  const [notes, setNotes] = useState("");
  const notesId = useId();
  const busy = pending !== null;
  const controlsDisabled = disabled || busy;

  const approveStyle: CSSProperties = {
    backgroundColor: semanticStatus.success,
    color: "#ffffff",
  };
  const rejectStyle: CSSProperties = {
    color: semanticStatus.error,
    borderColor: semanticStatus.error,
  };

  return (
    <section
      aria-label={title ?? "Approval request"}
      aria-busy={busy}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
    >
      {title ? (
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}

      {children ? <div className="mt-3">{children}</div> : null}

      {allowNotes ? (
        <div className="mt-3">
          <label
            htmlFor={notesId}
            className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200"
          >
            {notesLabel}
          </label>
          <textarea
            id={notesId}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={notesPlaceholder}
            disabled={controlsDisabled}
            rows={2}
            className="w-full resize-y rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            disabled={controlsDisabled}
            className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {editLabel}
          </button>
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onReject(notes)}
            disabled={controlsDisabled}
            className="inline-flex items-center gap-1.5 rounded-md border bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            style={rejectStyle}
          >
            {pending === "reject" ? <Spinner /> : null}
            {rejectLabel}
          </button>
          <button
            type="button"
            onClick={() => onApprove(notes)}
            disabled={controlsDisabled}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 disabled:opacity-50 dark:focus-visible:ring-offset-slate-900"
            style={approveStyle}
          >
            {pending === "approve" ? <Spinner /> : null}
            {approveLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
