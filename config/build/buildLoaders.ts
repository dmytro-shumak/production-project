import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule } from "webpack";

import { buildBabelLoader } from "./loaders/buildBabelLoader";
import type { BuildOptions } from "./types/config";

export const buildLoaders = ({ isDev }: BuildOptions): RuleSetRule[] => {
  // const typescriptLoader: RuleSetRule = {
  //   test: /\.tsx?$/,
  //   use: "ts-loader",
  //   exclude: /node_modules/,
  // };

  const cssLoader: RuleSetRule = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
            auto: (resPath: string) => resPath.includes(".module.css"),
            namedExport: false,
          },
          importLoaders: 1,
          sourceMap: true,
        },
      },
    ],
  };

  const svgLoader: RuleSetRule = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  };

  const codeBabelLoader = buildBabelLoader({ isDev, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ isDev, isTsx: true });

  const fileLoader: RuleSetRule = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  return [
    cssLoader,
    svgLoader,
    fileLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
  ];
};
