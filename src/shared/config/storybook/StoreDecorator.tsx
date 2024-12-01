import type { ReducersMapObject } from "@reduxjs/toolkit";
import type { StoryFn } from "@storybook/react";
import { StoreProvider } from "@/app/providers/StoreProvider";
import "@/app/styles/index.css";
import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice";
import { profileReducer } from "@/entities/Profile";
import { loginReducer } from "@/features/authByUsername";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/model/slices";
import type { DeepPartial } from "@/shared/lib";
import type { ReducerSchema } from "../redux";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<ReducerSchema>> = {
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
