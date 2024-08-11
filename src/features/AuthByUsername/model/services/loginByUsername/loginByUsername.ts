import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "entities/User";

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
