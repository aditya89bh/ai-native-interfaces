/**
 * Design tokens for ai-native-interfaces.
 *
 * These tokens are the single source of truth for the visual language of the
 * library. They intentionally mirror the scales declared in
 * `tailwind.config.js` so that components can be styled with either Tailwind
 * utility classes or raw token values.
 *
 * Categories:
 * - `palette`          neutral and brand color ramps
 * - `semanticStatus`   success / warning / error / info / neutral
 * - `agentStateColors` colors for the agent state taxonomy
 * - `confidenceColors` colors for the confidence scale
 * - `riskColors`       colors for risk levels
 * - `spacing`          spacing scale
 * - `typography`       font families, sizes, weights, and line heights
 * - `radii`            border radius scale
 * - `elevation`        box-shadow scale
 * - `animation`        durations and easing curves
 */

export const palette = {
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  brand: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
} as const;

/**
 * Semantic status colors. These express meaning (success, warning, error,
 * info, neutral) rather than a specific hue, so products can remap them
 * without changing component code.
 */
export const semanticStatus = {
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#0ea5e9",
  neutral: "#64748b",
} as const;

/**
 * Colors for the agent state taxonomy. See docs/agent-states.md for the
 * definition and intended meaning of each state.
 */
export const agentStateColors = {
  idle: "#64748b",
  thinking: "#6366f1",
  planning: "#8b5cf6",
  acting: "#0ea5e9",
  waiting: "#f59e0b",
  needsApproval: "#f97316",
  blocked: "#f43f5e",
  failed: "#ef4444",
  completed: "#10b981",
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
  none: "0",
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
} as const;

export const radii = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  card: "0.75rem",
  lg: "1rem",
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
    "2xl": "1.5rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/**
 * Elevation expresses depth and layering. Higher levels imply a surface that
 * floats further above the page (for example a popover or dialog).
 */
export const elevation = {
  none: "none",
  sm: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
  md: "0 4px 6px -1px rgb(15 23 42 / 0.1), 0 2px 4px -2px rgb(15 23 42 / 0.1)",
  lg: "0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.1)",
  xl: "0 20px 25px -5px rgb(15 23 42 / 0.1), 0 8px 10px -6px rgb(15 23 42 / 0.1)",
} as const;

/**
 * Animation tokens. Durations are kept short and purposeful; motion should
 * clarify state changes, never decorate. Respect `prefers-reduced-motion`.
 */
export const animation = {
  duration: {
    instant: "0ms",
    fast: "120ms",
    base: "200ms",
    slow: "320ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    decelerate: "cubic-bezier(0, 0, 0, 1)",
    accelerate: "cubic-bezier(0.3, 0, 1, 1)",
  },
} as const;

export const tokens = {
  palette,
  semanticStatus,
  agentStateColors,
  confidenceColors,
  riskColors,
  spacing,
  radii,
  typography,
  elevation,
  animation,
} as const;

export type Palette = typeof palette;
export type SemanticStatus = keyof typeof semanticStatus;
export type AgentState = keyof typeof agentStateColors;
export type ConfidenceLevel = keyof typeof confidenceColors;
export type RiskLevel = keyof typeof riskColors;
export type Elevation = keyof typeof elevation;
export type Tokens = typeof tokens;
