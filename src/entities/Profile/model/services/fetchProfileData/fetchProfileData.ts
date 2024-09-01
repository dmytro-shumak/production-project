import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkConfig, ThunkExtraArg } from "shared/config/redux";
import { AxiosError } from "axios";
import type { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig>(
  "profile/fetchProfileData",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const extra = thunkApi.extra as ThunkExtraArg;
    try {
      const response = await extra.api.get<Profile>("/profile");
      if (!response.data) {
        throw new Error("failed to login");
      }

      return response.data;
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
