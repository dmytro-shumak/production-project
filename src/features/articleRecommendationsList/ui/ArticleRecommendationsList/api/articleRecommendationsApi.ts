import type { Article } from "@/entities/Article";
import { rtkApi } from "@/shared/api";

const recommendationApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRecommendationList: builder.query<Article[], number>({
      query: (limit) => ({
        url: "./articles",
        params: { _limit: limit, _expand: "user" },
      }),
    }),
  }),
});

export const {
  useGetArticleRecommendationListQuery: useArticleRecommendationListQuery,
} = recommendationApi;
