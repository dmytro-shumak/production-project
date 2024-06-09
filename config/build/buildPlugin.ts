import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { DefinePlugin, ProgressPlugin, type WebpackPluginInstance } from "webpack";
import type { BuildOptions } from "./types/config";

export const buildPlugins = ({ paths, isDev }: BuildOptions): WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new DefinePlugin({
      __DEV__: JSON.stringify(isDev),
    }),
  ];
};
