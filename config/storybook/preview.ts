import type { Preview } from '@storybook/react';
import { Theme } from "app/providers/theme";
import { StyleDecorator } from "shared/config/storybook/StyleDecorator";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#e8e8ea' },
        { name: 'dark', value: '#090949' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StyleDecorator(Theme.Light)],
};

export default preview;
