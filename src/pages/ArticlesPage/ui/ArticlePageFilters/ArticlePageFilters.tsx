import { memo, useCallback, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import {
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
  getArticlePageType,
  getArticlePageView,
} from "../../model/selectors/articlePageSelector";
import { fetchArticleList } from "../../model/services/fetchArticleList/fetchArticleList";
import { articlePageActions } from "../../model/slices/articlePageSlice";

import styles from "./ArticlePageFilters.module.css";

import { ArticleSortField, ArticleType, ArticleView } from "@/entities/Article";
import { ArticleSortSelector } from "@/features/articleSortSelector";
import { ArticleTypeTabs } from "@/features/articleTypeTabs";
import { ArticleViewSelector } from "@/features/articleViewSelector";
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
  classNames,
} from "@/shared/lib";
import type { SortOrder } from "@/shared/types";
import { Card } from "@/shared/ui";
import { Input } from "@/shared/ui/Input";

interface Props {
  className?: string;
}

export const ArticlePageFilters = memo(({ className }: Props) => {
  const { t } = useTranslation();

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

  return (
    <div className={classNames("", {}, [className])}>
      <div className={styles.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={styles.search}>
        <Input
          placeholder={t("Search")}
          onChange={onChangeSearch}
          value={search}
        />
      </Card>
      <ArticleTypeTabs
        onChangeType={onChangeType}
        value={type}
        className={styles.tabs}
      />
    </div>
  );
});
