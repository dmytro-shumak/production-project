/* eslint-disable production-shumak-plugin/layer-imports */
import type {
  EnhancedStore,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";

import type { createReducerManager } from "./reducerManager";

import type { ArticleDetailsSchema } from "@/entities/Article";
import type { CounterState } from "@/entities/Counter";
import type { ProfileSchema } from "@/entities/Profile";
import type { UserSchema } from "@/entities/User";
import type { LoginSchema } from "@/features/authByUsername";
import type { ScrollRestorationSchema } from "@/features/scrollRestoration";
import type { ArticleDetailsPageSchema } from "@/pages/ArticleDetailsPage";
import type { ArticlePageSchema } from "@/pages/ArticlesPage";
import type { rtkApi } from "@/shared/api";

export interface ReducerSchema {
  counter: CounterState;
  user: UserSchema;
  scrollRestoration: ScrollRestorationSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articlePage?: ArticlePageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type ReducerSchemaKey = keyof ReducerSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export interface ReduxStoreWithManager extends EnhancedStore<ReducerSchema> {
  reducerManager?: ReducerManager;
  dispatch: ThunkDispatch<ReducerSchema, undefined, UnknownAction>;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T = string> {
  rejectValue?: T;
  extra?: ThunkExtraArg;
  state?: ReducerSchema;
}
