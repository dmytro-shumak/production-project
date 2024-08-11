import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "shared/constants/localStorage";
import type { User, UserSchema } from "../types/user";

const initialState: UserSchema = {};

export const userUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(LocalStorageKeys.USER);
      if (user) {
        state.authData = JSON.parse(user);
      }
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LocalStorageKeys.USER);
    },
  },
});

export const { setAuthData, initAuthData, logout } = userUser.actions;

export const userReducer = userUser.reducer;
