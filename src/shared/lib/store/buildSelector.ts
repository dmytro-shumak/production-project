import { useSelector } from "react-redux";

import type { ReducerSchema } from "@/shared/config/redux";

type Selector<T, Args extends unknown[]> = (
  state: ReducerSchema,
  ...args: Args
) => T;
type Hook<T, Args extends unknown[]> = (...args: Args) => T;
type Result<T, Args extends unknown[]> = [Hook<T, Args>, Selector<T, Args>];
export const buildSelector = <T, Args extends unknown[]>(
  selector: Selector<T, Args>,
): Result<T, Args> => {
  const useSelectorHook: Hook<T, Args> = (...args: Args) => {
    return useSelector((state: ReducerSchema) => selector(state, ...args));
  };

  return [useSelectorHook, selector];
};
