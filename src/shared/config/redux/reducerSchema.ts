import type {
  EnhancedStore,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import type { ArticleDetailsSchema } from "entities/Article";
import type { CounterState } from "entities/Counter/model/slice/counterSlice";
import type { ProfileSchema } from "entities/Profile";
import type { UserSchema } from "entities/User";
import type { LoginSchema } from "features/authByUsername/model/types/loginSchema";
import type { ScrollRestorationSchema } from "features/scrollRestoration";
import type { ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage";
import type { ArticlePageSchema } from "pages/ArticlesPage";
import type { createReducerManager } from "shared/config/redux/reducerManager";

export interface ReducerSchema {
  counter: CounterState;
  user: UserSchema;
  scrollRestoration: ScrollRestorationSchema;
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  articlePage?: ArticlePageSchema;
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
