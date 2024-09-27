import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
} from "pages/ArticlesPage/model/selectors/articlePageSelector";
import type { ReducerSchema, ThunkConfig } from "shared/config/redux";
import { articlePageActions } from "../../slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig>(
  "articlesPage/fetchNextArticlesPage",
  async (_, thunkApi) => {
    const { dispatch } = thunkApi;
    const getState = thunkApi.getState as () => ReducerSchema;

    const hasMore = getArticlePageHasMore(getState());
    const page = getArticlePageNum(getState());
    const isLoading = getArticlePageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlePageActions.setPage(page + 1));
      dispatch(fetchArticleList({ page: page + 1 }));
    }
  },
);
