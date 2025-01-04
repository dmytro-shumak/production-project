import type { Meta, StoryObj } from "@storybook/react";

import { ArticleSortSelector } from "./ArticleSortSelector";

import { ArticleSortField } from "@/entities/Article";
import { ThemeDecorator } from "@/shared/config";
import { Theme } from "@/shared/const";

const meta = {
  title: "features/ArticleSortSelector",
  component: ArticleSortSelector,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ArticleSortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
  args: {
    order: "asc",
    sort: ArticleSortField.VIEWS,
    onChangeOrder: () => {},
    onChangeSort: () => {},
  },
};

export const Dark: Story = {
  args: {
    order: "asc",
    sort: ArticleSortField.VIEWS,
    onChangeOrder: () => {},
    onChangeSort: () => {},
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
