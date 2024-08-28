import { createSlice } from "@reduxjs/toolkit";
import type { ProfileSchema } from "../types/profile";

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export const profileActions = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
