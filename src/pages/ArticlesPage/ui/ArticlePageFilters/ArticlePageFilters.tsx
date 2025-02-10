import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

import styles from "./ArticlePageFilters.module.css";

import { ArticleSortSelector } from "@/features/articleSortSelector";
import { ArticleTypeTabs } from "@/features/articleTypeTabs";
import { ArticleViewSelector } from "@/features/articleViewSelector";
import { classNames } from "@/shared/lib";
import { Card } from "@/shared/ui";
import { Input } from "@/shared/ui/deprecated/Input";

interface Props {
  className?: string;
}

export const ArticlePageFilters = memo(({ className }: Props) => {
  const { t } = useTranslation();

  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view,
  } = useArticleFilters();

  return (
    <div className={classNames("", {}, [className])}>
      <div className={styles.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={styles.search}>
        <Input
          placeholder={t("Search")}
          onChange={onChangeSearch}
          value={search}
          data-testid="ArticleSearchInput"
        />
      </Card>
      <ArticleTypeTabs
        onChangeType={onChangeType}
        value={type}
        className={styles.tabs}
      />
    </div>
  );
});
