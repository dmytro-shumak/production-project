import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { ArticleView, type Article } from "../../model/types/article";
import styles from "./ArticleList.module.css";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListSkeleton } from "./ArticleListSkeleton";

interface Props {
  className?: string;
  articles: Article[];
  view?: ArticleView;
  isLoading?: boolean;
}

export const ArticleList = memo(
  ({ className, articles, view = ArticleView.GRID, isLoading }: Props) => {
    const renderArticle = useCallback(
      (article: Article) => {
        return (
          <ArticleListItem article={article} view={view} key={article.id} />
        );
      },
      [view],
    );

    if (isLoading) {
      return (
        <div
          className={classNames(styles.articleList, {}, [
            className,
            styles[view],
          ])}
        >
          <ArticleListSkeleton view={view} />
        </div>
      );
    }

    return (
      <div
        className={classNames(styles.articleList, {}, [
          className,
          styles[view],
        ])}
      >
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
    );
  },
);
