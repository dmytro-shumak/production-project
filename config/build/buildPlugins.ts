import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin,
  type WebpackPluginInstance,
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CircularDependencyPlugin from "circular-dependency-plugin";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { BuildOptions } from "./types/config";

export const buildPlugins = ({
  paths,
  isDev,
  project,
}: BuildOptions): WebpackPluginInstance[] => {
  const plugins: WebpackPluginInstance[] = [
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
      __DEV__: isDev,
      __PROJECT__: JSON.stringify(project),
    }),
    new HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ];

  if (isDev) {
    plugins.push(
      new ReactRefreshWebpackPlugin(),
      new BundleAnalyzerPlugin({ openAnalyzer: false }),
    );
  }

  return plugins;
};
