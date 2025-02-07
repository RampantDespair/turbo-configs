/** @type {import("prettier").Config} */
export const baseConfig = {
  tailwindFunctions: ["clsx", "tw"],
  plugins: [
    "prettier-plugin-css-order",
    "prettier-plugin-embed",
    "prettier-plugin-organize-attributes",
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-prisma",
    "prettier-plugin-sql",
    "prettier-plugin-tailwindcss",
  ],
};

export default baseConfig;
