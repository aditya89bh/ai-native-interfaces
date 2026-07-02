import type { CSSProperties, ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export type EscalationSeverity = "info" | "warning" | "urgent" | "blocked";

const severityConfig: Record<
  EscalationSeverity,
  { color: string; label: string; glyph: string; assertive: boolean }
> = {
  info: {
    color: semanticStatus.info,
    label: "Info",
    glyph: "i",
    assertive: false,
  },
  warning: {
    color: semanticStatus.warning,
    label: "Warning",
    glyph: "!",
    assertive: false,
  },
  urgent: {
    color: semanticStatus.error,
    label: "Urgent",
    glyph: "!",
    assertive: true,
  },
  blocked: {
    color: semanticStatus.error,
    label: "Blocked",
    glyph: "⊘",
    assertive: true,
  },
};

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface EscalationBannerProps {
  /** Severity of the escalation. */
  severity: EscalationSeverity;
  /** The escalation message. */
  children: ReactNode;
  /** Optional heading; defaults to the severity label. */
  title?: string;
  /** Optional action content (e.g. a button) shown on the trailing side. */
  action?: ReactNode;
  /** Called when the dismiss button is pressed. Omit to hide it. */
  onDismiss?: () => void;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * EscalationBanner
 *
 * A prominent banner that communicates the severity of a situation that may
 * need human attention: info, warning, urgent, or blocked. Urgent and blocked
 * banners announce assertively; others announce politely. Severity is conveyed
 * with color, an icon, and text. Presentational only.
 *
 * @example
 * ```tsx
 * <EscalationBanner severity="blocked" onDismiss={() => dismiss()}>
 *   The agent is blocked waiting for credentials.
 * </EscalationBanner>
 * ```
 */
export function EscalationBanner({
  severity,
  children,
  title,
  action,
  onDismiss,
  className,
}: EscalationBannerProps) {
  const config = severityConfig[severity];
  const heading = title ?? config.label;

  const style: CSSProperties = {
    backgroundColor: hexToRgba(config.color, 0.1),
    borderColor: hexToRgba(config.color, 0.35),
  };

  return (
    <div
      role={config.assertive ? "alert" : "status"}
      className={cn("flex items-start gap-3 rounded-md border p-3", className)}
      style={style}
    >
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: config.color }}
      >
        {config.glyph}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" style={{ color: config.color }}>
          <span className="sr-only">{config.label}: </span>
          {heading}
        </p>
        <div className="mt-0.5 text-sm text-slate-700">{children}</div>
      </div>
      {action != null ? <div className="shrink-0">{action}</div> : null}
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
