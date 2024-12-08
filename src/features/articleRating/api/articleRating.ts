import { rtkApi } from "@/shared/api";
import type { Rating } from "@/entities/Rating";

interface GetArticleRatingParams {
  userId: string;
  articleId: string;
}

interface PostArticleRatingParams {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRating: builder.query<Rating[], GetArticleRatingParams>({
      query: ({ articleId, userId }) => ({
        url: "./article-ratings",
        params: {
          userId,
          articleId,
        },
      }),
    }),
    rateArticle: builder.mutation<Rating[], PostArticleRatingParams>({
      query: (params) => ({
        url: "./article-ratings",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetArticleRatingQuery: useGetArticleRating,
  useRateArticleMutation: useRateArticle,
} = articleRatingApi;
