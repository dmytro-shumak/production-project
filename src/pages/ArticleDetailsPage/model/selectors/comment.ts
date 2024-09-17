import type { RootState } from "shared/config/redux";

export const getArticleCommentIsLoading = (state: RootState) =>
  state.articleDetailsComments?.isLoading;
export const getArticleCommentError = (state: RootState) =>
  state.articleDetailsComments?.error;
