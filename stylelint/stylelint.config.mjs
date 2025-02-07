/** @type {import("stylelint").Config} */
export const baseConfig = {
  extends: [
    "stylelint-config-prettier-scss",
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind"],
      },
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind"],
      },
    ],
  },
};

export default baseConfig;
