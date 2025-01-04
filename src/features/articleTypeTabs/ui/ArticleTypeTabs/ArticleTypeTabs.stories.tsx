import type { Meta, StoryObj } from "@storybook/react";

import { ArticleTypeTabs } from "./ArticleTypeTabs";

import { ArticleType } from "@/entities/Article";
import { ThemeDecorator } from "@/shared/config";
import { Theme } from "@/shared/const";

const meta = {
  title: "features/ArticleTypeTabs",
  component: ArticleTypeTabs,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
  args: {
    value: ArticleType.ALL,
    onChangeType: () => {},
  },
};

export const Dark: Story = {
  args: {
    value: ArticleType.ALL,
    onChangeType: () => {},
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
