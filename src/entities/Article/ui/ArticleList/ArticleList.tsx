import { memo, type HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";

import { ArticleView, type Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

import styles from "./ArticleList.module.css";
import { ArticleListSkeleton } from "./ArticleListSkeleton";

import { classNames } from "@/shared/lib";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  articles: Article[];
  view?: ArticleView;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo(
  ({
    className,
    articles,
    view = ArticleView.GRID,
    isLoading,
    target,
  }: Props) => {
    const { t } = useTranslation();

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

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(styles.articleList, {}, [
            className,
            styles[view],
          ])}
        >
          <Text title={t("ArticlesNotFound")} size="large" />
        </div>
      );
    }

    return (
      <HStack gap={16} wrap="wrap" data-testid="ArticleList">
        {articles.map((article) => (
          <ArticleListItem
            article={article}
            view={view}
            target={target}
            key={article.id}
            className={styles.card}
          />
        ))}
      </HStack>
    );
  },
);
