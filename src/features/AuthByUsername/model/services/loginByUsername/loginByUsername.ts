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
      thunkApi.rejectWithValue(error.message);
    } else if (typeof error.response.data === "string") {
      thunkApi.rejectWithValue(error.response.data);
    } else {
      thunkApi.rejectWithValue(String(error));
    }
  }
});
