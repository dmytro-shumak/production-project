import { ArticleSortField, ArticleType, ArticleView } from "@/entities/Article";
import type { RootState } from "@/shared/config/redux";
import { buildSelector } from "@/shared/lib/store";

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

export const getArticlePageOrder = (state: RootState) =>
  state.articlePage?.order || "asc";

export const getArticlePageSort = (state: RootState) =>
  state.articlePage?.sort || ArticleSortField.VIEWS;

export const getArticlePageSearch = (state: RootState) =>
  state.articlePage?.search || "";

export const getArticlePageType = (state: RootState) =>
  state.articlePage?.type ?? ArticleType.ALL;

export const [useArticleItemById] = buildSelector(
  (state, id: string) => state.articlePage?.entities[id],
);
