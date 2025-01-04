import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getCanEditArticle } from "../../../model/selectors/article";

import { getArticleDetailsData } from "@/entities/Article";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";
import { classNames, useAppSelector } from "@/shared/lib";
import { Button, ButtonTheme, HStack } from "@/shared/ui";

interface Props {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation("article-details");
  const canEdit = useAppSelector(getCanEditArticle);
  const article = useAppSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    article?.id && navigate(getRouteArticleEdit(article.id));
  }, [article?.id, navigate]);

  return (
    <HStack justify="between" className={classNames("", {}, [className])}>
      <Button theme={ButtonTheme.Outline} onClick={onBackToList}>
        {t("BackToList")}
      </Button>
      {canEdit && (
        <Button theme={ButtonTheme.Outline} onClick={onEditArticle}>
          {t("Edit")}
        </Button>
      )}
    </HStack>
  );
});
