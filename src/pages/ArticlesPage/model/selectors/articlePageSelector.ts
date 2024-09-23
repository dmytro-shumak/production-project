import { ArticleView } from "entities/Article";
import type { RootState } from "shared/config/redux";

export const getArticlePageIsLoading = (state: RootState) =>
  state.articlePage?.isLoading;
export const getArticlePageError = (state: RootState) =>
  state.articlePage?.error;
export const getArticlePageView = (state: RootState) =>
  state.articlePage?.view || ArticleView.GRID;
