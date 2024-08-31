import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthData, type User } from "entities/User";
import type { ThunkConfig } from "shared/config/redux";
import { LocalStorageKeys } from "shared/constants/localStorage";

interface LoginByUserName {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUserName,
  ThunkConfig
>("login/loginByUser", async (authData, thinkApi) => {
  const { rejectWithValue, dispatch, extra } = thinkApi;
  try {
    const response = await extra.api.post("/login", authData);

    if (!response.data) {
      throw new Error("failed to login");
    }

    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(response.data));
    dispatch(setAuthData(response.data));

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    if (typeof error?.response?.data?.message === "string") {
      return rejectWithValue(error.response.data.message);
    }

    return rejectWithValue(String(error));
  }
});
