import {
  combineReducers,
  type Reducer,
  type ReducersMapObject,
  type UnknownAction,
} from "@reduxjs/toolkit";

import type { ReducerSchema } from "./reducerSchema";
import type { RootState } from "./store";

export function createReducerManager(
  initialReducers: ReducersMapObject<ReducerSchema>,
) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: Array<keyof RootState> = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: ReducerSchema, action: UnknownAction) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      // @ts-expect-error fix
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key: keyof RootState, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: keyof RootState) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}
