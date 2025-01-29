import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../../ui/ArticleDetailsComments/ArticleDetailsComments";

import styles from "./ArticleDetailsPage.module.css";
import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader/ArticleDetailsPageHeader";

import { ArticleDetails } from "@/entities/Article";
import { ArticleRating } from "@/features/articleRating";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { useAsyncReducer, type ReducersList } from "@/shared/lib";
import { classNames } from "@/shared/lib";
import { toggleFeatures } from "@/shared/lib/features";
import { Text, TextSize, VStack } from "@/shared/ui";
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

  const Rating = toggleFeatures({
    name: "isArticleRatingEnabled",
    // TODO: remove this
    // eslint-disable-next-line react/no-unstable-nested-components
    on: () => <ArticleRating articleId={id} />,
    off: () => null,
  });

  return (
    <Page className={classNames(styles.articleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader />
      <ArticleDetails id={id} />
      {Rating}
      <VStack gap={16}>
        <Text
          title={t("Recommendations")}
          className={styles.commentTitle}
          size={TextSize.L}
        />
        <ArticleRecommendationsList />
      </VStack>
      <ArticleDetailsComments id={id} />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
