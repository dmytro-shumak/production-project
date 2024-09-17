import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { Comment } from "entities/Comment";
import type { ReducerSchema } from "shared/config/redux";

const commentsAdapter = createEntityAdapter({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<ReducerSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsCommentsSlice ",
  initialState: commentsAdapter.getInitialState({
    isLoading: false,
    error: undefined,
    ids: ["1", "2"],
    entities: {
      "1": { id: "1", text: "test", user: { id: "1", username: "username" } },
      "2": { id: "1", text: "test", user: { id: "1", username: "username" } },
    },
  }),
  reducers: {},
});

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
