import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkConfig } from "shared/config/redux";
import type { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig>(
  "profile/fetchProfileData",
  async (_, thinkApi) => {
    const { rejectWithValue, extra } = thinkApi;
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
      if (typeof error?.response?.data?.message === "string") {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue(String(error));
    }
  },
);
