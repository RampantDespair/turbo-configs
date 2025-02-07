/** @type {import("tsup").Options} */
export const baseConfig = {
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  format: ["esm"],
  dts: true,
  sourcemap: true,
  noExternal: [],
  clean: true,
  treeshake: true,
};

/** @type {import("tsup").Options} */
export const baseConfigBrowser = {
  ...baseConfig,
  target: "esnext",
  platform: "browser",
};

/** @type {import("tsup").Options} */
export const baseConfigNode = {
  ...baseConfig,
  target: "node22",
  platform: "node",
};

export default baseConfig;
