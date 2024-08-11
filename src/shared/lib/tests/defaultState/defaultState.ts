import type { RootState } from "shared/config/redux/store";

export const defaultState: RootState = {
  counter: { value: 0 },
  loginForm: {
    isLoading: false,
    password: "",
    username: "",
  },
  user: {},
};
