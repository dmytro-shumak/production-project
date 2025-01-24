import path from "path";

import type { Configuration } from "webpack";

import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import type {
  BuildEnv,
  BuildMode,
  BuildPaths,
} from "./config/build/types/config";

const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
  if (apiUrl) {
    return apiUrl;
  }
  if (mode === "production") {
    return "/api";
  }

  return "http://localhost:8000";
};

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  };

  const mode = env?.mode || "production";
  const isDev = mode === "development";
  const port = env?.port || 3000;
  const apiUrl = getApiUrl(mode, env.apiUrl);

  const config: Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
    project: "frontend",
    apiUrl,
  });

  return config;
};
