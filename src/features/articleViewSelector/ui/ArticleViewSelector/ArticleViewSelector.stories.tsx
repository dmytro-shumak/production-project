import type { Meta, StoryObj } from "@storybook/react";

import { ArticleViewSelector } from "./ArticleViewSelector";

import { ArticleView } from "@/entities/Article";
import { ThemeDecorator } from "@/shared/config";
import { Theme } from "@/shared/const";

const meta = {
  title: "features/ArticleViewSelector",
  component: ArticleViewSelector,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
  args: {
    view: ArticleView.GRID,
  },
};

export const Dark: Story = {
  args: {
    view: ArticleView.GRID,
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
