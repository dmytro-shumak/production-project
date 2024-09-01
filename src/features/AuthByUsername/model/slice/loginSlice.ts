import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import type { LoginSchema } from "../types/loginSchema";

const initialState: LoginSchema = {
  isLoading: false,
  password: "",
  username: "",
  error: undefined,
};

export const loginLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByUsername.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(loginByUsername.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginByUsername.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setPassword, setUsername } = loginLogin.actions;

export const loginReducer = loginLogin.reducer;
