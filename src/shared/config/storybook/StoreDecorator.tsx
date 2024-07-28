import type { StoryFn } from "@storybook/react";
import { StoreProvider } from "app/providers/StoreProvider";
import "app/styles/index.css";
import { store } from "shared/config/redux/store";

export const StoreDecorator = (StoryComponent: StoryFn) => (
  <StoreProvider initialState={store}>
    <StoryComponent />
  </StoreProvider>
);
