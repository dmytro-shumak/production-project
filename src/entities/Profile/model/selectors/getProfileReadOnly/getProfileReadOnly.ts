import type { RootState } from "@/shared/config/redux";

export const getProfileReadOnly = (state: RootState) => state.profile?.readonly;
