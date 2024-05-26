import type { RuleSetRule } from "webpack";

export const buildLoaders = (): RuleSetRule[] => {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  };

  return [typescriptLoader, cssLoader];
};
