import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkConfig, ThunkExtraArg } from "shared/config/redux";
import { AxiosError } from "axios";
import type { Comment } from "entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig
>(
  "articleDetailsPage/fetchCommentsByArticleId",
  async (articleId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const extra = thunkApi.extra as ThunkExtraArg;

    if (!articleId) {
      return rejectWithValue("articleId must be provided");
    }

    try {
      const response = await extra.api.get<Comment[]>(`/comments`, {
        params: { articleId, _expand: "user" },
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
