/** @type {import("postcss-load-config").Config} */
export const baseConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
        //grid: true,
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    },
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
  },
};

export default baseConfig;
