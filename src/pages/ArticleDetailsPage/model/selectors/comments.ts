import type { RootState } from "shared/config/redux";

export const getArticleCommentIsLoading = (state: RootState) =>
  state.articleDetailsPage?.comments?.isLoading;
export const getArticleCommentError = (state: RootState) =>
  state.articleDetailsPage?.comments?.error;
