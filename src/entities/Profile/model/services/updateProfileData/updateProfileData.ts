import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ReducerSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "@/shared/config/redux";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { type Profile } from "../../types/profile";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { ValidateProfileError } from "../../constants/profile";

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
