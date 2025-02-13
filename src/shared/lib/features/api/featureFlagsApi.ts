import { rtkApi } from "@/shared/api";
import type { FeaturesFlags } from "@/shared/types/featuresFlags";

interface UpdateFeatureFlagsParams {
  userId: string;
  features: Partial<FeaturesFlags>;
}

const featureFlagApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    updateFeatureFlags: builder.mutation<void, UpdateFeatureFlagsParams>({
      query: ({ features, userId }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: {
          features,
        },
      }),
    }),
  }),
});

export const updateFeatureFlagsMutation =
  featureFlagApi.endpoints.updateFeatureFlags.initiate;
