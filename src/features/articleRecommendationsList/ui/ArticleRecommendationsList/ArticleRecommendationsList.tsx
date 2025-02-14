import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useArticleRecommendationListQuery } from "./api/articleRecommendationsApi";

import { ArticleList } from "@/entities/Article";
import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text as TextDeprecated, TextSize, VStack } from "@/shared/ui";
import { Text } from "@/shared/ui/redesigned/Text";

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
      return (
        <ToggleFeatures
          featureName="isAppRedesigned"
          on={<Text title={t("Loading...")} />}
          off={<TextDeprecated title={t("Loading...")} />}
        />
      );
    }

    if (error || !articles) {
      return (
        <ToggleFeatures
          featureName="isAppRedesigned"
          on={<Text title={t("Error occurred")} text={JSON.stringify(error)} />}
          off={
            <TextDeprecated
              title={t("Error occurred")}
              text={JSON.stringify(error)}
            />
          }
        />
      );
    }

    return (
      <VStack
        gap={8}
        className={classNames("", {}, [className])}
        data-testid="ArticleRecommendationsList"
      >
        <ArticleList articles={articles} target="_blank" />
        <ToggleFeatures
          featureName="isAppRedesigned"
          on={<Text title={t("Comments")} size="large" />}
          off={<TextDeprecated title={t("Comments")} size={TextSize.L} />}
        />
      </VStack>
    );
  },
);
