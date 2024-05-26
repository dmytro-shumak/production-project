import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule } from "webpack";
import type { BuildOption } from "./types/config";

export const buildLoaders = ({ isDev }: BuildOption): RuleSetRule[] => {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]__[local]___[hash:base64:5]",
          },
          importLoaders: 1,
          sourceMap: true,
        },
      },
    ],
  };

  return [typescriptLoader, cssLoader];
};
