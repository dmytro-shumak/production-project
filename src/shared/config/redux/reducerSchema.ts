import type {
  EnhancedStore,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import type { CounterState } from "entities/Counter/model/slice/counterSlice";
import type { UserSchema } from "entities/User";
import type { LoginSchema } from "features/AuthByUsername/model/types/loginSchema";
import type { createReducerManager } from "shared/config/redux/reducerManager";

export interface ReducerSchema {
  counter: CounterState;
  user: UserSchema;
  loginForm?: LoginSchema;
}

export type ReducerManager = ReturnType<typeof createReducerManager>;

export interface ReduxStoreWithManager extends EnhancedStore<ReducerSchema> {
  reducerManager?: ReducerManager;
  dispatch: ThunkDispatch<ReducerSchema, undefined, UnknownAction>;
}
