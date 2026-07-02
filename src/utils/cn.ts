/**
 * Join class names, dropping falsy values.
 *
 * A minimal, dependency-free helper used across components to compose
 * conditional Tailwind classes with an optional consumer `className`.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
