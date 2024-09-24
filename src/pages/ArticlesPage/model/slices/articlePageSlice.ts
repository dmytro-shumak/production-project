import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { ArticleView, type Article } from "entities/Article";
import type { ReducerSchema } from "shared/config/redux";
import { LocalStorageKeys } from "shared/constants/localStorage";
import { fetchArticleList } from "../services/fetchArticleList/fetchArticleList";
import type { ArticlePageSchema } from "../types/articlePageSchema";

const articlesAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

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
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(LocalStorageKeys.ARTICLES_VIEW, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        LocalStorageKeys.ARTICLES_VIEW,
      ) as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleList.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticleList.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesAdapter.setAll(state, action.payload);
      },
    );
    builder.addCase(fetchArticleList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { reducer: articlePageReducer, actions: articlePageActions } =
  articlePageSlice;
