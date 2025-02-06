import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/Skeleton",
  component: Skeleton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    width: 100,
    height: 100,
  },
};

export const Rounded: Story = {
  args: {
    borderRadius: 16,
    width: 100,
    height: 100,
  },
};

export const DarkPrimary: Story = {
  args: {
    width: 100,
    height: 100,
  },

  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const DarkRounded: Story = {
  args: {
    borderRadius: 16,
    width: 100,
    height: 100,
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
