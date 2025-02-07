/** @type {import("tailwindcss").Config} */
export const baseConfig = {
  content: ["./{app,components,pages,src}/**/*.{js,jsx,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default baseConfig;
