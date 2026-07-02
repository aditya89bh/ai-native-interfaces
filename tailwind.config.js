/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
    "./examples/**/*.{ts,tsx,html}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic colors used across AI-native components. These map to the
        // design tokens defined in src/tokens and can be overridden by consumers.
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#0ea5e9",
          neutral: "#64748b",
        },
        agent: {
          idle: "#64748b",
          thinking: "#6366f1",
          acting: "#0ea5e9",
          waiting: "#f59e0b",
          success: "#10b981",
          error: "#ef4444",
        },
        confidence: {
          low: "#ef4444",
          medium: "#f59e0b",
          high: "#10b981",
        },
        risk: {
          low: "#10b981",
          medium: "#f59e0b",
          high: "#f97316",
          critical: "#ef4444",
        },
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        elevation: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
        "elevation-md":
          "0 4px 6px -1px rgb(15 23 42 / 0.1), 0 2px 4px -2px rgb(15 23 42 / 0.1)",
        "elevation-lg":
          "0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.1)",
        "elevation-xl":
          "0 20px 25px -5px rgb(15 23 42 / 0.1), 0 8px 10px -6px rgb(15 23 42 / 0.1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "320ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        decelerate: "cubic-bezier(0, 0, 0, 1)",
        accelerate: "cubic-bezier(0.3, 0, 1, 1)",
      },
    },
  },
  plugins: [],
};
