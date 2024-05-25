import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { ProgressPlugin, type WebpackPluginInstance } from "webpack";

export const buildPlugins = (): WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ProgressPlugin(),
  ];
};
