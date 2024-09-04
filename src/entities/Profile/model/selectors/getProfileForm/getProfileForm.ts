import type { RootState } from "shared/config/redux";

export const getProfileForm = (state: RootState) => state.profile?.form;
