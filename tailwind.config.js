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
    },
  },
  plugins: [],
};
