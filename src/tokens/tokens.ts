/**
 * Design tokens for ai-native-interfaces.
 *
 * These tokens are the single source of truth for the visual language of the
 * library. They intentionally mirror the semantic scales declared in
 * `tailwind.config.js` so that components can be styled with either Tailwind
 * utility classes or raw token values.
 */

export const agentStateColors = {
  idle: "#64748b",
  thinking: "#6366f1",
  acting: "#0ea5e9",
  waiting: "#f59e0b",
  success: "#10b981",
  error: "#ef4444",
} as const;

export const confidenceColors = {
  low: "#ef4444",
  medium: "#f59e0b",
  high: "#10b981",
} as const;

export const riskColors = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#f97316",
  critical: "#ef4444",
} as const;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
} as const;

export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  card: "0.75rem",
  full: "9999px",
} as const;

export const typography = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontMono:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
} as const;

export const tokens = {
  agentStateColors,
  confidenceColors,
  riskColors,
  spacing,
  radii,
  typography,
} as const;

export type AgentState = keyof typeof agentStateColors;
export type ConfidenceLevel = keyof typeof confidenceColors;
export type RiskLevel = keyof typeof riskColors;
export type Tokens = typeof tokens;
