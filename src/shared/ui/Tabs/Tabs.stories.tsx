import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/theme";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Tabs } from "./Tabs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/Tabs",
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
  args: {
    tabs: [
      { value: "Tab 1", content: "Tab 1 content" },
      { value: "Tab 2", content: "Tab 2 content" },
      { value: "Tab 3", content: "Tab 3 content" },
    ],
    value: "Tab 1",
    onTabChange: action("onTabChange"),
  },
};

export const Dark: Story = {
  args: {
    tabs: [
      { value: "Tab 1", content: "Tab 1 content" },
      { value: "Tab 2", content: "Tab 2 content" },
      { value: "Tab 3", content: "Tab 3 content" },
    ],
    value: "Tab 1",
    onTabChange: action("onTabChange"),
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
