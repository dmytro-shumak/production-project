import { memo } from "react";

import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelector";
import { getArticles } from "../../model/slices/articlePageSlice";

import { ArticleList } from "@/entities/Article";
import { useAppSelector, classNames } from "@/shared/lib";

interface Props {
  className?: string;
}

export const ArticleInfiniteList = memo(({ className }: Props) => {
  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlePageIsLoading);
  const view = useAppSelector(getArticlePageView);

  return (
    <div className={classNames("", {}, [className])}>
      <ArticleList
        view={view}
        isLoading={isLoading}
        articles={articles}
        className={className}
      />
    </div>
  );
});
