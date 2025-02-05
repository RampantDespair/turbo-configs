import CopyWebpackPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import z from "zod";

const __dirname = import.meta.dirname;
const paths = {
  in: path.resolve(__dirname, "src"),
  out: path.resolve(__dirname, "dist"),
};

const modeSchema = z
  .enum(["development", "production", "none"])
  .optional()
  .default("production");

const createConfig = (env, argv) => {
  const mode = modeSchema.parse(argv.mode);

  /** @type {import("webpack").Configuration} */
  const config = {
    entry: path.resolve(paths.in, "index.ts"),
    output: {
      clean: true,
      filename: "[name].js",
      path: path.resolve(paths.out, "dist"),
    },
    mode: mode ?? "production",
    devtool: mode === "production" ? false : "source-map",
    module: {
      rules: [
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
          test: /\.(jpe?g|png|gif)$/i,
          type: "asset",
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx|mts|cts)$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: mode === "production",
      minimizer: [
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
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            noErrorOnMissing: true,
          },
        ],
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      extensions: [
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".ts",
        ".tsx",
        ".mts",
        ".cts",
      ],
    },
    stats: {
      all: false,
      errors: true,
      builtAt: true,
    },
  };

  return config;
};

export default createConfig;
