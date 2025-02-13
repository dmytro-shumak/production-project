import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateFeatureFlagsMutation } from "../api/featureFlagsApi";
import { getAllFeatureFlags } from "../lib/setGetFeatures";

import type { ThunkConfig } from "@/shared/config/redux";
import type { FeaturesFlags } from "@/shared/types/featuresFlags";

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeaturesFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>("user/saveJsonSettings", async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags(),
          ...newFeatures,
        },
      }),
    );

    window.location.reload();

    return undefined;
  } catch (e) {
    console.error(e);

    return rejectWithValue("");
  }
});
