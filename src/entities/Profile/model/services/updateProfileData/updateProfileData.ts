import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getProfileForm } from "entities/Profile/model/selectors/getProfileForm/getProfileForm";
import type {
  ReducerSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "shared/config/redux";
import type { Profile } from "../../types/profile";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig>(
  "profile/updateProfileData",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const getState = thunkApi.getState as () => ReducerSchema;
    const extra = thunkApi.extra as ThunkExtraArg;

    try {
      const formData = getProfileForm(getState());
      const response = await extra.api.put<Profile>("/profile", formData);
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
