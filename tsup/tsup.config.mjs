import { defineConfig } from "tsup";

export default defineConfig({
  target: "esnext",
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  format: ["esm"],
  dts: true,
  sourcemap: true,
  noExternal: [],
  clean: true,
  platform: "node",
  treeshake: true,
});
