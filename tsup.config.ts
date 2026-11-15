import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  target: "es2020",
  dts: true,
  // No Node.js shims (__dirname, import.meta.url): the output must run in any runtime
  shims: false,
  skipNodeModulesBundle: true,
  clean: true,
  // Unminified output keeps function names readable in stack traces;
  // the consumer's bundler minifies the final application
  minify: false,
  sourcemap: true,
});
