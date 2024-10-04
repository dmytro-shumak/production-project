import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();

    const renderArticle = useCallback(
      (article: Article) => {
        return (
          <ArticleListItem article={article} view={view} key={article.id} />
        );
      },
      [view],
    );

    return (
      <div
        className={classNames(styles.articleList, {}, [
          className,
          styles[view],
        ])}
      >
        {!isLoading && !articles.length && (
          <Text title={t("ArticlesNotFound")} size={TextSize.L} />
        )}
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && <ArticleListSkeleton view={view} />}
      </div>
    );
  },
);
