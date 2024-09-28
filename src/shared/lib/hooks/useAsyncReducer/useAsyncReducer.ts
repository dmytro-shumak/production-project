import { type Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useStore } from "react-redux";
import type {
  ReducerSchemaKey,
  ReduxStoreWithManager,
} from "shared/config/redux";
import { useAppDispatch } from "shared/lib/hooks/redux";

export type ReducersList = {
  [name in ReducerSchemaKey]?: Reducer;
};

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
