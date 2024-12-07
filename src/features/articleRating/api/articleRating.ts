import { rtkApi } from "@/shared/api";
import type { Rating } from "@/entities/Rating";

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRating: builder.query<
      Rating[],
      { userId: string; articleId: string }
    >({
      query: ({ articleId, userId }) => ({
        url: "./article-ratings",
        params: {
          userId,
          articleId,
        },
      }),
    }),
  }),
});

export const { useGetArticleRatingQuery: useGetArticleRating } =
  articleRatingApi;
