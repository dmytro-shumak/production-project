import type { rtkApi } from "@/shared/api";
import type { RootState } from "@/shared/config";

export const defaultState: RootState = {
  counter: { value: 0 },
  loginForm: {
    isLoading: false,
    password: "",
    username: "",
  },
  user: {},
  scrollRestoration: { scroll: {} },
  api: {} as ReturnType<typeof rtkApi.reducer>,
};
