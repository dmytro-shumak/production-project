import { memo, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ArticlesFilters.module.css";

import type { ArticleSortField, ArticleType } from "@/entities/Article";
import { ArticleSortSelector } from "@/features/articleSortSelector";
import { ArticleTypeTabs } from "@/features/articleTypeTabs";
import SearchIcon from "@/shared/assets/icons/search.svg?react";
import { classNames } from "@/shared/lib";
import type { SortOrder } from "@/shared/types";
import { Card } from "@/shared/ui/redesigned/Card";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Input } from "@/shared/ui/redesigned/Input";
import { VStack } from "@/shared/ui/redesigned/Stack";

interface Props {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  search: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSort: (sort: ArticleSortField) => void;
  onChangeOrder: (order: SortOrder) => void;
  type: ArticleType;
  onChangeType: (articleType: ArticleType) => void;
}

export const ArticlesFilters = memo(
  ({
    className,
    onChangeOrder,
    onChangeSort,
    onChangeType,
    onChangeSearch,
    search,
    order,
    sort,
    type,
  }: Props) => {
    const { t } = useTranslation();

    return (
      <Card
        className={classNames(styles.articlesFilters, {}, [className])}
        padding="24"
      >
        <VStack gap={32}>
          <Input
            size="small"
            placeholder={t("Search")}
            onChange={onChangeSearch}
            value={search}
            inputPrefix={<Icon Svg={SearchIcon} />}
            data-testid="ArticleSearchInput"
          />
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />

          <ArticleTypeTabs
            onChangeType={onChangeType}
            value={type}
            className={styles.tabs}
          />
        </VStack>
      </Card>
    );
  },
);
