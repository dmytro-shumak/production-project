import { ArticleList } from "entities/Article";
import { memo, useCallback, type FC } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  useInitialEffect,
  type ReducersList,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page";
import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelector";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initializeArticlePage } from "../../model/services/initializeArticlePage/initializeArticlePage";
import {
  articlePageReducer,
  getArticles,
} from "../../model/slices/articlePageSlice";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";
import styles from "./ArticlesPage.module.css";

interface Props {
  className?: string;
}

const reducer: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage: FC<Props> = ({ className }) => {
  useAsyncReducer(reducer, false);

  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlePageIsLoading);
  const view = useAppSelector(getArticlePageView);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initializeArticlePage());
  });

  return (
    <Page
      className={classNames(styles.articlesPage, {}, [className])}
      onScrollEnd={onLoadNextPart}
    >
      <ArticlePageFilters />
      <ArticleList
        view={view}
        isLoading={isLoading}
        articles={articles}
        className={styles.list}
      />
    </Page>
  );
};

export default memo(ArticlesPage);
