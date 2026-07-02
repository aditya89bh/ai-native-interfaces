import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ThemeContext } from "./context";
import type { ResolvedTheme, Theme, ThemeContextValue } from "./context";

const DEFAULT_STORAGE_KEY = "ani-theme";

function getSystemTheme(): ResolvedTheme {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(storageKey: string): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(storageKey);
    if (value === "light" || value === "dark" || value === "system") {
      return value;
    }
  } catch {
    // Ignore storage access errors (private mode, disabled storage, SSR).
  }
  return null;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Theme to use before any stored preference is read. */
  defaultTheme?: Theme;
  /** localStorage key for persistence. */
  storageKey?: string;
  /** Whether to persist the choice to localStorage. */
  enablePersistence?: boolean;
  /**
   * Whether to toggle the `dark` class on the document root so the whole page
   * (including portals) reacts. Defaults to true.
   */
  applyToDocument?: boolean;
  /**
   * Custom design-token overrides applied as CSS custom properties on the
   * provider's wrapper element, e.g. `{ "--ani-surface": "24 24 27" }`.
   */
  tokenOverrides?: Record<string, string>;
  /** Class applied to the wrapper element. */
  className?: string;
}

/**
 * ThemeProvider
 *
 * A small, dependency-free provider for `light | dark | system` theming and
 * custom token overrides. It resolves the system preference, reacts to OS
 * changes, optionally persists the choice, and toggles the `dark` class on the
 * document root. Custom token overrides are applied as CSS variables on the
 * wrapper element. It is entirely optional — apps that manage the `dark` class
 * themselves need nothing from the library.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = DEFAULT_STORAGE_KEY,
  enablePersistence = true,
  applyToDocument = true,
  tokenOverrides,
  className,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () =>
      (enablePersistence ? readStoredTheme(storageKey) : null) ?? defaultTheme,
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(query.matches ? "dark" : "light");
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [applyToDocument, resolvedTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (enablePersistence && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          // Ignore storage write errors.
        }
      }
    },
    [enablePersistence, storageKey],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  const style = tokenOverrides as CSSProperties | undefined;

  return (
    <ThemeContext.Provider value={value}>
      <div className={className} style={style} data-theme={resolvedTheme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
