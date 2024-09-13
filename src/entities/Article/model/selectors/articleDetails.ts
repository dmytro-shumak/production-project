import type { RootState } from "shared/config/redux";

export const getArticleDetailsData = (state: RootState) =>
  state.articleDetails?.data;

export const getArticleDetailsError = (state: RootState) =>
  state.articleDetails?.error;

export const getArticleDetailsIsLoading = (state: RootState) =>
  state.articleDetails?.isLoading;
