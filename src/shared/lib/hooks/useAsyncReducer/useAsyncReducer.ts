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

type ReducersListEntry = [ReducerSchemaKey, Reducer];

export function useAsyncReducer(
  reducers: ReducersList,
  removeAfterUnmount = true,
): void {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([key, reducer]: ReducersListEntry) => {
      store.reducerManager?.add(key, reducer);
      dispatch({ type: `@INIT ${key} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([key]: ReducersListEntry) => {
          store.reducerManager?.remove(key);
          dispatch({ type: `@DESTROY ${key} reducer` });
        });
      }
    };
  }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);
}
