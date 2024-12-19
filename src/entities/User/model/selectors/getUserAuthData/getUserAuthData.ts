import type { RootState } from "@/shared/config";

export const getUserAuthData = (state: RootState) => state.user.authData;
