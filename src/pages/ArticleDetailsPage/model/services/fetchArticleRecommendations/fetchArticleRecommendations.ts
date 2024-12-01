import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { type Article } from "@/entities/Article";
import type { ThunkConfig, ThunkExtraArg } from "@/shared/config/redux";

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig
>("articleDetailsPage/fetchArticleRecommendations", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const extra = thunkApi.extra as ThunkExtraArg;

  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _limit: 4,
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
