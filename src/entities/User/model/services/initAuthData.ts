import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { getUserDataByIdQuery } from "../../api/userApi";
import type { User } from "../types/user";

import type { ThunkConfig } from "@/shared/config/redux";
import { LocalStorageKeys } from "@/shared/constants";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig>(
  "user/initAuthData",
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(LocalStorageKeys.USER);

    if (!userId) {
      return rejectWithValue("");
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }

      return rejectWithValue(String(error));
    }
  },
);
