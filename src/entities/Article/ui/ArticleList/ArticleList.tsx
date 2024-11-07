import { memo, type HTMLAttributeAnchorTarget, type LegacyRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui";
import { List, type ListRowProps, WindowScroller } from "react-virtualized";
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
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

export const ArticleList = memo(
  ({
    className,
    articles,
    view = ArticleView.GRID,
    isLoading,
    target,
    virtualized = true,
  }: Props) => {
    const { t } = useTranslation();

    const isBig = view === ArticleView.LIST;

    const gridItemCount = Math.floor(
      Number(document.getElementById("pageContainer")?.clientWidth) / 300,
    );

    const itemsPerRow = isBig ? 1 : gridItemCount;
    const rowCount = isBig
      ? articles.length
      : Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({ index, key, style }: ListRowProps) => {
      const items = [];
      const fromIndex = index * itemsPerRow;
      const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

      for (let i = fromIndex; i < toIndex; i += 1) {
        items.push(
          <ArticleListItem
            article={articles[i]}
            view={view}
            target={target}
            key={`str${i}`}
            className={styles.card}
          />,
        );
      }

      return (
        <div key={key} style={style} className={styles.row}>
          {items}
        </div>
      );
    };

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
          <Text title={t("ArticlesNotFound")} size={TextSize.L} />;
        </div>
      );
    }

    return (
      <WindowScroller
        scrollElement={document.getElementById("pageContainer") as Element}
      >
        {({
          height,
          width,
          registerChild,
          onChildScroll,
          isScrolling,
          scrollTop,
        }) => (
          <div
            ref={registerChild as LegacyRef<HTMLDivElement>}
            className={classNames(styles.articleList, {}, [
              className,
              styles[view],
            ])}
          >
            {virtualized ? (
              <List
                height={height ?? 700}
                rowCount={rowCount}
                rowHeight={isBig ? 700 : 330}
                rowRenderer={rowRender}
                width={width ? width - 80 : 700}
                autoHeight
                onScroll={onChildScroll}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
              />
            ) : (
              [
                articles.map((article) => (
                  <ArticleListItem
                    article={article}
                    view={view}
                    target={target}
                    key={article.id}
                    className={styles.card}
                  />
                )),
              ]
            )}
          </div>
        )}
      </WindowScroller>
    );
  },
);
