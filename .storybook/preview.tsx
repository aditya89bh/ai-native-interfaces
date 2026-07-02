/* eslint-disable react-refresh/only-export-components -- Storybook config, not an HMR module. */
import { useEffect } from "react";
import type { ReactNode } from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../src/styles.css";

/**
 * Applies the `dark` class to the preview root (and body) so every story can be
 * checked in light and dark from the toolbar without extra wiring.
 */
function ThemedStory({
  theme,
  children,
}: {
  theme: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.style.backgroundColor =
      theme === "dark" ? "#0f172a" : "#ffffff";
    document.body.style.colorScheme = theme;
  }, [theme]);
  return (
    <div className={theme === "dark" ? "dark" : undefined}>
      <div className="p-4 text-slate-900 dark:text-slate-100">{children}</div>
    </div>
  );
}

const withTheme: Decorator = (Story, context) => (
  <ThemedStory theme={context.globals.theme ?? "light"}>
    <Story />
  </ThemedStory>
);

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Color scheme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: "#storybook-root",
    },
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
};

export default preview;
