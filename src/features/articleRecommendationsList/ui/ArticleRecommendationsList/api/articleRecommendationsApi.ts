import { rtkApi } from "shared/api";

const recommendationApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRecommendationList: builder.query({
      query: (limit) => ({
        url: "./articles",
        params: { _limit: limit },
      }),
    }),
  }),
});

export const {
  useGetArticleRecommendationListQuery: useArticleRecommendationListQuery,
} = recommendationApi;
