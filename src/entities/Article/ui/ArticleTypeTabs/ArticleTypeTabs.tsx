import { memo, useCallback, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Tabs, type TabItem } from "shared/ui";
import { ArticleType } from "../../model/types/article";

interface Props {
  className?: string;
  value: ArticleType;
  onChangeType: (articleType: ArticleType) => void;
}

export const ArticleTypeTabs = memo(
  ({ className, value, onChangeType }: Props) => {
    const { t } = useTranslation();

    const tabs = useMemo<TabItem[]>(
      () => [
        { content: t("All"), value: ArticleType.ALL },
        { content: t("IT"), value: ArticleType.IT },
        { content: t("Article"), value: ArticleType.ARTICLE },
        { content: t("Business"), value: ArticleType.BUSINESS },
        { content: t("Music"), value: ArticleType.MUSIC },
      ],
      [t],
    );

    const onTabChange = useCallback(
      (articleType: TabItem) => {
        // TODO: add generic to tabs
        onChangeType(articleType.value as ArticleType);
      },
      [onChangeType],
    );

    return (
      <Tabs
        className={classNames("", {}, [className])}
        tabs={tabs}
        value={value}
        onTabChange={onTabChange}
      />
    );
  },
);