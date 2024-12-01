import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib";
import { Select, type SelectOption } from "@/shared/ui";
import type { SortOrder } from "@/shared/types";
import { ArticleSortField } from "../../model/types/article";
import styles from "./ArticleSortSelector.module.css";

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
      <div className={classNames(styles.articleSortSelector, {}, [className])}>
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
    );
  },
);
