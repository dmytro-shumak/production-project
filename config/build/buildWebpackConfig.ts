import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import type { Configuration } from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugin";
import { buildResolve } from "./buildResolve";
import type { BuildOptions } from "./types/config";

export const buildWebpackConfig = (option: BuildOptions): Configuration => {
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
      publicPath: "/",
    },
    devtool: isDev ? "inline-source-map" : false,
    module: {
      rules: buildLoaders(option),
    },
    optimization: {
      // emitOnErrors: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    resolve: buildResolve(option),
    plugins: buildPlugins(option),
    devServer: isDev ? buildDevServer(option) : undefined,
  };
};
