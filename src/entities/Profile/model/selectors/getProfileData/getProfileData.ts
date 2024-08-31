import type { RootState } from "shared/config/redux";

export const getProfileData = (state: RootState) => state.profile?.data;
