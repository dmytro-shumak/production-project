import path from "path";
import type { Configuration } from "webpack";
import { buildWebpackConfig } from "./config/webpack-build/buildWebpackConfig";
import type { BuildPaths } from "./config/webpack-build/types/config";

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
};

const mode: string = "production";
const isDev = mode === "development";
const port = 3000;

const config: Configuration = buildWebpackConfig({
  mode: "production",
  paths,
  isDev,
  port,
});

export default config;
