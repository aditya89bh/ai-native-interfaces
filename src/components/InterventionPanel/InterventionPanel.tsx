import type { CSSProperties, ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type InterventionAction = "pause" | "resume" | "override" | "cancel";

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
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

export interface InterventionPanelProps {
  /** Whether the agent is currently paused (controls pause vs resume). */
  paused?: boolean;
  /** Called to pause the agent. Omit to hide the pause control. */
  onPause?: () => void;
  /** Called to resume the agent. Omit to hide the resume control. */
  onResume?: () => void;
  /** Called to override the agent's current action. */
  onOverride?: () => void;
  /** Called to cancel the current task. */
  onCancel?: () => void;
  /** Panel title. */
  title?: string;
  /** Supporting description. */
  description?: ReactNode;
  /** Which action is in progress; disables controls and shows a spinner. */
  pending?: InterventionAction | null;
  /** Disables all controls. */
  disabled?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * InterventionPanel
 *
 * Controls for a human to step into a running agent: pause, resume, override
 * the current action, or cancel the task. Only the controls whose handlers are
 * provided are rendered. Presentational only — it emits events and performs no
 * action itself.
 *
 * @example
 * ```tsx
 * <InterventionPanel
 *   paused={false}
 *   onPause={() => pause()}
 *   onResume={() => resume()}
 *   onOverride={() => openOverride()}
 *   onCancel={() => cancel()}
 * />
 * ```
 */
export function InterventionPanel({
  paused = false,
  onPause,
  onResume,
  onOverride,
  onCancel,
  title = "Intervene",
  description,
  pending = null,
  disabled = false,
  className,
}: InterventionPanelProps) {
  const busy = pending !== null;
  const controlsDisabled = disabled || busy;

  const showResume = paused && onResume;
  const showPause = !paused && onPause;

  const cancelStyle: CSSProperties = {
    color: semanticStatus.error,
    borderColor: semanticStatus.error,
  };

  return (
    <section
      aria-label={title}
      aria-busy={busy}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
    >
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      {description != null ? (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {showPause ? (
          <button
            type="button"
            onClick={onPause}
            disabled={controlsDisabled}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {pending === "pause" ? <Spinner /> : null}
            Pause
          </button>
        ) : null}
        {showResume ? (
          <button
            type="button"
            onClick={onResume}
            disabled={controlsDisabled}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {pending === "resume" ? <Spinner /> : null}
            Resume
          </button>
        ) : null}
        {onOverride ? (
          <button
            type="button"
            onClick={onOverride}
            disabled={controlsDisabled}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {pending === "override" ? <Spinner /> : null}
            Override action
          </button>
        ) : null}
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={controlsDisabled}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md border bg-white px-3 py-1.5 text-sm font-medium hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-red-950/40"
            style={cancelStyle}
          >
            {pending === "cancel" ? <Spinner /> : null}
            Cancel task
          </button>
        ) : null}
      </div>
    </section>
  );
}
