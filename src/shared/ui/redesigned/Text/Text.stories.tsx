import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/Text",
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
  },
};

export const Error: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
    variant: "error",
  },
};

export const OnlyTitle: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
};

export const OnlyText: Story = {
  args: {
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
  },
};

export const PrimaryDark: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const OnlyTitleDark: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const OnlyTextDark: Story = {
  args: {
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const SizeLarge: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
    size: "large",
  },
};

export const SizeMedium: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
    size: "medium",
  },
};

export const SizeSmall: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    text: "Hic aliquid architecto cumque quidem harum, rerum omnis nemo quaerat dolores. At velit, dignissimos fugit temporibus exercitationem nulla reprehenderit atque vitae eaque!",
    size: "small",
  },
};
