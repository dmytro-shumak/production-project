import type { Configuration } from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugin";
import { buildResolve } from "./buildResolve";
import type { BuildOption } from "./types/config";

export const buildWebpackConfig = (option: BuildOption): Configuration => {
  const { mode, paths, isDev } = option;
  return {
    mode,
    performance: {
      hints: false,
    },
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    devtool: isDev ? "inline-source-map" : false,
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolve(),
    plugins: buildPlugins(option),
    devServer: isDev ? buildDevServer(option) : undefined,
  };
};
