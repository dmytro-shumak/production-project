import HtmlWebpackPlugin from "html-webpack-plugin";
import { ProgressPlugin, type WebpackPluginInstance } from "webpack";
import type { BuildOption } from "./types/config";

export const buildPlugins = ({ paths }: BuildOption): WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: paths.html,
    }),
    new ProgressPlugin(),
  ];
};
