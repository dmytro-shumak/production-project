import type { EntityState } from "@reduxjs/toolkit";

import type {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from "@/entities/Article";
import type { SortOrder } from "@/shared/types";

export interface ArticlePageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
  // pagination
  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _initialized: boolean;
}
