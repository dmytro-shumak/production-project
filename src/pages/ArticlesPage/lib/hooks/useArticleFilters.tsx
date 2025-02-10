import { useCallback, type ChangeEvent } from "react";

import {
  getArticlePageView,
  getArticlePageOrder,
  getArticlePageSort,
  getArticlePageSearch,
  getArticlePageType,
} from "../../model/selectors/articlePageSelector";
import { fetchArticleList } from "../../model/services/fetchArticleList/fetchArticleList";
import { articlePageActions } from "../../model/slices/articlePageSlice";

import type {
  ArticleView,
  ArticleSortField,
  ArticleType,
} from "@/entities/Article";
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from "@/shared/lib";
import type { SortOrder } from "@/shared/types";

export const useArticleFilters = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(getArticlePageView);
  const order = useAppSelector(getArticlePageOrder);
  const sort = useAppSelector(getArticlePageSort);
  const search = useAppSelector(getArticlePageSearch);
  const type = useAppSelector(getArticlePageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticleList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebouncedCallback(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  const onChangeSort = useCallback(
    (view: ArticleSortField) => {
      dispatch(articlePageActions.setSort(view));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (view: SortOrder) => {
      dispatch(articlePageActions.setOrder(view));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(articlePageActions.setSearch(e.target.value));
      dispatch(articlePageActions.setPage(1));
      debouncedFetchData();
    },
    [debouncedFetchData, dispatch],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlePageActions.setType(value));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    view,
    order,
    sort,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  };
};
