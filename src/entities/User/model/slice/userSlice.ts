import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { saveJsonSettings } from "../services/saveJsonSettings";
import type { JsonSettings } from "../types/jsonSettings";
import type { User, UserSchema } from "../types/user";

import { LocalStorageKeys } from "@/shared/constants/localStorage";
import { setFeaturesFlags } from "@/shared/lib/features";

const initialState: UserSchema = {
  _initiated: false,
};

export const userUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      action.payload.features && setFeaturesFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(LocalStorageKeys.USER);
      if (user) {
        const parsedUser = JSON.parse(user) as User;
        state.authData = parsedUser;
        parsedUser.features && setFeaturesFlags(parsedUser.features);
      }
      state._initiated = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LocalStorageKeys.USER);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
  },
});

export const { setAuthData, initAuthData, logout } = userUser.actions;

export const userReducer = userUser.reducer;
