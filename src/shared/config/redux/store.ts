import { configureStore, type ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter/model/slice/counterSlice";
import { userReducer } from "entities/User";
import type { NavigateFunction } from "react-router-dom";
import { $api } from "shared/api/api";
import type {
  ReducerSchema,
  ReduxStoreWithManager,
} from "shared/config/redux/reducerSchema";
import { createReducerManager } from "./reducerManager";

interface Options {
  initialState?: ReducersMapObject<ReducerSchema>;
  asyncReducers?: ReducersMapObject<ReducerSchema>;
  navigate?: NavigateFunction;
}

export const createReduxStore = (options?: Options): ReduxStoreWithManager => {
  const { asyncReducers, initialState, navigate } = options || {};
  const rootReducer: ReducersMapObject<ReducerSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };
  const reducerManager = createReducerManager(rootReducer);
  const store = configureStore({
    // @ts-expect-error sdf
    reducer: reducerManager.reduce,
    devTools: __DEV__,
    preloadedState: initialState,
    // @ts-expect-error fix
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            navigate,
          },
        },
      }),
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
