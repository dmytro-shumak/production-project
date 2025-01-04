import babelRemoveAttributesPlugin from "../../babel/babelRemoveAttributesPlugin";
import type { BuildOptions } from "../types/config";

interface BuildBabelLoaderProps extends Partial<BuildOptions> {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        presets: ["@babel/preset-env"],
        plugins: [
          // [
          //   "i18next-extract",
          //   {
          //     locales: ["ru", "en"],
          //     keyAsDefaultValue: true,
          //   },
          // ],
          [
            "@babel/plugin-transform-typescript",
            {
              isTsx,
            },
          ],
          "@babel/plugin-transform-runtime",
          isTsx &&
            !isDev && [
              babelRemoveAttributesPlugin,
              {
                props: ["data-testid"],
              },
            ],
          isDev && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
      },
    },
  };
}
