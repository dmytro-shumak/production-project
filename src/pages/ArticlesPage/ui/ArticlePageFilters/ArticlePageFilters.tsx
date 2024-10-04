import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleType,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import { fetchArticleList } from "pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList";
import { articlePageActions } from "pages/ArticlesPage/model/slices/articlePageSlice";
import { memo, useCallback, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import type { SortOrder } from "shared/types";
import { Card } from "shared/ui";
import { Input } from "shared/ui/Input/Input";
import {
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
  getArticlePageType,
  getArticlePageView,
} from "../../model/selectors/articlePageSelector";
import styles from "./ArticlePageFilters.module.css";

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
