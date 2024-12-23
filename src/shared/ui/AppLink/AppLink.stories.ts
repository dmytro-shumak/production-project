import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@/shared/const";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { AppLink } from "../AppLink/AppLink";
import { AppLinkTheme } from "../AppLink/types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/AppLink",
  component: AppLink,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    to: "/",
    children: "Click me!",
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    theme: AppLinkTheme.Primary,
  },
};

export const Secondary: Story = {
  args: {
    theme: AppLinkTheme.Secondary,
  },
};

export const PrimaryDark: Story = {
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    theme: AppLinkTheme.Primary,
  },
};

export const SecondaryDark: Story = {
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
  args: {
    theme: AppLinkTheme.Secondary,
  },
};
