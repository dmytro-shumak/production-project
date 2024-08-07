import { createSlice } from "@reduxjs/toolkit";
import type { UserSchema } from "../types/user";

const initialState: UserSchema = {};

export const userUser = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export const {} = userUser.actions;

export const userReducer = userUser.reducer;
