import type { EntityState } from "@reduxjs/toolkit";
import type { Article, ArticleView } from "entities/Article";

export interface ArticlePageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;
}
