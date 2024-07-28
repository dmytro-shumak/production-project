import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import {
  createReduxStore,
  store as reduxStore,
} from "shared/config/redux/store";

interface Props {
  children?: ReactNode;
  initialState?: object;
}

export const StoreProvider: FC<Props> = ({ children, initialState }) => {
  const store = initialState ? createReduxStore(initialState) : reduxStore;
  return <Provider store={store}>{children}</Provider>;
};
