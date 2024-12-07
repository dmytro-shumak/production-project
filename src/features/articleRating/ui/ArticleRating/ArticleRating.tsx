import { memo } from "react";
import { useTranslation } from "react-i18next";
import { RatingCard } from "@/entities/Rating";
import { useGetArticleRating } from "../../api/articleRating";
import { useAppSelector } from "@/shared/lib";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui";

interface Props {
  className?: string;
  articleId: string;
}

export const ArticleRating = memo(({ className, articleId }: Props) => {
  const { t } = useTranslation();

  const auth = useAppSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: auth?.id ?? "",
  });

  if (isLoading) {
    return <Skeleton width="100%" height={108} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      rate={rating?.rate}
      className={className}
      title={t("RateArticle")}
      feedbackTitle={t("ArticleFeedbackTitle")}
      hasFeedback
    />
  );
});
