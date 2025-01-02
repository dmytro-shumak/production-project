import path from "path";

import type { StorybookConfig } from "@storybook/react-webpack5";
import { DefinePlugin } from "webpack";

const config: StorybookConfig = {
  stories: ["../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-mock",
    "storybook-addon-themes",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.modules = [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, "../../src"),
      ];
    }
    config?.module?.rules?.forEach((rule) => {
      if (!rule || typeof rule !== "object") return;
      if (rule.test instanceof RegExp && rule.test.test(".svg")) {
        // eslint-disable-next-line no-param-reassign
        rule.exclude = /\.svg$/;
      }
    });

    if (config.module) {
      config.module.rules?.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
    }

    if (config.plugins) {
      config.plugins.push(
        new DefinePlugin({
          __DEV__: true,
          __PROJECT__: JSON.stringify("storybook"),
        }),
      );
    }

    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../../src"),
      };
    }

    return config;
  },
};
export default config;
