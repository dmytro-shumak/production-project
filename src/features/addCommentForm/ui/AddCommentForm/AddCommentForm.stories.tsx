import type { Meta, StoryObj } from "@storybook/react";

import AddCommentForm from "./AddCommentForm";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const";

const meta = {
  title: "features/AddCommentForm",
  component: AddCommentForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
  args: {
    onSendComment: () => {},
  },
};

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    onSendComment: () => {},
  },
};
