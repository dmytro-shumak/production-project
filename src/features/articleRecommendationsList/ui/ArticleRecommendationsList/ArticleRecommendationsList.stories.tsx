import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/theme";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

const meta = {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {};

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
