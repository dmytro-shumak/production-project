import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getArticleDetailsData } from "@/entities/Article";
import { getRouteArticleEdit } from "@/shared/const/router";
import { useAppSelector } from "@/shared/lib";
import { Card } from "@/shared/ui/redesigned/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";

interface Props {
  className?: string;
}

export const AdditionalInfoContainer = memo(({ className }: Props) => {
  const article = useAppSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    article?.id && navigate(getRouteArticleEdit(article.id));
  }, [article?.id, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" borderRadius={32}>
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        className={className}
        onEdit={onEditArticle}
      />
    </Card>
  );
});
