import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ["l", "m", "xl"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Click me!",
  },
};

export const Clear: Story = {
  args: {
    children: "Click me!",
    variant: "clear",
  },
};

export const Outline: Story = {
  args: {
    children: "Click me!",
    variant: "outline",
  },
};

export const OutlineDark: Story = {
  args: {
    children: "Click me!",
    variant: "outline",
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  args: {
    children: "Click me!",
    disabled: true,
    variant: "outline",
  },
};
