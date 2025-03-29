import { ArticleType } from "../constants/article";
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";
import type { Article } from "../types/article";
import type { ArticleDetailsSchema } from "../types/articleDetailsSchema";

import { articleDetailsReducer } from "./articleDetailsSlice";

describe("articleDetailsSlice", () => {
  const initialState: ArticleDetailsSchema = {
    isLoading: false,
  };

  it("should handle fetchArticleById.pending", () => {
    const action = { type: fetchArticleById.pending.type };
    const state = articleDetailsReducer(initialState, action);

    expect(state).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  it("should handle fetchArticleById.fulfilled", () => {
    const article: Article = {
      id: "1",
      title: "Test Article",
      type: [ArticleType.ALL],
      subtitle: "Test Subtitle",
      img: "test.jpg",
      views: 100,
      createdAt: "2023-10-01",
      user: {
        id: "1",
        username: "testuser",
      },
      blocks: [],
    };
    const action = { type: fetchArticleById.fulfilled.type, payload: article };
    const state = articleDetailsReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      data: article,
    });
  });

  it("should handle fetchArticleById.rejected", () => {
    const error = "Failed to fetch article";
    const action = { type: fetchArticleById.rejected.type, payload: error };
    const state = articleDetailsReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      error,
    });
  });
});
