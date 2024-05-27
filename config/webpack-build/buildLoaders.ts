import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule } from "webpack";
import type { BuildOption } from "./types/config";

export const buildLoaders = ({ isDev }: BuildOption): RuleSetRule[] => {
  const typescriptLoader: RuleSetRule = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoader: RuleSetRule = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",
            auto: (resPath: string) => resPath.includes(".module.css"),
          },
          importLoaders: 1,
          sourceMap: true,
        },
      },
    ],
  };

  return [typescriptLoader, cssLoader];
};
