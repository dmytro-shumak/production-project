import type { Meta, StoryObj } from "@storybook/react";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ProfileCard } from "./ProfileCard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "entities/ProfileCard",
  component: ProfileCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    data: {
      age: 18,
      country: Country.Germany,
      firstName: "John",
      lastName: "Doe",
      avatar:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
      username: "john_doe",
      city: "Berlin",
      currency: Currency.AWG,
    },
  },
};

export const WithError: Story = {
  args: {
    error: "Something",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

// export const PrimaryDark: Story = {
//   args: {
//     isOpen: true,
//   },
//   decorators: [ThemeDecorator(Theme.Dark)],
//   parameters: {
//     backgrounds: { default: "dark" },
//   },
// };
