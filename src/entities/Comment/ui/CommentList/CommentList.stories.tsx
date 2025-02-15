import type { Meta, StoryObj } from "@storybook/react";

import { CommentList } from "./CommentList";

import { RouterDecorator } from "@/shared/config";
import { FeatureFlagsDecorator } from "@/shared/config/storybook/FeatureFlagsDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "entities/CommentList",
  component: CommentList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
  decorators: [RouterDecorator()],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

const comments = [
  {
    id: "1",
    text: "Hello world",
    user: {
      id: "1",
      username: "John",
      avatar:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    },
  },
  {
    id: "2",
    text: "HI!",
    user: { id: "1", username: "Alex" },
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    comments,
  },
};

export const PrimaryRedesigned: Story = {
  args: {
    comments,
  },
  decorators: [FeatureFlagsDecorator({ isAppRedesigned: true })],
};

export const Dark: Story = {
  args: {
    comments,
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
