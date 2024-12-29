import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import type { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema";

import type { Article } from "@/entities/Article";
import type { ReducerSchema } from "@/shared/config/redux";

const recommendationsAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<ReducerSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState(),
  );

const articleDetailsRecommendationsSlice = createSlice({
  name: "articleDetailsRecommendationsSlice ",
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      },
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleRecommendations.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
      state.isLoading = false;
      recommendationsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchArticleRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { reducer: articleDetailsRecommendationsReducer } =
  articleDetailsRecommendationsSlice;
