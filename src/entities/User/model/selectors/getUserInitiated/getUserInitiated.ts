import type { RootState } from "@/shared/config/redux/store";

export const getUserInitiated = (state: RootState) => state.user._initiated;
