import { createSlice } from "@reduxjs/toolkit";
import type { ArticleDetailsSchema } from "../types/articleDetailsSchema";

const initialState: ArticleDetailsSchema = {
  isLoading: false,
};

const articleDetailsSlice = createSlice({
  name: "articleDetails",
  initialState,
  reducers: {},
});

export const articleDetailsAction = articleDetailsSlice.actions;

export const articleDetailsReducer = articleDetailsSlice.reducer;
