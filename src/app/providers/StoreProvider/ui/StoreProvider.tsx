/* eslint-disable indent */
import type { ReducersMapObject } from "@reduxjs/toolkit";
import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import type { ReducerSchema } from "shared/config/redux";
import { createReduxStore } from "shared/config/redux/store";
import type { DeepPartial } from "shared/lib";

interface Props {
  children?: ReactNode;
  initialState?: object;
  asyncReducers?: DeepPartial<ReducersMapObject<ReducerSchema>>;
}

export const StoreProvider: FC<Props> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  const store = initialState
    ? createReduxStore({
        initialState: initialState as ReducersMapObject<ReducerSchema>,
        asyncReducers: asyncReducers as ReducersMapObject<ReducerSchema>,
      })
    : createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
