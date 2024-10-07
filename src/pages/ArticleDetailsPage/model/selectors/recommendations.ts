import type { RootState } from "shared/config/redux";

export const getArticleCommentIsLoading = (state: RootState) =>
  state.articleDetailsPage?.recommendations?.isLoading;

export const getArticleCommentError = (state: RootState) =>
  state.articleDetailsPage?.recommendations?.error;
