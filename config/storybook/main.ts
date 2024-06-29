import type { StorybookConfig } from '@storybook/react-webpack5';
import path from "path";

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    },

  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),

  webpackFinal: async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../../src"),
    ];
    config?.module?.rules?.forEach(rule => {
      if (!rule || typeof rule !== 'object') return;
      if (rule.test instanceof RegExp && rule.test.test('.svg')) {
        // eslint-disable-next-line no-param-reassign
        rule.exclude = /\.svg$/;
      }
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config;
  },
};
export default config;