import type { StoryFn } from "@storybook/react";
// eslint-disable-next-line production-shumak-plugin/layer-imports
import "@/app/styles/index.css";
import { BrowserRouter } from "react-router-dom";

export const RouterDecorator = (StoryComponent: StoryFn) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
