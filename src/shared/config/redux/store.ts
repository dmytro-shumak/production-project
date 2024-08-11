import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter/model/slice/counterSlice";
import { userReducer } from "entities/User";
import { loginReducer } from "features/AuthByUsername";

export const createReduxStore = (initialState?: object) => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      user: userReducer,
      loginForm: loginReducer,
    },
    devTools: __DEV__,
    preloadedState: initialState,
  });
};

export const store = createReduxStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
