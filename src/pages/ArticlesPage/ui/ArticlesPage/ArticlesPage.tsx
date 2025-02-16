import { memo, useCallback, type FC } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initializeArticlePage } from "../../model/services/initializeArticlePage/initializeArticlePage";
import { articlePageReducer } from "../../model/slices/articlePageSlice";
import { ArticleInfiniteList } from "../../ui/ArticleInfiniteList/ArticleInfiniteList";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";

import styles from "./ArticlesPage.module.css";

import { ArticlePageGreeting } from "@/features/articlePageGreeting";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";
import {
  classNames,
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
    <StickyContentLayout
      left={<ViewSelectorContainer />}
      content={
        <Page
          dataTestid="ArticlesPage"
          className={classNames(styles.articlesPageRedesigned, {}, [className])}
          onScrollEnd={onLoadNextPart}
        >
          <ArticleInfiniteList className={styles.list} />
          <ArticlePageGreeting />
        </Page>
      }
      right={<FiltersContainer />}
    />
  );
};

export default memo(ArticlesPage);
