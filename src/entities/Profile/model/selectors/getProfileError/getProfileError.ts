import type { RootState } from "shared/config/redux";

export const getProfileError = (state: RootState) => state.profile?.error;
