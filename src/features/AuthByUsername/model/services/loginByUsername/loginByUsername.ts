import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthData, type User } from "entities/User";
import { LocalStorageKeys } from "shared/constants/localStorage";

interface LoginByUserName {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUserName,
  { rejectValue: string }
>("login/loginByUser", async (authData, thunkApi) => {
  try {
    const response = await axios.post("http://localhost:8000/login", authData);
    if (!response.data) {
      throw new Error("failed to login");
    }
    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(response.data));
    thunkApi.dispatch(setAuthData(response.data));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    if (typeof error?.response?.data?.message === "string") {
      return thunkApi.rejectWithValue(error.response.data.message);
    }

    return thunkApi.rejectWithValue(String(error));
  }
});
