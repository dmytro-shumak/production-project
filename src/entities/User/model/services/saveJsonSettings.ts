import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { setJsonSettingsMutation } from "../../api/userApi";
import { getUserAuthData } from "../selectors/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../selectors/jsonSettings";
import type { JsonSettings } from "../types/jsonSettings";

import type { ReducerSchema, ThunkConfig } from "@/shared/config/redux";

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig
>("user/saveJsonSettings", async (jsonSettings, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;
  const state = thunkApi.getState() as ReducerSchema;
  const userData = getUserAuthData(state);
  const currentSettings = getJsonSettings(state);

  if (!userData) {
    return rejectWithValue("User data not found");
  }

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...jsonSettings,
        },
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue("Failed to save settings");
    }

    return response.jsonSettings;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message);
    }

    return rejectWithValue(String(error));
  }
});
