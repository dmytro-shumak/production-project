import { combineReducers, type Reducer } from "@reduxjs/toolkit";

import type { ArticleDetailsPageSchema } from "../types";

import { articleDetailsCommentsReducer } from "./articleDetailsComments";
import { articleDetailsRecommendationsReducer } from "./articleDetailsRecommendations";

export const articleDetailsPageReducer: Reducer<ArticleDetailsPageSchema> =
  combineReducers({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsRecommendationsReducer,
  });
