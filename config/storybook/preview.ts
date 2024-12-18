import type { Preview } from "@storybook/react";
import { store, type ReducerSchema } from "@/shared/config";
import {
  RouterDecorator,
  ThemeDecorator,
  StoreDecorator,
  withI18nextDecorator,
} from "@/shared/config";
import { Theme } from "@/app/providers/theme";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#e8e8ea" },
        { name: "dark", value: "#090949" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
