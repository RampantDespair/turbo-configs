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

/**
 * Must override:
 * - entry
 * - output
 * - resolve.alias
 */
export const createBaseConfig = (env, argv) => {
  const mode = modeSchema.parse(argv.mode);

  /** @type {import("webpack").Configuration} */
  const config = {
    entry: {
      index: path.resolve(paths.in, "index.ts"),
    },
    output: {
      clean: true,
      filename: "[name].js",
      path: paths.out,
    },
    mode: mode ?? "production",
    devtool: mode === "production" ? false : "source-map",
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/i,
          use: [
            mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                modules: {
                  auto: true,
                },
              },
            },
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
        },
      ],
    },
    optimization: {
      minimize: mode === "production",
      minimizer: [
        new CssMinimizerPlugin(),
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
        new TerserPlugin(),
      ].map((minimizer) => {
        minimizer.options = {
          ...minimizer.options,
          exclude: /\.min/,
        };
        return minimizer;
      }),
    },
    plugins: mode === "production" ? [new MiniCssExtractPlugin()] : [],
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
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  };

  return config;
};

export default createBaseConfig;
