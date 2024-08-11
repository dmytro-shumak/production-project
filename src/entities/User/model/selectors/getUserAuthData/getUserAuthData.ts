import type { RootState } from "shared/config/redux/store";

export const getUserAuthData = (state: RootState) => state.user.authData;
