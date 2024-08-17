import { useEffect } from "react";
import { useStore } from "react-redux";
import { type Reducer } from "@reduxjs/toolkit";
import type { ReduxStoreWithManager } from "shared/config/redux/reducerSchema";
import type { RootState } from "shared/config/redux/store";

export function useAsyncReducer<S>(
  key: keyof RootState,
  reducer: Reducer<S>,
): void {
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    store.reducerManager?.add(key, reducer);

    return () => {
      store.reducerManager?.remove(key);
    };
  }, [key, reducer, store.reducerManager]);
}
