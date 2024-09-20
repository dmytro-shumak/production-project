import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileForm } from "entities/Profile/model/selectors/getProfileForm/getProfileForm";
import type {
  ReducerSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "shared/config/redux";
import { ValidateProfileError, type Profile } from "../../types/profile";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const getState = thunkApi.getState as () => ReducerSchema;
  const extra = thunkApi.extra as ThunkExtraArg;

  try {
    const formData = getProfileForm(getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }
    const response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData,
    );
    if (!response.data) {
      throw new Error("failed to login");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
