import type { StoryFn } from "@storybook/react";
// eslint-disable-next-line production-shumak-plugin/layer-imports
import "@/app/styles/index.css";
import type { Theme } from "@/shared/const";

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
