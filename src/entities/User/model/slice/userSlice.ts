import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initAuthData } from "../services/initAuthData";
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
      localStorage.setItem(LocalStorageKeys.USER, action.payload.id);
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
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        payload.features && setFeaturesFlags(payload.features);
        state._initiated = true;
      },
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._initiated = true;
    });
  },
});

export const { setAuthData, logout } = userUser.actions;

export const userReducer = userUser.reducer;
