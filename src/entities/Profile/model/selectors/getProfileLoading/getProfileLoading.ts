import type { RootState } from "shared/config/redux";

export const getProfileLoading = (state: RootState) => state.profile?.isLoading;
