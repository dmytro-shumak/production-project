import type { ReducersMapObject } from "@reduxjs/toolkit";
import type { StoryFn } from "@storybook/react";
import { StoreProvider } from "app/providers/StoreProvider";
import "app/styles/index.css";
import { loginReducer } from "features/AuthByUsername";
import type { ReducerSchema } from "shared/config/redux";
import { store } from "shared/config/redux/store";
import type { DeepPartial } from "shared/lib";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<ReducerSchema>> = {
  loginForm: loginReducer,
};

export const StoreDecorator = (StoryComponent: StoryFn) => (
  <StoreProvider initialState={store} asyncReducers={defaultAsyncReducers}>
    <StoryComponent />
  </StoreProvider>
);
