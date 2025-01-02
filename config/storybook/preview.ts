import type { Preview } from "@storybook/react";

import { store, type ReducerSchema } from "@/shared/config/redux";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { withI18nextDecorator } from "@/shared/config/storybook/withI18nextDecorator";
import { Theme } from "@/shared/const";

const preview: Preview = {
  parameters: {
    // backgrounds: {
    //   default: "light",
    //   values: [
    //     { name: "light", value: "#e8e8ea" },
    //     { name: "dark", value: "#090949" },
    //   ],
    // },
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/i,
    //   },
    // },
    backgrounds: {
      disable: true,
    },
    themes: {
      default: "light",
      list: [
        { name: "light", class: Theme.Light, color: "#e8e8ea" },
        { name: "dark", class: Theme.Dark, color: "#090949" },
        { name: "orange", class: Theme.Orange, color: "#fb5998" },
      ],
      target: "body",
    },
  },
  decorators: [
    StoreDecorator(store as unknown as ReducerSchema),
    withI18nextDecorator,
    RouterDecorator,
    ThemeDecorator(Theme.Light),
  ],
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "ru", title: "Russian" },
        { value: "ua", title: "Ukraine" },
      ],
      showName: true,
    },
  },
};

export default preview;
