import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components/index.ts",
    templates: "src/templates/index.ts",
    theme: "src/theme/index.ts",
    tokens: "src/tokens/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Shared code is split into chunks so subpath entries don't duplicate it and
  // consumers only pull what they import.
  splitting: true,
  treeshake: true,
  minify: false,
  target: "es2020",
  external: ["react", "react-dom"],
  // Ship the design-token stylesheet alongside the bundle for consumers who
  // want the CSS variable definitions.
  onSuccess: "cp src/styles.css dist/styles.css",
});
