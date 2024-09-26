import {
  ArticleList,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import { fetchArticleList } from "pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList";
import { memo, useCallback, type FC } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  useInitialEffect,
  type ReducersList,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "shared/ui";
import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelector";
import {
  articlePageActions,
  articlePageReducer,
  getArticles,
} from "../../model/slices/articlePageSlice";
import styles from "./ArticlesPage.module.css";

interface Props {
  className?: string;
}

const reducer: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage: FC<Props> = ({ className }) => {
  useAsyncReducer(reducer);

  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlePageIsLoading);
  const view = useAppSelector(getArticlePageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  useInitialEffect(() => {
    dispatch(articlePageActions.initState());
    dispatch(fetchArticleList({ page: 1 }));
  });

  return (
    <Page className={classNames(styles.articlesPage, {}, [className])}>
      <ArticleViewSelector view={view} onViewClick={onChangeView} />
      <ArticleList view={view} isLoading={isLoading} articles={articles} />
    </Page>
  );
};

export default memo(ArticlesPage);
