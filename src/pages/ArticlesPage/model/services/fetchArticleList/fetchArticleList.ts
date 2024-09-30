import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { Article } from "entities/Article";
import type {
  ReducerSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "shared/config/redux";
import {
  getArticlePageLimit,
  getArticlePageNum,
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
} from "../../selectors/articlePageSelector";

export const fetchArticleList = createAsyncThunk<Article[], void, ThunkConfig>(
  "articlesPage/fetchArticleList",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const extra = thunkApi.extra as ThunkExtraArg;
    const getState = thunkApi.getState as () => ReducerSchema;
    const limit = getArticlePageLimit(getState());
    const order = getArticlePageOrder(getState());
    const sort = getArticlePageSort(getState());
    const search = getArticlePageSearch(getState());
    const page = getArticlePageNum(getState());

    try {
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _expand: "user",
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
        },
      });
      if (!response.data) {
        throw new Error("failed to login");
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }

      return rejectWithValue(String(error));
    }
  },
);
