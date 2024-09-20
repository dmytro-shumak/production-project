/* eslint-disable prettier/prettier */
import type { ReducersMapObject } from "@reduxjs/toolkit";
import type { StoryFn } from "@storybook/react";
import { StoreProvider } from "app/providers/StoreProvider";
import "app/styles/index.css";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/AuthByUsername";
import { articleDetailsCommentsReducer } from "pages/ArticleDetailsPage/model/slices/articleDetailsComments";
import type { ReducerSchema } from "shared/config/redux";
import type { DeepPartial } from "shared/lib";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<ReducerSchema>> = {
  loginForm: loginReducer,
  articleDetails: articleDetailsReducer,
  profile: profileReducer,
  articleDetailsComments: articleDetailsCommentsReducer
};

export const StoreDecorator =
  (store: DeepPartial<ReducersMapObject<ReducerSchema>>) =>
    (StoryComponent: StoryFn) => (
      <StoreProvider initialState={store} asyncReducers={defaultAsyncReducers}>
        <StoryComponent />
      </StoreProvider>
    );
