import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ThunkConfig, ThunkExtraArg } from "@/shared/config/redux";
import type { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig>(
  "articleDetails/fetchArticleById",
  async (articleId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const extra = thunkApi.extra as ThunkExtraArg;
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: { _expand: "user" },
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
