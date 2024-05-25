import path from "path";
import type { Configuration } from "webpack";
import { buildLoaders } from "./config/build/buildLoaders";
import { buildPlugins } from "./config/build/buildPlugin";
import { buildResolve } from "./config/build/buildResolve";

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
