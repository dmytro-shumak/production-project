import { createSelector } from "@reduxjs/toolkit";
import type { ReducerSchema } from "@/shared/config/redux";
import { UserRole } from "../../constants/user";

export const getUserRoles = (state: ReducerSchema) =>
  state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
  roles?.includes(UserRole.ADMIN),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
  roles?.includes(UserRole.MANAGER),
);
