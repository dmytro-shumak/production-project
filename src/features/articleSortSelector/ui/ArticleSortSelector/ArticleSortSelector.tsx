import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ArticleSortSelector.module.css";

import { ArticleSortField } from "@/entities/Article";
import { classNames } from "@/shared/lib";
import type { SortOrder } from "@/shared/types";
import { ListBox, type ListBoxItem } from "@/shared/ui/redesigned/Popups";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (sort: ArticleSortField) => void;
  onChangeOrder: (order: SortOrder) => void;
}

export const ArticleSortSelector = memo(
  ({ className, order, sort, onChangeOrder, onChangeSort }: Props) => {
    const { t } = useTranslation();

    const orderOptions = useMemo<ListBoxItem<SortOrder>[]>(
      () => [
        { value: "asc", content: t("Ascending") },
        { value: "desc", content: t("Descending") },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<ListBoxItem<ArticleSortField>[]>(
      () => [
        { value: ArticleSortField.VIEWS, content: t("Views") },
        { value: ArticleSortField.TITLE, content: t("Title") },
        { value: ArticleSortField.CREATED_AT, content: t("CreationDate") },
      ],
      [t],
    );

    return (
      <div className={classNames(styles.articleSortSelector, {}, [className])}>
        <VStack gap={8}>
          <Text text={t("sortBy")} />
          <ListBox
            items={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
          />
          <ListBox
            items={orderOptions}
            value={order}
            onChange={onChangeOrder}
          />
        </VStack>
      </div>
    );
  },
);
