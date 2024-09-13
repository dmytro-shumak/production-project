import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "../types/article";
import type { ArticleDetailsSchema } from "../types/articleDetailsSchema";
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";

const initialState: ArticleDetailsSchema = {
  isLoading: false,
};

const articleDetailsSlice = createSlice({
  name: "articleDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleById.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticleById.fulfilled,
      (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const articleDetailsAction = articleDetailsSlice.actions;

export const articleDetailsReducer = articleDetailsSlice.reducer;