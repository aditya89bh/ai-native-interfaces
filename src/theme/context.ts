import { createContext, useContext } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  /** The selected theme: `light`, `dark`, or `system`. */
  theme: Theme;
  /** The concrete theme in effect after resolving `system`. */
  resolvedTheme: ResolvedTheme;
  /** Selects a theme. */
  setTheme: (theme: Theme) => void;
  /** Toggles between light and dark (resolving `system` first). */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Reads the current theme context. Must be used within a `ThemeProvider`.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }
  return context;
}
