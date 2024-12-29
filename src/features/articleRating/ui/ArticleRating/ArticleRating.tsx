import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useGetArticleRating, useRateArticle } from "../../api/articleRating";

import { RatingCard } from "@/entities/Rating";
import { getUserAuthData } from "@/entities/User";
import { useAppSelector } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";

interface Props {
  className?: string;
  articleId: string;
}
const ArticleRating = memo(({ className, articleId }: Props) => {
  const { t } = useTranslation();

  const auth = useAppSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: auth?.id ?? "",
  });

  const [rateRatingMutation] = useRateArticle();

  const handleArticleMutation = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateRatingMutation({
          articleId,
          userId: auth?.id ?? "",
          rate: starsCount,
          feedback,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [articleId, auth?.id, rateRatingMutation],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={108} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={handleArticleMutation}
      onCancel={handleArticleMutation}
      rate={rating?.rate}
      className={className}
      title={t("RateArticle")}
      feedbackTitle={t("ArticleFeedbackTitle")}
      hasFeedback
    />
  );
});

export default ArticleRating;
