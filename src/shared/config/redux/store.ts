/* eslint-disable production-shumak-plugin/layer-imports */
import { configureStore, type ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { $api } from "@/shared/api/api";
import { scrollRestorationReducer } from "@/features/scrollRestoration";
import { rtkApi } from "@/shared/api";
import type {
  ReducerSchema,
  ReduxStoreWithManager,
} from "../redux/reducerSchema";
import { createReducerManager } from "./reducerManager";

interface Options {
  initialState?: ReducersMapObject<ReducerSchema>;
  asyncReducers?: ReducersMapObject<ReducerSchema>;
}

export const createReduxStore = (options?: Options): ReduxStoreWithManager => {
  const { asyncReducers, initialState } = options || {};
  const rootReducer: ReducersMapObject<ReducerSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    scrollRestoration: scrollRestorationReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };
  const reducerManager = createReducerManager(rootReducer);
  const store = configureStore({
    // @ts-expect-error fix
    reducer: reducerManager.reduce,
    devTools: __DEV__,
    preloadedState: initialState,
    // @ts-expect-error fix
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
          },
        },
      }).concat(rtkApi.middleware),
  });

  // @ts-expect-error ignore for now
  store.reducerManager = reducerManager;

  return store;
};

export const store = createReduxStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
