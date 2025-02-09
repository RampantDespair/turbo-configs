import jsLint from "@eslint/js";
import globals from "globals";
import tsLint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export const baseConfig = [
  // config parsers
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
  },
  // config envs
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  // syntax rules
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  // ignore rules
  {
    ignores: ["node_modules", "dist", "build", "coverage", "public"],
  },
];

export default baseConfig;
