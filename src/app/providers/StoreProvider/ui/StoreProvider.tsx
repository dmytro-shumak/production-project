import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "shared/config/redux/store";

interface Props {
  children?: ReactNode;
}

export const StoreProvider: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
