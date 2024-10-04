import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReducerSchema, ThunkConfig } from "shared/config/redux";
import type { SortOrder } from "shared/types";
import type { ArticleSortField, ArticleType } from "entities/Article";
import { getArticlePageInitialized } from "../../selectors/articlePageSelector";
import { articlePageActions } from "../../slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const initializeArticlePage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig
>("articlesPage/initializeArticlePage", async (searchParams, thunkApi) => {
  const { dispatch } = thunkApi;
  const getState = thunkApi.getState as () => ReducerSchema;

  const initialized = getArticlePageInitialized(getState());

  if (initialized) {
    return;
  }

  const order = searchParams.get("order") as SortOrder;
  const sort = searchParams.get("sort") as ArticleSortField;
  const search = searchParams.get("search");
  const articleType = searchParams.get("type") as ArticleType;

  if (order) {
    dispatch(articlePageActions.setOrder(order));
  }

  if (sort) {
    dispatch(articlePageActions.setSort(sort));
  }

  if (search) {
    dispatch(articlePageActions.setSearch(search));
  }

  if (articleType) {
    dispatch(articlePageActions.setType(articleType));
  }

  dispatch(articlePageActions.initState());
  dispatch(fetchArticleList());
});
