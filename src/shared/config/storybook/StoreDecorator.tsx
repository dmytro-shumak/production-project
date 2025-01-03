/* eslint-disable production-shumak-plugin/layer-imports */
import type { ReducersMapObject } from "@reduxjs/toolkit";
import type { StoryFn } from "@storybook/react";

import type { ReducerSchema } from "../redux";

import { StoreProvider } from "@/app/providers/StoreProvider";
import "@/app/styles/index.css";
import { articleDetailsReducer } from "@/entities/Article";
import { profileReducer } from "@/entities/Profile";
import { loginReducer } from "@/features/authByUsername";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage";
import type { DeepPartial, ReducersList } from "@/shared/lib";

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  articleDetails: articleDetailsReducer,
  profile: profileReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
  (store: DeepPartial<ReducersMapObject<ReducerSchema>>) =>
  (StoryComponent: StoryFn) => (
    <StoreProvider initialState={store} asyncReducers={defaultAsyncReducers}>
      <StoryComponent />
    </StoreProvider>
  );
