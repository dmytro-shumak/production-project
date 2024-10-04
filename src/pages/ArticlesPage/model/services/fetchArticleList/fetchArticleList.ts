import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ArticleType, type Article } from "entities/Article";
import type {
  ReducerSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "shared/config/redux";
import { addQueryParams } from "shared/lib";
import {
  getArticlePageLimit,
  getArticlePageNum,
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
  getArticlePageType,
} from "../../selectors/articlePageSelector";

interface FetchArticleListArgs {
  replace?: boolean;
}

export const fetchArticleList = createAsyncThunk<
  Article[],
  FetchArticleListArgs | void,
  ThunkConfig
>("articlesPage/fetchArticleList", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const extra = thunkApi.extra as ThunkExtraArg;
  const getState = thunkApi.getState as () => ReducerSchema;
  const limit = getArticlePageLimit(getState());
  const order = getArticlePageOrder(getState());
  const sort = getArticlePageSort(getState());
  const search = getArticlePageSearch(getState()) ?? "";
  const page = getArticlePageNum(getState());
  const type = getArticlePageType(getState());

  try {
    addQueryParams({ sort, order, search, type });
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
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
});
