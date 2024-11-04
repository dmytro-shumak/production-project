import { ArticleList } from "entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib";
import { Text, TextSize, VStack } from "shared/ui";
import { useArticleRecommendationListQuery } from "./api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      data: articles,
      isLoading,
      error,
    } = useArticleRecommendationListQuery(3);

    if (isLoading) {
      return <Text title={t("Loading...")} />;
    }

    if (error) {
      return <Text title={t("Error occurred")} text={JSON.stringify(error)} />;
    }

    return (
      <VStack gap={8} className={classNames("", {}, [className])}>
        <ArticleList articles={articles} target="_blank" />
        <Text title={t("Comments")} size={TextSize.L} />
      </VStack>
    );
  },
);
