import path from "path";
import type { Configuration } from "webpack";
import { buildLoaders } from "./config/webpack-build/buildLoaders";
import { buildPlugins } from "./config/webpack-build/buildPlugin";
import { buildResolve } from "./config/webpack-build/buildResolve";

const config: Configuration = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  module: {
    rules: buildLoaders(),
  },
  resolve: buildResolve(),
  plugins: buildPlugins(),
};

export default config;
