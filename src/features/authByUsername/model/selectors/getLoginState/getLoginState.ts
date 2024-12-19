import type { RootState } from "@/shared/config";

export const getLoginState = (state: RootState) => state?.loginForm;
