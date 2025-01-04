import { useSelector } from "react-redux";

import type { ReducerSchema } from "@/shared/config/redux";

type Selector<T> = (state: ReducerSchema) => T;
type Result<T> = [() => T, Selector<T>];
export const buildSelector = <T>(selector: Selector<T>): Result<T> => {
  const useSelectorHook = () => {
    return useSelector(selector);
  };

  return [useSelectorHook, selector];
};
