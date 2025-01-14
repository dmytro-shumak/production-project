import { memo, useCallback, type FC } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initializeArticlePage } from "../../model/services/initializeArticlePage/initializeArticlePage";
import { articlePageReducer } from "../../model/slices/articlePageSlice";
import { ArticleInfiniteList } from "../../ui/ArticleInfiniteList/ArticleInfiniteList";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";

import styles from "./ArticlesPage.module.css";

import { classNames } from "@/shared/lib";
import {
  useAppDispatch,
  useAsyncReducer,
  useInitialEffect,
  type ReducersList,
} from "@/shared/lib";
import { Page } from "@/widgets/Page";

interface Props {
  className?: string;
}

const reducer: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage: FC<Props> = ({ className }) => {
  useAsyncReducer(reducer, false);

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initializeArticlePage(searchParams));
  });

  return (
    <Page
      dataTestid="ArticlesPage"
      className={classNames(styles.articlesPage, {}, [className])}
      onScrollEnd={onLoadNextPart}
    >
      <ArticlePageFilters />
      <ArticleInfiniteList className={styles.list} />
    </Page>
  );
};

export default memo(ArticlesPage);
