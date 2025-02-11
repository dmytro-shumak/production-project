import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ArticleSortSelector.module.css";

import { ArticleSortField } from "@/entities/Article";
import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import type { SortOrder } from "@/shared/types";
import { Select, VStack, type SelectOption } from "@/shared/ui";
import { ListBox } from "@/shared/ui/redesigned/Popups";
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

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        { value: "asc", content: t("Ascending") },
        { value: "desc", content: t("Descending") },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        { value: ArticleSortField.VIEWS, content: t("Views") },
        { value: ArticleSortField.TITLE, content: t("Title") },
        { value: ArticleSortField.CREATED_AT, content: t("CreationDate") },
      ],
      [t],
    );

    return (
      <ToggleFeatures
        featureName="isAppRedesigned"
        on={
          <div
            className={classNames(styles.articleSortSelector, {}, [className])}
          >
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
        }
        off={
          <div
            className={classNames(styles.articleSortSelector, {}, [className])}
          >
            <Select
              options={sortFieldOptions}
              label={t("SortBy")}
              value={sort}
              onChange={onChangeSort}
            />
            <Select
              options={orderOptions}
              label={t("SortType")}
              value={order}
              onChange={onChangeOrder}
            />
          </div>
        }
      />
    );
  },
);
