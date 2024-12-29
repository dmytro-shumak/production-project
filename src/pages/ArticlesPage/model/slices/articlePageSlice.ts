import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { fetchArticleList } from "../services/fetchArticleList/fetchArticleList";
import type { ArticlePageSchema } from "../types/articlePageSchema";

import {
  ArticleSortField,
  ArticleType,
  ArticleView,
  type Article,
} from "@/entities/Article";
import type { ReducerSchema } from "@/shared/config/redux";
import { LocalStorageKeys } from "@/shared/constants/localStorage";
import type { SortOrder } from "@/shared/types";

const articlesAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

const searchParams = new URLSearchParams(document.location.search);

export const getArticles = articlesAdapter.getSelectors<ReducerSchema>(
  (state) => state.articlePage || articlesAdapter.getInitialState(),
);

const articlePageSlice = createSlice({
  name: "articlePageSlice ",
  initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.GRID,
    page: 1,
    hasMore: true,
    _initialized: false,
    sort:
      (searchParams.get("sort") as ArticleSortField) ??
      ArticleSortField.CREATED_AT,
    limit: 9,
    search: searchParams.get("search") ?? "",
    order: (searchParams.get("order") as SortOrder) ?? "asc",
    type: (searchParams.get("order") as ArticleType) ?? ArticleType.ALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(LocalStorageKeys.ARTICLES_VIEW, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        LocalStorageKeys.ARTICLES_VIEW,
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.LIST ? 4 : 9;
      state._initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleList.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;

      if (action.meta.arg?.replace) {
        articlesAdapter.removeAll(state);
      }
    });
    builder.addCase(fetchArticleList.fulfilled, (state, action) => {
      state.isLoading = false;

      state.hasMore = action.payload.length > state?.limit;

      if (action.meta.arg?.replace) {
        articlesAdapter.setAll(state, action.payload);
      } else {
        articlesAdapter.addMany(state, action.payload);
      }
    });
    builder.addCase(fetchArticleList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { reducer: articlePageReducer, actions: articlePageActions } =
  articlePageSlice;
