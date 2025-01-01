import { type Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useStore } from "react-redux";

import { useAppDispatch } from "../redux/redux";

import type {
  ReducerSchemaKey,
  ReduxStoreWithManager,
} from "@/shared/config/redux";

export type ReducersList = {
  [name in ReducerSchemaKey]?: Reducer;
};

/**
 * Custom hook to manage asynchronous reducers in a Redux store.
 *
 * @param {ReducersList} reducers - An object containing the reducers to be added.
 * @param {boolean} [removeAfterUnmount=true] - Flag to determine if reducers should be removed after the component unmounts.
 *
 * @returns {void}
 *
 * @example
 * const reducers = {
 *   user: userReducer,
 *   posts: postsReducer,
 * };
 * useAsyncReducer(reducers);
 *
 * @remarks
 * This hook uses the `useEffect` hook to add reducers to the Redux store when the component mounts,
 * and optionally removes them when the component unmounts. It dispatches initialization and destruction
 * actions to the store for each reducer.
 */
export function useAsyncReducer(
  reducers: ReducersList,
  removeAfterUnmount = true,
): void {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager?.getReducerMap();
    Object.entries(reducers).forEach(([key, reducer]) => {
      if (mountedReducers && mountedReducers[key as ReducerSchemaKey]) {
        // do not mount reducer if it already exists
        return;
      }
      store.reducerManager?.add(key as ReducerSchemaKey, reducer);
      dispatch({ type: `@INIT ${key} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([key]) => {
          store.reducerManager?.remove(key as ReducerSchemaKey);
          dispatch({ type: `@DESTROY ${key} reducer` });
        });
      }
    };
  }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);
}
