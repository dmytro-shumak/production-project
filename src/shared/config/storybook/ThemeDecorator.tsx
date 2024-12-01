import type { StoryFn } from "@storybook/react";
import type { Theme } from "@/app/providers/theme";
import "@/app/styles/index.css";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => {
  document.body.className = theme;

  return (
    <div
      className="app"
      style={{ backgroundColor: "transparent", minHeight: "initial" }}
    >
      <StoryComponent />
    </div>
  );
};
