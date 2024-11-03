module.exports = (layer, componentName) => `import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/theme";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { ${componentName} } from "./${componentName}";

const meta = {
  title: "${layer}/${componentName}",
  component: ${componentName},
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ${componentName}>;

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
`;
