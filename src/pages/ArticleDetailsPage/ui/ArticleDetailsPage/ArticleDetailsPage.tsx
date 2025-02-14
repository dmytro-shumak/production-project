import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../../ui/ArticleDetailsComments/ArticleDetailsComments";
import { AdditionalInfoContainer } from "../AdditionalInfoContainer/AdditionalInfoContainer";
import { DetailsContainer } from "../DetailsContainer/DetailsContainer";

import styles from "./ArticleDetailsPage.module.css";
import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader/ArticleDetailsPageHeader";

import { ArticleDetails } from "@/entities/Article";
import { ArticleRating } from "@/features/articleRating";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";
import { classNames, useAsyncReducer, type ReducersList } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text as TextDeprecated, TextSize, VStack } from "@/shared/ui";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";

interface Props {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<Props> = ({ className }) => {
  const { t } = useTranslation("article-details");
  const { id } = useParams();

  useAsyncReducer(reducers, true);

  if (!id) {
    return null;
  }

  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <StickyContentLayout
          content={
            <Page
              className={classNames(styles.articleDetailsPage, {}, [className])}
            >
              <DetailsContainer />
              <ArticleRating articleId={id} />
              <VStack gap={16}>
                <Text
                  title={t("Recommendations")}
                  className={styles.commentTitle}
                  size="large"
                />
                <ArticleRecommendationsList />
              </VStack>
              <ArticleDetailsComments id={id} />
            </Page>
          }
          right={<AdditionalInfoContainer />}
        />
      }
      off={
        <Page
          className={classNames(styles.articleDetailsPage, {}, [className])}
        >
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ToggleFeatures
            featureName="isArticleRatingEnabled"
            on={<ArticleRating articleId={id} />}
            off={null}
          />
          <VStack gap={16}>
            <TextDeprecated
              title={t("Recommendations")}
              className={styles.commentTitle}
              size={TextSize.L}
            />
            <ArticleRecommendationsList />
          </VStack>
          <ArticleDetailsComments id={id} />
        </Page>
      }
    />
  );
};

export default memo(ArticleDetailsPage);
