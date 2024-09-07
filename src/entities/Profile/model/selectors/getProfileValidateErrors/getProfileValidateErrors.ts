import type { RootState } from "shared/config/redux";

export const getProfileValidateErrors = (state: RootState) =>
  state.profile?.validateErrors;
