import { configureStore, type ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter/model/slice/counterSlice";
import { userReducer } from "entities/User";
import type {
  ReducerSchema,
  ReduxStoreWithManager,
} from "shared/config/redux/reducerSchema";
import { createReducerManager } from "./reducerManager";

export const createReduxStore = (
  initialState?: object,
): ReduxStoreWithManager => {
  const rootReducer: ReducersMapObject<ReducerSchema> = {
    counter: counterReducer,
    user: userReducer,
  };
  const reducerManager = createReducerManager(rootReducer);
  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __DEV__,
    preloadedState: initialState,
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
