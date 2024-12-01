import type { RootState } from "@/shared/config/redux/store";

export const getLoginState = (state: RootState) => state?.loginForm;
