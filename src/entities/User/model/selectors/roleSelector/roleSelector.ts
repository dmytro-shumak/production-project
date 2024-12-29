import { createSelector } from "@reduxjs/toolkit";

import { UserRole } from "../../constants/user";

import type { ReducerSchema } from "@/shared/config/redux";

export const getUserRoles = (state: ReducerSchema) =>
  state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
  roles?.includes(UserRole.ADMIN),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
  roles?.includes(UserRole.MANAGER),
);
