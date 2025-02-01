import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";

export default {
  entry: "./src/index.ts",
  output: {
    clean: true,
    filename: "[name].js",
    path: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new TerserPlugin({
        exclude: /\.min/,
      }),
    ],
  },
} satisfies Configuration;
