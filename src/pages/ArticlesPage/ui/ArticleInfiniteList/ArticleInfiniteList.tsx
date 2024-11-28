import { ArticleList } from "entities/Article";
import { memo } from "react";
import { useAppSelector, classNames } from "shared/lib";
import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelector";
import { getArticles } from "../../model/slices/articlePageSlice";

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
        virtualized={false} // TODO:remove this
      />
    </div>
  );
});
