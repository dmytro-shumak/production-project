import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/theme";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Sidebar } from "widgets/Sidebar/ui/Sidebar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "widget/Sidebar",
  component: Sidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
  decorators: [
    StoreDecorator({
      user: { authData: {} },
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.Dark),
    StoreDecorator({
      user: { authData: {} },
    }),
  ],
  parameters: {
    backgrounds: { default: "dark" },
    layout: "fullscreen",
  },
};

export const LightNoAuth: Story = {
  parameters: {
    layout: "fullscreen",
  },
};

export const DarkNoAuth: Story = {
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
    layout: "fullscreen",
  },
};
