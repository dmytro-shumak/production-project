import { rtkApi } from "@/shared/api";
import type { Rating } from "@/entities/Rating";

interface GetProfileRatingRatingParams {
  userId: string;
  profileId: string;
}

interface PostProfileRatingRatingParams {
  userId: string;
  profileId: string;
  rate: number;
  feedback?: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileRating: builder.query<Rating[], GetProfileRatingRatingParams>({
      query: ({ profileId, userId }) => ({
        url: "./profile-ratings",
        params: {
          userId,
          profileId,
        },
      }),
    }),
    rateProfile: builder.mutation<Rating[], PostProfileRatingRatingParams>({
      query: (params) => ({
        url: "./profile-ratings",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetProfileRatingQuery: useGetProfileRating,
  useRateProfileMutation: useRateProfile,
} = profileRatingApi;
