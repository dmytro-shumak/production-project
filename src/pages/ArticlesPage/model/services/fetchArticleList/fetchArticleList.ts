import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { Article } from "entities/Article";
import { getArticlePageLimit } from "pages/ArticlesPage/model/selectors/articlePageSelector";
import type {
  ReducerSchema,
  ThunkConfig,
  ThunkExtraArg,
} from "shared/config/redux";

export interface FetchArticleListArgs {
  page: number;
}

export const fetchArticleList = createAsyncThunk<
  Article[],
  FetchArticleListArgs,
  ThunkConfig
>("articlesPage/fetchArticleList", async (args, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const extra = thunkApi.extra as ThunkExtraArg;
  const getState = thunkApi.getState as () => ReducerSchema;
  const { page = 1 } = args;
  const limit = getArticlePageLimit(getState());

  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: { _expand: "user", _limit: limit, _page: page },
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
