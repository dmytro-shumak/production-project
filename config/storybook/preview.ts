import type { Preview } from '@storybook/react';
import { Theme } from "app/providers/theme";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";

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
  decorators: [RouterDecorator, ThemeDecorator(Theme.Light)],
};

export default preview;
