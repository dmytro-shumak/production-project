import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleType } from "@/entities/Article";
import { type TabItem } from "@/shared/ui";
import { Tabs } from "@/shared/ui/redesigned/Tabs";

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
        { content: t("AllArticles"), value: ArticleType.ALL },
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
        direction="column"
        className={className}
        tabs={tabs}
        value={value}
        onTabChange={onTabChange}
      />
    );
  },
);
