import { combineReducers } from "@reduxjs/toolkit";

import { articleDetailsCommentsReducer } from "./articleDetailsComments";
import { articleDetailsRecommendationsReducer } from "./articleDetailsRecommendations";

export const articleDetailsPageReducer = combineReducers({
  comments: articleDetailsCommentsReducer,
  recommendations: articleDetailsRecommendationsReducer,
});
