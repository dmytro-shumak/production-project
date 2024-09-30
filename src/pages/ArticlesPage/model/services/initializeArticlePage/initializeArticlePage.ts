import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReducerSchema, ThunkConfig } from "shared/config/redux";
import { getArticlePageInitialized } from "../../selectors/articlePageSelector";
import { articlePageActions } from "../../slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const initializeArticlePage = createAsyncThunk<void, void, ThunkConfig>(
  "articlesPage/initializeArticlePage",
  async (_, thunkApi) => {
    const { dispatch } = thunkApi;
    const getState = thunkApi.getState as () => ReducerSchema;

    const initialized = getArticlePageInitialized(getState());

    if (initialized) {
      return;
    }

    dispatch(articlePageActions.initState());
    dispatch(fetchArticleList());
  },
);
