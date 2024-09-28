import { ArticleView } from "entities/Article";
import type { RootState } from "shared/config/redux";

export const getArticlePageIsLoading = (state: RootState) =>
  state.articlePage?.isLoading;

export const getArticlePageError = (state: RootState) =>
  state.articlePage?.error;

export const getArticlePageView = (state: RootState) =>
  state.articlePage?.view || ArticleView.GRID;

export const getArticlePageNum = (state: RootState) =>
  state.articlePage?.page ?? 1;

export const getArticlePageLimit = (state: RootState) =>
  state.articlePage?.limit || 9;

export const getArticlePageHasMore = (state: RootState) =>
  state.articlePage?.hasMore;

export const getArticlePageInitialized = (state: RootState) =>
  state.articlePage?._initialized;
