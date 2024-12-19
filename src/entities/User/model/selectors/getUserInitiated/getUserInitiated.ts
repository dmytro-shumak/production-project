import type { RootState } from "@/shared/config";

export const getUserInitiated = (state: RootState) => state.user._initiated;
