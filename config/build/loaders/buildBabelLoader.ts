import type { BuildOptions } from "../types/config";
import babelRemoveAttributesPlugin from "../../babel/babelRemoveAttributesPlugin";

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
          isTsx && [
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
