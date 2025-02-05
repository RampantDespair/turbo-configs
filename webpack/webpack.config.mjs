import CopyWebpackPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

/** @type {import("webpack").Configuration} */
const config = {
  entry: "./src/index.ts",
  output: {
    clean: true,
    filename: "[name].js",
    path: "./dist",
  },
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  module: {
    rules: [
      "...",
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.json$/i,
        type: "asset/resource",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(ts|tsx|mts|cts)$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === "production",
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        exclude: /\.min/,
      }),
      new HtmlMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                // https://sharp.pixelplumbing.com/api-output#jpeg
                quality: 100,
              },
              webp: {
                // https://sharp.pixelplumbing.com/api-output#webp
                lossless: true,
              },
              avif: {
                // https://sharp.pixelplumbing.com/api-output#avif
                lossless: true,
              },
              // png by default sets the quality to 100%, which is same as lossless
              // https://sharp.pixelplumbing.com/api-output#png
              png: {},
              // gif does not support lossless compression at all
              // https://sharp.pixelplumbing.com/api-output#gif
              gif: {},
            },
          },
        },
      }),
      new JsonMinimizerPlugin(),
      new TerserPlugin({
        exclude: /\.min/,
      }),
    ],
  },
  plugins: [new CopyWebpackPlugin(), new MiniCssExtractPlugin()],
  resolve: {
    extensions: [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts"],
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
};

export default config;
